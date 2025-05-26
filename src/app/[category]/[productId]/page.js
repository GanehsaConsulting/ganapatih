"use client"
import Image from "next/image"
import { BreadcrumbDynamic } from "@/components/breadcrumb-dynamic"
import { useParams, usePathname, useRouter } from "next/navigation"
import { KonsultanPajakPackages, taxConsultingFAQ } from "@/data/categories/tax"
import { unslugify } from "@/components/helper/slugify"
import { formatToRupiah } from "@/components/helper/formatToRupiah"
import { RiCheckboxCircleFill, RiInformationFill, RiQuestionFill, RiShoppingBagFill, RiWhatsappFill } from "react-icons/ri"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import ProductQuantityCounter from "@/components/counter-product-quantity"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useEffect, useState } from "react"
import { ProductDetailSkeleton } from "@/components/skeleton/product-detail-skeleton"

export default function ProductDetail() {
    const router = useRouter();
    const slug = usePathname() || {}

    const [data, setData] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState([])
    const [selectedVariant, setSelectedVariant] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`/api/products/${slug}`);
                if (!res.ok) throw new Error("Produk tidak ditemukan");

                const json = await res.json();

                if (json.success && json.data) {
                    setData(json.data); // initial selected
                    setRelatedProducts([json.data, ...(json.relatedProducts || [])]);
                    setSelectedVariant(json.data);
                } else {
                    throw new Error(json.error || "Data produk tidak valid");
                }
            } catch (err) {
                setError(err.message || "Terjadi kesalahan");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);


    if (loading) return <p className="text-center my-10">
        <ProductDetailSkeleton />
    </p>
    if (error) return <p className="text-center my-10 text-red-600">{error}</p>
    if (!data) return null


    return (
        <>
            <section className="margin my-5 hidden md:block">
                <BreadcrumbDynamic />
            </section>

            <main className="margin md:grid md:grid-cols-9 gap-5 flex flex-col">
                {/* Gambar Produk */}
                <section className="md:col-span-3 ">
                    <Image
                        width={500}
                        height={500}
                        className="brightness-95 dark:brightness-80 dark:invert rounded-main"
                        src={selectedVariant.image || "https://res.cloudinary.com/dbez0ceip/image/upload/v1747294371/imgProdukLotus_11zon_ezptvu.webp"}
                        alt={selectedVariant.name || "Gambar Produk"}
                    />
                    {/* Harga Mobile */}
                    <div className="md:hidden block mt-2">
                        <div className="flex items-center gap-2">
                            <p className="text-2xl font-bold text-mainColorLight dark:text-mainColorDark ">
                                {formatToRupiah(selectedVariant.price)}
                            </p>
                            <p className="text-destructive font-bold">
                                - {selectedVariant.discount}%
                            </p>
                        </div>
                        {selectedVariant.priceOriginal && selectedVariant.priceOriginal !== 0 && (
                            <p className="line-through text-sm text-muted-foreground">
                                {formatToRupiah(selectedVariant.priceOriginal)}
                            </p>
                        )}
                    </div>
                </section>

                {/* Informasi Produk */}
                <section className="col-span-6 space-y-4 flex flex-col">
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-semibold capitalize">
                            {selectedVariant.packageName}
                        </p>
                        <h1 className="text-xl sm:text-4xl font-bold tracking-tight text-mainColorLight dark:text-mainColorDark">
                            {selectedVariant.name}
                        </h1>
                    </div>

                    {/* Variant */}
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Pilih variant lainnya:</p>

                        <Select
                            onValueChange={(value) => {
                                const selected = relatedProducts.find((p) => p.name === value);
                                if (selected) {
                                    setSelectedVariant(selected); // update tampilan langsung
                                    router.push(`${selected.sourcePath}/${selected.slug}`, undefined, {
                                        shallow: true, // ganti URL tanpa fetch ulang
                                    });
                                }
                            }}
                        >

                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={selectedVariant?.name} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {relatedProducts.map((el, idx) => (
                                        <SelectItem key={idx} value={el.name}>
                                            <div className="max-w-full w-full flex items-center gap-2 justify-between">
                                                <h1 className="text-sm">{el.name}</h1>
                                                <p className="font-bold text-mainColorLight dark:text-mainColorDark">
                                                    {formatToRupiah(el.price)}
                                                </p>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                    </div>
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Pilih Kuantitas:</p>

                        <ProductQuantityCounter
                            min={1}
                            max={20}
                            onChange={(val) => console.log("Quantity:", val)}
                        />
                    </div>

                    <section className="mt-auto space-y-5">

                        {/* Harga Desktop*/}
                        <div className="space-y-1 md:block hidden">
                            <p className="text-sm text-muted-foreground">Harga mulai dari:</p>
                            <div className="flex items-center gap-2">
                                <p className="text-2xl font-bold text-mainColorLight dark:text-mainColorDark ">
                                    {formatToRupiah(selectedVariant.price)}
                                </p>
                                <p className="px-2 py-1 border rounded-secondary text-secondaryColorLight text-xs border-secondaryColorLight bg-yellow-50 dark:bg-yellow-950 dark:border-secondaryColorDark dark:text-secondaryColorDark font-bold">
                                    Diskon {selectedVariant.discount}%
                                </p>
                            </div>
                            {selectedVariant.priceOriginal && selectedVariant.priceOriginal !== 0 && (
                                <p className="line-through text-sm text-red-600 dark:text-red-300">
                                    {formatToRupiah(selectedVariant.priceOriginal)}
                                </p>
                            )}
                        </div>

                        {/* CTA */}
                        <div className=" mt-auto hidden md:grid grid-cols-2 gap-2 md:w-fit">
                            <Link
                                href={selectedVariant.ctaLink}
                            >
                                <Button
                                    size={"lg"}
                                    variant={"outlineSubmit"}
                                    className="w-full  cursor-pointer"
                                >
                                    <RiWhatsappFill />
                                    Konsultasi
                                </Button>
                            </Link>
                            <Button
                                size={"lg"}
                                variant={"main"}
                                onClick={() => alert("Lanjut ke pembelian")}
                            >
                                <RiShoppingBagFill />
                                Beli Sekarang
                            </Button>
                        </div>
                    </section>
                </section>

            </main>
            <main className="margin my-10">
                <Tabs defaultValue="desc">
                    <TabsList className={"w-full md:w-fit md:bg-transparent space-x-5 sticky top-5 md:shadow-none shadow-secondaryShadow"}>
                        <TabsTrigger className={"md:data-[state=active]:bg-transparent data-[state=active]:shadow-none text-lg md:text-2xl md:px-0 dark:opacity-70 opacity-50 dark:data-[state=active]:opacity-100 data-[state=active]:opacity-100 data-[state=active]:font-semibold md:data-[state=active]:scale-105"} value="desc">
                            Deskripsi
                        </TabsTrigger>

                        <TabsTrigger className={"md:data-[state=active]:bg-transparent data-[state=active]:shadow-none text-lg md:text-2xl md:px-0 dark:opacity-70 opacity-50 dark:data-[state=active]:opacity-100 data-[state=active]:opacity-100 data-[state=active]:font-semibold md:data-[state=active]:scale-105"} value="faq">
                            FAQ
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="desc">
                        <section className="grid">

                            {/* Deskripsi (optional) */}
                            {selectedVariant.description && (
                                <div>
                                    <p className="font-semibold mb-2 mt-5">Tentang {selectedVariant?.name}</p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {selectedVariant.description}
                                    </p>
                                </div>
                            )}

                            {/* Fitur */}
                            {Array.isArray(selectedVariant.features) && selectedVariant.features.length > 0 && (
                                <div>
                                    <p className="font-semibold mb-2 mt-5">
                                        Yang Kamu Dapatkan
                                    </p>
                                    <div>
                                        {selectedVariant.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3 mb-1">
                                                <span>
                                                    <RiCheckboxCircleFill className="text-green-500" />
                                                </span>
                                                <h4 className="font-medium dark:text-neutral-100 text-neutral-900">
                                                    {feature.feature || feature}
                                                </h4>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Syarat */}
                            {Array.isArray(selectedVariant.requirements) && selectedVariant.requirements.length > 0 && (
                                <div>
                                    <p className="font-semibold mb-2 mt-5">
                                        Persyaratan
                                    </p>
                                    <div>
                                        {selectedVariant.requirements.map((req, i) => (
                                            <div key={i} className="flex items-start gap-3 mb-1">
                                                <RiInformationFill className="dark:text-amber-500 text-yellow-400 mt-1" />
                                                <p className="font-medium dark:text-neutral-100 text-neutral-900">
                                                    {req}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </section>
                    </TabsContent>

                    <TabsContent value="faq">

                        <Accordion type="single" collapsible className="w-full">
                            {taxConsultingFAQ.slice(0, 5).map((el, idx) => (
                                <AccordionItem key={idx} value={`item-${idx}`}>
                                    <AccordionTrigger>
                                        <div className="flex items-start gap-3 text-left">
                                            <RiQuestionFill className="mt-1 min-w-[20px] text-muted-foreground" />
                                            <span className="text-sm font-medium leading-snug">
                                                {el.question}
                                            </span>
                                        </div>
                                    </AccordionTrigger>

                                    <AccordionContent className={"px-8 text-justify"}>
                                        {el.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </TabsContent>
                </Tabs>
            </main>

            {/* CTA  Mobile*/}
            <div className="fixed bottom-0 w-full px-3 py-5 bg-lightColor/50 dark:bg-darkColor/50 backdrop-blur-lg z-100 border-t md:hidden grid grid-cols-2 gap-2 md:w-fit">
                <Link
                    href={selectedVariant.ctaLink}
                >
                    <Button
                        size={"lg"}
                        variant={"outlineSubmit"}
                        className="w-full bg-white dark:bg-black cursor-pointer"
                    >
                        <RiWhatsappFill />
                        Konsultasi
                    </Button>
                </Link>
                <Button
                    size={"lg"}
                    variant={"main"}
                    onClick={() => alert("Lanjut ke pembelian")}
                >
                    <RiShoppingBagFill />
                    Beli Sekarang
                </Button>
            </div>
        </>
    )
}
