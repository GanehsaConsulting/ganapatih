import { useState, useEffect, useCallback } from 'react'

const useArticles = (initialFilters = {}) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  })

  // Default filters
  const [filters, setFilters] = useState({
    sourcePath: '',
    searchTerm: '',
    sort: 'latest',
    category: '',
    status: '',
    tags: '',
    highlight: undefined,
    dateFrom: '',
    dateTo: '',
    page: 1,
    limit: 10,
    ...initialFilters
  })

  // Function untuk fetch articles
  const fetchArticles = useCallback(async (customFilters = {}) => {
    setLoading(true)
    setError(null)

    try {
      const queryFilters = { ...filters, ...customFilters }
      
      // Build query string, skip empty values
      const queryParams = new URLSearchParams()
      Object.entries(queryFilters).forEach(([key, value]) => {
        if (value !== '' && value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })

      const response = await fetch(`/api/articles?${queryParams.toString()}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      setArticles(data.data || [])
      setPagination({
        total: data.total || 0,
        page: data.page || 1,
        limit: data.limit || 10,
        totalPages: data.totalPages || 0
      })

    } catch (err) {
      console.error('Error fetching articles:', err)
      setError(err.message || 'Failed to fetch articles')
      setArticles([])
    } finally {
      setLoading(false)
    }
  }, [filters])

  // Update filters dan fetch ulang
  const updateFilters = useCallback((newFilters) => {
    const updatedFilters = { ...filters, ...newFilters }
    
    // Reset ke page 1 jika ada perubahan filter selain page
    if (Object.keys(newFilters).some(key => key !== 'page')) {
      updatedFilters.page = 1
    }
    
    setFilters(updatedFilters)
  }, [filters])

  // Reset filters ke default
  const resetFilters = useCallback(() => {
    const defaultFilters = {
      sourcePath: '',
      searchTerm: '',
      sort: 'latest',
      category: '',
      status: '',
      tags: '',
      highlight: undefined,
      dateFrom: '',
      dateTo: '',
      page: 1,
      limit: 10,
      ...initialFilters
    }
    setFilters(defaultFilters)
  }, [initialFilters])

  // Search function
  const searchArticles = useCallback((searchTerm) => {
    updateFilters({ searchTerm, page: 1 })
  }, [updateFilters])

  // Filter by category
  const filterByCategory = useCallback((category) => {
    updateFilters({ category, page: 1 })
  }, [updateFilters])

  // Filter by status
  const filterByStatus = useCallback((status) => {
    updateFilters({ status, page: 1 })
  }, [updateFilters])

  // Filter by tags
  const filterByTags = useCallback((tags) => {
    updateFilters({ tags, page: 1 })
  }, [updateFilters])

  // Toggle highlight filter
  const toggleHighlight = useCallback(() => {
    const newHighlight = filters.highlight === true ? undefined : true
    updateFilters({ highlight: newHighlight, page: 1 })
  }, [filters.highlight, updateFilters])

  // Sort articles
  const sortArticles = useCallback((sort) => {
    updateFilters({ sort, page: 1 })
  }, [updateFilters])

  // Pagination functions
  const goToPage = useCallback((page) => {
    updateFilters({ page })
  }, [updateFilters])

  const nextPage = useCallback(() => {
    if (pagination.page < pagination.totalPages) {
      updateFilters({ page: pagination.page + 1 })
    }
  }, [pagination.page, pagination.totalPages, updateFilters])

  const prevPage = useCallback(() => {
    if (pagination.page > 1) {
      updateFilters({ page: pagination.page - 1 })
    }
  }, [pagination.page, updateFilters])

  const changeLimit = useCallback((limit) => {
    updateFilters({ limit, page: 1 })
  }, [updateFilters])

  // Filter by date range
  const filterByDateRange = useCallback((dateFrom, dateTo) => {
    updateFilters({ dateFrom, dateTo, page: 1 })
  }, [updateFilters])

  // Refresh/reload articles
  const refresh = useCallback(() => {
    fetchArticles()
  }, [fetchArticles])

  // Effect untuk fetch articles ketika filters berubah
  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  // Helper functions untuk UI
  const isFiltered = Object.entries(filters).some(([key, value]) => {
    if (key === 'page' || key === 'limit' || key === 'sort') return false
    return value !== '' && value !== undefined && value !== null
  })

  const hasNextPage = pagination.page < pagination.totalPages
  const hasPrevPage = pagination.page > 1

  return {
    // Data
    articles,
    loading,
    error,
    pagination,
    filters,
    
    // Actions
    updateFilters,
    resetFilters,
    searchArticles,
    filterByCategory,
    filterByStatus,
    filterByTags,
    toggleHighlight,
    sortArticles,
    filterByDateRange,
    refresh,
    
    // Pagination
    goToPage,
    nextPage,
    prevPage,
    changeLimit,
    
    // Helper states
    isFiltered,
    hasNextPage,
    hasPrevPage,
  }
}

export default useArticles