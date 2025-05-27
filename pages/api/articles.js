import { getSheetData } from '@/lib/googleSheets'

const SHEET_ID = process.env.GOOGLE_SHEET_ID
const RANGE = process.env.GOOGLE_SHEET_RANGE_ARTICLE

// Helper untuk parse tanggal
const parseDate = (dateString) => {
  if (!dateString) return null
  return new Date(dateString)
}

// Helper untuk format tanggal
const formatDate = (date) => {
  if (!date) return null
  return new Date(date).toISOString().split('T')[0]
}

// Helper untuk parse view count
const parseViewCount = (viewString) => {
  if (!viewString) return 0
  const number = parseInt(viewString)
  return isNaN(number) ? 0 : number
}

export default async function handler(req, res) {
  try {
    const {
      sourcePath = '',
      searchTerm = '',
      sort = 'latest',
      category = '',
      status = '',
      tags = '',
      highlight,
      dateFrom = '',
      dateTo = '',
      page = '1',
      limit = '10',
    } = req.query

    let data = await getSheetData(SHEET_ID, RANGE)

    // Filter by sourcePath
    if (sourcePath) {
      data = data.filter(
        (item) =>
          item.sourcePath?.toLowerCase() === sourcePath.toLowerCase()
      )
    }

    // Filter by status (published, draft, archived, etc.)
    if (status) {
      data = data.filter(
        (item) => item.status?.toLowerCase() === status.toLowerCase()
      )
    }

    // Filter highlight (boolean string 'TRUE'/'FALSE' atau 'true'/'false')
    if (typeof highlight !== 'undefined') {
      const boolVal = highlight === 'true'
      data = data.filter((item) => {
        const itemHighlight = (item.highlight || '').toLowerCase()
        return (itemHighlight === 'true' || itemHighlight === 'TRUE') === boolVal
      })
    }

    // Filter by category (exact match, case insensitive)
    if (category) {
      data = data.filter(
        (item) => item.category?.toLowerCase() === category.toLowerCase()
      )
    }

    // Filter by tags (contains match)
    if (tags) {
      const tagList = tags.toLowerCase().split(',').map(tag => tag.trim())
      data = data.filter((item) => {
        const itemTags = (item.tags || '').toLowerCase()
        return tagList.some(tag => itemTags.includes(tag))
      })
    }

    // Filter by date range (createdAt)
    if (dateFrom) {
      const fromDate = new Date(dateFrom)
      data = data.filter((item) => {
        const itemDate = parseDate(item.createdAt)
        return itemDate && itemDate >= fromDate
      })
    }
    if (dateTo) {
      const toDate = new Date(dateTo)
      data = data.filter((item) => {
        const itemDate = parseDate(item.createdAt)
        return itemDate && itemDate <= toDate
      })
    }

    // Search by title, content, excerpt, category, tags
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      data = data.filter(
        (item) =>
          (item.title?.toLowerCase().includes(term) ||
            item.content?.toLowerCase().includes(term) ||
            item.excerpt?.toLowerCase().includes(term) ||
            item.category?.toLowerCase().includes(term) ||
            item.tags?.toLowerCase().includes(term))
      )
    }

    // Sorting
    if (sort === 'latest') {
      data.sort((a, b) => {
        const dateA = parseDate(b.createdAt)
        const dateB = parseDate(a.createdAt)
        return dateA - dateB
      })
    } else if (sort === 'oldest') {
      data.sort((a, b) => {
        const dateA = parseDate(a.createdAt)
        const dateB = parseDate(b.createdAt)
        return dateA - dateB
      })
    } else if (sort === 'updated') {
      data.sort((a, b) => {
        const dateA = parseDate(b.updatedAt)
        const dateB = parseDate(a.updatedAt)
        return dateA - dateB
      })
    } else if (sort === 'title-asc') {
      data.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
    } else if (sort === 'title-desc') {
      data.sort((a, b) => (b.title || '').localeCompare(a.title || ''))
    } else if (sort === 'most-viewed') {
      data.sort((a, b) => parseViewCount(b.view) - parseViewCount(a.view))
    } else if (sort === 'least-viewed') {
      data.sort((a, b) => parseViewCount(a.view) - parseViewCount(b.view))
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page))
    const limitNum = Math.max(1, parseInt(limit))
    const startIndex = (pageNum - 1) * limitNum
    const paginatedData = data.slice(startIndex, startIndex + limitNum)

    // Format response data
    const formattedData = paginatedData.map(article => ({
      id: article.id,
      status: article.status,
      highlight: article.highlight,
      category: article.category,
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      coverImage: article.coverImage,
      createdAt: formatDate(article.createdAt),
      updatedAt: formatDate(article.updatedAt),
      tags: article.tags,
      view: parseViewCount(article.view),
    }))

    res.status(200).json({
      total: data.length,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(data.length / limitNum),
      data: formattedData,
    })
  } catch (error) {
    console.error('Error fetching articles:', error)
    res.status(500).json({ error: 'Gagal mengambil data artikel dari Google Sheets' })
  }
}

