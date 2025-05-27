import { useState, useEffect, useCallback } from 'react'

// Temporary hook definition - pindahkan ke file terpisah
export const useArticleDetail = (slug) => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  const fetchArticle = useCallback(async (articleSlug) => {
    setLoading(true);
    setError(null);

    try {
      const targetSlug = articleSlug || slug || window.location.pathname.split('/').pop();
      const response = await fetch(`/api/articles/${targetSlug}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const response_data = await response.json();
      
      // Handle response structure: { success: true, data: {...} }
      if (response_data.success && response_data.data) {
        const article = response_data.data;
        
        // Transform tags dari string semicolon-separated ke array
        if (article.tags && typeof article.tags === 'string') {
          article.tagsArray = article.tags.split(';').filter(tag => tag.trim());
        }
        
        setArticle(article);

        if (article.category || article.tagsArray) {
          await fetchRelatedArticles(article);
        }
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching article:', err);
      setError(err.message || 'Failed to fetch article');
      setArticle(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  const fetchRelatedArticles = useCallback(async (currentArticle) => {
    try {
      const queryParams = new URLSearchParams();
      
      if (currentArticle.category) {
        queryParams.append('category', currentArticle.category);
      }
      if (currentArticle.tagsArray && currentArticle.tagsArray.length > 0) {
        queryParams.append('tags', currentArticle.tagsArray.join(','));
      }
      
      queryParams.append('limit', '4');
      queryParams.append('exclude', currentArticle.id || currentArticle.slug);

      const response = await fetch(`/api/articles?${queryParams.toString()}`);
      
      if (response.ok) {
        const response_data = await response.json();
        
        // Handle different response structures
        if (response_data.success && response_data.data) {
          const articles = Array.isArray(response_data.data) ? response_data.data : [];
          setRelatedArticles(articles);
        } else if (response_data.data && Array.isArray(response_data.data)) {
          setRelatedArticles(response_data.data);
        } else if (Array.isArray(response_data)) {
          setRelatedArticles(response_data);
        }
      }
    } catch (err) {
      console.error('Error fetching related articles:', err);
      setRelatedArticles([]);
    }
  }, []);

  const shareArticle = useCallback(async () => {
    if (!article) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt || article.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  }, [article]);

  const getReadingTime = useCallback((content) => {
    if (!content) return 0;
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  }, []);

  const formatDate = useCallback((dateString) => {
    if (!dateString) return '';
    
    // Jika sudah dalam format Indonesia dari server, return as-is
    if (typeof dateString === 'string' && dateString.includes(' ')) {
      return dateString;
    }
    
    // Fallback untuk format standard date
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, []);

  const refresh = useCallback(() => {
    fetchArticle();
  }, [fetchArticle]);

  useEffect(() => {
    if (slug || window.location.pathname) {
      fetchArticle();
    }
  }, [fetchArticle]);

  const readingTime = article ? getReadingTime(article.content || article.body) : 0;
  const formattedDate = article ? article.createdAt || article.updatedAt : '';

  return {
    article,
    relatedArticles,
    loading,
    error,
    refresh,
    shareArticle,
    readingTime,
    formattedDate,
  };
};