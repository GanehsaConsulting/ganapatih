import { getSheetData } from '@/lib/googleSheets'

const SHEET_ID = process.env.GOOGLE_SHEET_ID
const RANGE = process.env.GOOGLE_SHEET_RANGE_ARTICLE

// Helper untuk convert title ke slug
const titleToSlug = (title) => {
  if (!title) return ''
  return title
    .toLowerCase()
    .trim()
    // Replace spaces dengan dash
    .replace(/\s+/g, '-')
    // Remove special characters, keep alphanumeric dan dash
    .replace(/[^a-z0-9\-]/g, '')
    // Remove multiple consecutive dashes
    .replace(/-+/g, '-')
    // Remove leading/trailing dashes
    .replace(/^-+|-+$/g, '')
}

// Helper untuk parse tanggal
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
  const { slug } = req.query

  if (!slug) {
    return res.status(400).json({ error: 'Slug parameter is required' })
  }

  try {
    const data = await getSheetData(SHEET_ID, RANGE)
    
    // Cari artikel berdasarkan slug dari title
    const article = data.find((item) => {
      const itemSlug = titleToSlug(item.title)
      return itemSlug === slug.toLowerCase()
    })

    if (!article) {
      return res.status(404).json({ error: 'Article not found' })
    }

    // Format response data
    const formattedArticle = {
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
      slug: titleToSlug(article.title)
    }

    // Optional: Increment view count (jika mau update ke Google Sheets)
    // Ini perlu implementasi update function terpisah

    res.status(200).json({
      success: true,
      data: formattedArticle
    })

  } catch (error) {
    console.error('Error fetching article detail:', error)
    res.status(500).json({ error: 'Gagal mengambil detail artikel dari Google Sheets' })
  }
}