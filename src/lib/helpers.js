
// Helper untuk parse tanggal
export const parseDate = (dateString) => {
  if (!dateString) return null
  return new Date(dateString)
}

// Helper untuk parse view count
export const parseViewCount = (viewString) => {
  if (!viewString) return 0
  const number = parseInt(viewString)
  return isNaN(number) ? 0 : number
}

// Helper untuk konversi string ke boolean
export const parseBoolean = (value) => {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') {
    const lowerValue = value.toLowerCase().trim()
    return lowerValue === 'true' || lowerValue === '1' || lowerValue === 'yes'
  }
  return false
}

// Helper untuk konversi nilai dari Google Sheets ke boolean
export const parseBooleanFromSheet = (value) => {
  if (!value) return false
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') {
    const upperValue = value.toUpperCase().trim()
    return upperValue === 'TRUE' || upperValue === '1' || upperValue === 'YES' || upperValue === 'BENAR'
  }
  return false
}

// Helper untuk normalize status values
export const normalizeStatus = (status) => {
  if (!status) return ''
  const statusMap = {
    'TRUE': 'published',
    'FALSE': 'draft',
    'PUBLISHED': 'published',
    'DRAFT': 'draft',
    'ARCHIVED': 'archived',
    'ACTIVE': 'published',
    'INACTIVE': 'draft'
  }
  
  const upperStatus = status.toUpperCase().trim()
  return statusMap[upperStatus] || status.toLowerCase()
}


// Helper untuk format data dari Google Sheets
export const formatSheetData = (rawData) => {
  return rawData.map(item => ({
    ...item,
    // Convert boolean fields
    highlight: parseBooleanFromSheet(item.highlight),
    published: parseBooleanFromSheet(item.published),
    featured: parseBooleanFromSheet(item.featured),
    active: parseBooleanFromSheet(item.active),
    
    // Normalize status
    status: normalizeStatus(item.status),
    
    // Parse numbers
    view: parseViewCount(item.view),
    
    // Ensure strings are trimmed
    title: (item.title || '').trim(),
    category: (item.category || '').trim(),
    tags: (item.tags || '').trim(),
    excerpt: (item.excerpt || '').trim(),
  }))
}

