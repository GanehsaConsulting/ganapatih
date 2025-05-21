"use client"
import { useState } from 'react'
import { usePathname } from 'next/navigation'

import { BreadcrumbDynamic } from '@/components/breadcrumb-dynamic'
import { Sidebar } from '@/components/sidebar'
import { SearchBar } from '@/components/search-bar'
import DropdownSort from '@/components/dropdown-sort'
import { CardGrid } from '@/components/card-grid'
import { KonsultanPajakPackages } from '@/data/categories/tax'
import { ProductDialog } from '@/components/dialog-product'
import { formatToRupiah } from '@/components/helper/formatToRupiah'

export default function CategoryPage() {
    const [selectedProduct, setSelectedProduct] = useState(null)

    const path = usePathname()
    const pathnames = path
        .split('/')
        .filter((x) => x)
        .map((segment) => segment.replace(/-/g, ' '))

    const handleBuy = (item) => {
        setSelectedProduct(item)
    }

    const handleContact = (item) => {
        window.open(
            `https://wa.me/628123456789?text=Halo, saya tertarik dengan paket ${item.type}`,
            '_blank'
        )
    }

    const closeDialog = () => {
        setSelectedProduct(null)
    }

    return (
        <>
            <section className="margin my-5">
                <BreadcrumbDynamic />
            </section>

            <main className="margin grid grid-cols-9">
                <section className="col-span-2 h-full">
                    <Sidebar />
                </section>

                <section className="ml-5 col-span-7 space-y-5">
                    <div className="text-md mb-2 text-muted-foreground">
                        Menampilkan 20 layanan dari{' '}
                        <span className="font-bold text-lg text-mainColorLight dark:text-mainColorDark capitalize">
                            {pathnames}
                        </span>
                    </div>

                    <div className="grid grid-cols-10 gap-2">
                        <div className="col-span-8">
                            <SearchBar />
                        </div>
                        <div className="col-span-2">
                            <DropdownSort />
                        </div>
                    </div>

                    <CardGrid
                        data={KonsultanPajakPackages}
                        onBuy={handleBuy}
                        onContact={handleContact}
                    />
                </section>
            </main>

            {/* Dialog untuk detail produk */}
            <ProductDialog
                open={!!selectedProduct}
                onOpenChange={closeDialog}
                title={selectedProduct?.type}
                description="Detail informasi produk"
                content={
                    selectedProduct && (
                        <div className="space-y-3">
                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.type}
                                className="rounded-xl w-full h-auto object-cover"
                            />
                            <div>
                                <p className="text-sm font-medium opacity-60">Harga mulai dari:</p>
                                <p className="text-xl font-bold text-mainColorLight dark:text-mainColorDark">
                                    {formatToRupiah(selectedProduct.price)}
                                </p>
                                {selectedProduct.priceOriginal !== 0 && (
                                    <p className="line-through text-sm text-red-600 dark:text-red-300">
                                        {formatToRupiah(selectedProduct.priceOriginal)}
                                    </p>
                                )}
                            </div>
                            <p className="text-muted-foreground text-sm">
                                {selectedProduct.description || "Deskripsi produk belum tersedia."}
                            </p>
                        </div>
                    )
                }
                footer={
                    <button
                        className="px-4 py-2 bg-mainColorLight dark:bg-mainColorDark text-white font-semibold rounded"
                        onClick={() => alert('Lanjut ke pembelian')}
                    >
                        Beli Sekarang
                    </button>
                }
            />
        </>
    )
}
