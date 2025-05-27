import { useState, useEffect, useCallback } from 'react'

const useHighlightedArticles = () => {
  const [highlightedArticles, setHighlightedArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Function untuk fetch highlighted articles
  const fetchHighlightedArticles = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Query khusus untuk artikel highlight tanpa pagination
      const queryParams = new URLSearchParams({
        highlight: 'true',
        sort: 'latest',
        limit: '10', // Ambil maksimal 10 artikel highlight
        page: '1'
      })

      const response = await fetch(`/api/articles?${queryParams.toString()}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      // Set data highlight articles
      setHighlightedArticles(data.data || [])

    } catch (err) {
      console.error('Error fetching highlighted articles:', err)
      setError(err.message || 'Failed to fetch highlighted articles')
      setHighlightedArticles([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Refresh function
  const refresh = useCallback(() => {
    fetchHighlightedArticles()
  }, [fetchHighlightedArticles])

  // Effect untuk fetch articles saat hook pertama kali dimount
  useEffect(() => {
    fetchHighlightedArticles()
  }, [fetchHighlightedArticles])

  // Optional: Auto refresh setiap 5 menit untuk mendapatkan artikel highlight terbaru
  useEffect(() => {
    const interval = setInterval(() => {
      fetchHighlightedArticles()
    }, 5 * 60 * 1000) // 5 menit

    return () => clearInterval(interval)
  }, [fetchHighlightedArticles])

  return {
    highlightedArticles,
    loading,
    error,
    refresh,
  }
}

export default useHighlightedArticles