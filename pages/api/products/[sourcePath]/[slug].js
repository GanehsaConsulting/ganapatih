// pages/api/products/[slug].js
import { slugify } from '@/components/helper/slugify'
import { getSheetData } from '@/lib/googleSheets'
const { parseFeatures, parseRequirements } = require('@/lib/formatArray')

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

// Helper function to find product by slug
const findProductBySlug = (products, targetSlug) => {
  return products.find(product => {
    // Try multiple matching strategies
    const productNameSlug = slugify(product.productName || '')
    const productIdSlug = slugify(product.id || '')
    const productSlugField = product.slug || ''

    // Check exact matches
    return productNameSlug === targetSlug ||
      productIdSlug === targetSlug ||
      productSlugField === targetSlug ||
      slugify(productSlugField) === targetSlug || (productNameSlug.includes(targetSlug) && productNameSlug.length - targetSlug.length < 10)
  })
}

// Transform data to consistent format
const transformProductData = (item) => {

  return {
    id: item.id || slugify(item.productName),
    productId: item.productId,
    name: item.productName,
    slug: slugify(item.productName),
    description: item.descriptions,
    price: parseRupiahToNumber(item.discountPrice),
    priceOriginal: parseRupiahToNumber(item.retailPrice),
    discount: parseRupiahToNumber(item.discount),
    thumbnail: item.thumbnailUrl,
    packageName: item.packagesName,
    category: item.category,
    subCategory: item.subCategory,
    sourcePath: item.sourcePath,
    features: parseFeatures(item.features),
    requirements: parseRequirements(item.requirements),
    keywords: item.keywords,
    link: item.link || item.whatsappLink,
    whatsappLink: item.whatsappLink || item.link,
    isPublished: item.isPublished === 'TRUE',
    isPriority: item.isPriority === 'TRUE',
    maxQuantity: item.maxQuantity ? parseInt(item.maxQuantity) : 50,
    ctaLink: item.ctaLink || item.link,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }
}

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { slug } = req.query
    const { sourcePath } = req.query // Optional filter by sourcePath

    if (!slug) {
      return res.status(400).json({ error: 'Slug parameter is required' })
    }

    // Get all data from Google Sheets
    let data = await getSheetData(SHEET_ID, RANGE)

    const normalizeSourcePath = (str) => {
      if (!str) return ''
      return str.startsWith('/') ? str.toLowerCase() : '/' + str.toLowerCase()
    }

    if (sourcePath) {
      data = data.filter(
        (item) => normalizeSourcePath(item.sourcePath) === normalizeSourcePath(sourcePath)
      )
    }


    // Filter only published products (optional - remove if you want to show unpublished too)
    data = data.filter((item) => item.isPublished === 'TRUE')

    // Find product by slug
    const product = findProductBySlug(data, slug.toLowerCase())

    if (!product) {
      return res.status(404).json({
        error: 'Product not found',
        slug: slug,
        sourcePath: sourcePath || 'any'
      })
    }

    // Transform the product data
    const transformedProduct = transformProductData(product)

    // Optionally, get related products (same category, different product)
    const relatedProducts = data
      .filter((item) =>
        item.category === product.category &&
        slugify(item.productName) !== slug.toLowerCase()
      )
      .slice(0, 4)
      .map(transformProductData)

    res.status(200).json({
      success: true,
      data: transformedProduct,
      relatedProducts: relatedProducts,
      meta: {
        slug: slug,
        sourcePath: sourcePath || null,
        category: product.category,
        subCategory: product.subCategory
      }
    })

  } catch (error) {
    console.error('Error fetching product by slug:', error)
    res.status(500).json({
      error: 'Failed to fetch product from Google Sheets',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}