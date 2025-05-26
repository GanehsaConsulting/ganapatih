// hooks/useSearchProducts.js
import { useEffect, useState } from 'react'

export function useSearchProducts({
    sourcePath = '',
    searchTerm = '',
    category = '',
    subCategory = '',
    isPublished,
    isPriority,
    minPrice = 0,
    maxPrice = Infinity,
    searchMode = 'comprehensive', // 'simple' | 'comprehensive' | 'fuzzy'
    organization = '',
}) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchStats, setSearchStats] = useState({
        totalResults: 0,
        searchTime: 0,
        suggestions: []
    })

    useEffect(() => {
        // Skip jika sourcePath kosong
        if (!sourcePath) {
            setData([])
            setSearchStats({ totalResults: 0, searchTime: 0, suggestions: [] })
            return
        }

        async function performSearch() {
            const startTime = performance.now()
            setLoading(true)
            setError(null)

            try {
                let results = []

                if (searchTerm.trim() === '') {
                    // No search term, get all products with filters
                    results = await fetchWithFilters()
                } else {
                    // Perform search based on mode
                    switch (searchMode) {
                        case 'comprehensive':
                            results = await performComprehensiveSearch()
                            break
                        case 'fuzzy':
                            results = await performFuzzySearch()
                            break
                        default:
                            results = await performSimpleSearch()
                    }
                }

                const endTime = performance.now()
                
                setData(results)
                setSearchStats({
                    totalResults: results.length,
                    searchTime: Math.round(endTime - startTime),
                    suggestions: generateSuggestions(results)
                })

            } catch (err) {
                setError(err.message || 'Failed to fetch search results')
                setData([])
                setSearchStats({ totalResults: 0, searchTime: 0, suggestions: [] })
            } finally {
                setLoading(false)
            }
        }

        performSearch()
    }, [sourcePath, searchTerm, category, subCategory, isPublished, isPriority, minPrice, maxPrice, searchMode, organization])

    // Simple search - backend search (GLOBAL - no sourcePath restriction)
    async function performSimpleSearch() {
        const params = new URLSearchParams({
            // sourcePath dihapus untuk global search
            searchTerm,
            limit: '1000',
            page: '1'
        })

        addFiltersToParams(params)

        const response = await fetch(`/api/products?${params.toString()}`)
        const result = await response.json()
        
        if (result.error) throw new Error(result.error)
        return result.data || []
    }

    // Comprehensive search - multi-field dengan scoring (GLOBAL SEARCH)
    async function performComprehensiveSearch() {
        // Fetch all data WITHOUT sourcePath restriction
        const params = new URLSearchParams({
            // sourcePath dihapus untuk global search
            limit: '1000',
            page: '1'
        })

        addFiltersToParams(params)

        const response = await fetch(`/api/products?${params.toString()}`)
        const result = await response.json()
        
        if (result.error) throw new Error(result.error)
        
        const allData = result.data || []
        const searchTerms = searchTerm.toLowerCase().split(' ').filter(term => term.length > 0)
        
        // Multi-field search with scoring
        const scoredResults = allData.map(item => ({
            ...item,
            searchScore: calculateSearchScore(item, searchTerms)
        })).filter(item => item.searchScore > 0)

        // Sort by score (highest first)
        return scoredResults.sort((a, b) => b.searchScore - a.searchScore)
    }

    // Calculate search score based on multiple fields with your data structure
    function calculateSearchScore(item, searchTerms) {
        let totalScore = 0

        const weights = {
            productName: 15,      // Highest priority
            packagesName: 12,
            category: 10,
            subCategory: 8,
            organization: 6,
            descriptions: 5,
            features: 4,
            requirements: 3,
            keywords: 3,
            productId: 2,
        }

        // Helper function to check if text contains any search term
        const calculateFieldScore = (text, fieldWeight) => {
            if (!text || typeof text !== 'string') return 0
            
            const textLower = text.toLowerCase()
            let fieldScore = 0

            searchTerms.forEach(term => {
                if (textLower.includes(term)) {
                    // Bonus for exact word match
                    const wordBoundary = new RegExp(`\\b${term}\\b`).test(textLower)
                    const exactMatch = textLower === term
                    
                    if (exactMatch) {
                        fieldScore += fieldWeight * 3 // Exact match
                    } else if (wordBoundary) {
                        fieldScore += fieldWeight * 2 // Word boundary match
                    } else {
                        fieldScore += fieldWeight * 1 // Partial match
                    }
                }
            })

            return fieldScore
        }

        // Helper for array/list fields (features, requirements)
        const calculateListFieldScore = (text, fieldWeight, separator = ';') => {
            if (!text || typeof text !== 'string') return 0
            
            const items = text.split(separator).map(item => item.trim())
            let listScore = 0

            items.forEach(itemText => {
                listScore += calculateFieldScore(itemText, fieldWeight * 0.8) // Slightly lower weight for list items
            })

            return listScore
        }

        // Score each field based on your data structure
        totalScore += calculateFieldScore(item.productName, weights.productName)
        totalScore += calculateFieldScore(item.packagesName, weights.packagesName)
        totalScore += calculateFieldScore(item.category, weights.category)
        totalScore += calculateFieldScore(item.subCategory, weights.subCategory)
        totalScore += calculateFieldScore(item.organization, weights.organization)
        totalScore += calculateFieldScore(item.descriptions, weights.descriptions)
        totalScore += calculateFieldScore(item.keywords, weights.keywords)
        totalScore += calculateFieldScore(item.productId, weights.productId)

        // Handle list fields
        totalScore += calculateListFieldScore(item.features, weights.features, ';')
        totalScore += calculateListFieldScore(item.requirements, weights.requirements, ',')

        // Price range bonus if search contains price-related terms
        const priceTerms = ['murah', 'mahal', 'harga', 'biaya', 'tarif', 'price']
        const hasPriceTerm = searchTerms.some(term => 
            priceTerms.some(priceTerm => term.includes(priceTerm))
        )
        
        if (hasPriceTerm) {
            const price = parsePrice(item.discountPrice || item.umkmPrice || item.retailPrice)
            if (price >= minPrice && price <= maxPrice) {
                totalScore += 5 // Price range bonus
            }
        }

        // Category/subcategory bonus if already filtered
        if (category && item.category?.toLowerCase() === category.toLowerCase()) {
            totalScore += 10
        }
        if (subCategory && item.subCategory?.toLowerCase() === subCategory.toLowerCase()) {
            totalScore += 8
        }

        return totalScore
    }

    // Fuzzy search - toleran terhadap typos (GLOBAL SEARCH)
    async function performFuzzySearch() {
        const exactResults = await performComprehensiveSearch()
        
        // Generate fuzzy variations of search term
        const fuzzyVariations = generateFuzzyVariations(searchTerm)
        const fuzzyResults = []

        for (const variation of fuzzyVariations) {
            if (variation !== searchTerm && variation.length > 2) {
                try {
                    const params = new URLSearchParams({
                        // sourcePath dihapus untuk global search
                        searchTerm: variation,
                        limit: '200',
                        page: '1'
                    })
                    
                    addFiltersToParams(params)
                    
                    const response = await fetch(`/api/products?${params.toString()}`)
                    const result = await response.json()
                    
                    if (!result.error && result.data) {
                        fuzzyResults.push(...result.data.map(item => ({
                            ...item,
                            searchScore: (calculateSearchScore(item, [variation]) * 0.7), // Lower score for fuzzy
                            isFuzzyMatch: true
                        })))
                    }
                } catch (err) {
                    // Ignore fuzzy search errors
                }
            }
        }

        // Combine exact and fuzzy results, remove duplicates
        const allResults = [...exactResults, ...fuzzyResults]
        const uniqueResults = allResults.filter((item, index, self) => 
            index === self.findIndex(i => i.id === item.id)
        )

        return uniqueResults.sort((a, b) => (b.searchScore || 0) - (a.searchScore || 0))
    }

    // Generate fuzzy variations for typos
    function generateFuzzyVariations(term) {
        const variations = new Set([term])
        
        // Common Indonesian/English typos
        const commonReplacements = {
            'c': ['k', 'ch'],
            'k': ['c', 'ck'],
            'f': ['ph'],
            'z': ['s'],
            'i': ['y'],
            'y': ['i'],
            'u': ['o'],
            'o': ['u']
        }

        // Character removal (for extra characters)
        for (let i = 0; i < term.length; i++) {
            variations.add(term.slice(0, i) + term.slice(i + 1))
        }

        // Character replacement
        for (let i = 0; i < term.length; i++) {
            const char = term[i].toLowerCase()
            if (commonReplacements[char]) {
                commonReplacements[char].forEach(replacement => {
                    variations.add(term.slice(0, i) + replacement + term.slice(i + 1))
                })
            }
        }

        // Transpose adjacent characters
        for (let i = 0; i < term.length - 1; i++) {
            const chars = term.split('')
            ;[chars[i], chars[i + 1]] = [chars[i + 1], chars[i]]
            variations.add(chars.join(''))
        }

        return Array.from(variations).filter(v => v.length > 1)
    }

    // Generate search suggestions based on results
    function generateSuggestions(results) {
        const suggestions = new Set()
        
        results.slice(0, 15).forEach(item => {
            // Add categories and subcategories
            if (item.category) suggestions.add(item.category)
            if (item.subCategory) suggestions.add(item.subCategory)
            if (item.organization) suggestions.add(item.organization)
            
            // Add feature keywords
            if (item.features) {
                item.features.split(';').forEach(feature => {
                    const cleanFeature = feature.trim()
                    if (cleanFeature.length > 3 && cleanFeature.length < 20) {
                        suggestions.add(cleanFeature)
                    }
                })
            }

            // Add keywords if available
            if (item.keywords) {
                item.keywords.split(',').forEach(keyword => {
                    const cleanKeyword = keyword.trim()
                    if (cleanKeyword.length > 3 && cleanKeyword.length < 20) {
                        suggestions.add(cleanKeyword)
                    }
                })
            }
        })

        return Array.from(suggestions).slice(0, 8)
    }

    // Parse price string to number
    function parsePrice(priceString) {
        if (!priceString) return 0
        return parseInt(priceString.replace(/[^0-9]/g, '')) || 0
    }

    // Helper to add common filters to params (tanpa sourcePath untuk search)
    function addFiltersToParams(params, includeSourcePath = false) {
        if (includeSourcePath && sourcePath) params.append('sourcePath', sourcePath)
        if (category) params.append('category', category)
        if (subCategory) params.append('subCategory', subCategory)
        if (organization) params.append('organization', organization)
        if (typeof isPublished === 'boolean') params.append('isPublished', isPublished.toString())
        if (typeof isPriority === 'boolean') params.append('isPriority', isPriority.toString())
        if (minPrice > 0) params.append('minPrice', minPrice.toString())
        if (maxPrice < Infinity) params.append('maxPrice', maxPrice.toString())
    }

    // Fetch with filters only (no search) - TETAP menggunakan sourcePath untuk browse
    async function fetchWithFilters() {
        const params = new URLSearchParams({
            sourcePath, // Tetap ada untuk browse mode
            limit: '1000',
            page: '1'
        })

        addFiltersToParams(params, false) // false = jangan tambah sourcePath lagi

        const response = await fetch(`/api/products?${params.toString()}`)
        const result = await response.json()
        
        if (result.error) throw new Error(result.error)
        return result.data || []
    }

    return {
        data,
        loading,
        error,
        searchStats,
    }
}