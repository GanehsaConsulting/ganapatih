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

export default function CategoryPage() {
  const path = usePathname()
  const sourcePath = path || ''

  // State untuk filter dan kontrol
  const [searchTerm, setSearchTerm] = useState('')
  const [sort, setSort] = useState('default')
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [isPublished, setIsPublished] = useState(undefined)
  const [isPriority, setIsPriority] = useState(undefined)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(Infinity)
  const [page, setPage] = useState(1)
  const perPage = 20

  // Panggil custom hook
  const {
    data,
    loading,
    error,
    pagination,
  } = useProducts({
    sourcePath,
    searchTerm,
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

  const pathnames = path
    .split('/')
    .filter((x) => x)
    .map((segment) => segment.replace(/-/g, ' '))

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > pagination.totalPages) return
    setPage(newPage)
  }

  function handleSearch(newSearchTerm) {
    setSearchTerm(newSearchTerm)
    setPage(1)
  }

  function handleSortChange(newSort) {
    setSort(newSort)
    setPage(1)
  }

  function handleFilterChange(filters) {
    setCategory(filters.category || '')
    setSubCategory(filters.subCategory || '')
    setIsPublished(typeof filters.isPublished === 'boolean' ? filters.isPublished : undefined)
    setIsPriority(typeof filters.isPriority === 'boolean' ? filters.isPriority : undefined)
    setPage(1)
  }

  return (
    <>
      <section className="margin my-5 hidden md:block">
        <BreadcrumbDynamic />
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
          <div className="text-md mb-2 text-muted-foreground md:text-base text-sm">
            Menampilkan {loading ? 'loading...' : pagination.totalItems} layanan dari{' '}
            <span className="font-bold text-base md:text-lg text-mainColorLight dark:text-mainColorDark capitalize">
              {pathnames.join(' / ')}
            </span>
          </div>

          <div className="grid md:grid-cols-10 gap-2">
            <div className="md:col-span-8">
              <SearchBar
                value={searchTerm}
                onSearch={handleSearch}
                placeholder="Cari layanan..."
              />
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-2 md:grid-cols-1">
              <DropdownSort value={sort} onChange={handleSortChange} />
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
              <CardGrid data={data} />

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
            </>
          )}

          {loading && <p>Loading...</p>}
        </section>
      </main>
    </>
  )
}
