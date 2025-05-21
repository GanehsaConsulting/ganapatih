"use client"
import { BreadcrumbDynamic } from '@/components/breadcrumb-dynamic';
import { Sidebar } from '@/components/sidebar';
import { SearchBar } from '@/components/search-bar';
import DropdownSort from '@/components/dropdown-sort';
import { usePathname } from 'next/navigation';
import { CardGrid } from '@/components/card-grid';
import { KonsultanPajakPackages } from '@/data/categories/tax';

export default function CategoryPage() {
    const path = usePathname()
    const pathnames = path
        .split('/')
        .filter((x) => x)
        .map((segment) => segment.replace(/-/g, ' '));

    const handleBuy = (item) => {
        console.log("Beli:", item)
    }

    const handleContact = (item) => {
        window.open(`https://wa.me/628123456789?text=Halo, saya tertarik dengan paket ${item.type}`, "_blank")
    }

    return (
        <>
            <section className='margin my-5'>
                <BreadcrumbDynamic />
            </section>
            <main className='margin grid grid-cols-9'>
                <section className='col-span-2 h-full'>
                    <Sidebar />
                </section>
                <section className='ml-5 col-span-7 space-y-5'>
                    <div className='text-md mb-2 text-muted-foreground'>
                        Menampilkan 20 layanan dari {" "}
                        <span className='font-bold text-lg text-mainColorLight dark:text-mainColorDark capitalize'>
                            {pathnames}
                        </span>

                    </div>
                    <div className='grid grid-cols-10 gap-2'>
                        <div className='col-span-8'>
                            <SearchBar />
                        </div>
                        <div className='col-span-2'>
                            <DropdownSort />
                        </div>
                    </div>
                    <div>
               <CardGrid
        data={KonsultanPajakPackages}
        onBuy={handleBuy}
        onContact={handleContact}
      />

                    </div>
                </section>
            </main>
        </>
    );
}