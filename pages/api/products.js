import { getSheetData } from '@/lib/googleSheets'

const SHEET_ID = process.env.GOOGLE_SHEET_ID
const RANGE = process.env.GOOGLE_SHEET_RANGE

// Helper parse harga rupiah ke number
const parseRupiahToNumber = (rpString) => {
  if (!rpString) return 0
  let cleaned = rpString.replace(/\s/g, '').replace(/Rp/gi, '')
  cleaned = cleaned.replace(/\./g, '').replace(/,/g, '.')
  const number = parseFloat(cleaned)
  return isNaN(number) ? 0 : number
}

export default async function handler(req, res) {
  try {
    const {
      sourcePath = '',
      searchTerm = '',
      sort = 'default',
      minPrice = 0,
      maxPrice = 9999999999,
      category = '',
      subCategory = '',
      isPublished,
      isPriority,
      page = '1',
      limit = '20',
    } = req.query

    let data = await getSheetData(SHEET_ID, RANGE)
    // Filter by sourcePath (misal kamu simpan sourcePath di sheet)
    if (sourcePath) {
      data = data.filter(
        (item) =>
          item.sourcePath?.toLowerCase() === sourcePath.toLowerCase()
      )
    }

    // Filter isPublished & isPriority (boolean string 'TRUE'/'FALSE')
    if (typeof isPublished !== 'undefined') {
      const boolVal = isPublished === 'true'
      data = data.filter((item) => (item.isPublished === 'TRUE') === boolVal)
    }
    if (typeof isPriority !== 'undefined') {
      const boolVal = isPriority === 'true'
      data = data.filter((item) => (item.isPriority === 'TRUE') === boolVal)
    }

    // Filter category & subCategory exact match (case insensitive)
    if (category) {
      data = data.filter(
        (item) => item.category?.toLowerCase() === category.toLowerCase()
      )
    }
    if (subCategory) {
      data = data.filter(
        (item) => item.subCategory?.toLowerCase() === subCategory.toLowerCase()
      )
    }

    // Filter by price range (gunakan price discountPrice dulu jika ada)
    data = data.filter((item) => {
      const price = parseRupiahToNumber(item.discountPrice || item.umkmPrice)
      return price >= Number(minPrice) && price <= Number(maxPrice)
    })

    // Search by productName, category, subCategory, keywords
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      data = data.filter(
        (item) =>
          (item.productName?.toLowerCase().includes(term) ||
            item.category?.toLowerCase().includes(term) ||
            item.subCategory?.toLowerCase().includes(term) ||
            item.keywords?.toLowerCase().includes(term))
      )
    }

    // Sorting
    if (sort === 'termurah') {
      data.sort(
        (a, b) =>
          parseRupiahToNumber(a.discountPrice || a.umkmPrice) -
          parseRupiahToNumber(b.discountPrice || b.umkmPrice)
      )
    } else if (sort === 'termahal') {
      data.sort(
        (a, b) =>
          parseRupiahToNumber(b.discountPrice || b.umkmPrice) -
          parseRupiahToNumber(a.discountPrice || a.umkmPrice)
      )
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page))
    const limitNum = Math.max(1, parseInt(limit))
    const startIndex = (pageNum - 1) * limitNum
    const paginatedData = data.slice(startIndex, startIndex + limitNum)

    res.status(200).json({
      total: data.length,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(data.length / limitNum),
      data: paginatedData,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Gagal mengambil data dari Google Sheets' })
  }
}
