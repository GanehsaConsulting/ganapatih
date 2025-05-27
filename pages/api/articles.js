import { formatDate } from '@/components/helper/formatDateTime'
import { parseArray } from '@/lib/formatArray'
import { getSheetData } from '@/lib/googleSheets'
import { formatSheetData, normalizeStatus, parseBoolean, parseDate } from '@/lib/helpers'

const SHEET_ID = process.env.GOOGLE_SHEET_ID
const RANGE = process.env.GOOGLE_SHEET_RANGE_ARTICLE

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
      published,
      featured,
      active,
      dateFrom = '',
      dateTo = '',
      page = '1',
      limit = '10',
    } = req.query

    // Get raw data from Google Sheets
    let rawData = await getSheetData(SHEET_ID, RANGE)

    // Format data with proper type conversions
    let data = formatSheetData(rawData)

    // Filter by sourcePath
    if (sourcePath) {
      data = data.filter(
        (item) =>
          item.sourcePath?.toLowerCase() === sourcePath.toLowerCase()
      )
    }

    // Filter by status (dengan normalisasi)
    if (status) {
      const normalizedStatus = normalizeStatus(status)
      data = data.filter(
        (item) => item.status === normalizedStatus
      )
    }

    // Filter highlight (boolean)
    if (typeof highlight !== 'undefined') {
      const boolVal = parseBoolean(highlight)
      data = data.filter((item) => item.highlight === boolVal)
    }

    // Filter published (boolean)
    if (typeof published !== 'undefined') {
      const boolVal = parseBoolean(published)
      data = data.filter((item) => item.published === boolVal)
    }

    // Filter featured (boolean)
    if (typeof featured !== 'undefined') {
      const boolVal = parseBoolean(featured)
      data = data.filter((item) => item.featured === boolVal)
    }

    // Filter active (boolean)
    if (typeof active !== 'undefined') {
      const boolVal = parseBoolean(active)
      data = data.filter((item) => item.active === boolVal)
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

    // Advanced sorting options
    const sortData = (data, sortType) => {
      switch (sortType) {
        case 'latest':
          return data.sort((a, b) => {
            const dateA = parseDate(b.createdAt)
            const dateB = parseDate(a.createdAt)
            return dateA - dateB
          })

        case 'oldest':
          return data.sort((a, b) => {
            const dateA = parseDate(a.createdAt)
            const dateB = parseDate(b.createdAt)
            return dateA - dateB
          })

        case 'updated':
          return data.sort((a, b) => {
            const dateA = parseDate(b.updatedAt)
            const dateB = parseDate(a.updatedAt)
            return dateA - dateB
          })

        case 'title-asc':
          return data.sort((a, b) => (a.title || '').localeCompare(b.title || ''))

        case 'title-desc':
          return data.sort((a, b) => (b.title || '').localeCompare(a.title || ''))

        case 'most-viewed':
          return data.sort((a, b) => b.view - a.view)

        case 'least-viewed':
          return data.sort((a, b) => a.view - b.view)

        case 'category':
          return data.sort((a, b) => (a.category || '').localeCompare(b.category || ''))

        case 'featured-first':
          return data.sort((a, b) => {
            if (a.featured && !b.featured) return -1
            if (!a.featured && b.featured) return 1
            // If both same featured status, sort by latest
            const dateA = parseDate(b.createdAt)
            const dateB = parseDate(a.createdAt)
            return dateA - dateB
          })

        default:
          return data
      }
    }

    // Apply sorting
    data = sortData(data, sort)

    // Pagination
    const pageNum = Math.max(1, parseInt(page))
    const limitNum = Math.max(1, parseInt(limit))
    const startIndex = (pageNum - 1) * limitNum
    const paginatedData = data.slice(startIndex, startIndex + limitNum)

    // Format response data dengan proper field mapping
    const formattedData = paginatedData.map(article => ({
      id: article.id,
      status: article.status,
      highlight: article.highlight,
      published: article.published,
      category: article.category,
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      coverImage: article.coverImage,
      createdAt: formatDate(article.createdAt),
      updatedAt: formatDate(article.updatedAt),
      publishedAt: formatDate(article.publishedAt || article.createdAt),
      date: formatDate(article.createdAt), // Alias untuk backward compatibility
      tags: parseArray(article.tags),
      categories: article.category, // Alias untuk backward compatibility
      view: article.view,
      slug: article.slug || article.title?.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || `article-${article.id}`,
    }))

    // Response dengan metadata tambahan
    const response = {
      success: true,
      total: data.length,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(data.length / limitNum),
      hasNextPage: pageNum < Math.ceil(data.length / limitNum),
      hasPrevPage: pageNum > 1,
      data: formattedData,
      // Metadata for debugging
      filters: {
        sourcePath,
        searchTerm,
        sort,
        category,
        status: normalizeStatus(status),
        tags,
        highlight: typeof highlight !== 'undefined' ? parseBoolean(highlight) : undefined,
        published: typeof published !== 'undefined' ? parseBoolean(published) : undefined,
        featured: typeof featured !== 'undefined' ? parseBoolean(featured) : undefined,
        active: typeof active !== 'undefined' ? parseBoolean(active) : undefined,
        dateFrom,
        dateTo,
      }
    }

    res.status(200).json(response)
  } catch (error) {
    console.error('Error fetching articles:', error)
    res.status(500).json({
      success: false,
      error: 'Gagal mengambil data artikel dari Google Sheets',
      message: error.message
    })
  }
}