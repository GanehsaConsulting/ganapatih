import { getSheetData } from '@/lib/googleSheets';

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const RANGE = process.env.GOOGLE_SHEET_RANGE;

function applyFilters(data, filters) {
  return data.filter(item => {
    for (const key in filters) {
      if (!filters[key]) continue; // skip if filter param kosong

      const filterVal = filters[key].toLowerCase();
      const itemVal = (item[key] || '').toString().toLowerCase();

      if (key === 'isPublished' || key === 'isPriority') {
        // Filter boolean fields (Google Sheets simpan string "TRUE" / "FALSE")
        if (itemVal !== filterVal) return false;
      } else {
        // Partial match for other fields
        if (!itemVal.includes(filterVal)) return false;
      }
    }
    return true;
  });
}

function applySearch(data, searchTerm) {
  if (!searchTerm) return data;

  const term = searchTerm.toLowerCase();
  return data.filter(item => {
    return (
      (item.productName || '').toLowerCase().includes(term) ||
      (item.category || '').toLowerCase().includes(term) ||
      (item.subCategory || '').toLowerCase().includes(term) ||
      (item.keywords || '').toLowerCase().includes(term)
    );
  });
}

function applySort(data, sortField, order = 'asc') {
  if (!sortField) return data;

  const sorted = [...data].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    // Try converting numeric fields to numbers for proper sorting
    const aNum = parseFloat(aVal?.replace(/[^\d.-]/g, ''));
    const bNum = parseFloat(bVal?.replace(/[^\d.-]/g, ''));

    if (!isNaN(aNum) && !isNaN(bNum)) {
      aVal = aNum;
      bVal = bNum;
    } else {
      aVal = (aVal || '').toString().toLowerCase();
      bVal = (bVal || '').toString().toLowerCase();
    }

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
}

export default async function handler(req, res) {
  try {
    let data = await getSheetData(SHEET_ID, RANGE);

    const {
      page = '1',
      limit = '10',
      search = '',
      sort = '',
      order = 'asc',
      ...filters
    } = req.query;

    // Filter dulu berdasarkan query params (kecuali pagination, search, sort)
    data = applyFilters(data, filters);

    // Search keyword di beberapa field
    data = applySearch(data, search);

    // Sorting data
    data = applySort(data, sort, order.toLowerCase());

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;
    const paginatedData = data.slice(startIndex, startIndex + limitNum);

    // Response metadata & data
    res.status(200).json({
      total: data.length,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(data.length / limitNum),
      data: paginatedData,
    });
  } catch (err) {
    console.error('Google Sheets error:', err);
    res.status(500).json({ error: 'Gagal mengambil data Google Sheets' });
  }
}
