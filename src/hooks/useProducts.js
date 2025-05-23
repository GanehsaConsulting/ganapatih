import { useState, useEffect } from 'react'

export function useProducts({
    sourcePath,
    searchTerm = '',
    sort = 'default',
    minPrice = 0,
    maxPrice = Infinity,
    category,
    subCategory,
    isPublished,
    isPriority,
    page = 1,
    perPage = 20,
}) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        perPage,
        totalItems: 0,
    })

    useEffect(() => {
        if (!sourcePath) return
        setLoading(true)
        setError(null)

        const params = new URLSearchParams({
            sourcePath,
            searchTerm,
            sort,
            minPrice: minPrice.toString(),
            maxPrice: maxPrice === Infinity ? '9999999999' : maxPrice.toString(),
            page: page.toString(),
            limit: perPage.toString(),
        })

        if (category) params.append('category', category)
        if (subCategory) params.append('subCategory', subCategory)
        if (typeof isPublished === 'boolean') params.append('isPublished', isPublished.toString())
        if (typeof isPriority === 'boolean') params.append('isPriority', isPriority.toString())
        console.log('🔍 Fetching with params:', params.toString())

        fetch(`/api/products?${params.toString()}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.error) throw new Error(res.error)
                setData(res.data || [])
                setPagination({
                    currentPage: res.page,
                    totalPages: res.totalPages,
                    perPage: res.limit,
                    totalItems: res.total,
                })
            })
            .catch((err) => {
                setError(err.message || 'Failed to fetch')
            })
            .finally(() => setLoading(false))

            
        }, [sourcePath, searchTerm, sort, minPrice, maxPrice, category, subCategory, isPublished, isPriority, page, perPage])
        
        console.log('Data:', data.toString())
    return {
        data,
        loading,
        error,
        pagination,
    }
}
