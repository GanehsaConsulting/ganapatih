"use client"

import { usePathname } from 'next/navigation'
import { useState } from 'react'

import DropdownSort from '@/components/dropdown-sort'
import { BreadcrumbDynamic } from '@/components/breadcrumb-dynamic'
import { Sidebar } from '@/components/sidebar'
import { SearchBar } from '@/components/search-bar'
import { CardGrid } from '@/components/card-grid'
import { GroupFilter } from '@/components/group-filter'

import { useProducts } from '@/hooks/useProducts'
import { useSearchProducts } from '@/hooks/useSearchProduct'
import { Search } from 'lucide-react'
import { CardSkeleton } from '@/components/skeleton/card-skeleton'

export default function CategoryPage() {
  const path = usePathname()
  const sourcePath = path || ''

  // State untuk filter dan kontrol
  const [searchTerm, setSearchTerm] = useState('')
  const [sort, setSort] = useState('default')
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [organization, setOrganization] = useState('')
  const [isPublished, setIsPublished] = useState(undefined)
  const [isPriority, setIsPriority] = useState(undefined)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(Infinity)
  const [page, setPage] = useState(1)
  const perPage = 20

  // Conditional hook usage berdasarkan apakah ada search term atau tidak
  const isSearchMode = searchTerm.trim() !== ''

  // Hook untuk mode normal (browsing dengan pagination)
  const productsQuery = useProducts({
    sourcePath,
    searchTerm: isSearchMode ? '' : '', // Kosongkan search di mode normal
    sort,
    category,
    subCategory,
    isPublished,
    isPriority,
    minPrice,
    maxPrice,
    page,
    perPage,
  })

  // Hook untuk mode search (enhanced dengan multi-field)
  const searchQuery = useSearchProducts({
    sourcePath,
    searchTerm: isSearchMode ? searchTerm : '',
    category,
    subCategory,
    organization,
    isPublished,
    isPriority,
    minPrice,
    maxPrice,
    searchMode: 'comprehensive', // Default ke comprehensive
  })

  // Pilih data berdasarkan mode
  const {
    data = [],
    loading = false,
    error = null,
    pagination = {
      currentPage: 1,
      totalPages: 1,
      perPage: perPage,
      totalItems: 0,
    },
    searchStats = {
      totalResults: 0,
      searchTime: 0,
      suggestions: []
    }
  } = isSearchMode ? {
    ...searchQuery,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      perPage: searchQuery.data?.length || 0,
      totalItems: searchQuery.data?.length || 0,
    }
  } : productsQuery

  const pathnames = path
    .split('/')
    .filter((x) => x)
    .map((segment) => segment.replace(/-/g, ' '))

  function handlePageChange(newPage) {
    if (isSearchMode) return // No pagination in search mode
    if (newPage < 1 || newPage > pagination.totalPages) return
    setPage(newPage)
  }

  function handleSearch(newSearchTerm) {
    setSearchTerm(newSearchTerm)
    setPage(1) // Reset page when searching
  }

  function handleSortChange(newSort) {
    setSort(newSort)
    setPage(1)
  }

  function handleFilterChange(filters) {
    setCategory(filters.category || '')
    setSubCategory(filters.subCategory || '')
    setOrganization(filters.organization || '')
    setIsPublished(typeof filters.isPublished === 'boolean' ? filters.isPublished : undefined)
    setIsPriority(typeof filters.isPriority === 'boolean' ? filters.isPriority : undefined)
    setPage(1)
  }

  return (
    <>
      <section className="margin my-5 hidden md:block">
        <div className="space-y-3">
          <BreadcrumbDynamic />
          <SearchBar
            value={searchTerm}
            onSearch={handleSearch}
            placeholder="Cari layanan..."
            searchTerm={searchTerm}
            showClearButton={true}
            searchStats={searchStats}
          />
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="md:col-span-8">
            <div className="text-md text-muted-foreground md:text-base text-sm">
              {isSearchMode ? (
                <>
                  <span className="inline-flex items-center gap-1">
                    <Search className="h-3 w-3" />
                    Pencarian global:
                  </span>{' '}
                  {loading ? 'loading...' : searchStats.totalResults} hasil untuk{' '}
                  <span className="font-bold text-base md:text-lg text-mainColorLight dark:text-mainColorDark">
                    "{searchTerm}"
                  </span>

                  <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded ml-2">
                    Semua kategori
                  </span>
                </>
              ) : (
                <>
                  Menampilkan {loading ? 'loading...' : pagination.totalItems} layanan dari{' '}
                  <span className="font-bold text-base md:text-lg text-mainColorLight dark:text-mainColorDark !capitalize">
                    {pathnames}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 gap-2 md:grid-cols-1">
            <DropdownSort
              value={sort}
              onChange={handleSortChange}
            />
            <GroupFilter
              category={category}
              subCategory={subCategory}
              isPublished={isPublished}
              isPriority={isPriority}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </section>

      <main className="margin md:grid md:grid-cols-9">
        <section className="col-span-2 h-full md:block hidden">
          <Sidebar
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={({ minPrice, maxPrice }) => {
              setMinPrice(minPrice)
              setMaxPrice(maxPrice)
              setPage(1)
            }}
          />
        </section>

        <section className="md:ml-5 md:col-span-7 space-y-5">
          {/* Mobile Search Bar */}
          <div className="block md:hidden">
            <SearchBar
              value={searchTerm}
              onSearch={handleSearch}
              placeholder="Cari layanan..."
              searchTerm={searchTerm}
              showClearButton={true}
              searchStats={searchStats}
            />
            <div className="md:col-span-2 grid grid-cols-2 gap-2 md:grid-cols-1 md:hidden mt-2">
              <DropdownSort
                value={sort}
                onChange={handleSortChange}
              />
              <GroupFilter
                category={category}
                subCategory={subCategory}
                isPublished={isPublished}
                isPriority={isPriority}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          {error && <p className="text-red-500">Error: {error}</p>}

          {!loading && !error && (
            <>
              {/* Search Suggestions */}
              {isSearchMode && searchStats.suggestions?.length > 0 && (
                <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Saran pencarian terkait:</p>
                  <div className="flex flex-wrap gap-2">
                    {searchStats.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(suggestion)}
                        className="px-3 py-1 text-xs bg-white dark:bg-gray-800 border rounded-full hover:bg-mainColorLight/10 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <CardGrid data={data} />

              {/* Pagination - hanya tampil jika bukan search mode */}
              {!isSearchMode && pagination.totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-5">
                  <button
                    disabled={page <= 1}
                    onClick={() => handlePageChange(page - 1)}
                    className="btn btn-sm"
                  >
                    Prev
                  </button>
                  <span>
                    Halaman {pagination.currentPage} dari {pagination.totalPages}
                  </span>
                  <button
                    disabled={page >= pagination.totalPages}
                    onClick={() => handlePageChange(page + 1)}
                    className="btn btn-sm"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Show search results count */}
              {isSearchMode && data.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Tidak ada hasil yang ditemukan untuk "{searchTerm}"
                  </p>
                  {searchStats.suggestions?.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Coba cari:</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {searchStats.suggestions.slice(0, 3).map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSearch(suggestion)}
                            className="px-3 py-1 text-sm bg-mainColorLight/10 text-mainColorLight rounded-full hover:bg-mainColorLight/20 transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {loading && (
            <CardSkeleton items={12}/>
          )}
        </section>
      </main>
    </>
  )
}