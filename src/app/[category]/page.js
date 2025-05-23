"use client"
import DropdownSort from '@/components/dropdown-sort'
import { usePathname } from 'next/navigation'
import { BreadcrumbDynamic } from '@/components/breadcrumb-dynamic'
import { Sidebar } from '@/components/sidebar'
import { SearchBar } from '@/components/search-bar'
import { CardGrid } from '@/components/card-grid'
import { KonsultanPajakPackages } from '@/data/categories/tax'
import { GroupFilter } from '@/components/group-filter'

export default function CategoryPage() {
    const path = usePathname()
    const pathnames = path
        .split('/')
        .filter((x) => x)
        .map((segment) => segment.replace(/-/g, ' '))

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
                        Menampilkan 20 layanan dari{' '}
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

                    <CardGrid
                        data={KonsultanPajakPackages}
                    />
                </section>
            </main>
        </>
    )
}
