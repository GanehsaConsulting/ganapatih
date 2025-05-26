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
            </>
          )}

          {loading && (
            <CardSkeleton items={12} />
          )}

          {data.length === 0 && !loading && !error && (
            <div className="min-h-[50lvh] flex items-center justify-center">
              <div className="text-center max-w-md mx-auto px-6">
                {/* Icon Container */}
                <div className="mb-8 relative">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-12 h-12 text-blue-500 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>

                </div>

                {/* Main Message */}
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                    Tidak Ada Layanan Ditemukan
                  </h3>
                  {!isSearchMode && (
                    <>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        Maaf, saat ini layanan belum tersedia untuk kategori ini. Silakan coba kategori lain atau periksa kembali nanti.
                      </p>
                    </>
                  )}

                  {isSearchMode && (
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-4">
                      <div className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                            Tips Pencarian
                          </p>
                          <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                            Coba ubah kata kunci atau gunakan saran pencarian yang tersedia.
                          </p>
                        </div>
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
                    </div>
                  )}
                </div>


                {/* Additional Help */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Butuh bantuan?
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                      Hubungi tim dukungan kami
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  )
}