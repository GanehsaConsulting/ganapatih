import { formatDate } from '@/components/helper/formatDateTime'
import { slugify } from '@/components/helper/slugify'
import { parseArray } from '@/lib/formatArray'
import { getSheetData } from '@/lib/googleSheets'
import { parseBoolean, parseViewCount } from '@/lib/helpers'

const SHEET_ID = process.env.GOOGLE_SHEET_ID
const RANGE = process.env.GOOGLE_SHEET_RANGE_ARTICLE


export default async function handler(req, res) {
    const { slug } = req.query

    if (!slug) {
        return res.status(400).json({ error: 'Slug parameter is required' })
    }

    try {
        const data = await getSheetData(SHEET_ID, RANGE)

        // Cari artikel berdasarkan slug dari title
        const article = data.find((item) => {
            const itemSlug = slugify(item.title)
            return itemSlug === slug.toLowerCase()
        })

        if (!article) {
            return res.status(404).json({ error: 'Article not found' })
        }

        // Format response data
        const formattedArticle = {
            id: article.id,
            status: parseBoolean(article.status),
            highlight: parseBoolean(article.highlight),
            category: article.category,
            title: article.title,
            content: article.content,
            excerpt: article.excerpt,
            coverImage: article.coverImage,
            createdAt: formatDate(article.createdAt),
            updatedAt: formatDate(article.updatedAt),
            tags: parseArray(article.tags),
            view: parseViewCount(article.view),
            slug: slugify(article.title)
        }

        res.status(200).json({
            success: true,
            data: formattedArticle
        })

    } catch (error) {
        console.error('Error fetching article detail:', error)
        res.status(500).json({ error: 'Gagal mengambil detail artikel dari Google Sheets' })
    }
}