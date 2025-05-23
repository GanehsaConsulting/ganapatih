"use client"

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import DropdownSort from '@/components/dropdown-sort'
import { BreadcrumbDynamic } from '@/components/breadcrumb-dynamic'
import { Sidebar } from '@/components/sidebar'
import { SearchBar } from '@/components/search-bar'
import { CardGrid } from '@/components/card-grid'
import { GroupFilter } from '@/components/group-filter'

export default function CategoryPage() {
  const path = usePathname()

  // sourcePath di URL biasanya "/konsultan-pajak"
  // langsung gunakan path sebagai nilai query sourcePath
  const sourcePath = path || ''

  // State untuk data API
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        // encodeURIComponent untuk safety URL
        const res = await fetch(`/api/products?sourcePath=${encodeURIComponent(sourcePath)}`)
        if (!res.ok) throw new Error('Gagal fetch data')
        const json = await res.json()
        setData(json.data || []) // json structure: { total, page, limit, totalPages, data }
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [sourcePath])

  const pathnames = path
    .split('/')
    .filter((x) => x)
    .map((segment) => segment.replace(/-/g, ' '))

    console.log('====================================');
    console.log(data);
    console.log('====================================');

  return (
    <>
      <section className="margin my-5 hidden md:block">
        <BreadcrumbDynamic />
      </section>

      <main className="margin md:grid md:grid-cols-9">
        <section className="col-span-2 h-full md:block hidden">
          <Sidebar />
        </section>

        <section className="md:ml-5 md:col-span-7 space-y-5">
          <div className="text-md mb-2 text-muted-foreground md:text-base text-sm">
            Menampilkan {loading ? 'loading...' : data.length} layanan dari{' '}
            <span className="font-bold text-base md:text-lg text-mainColorLight dark:text-mainColorDark capitalize">
              {pathnames}
            </span>
          </div>

          <div className="grid md:grid-cols-10 gap-2">
            <div className="md:col-span-8">
              <SearchBar />
            </div>
            <div className="md:col-span-2 grid grid-cols-2 gap-2 md:grid-cols-1">
              <DropdownSort />
              <GroupFilter />
            </div>
          </div>

          {error && <p className="text-red-500">Error: {error}</p>}

          {!loading && !error && (
            <CardGrid data={data} />
          )}
        </section>
      </main>
    </>
  )
}
