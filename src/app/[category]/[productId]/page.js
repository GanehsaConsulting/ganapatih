"use client"
import Image from "next/image"
import { BreadcrumbDynamic } from "@/components/breadcrumb-dynamic"
import { usePathname } from "next/navigation"
import { KonsultanPajakPackages, taxConsultingFAQ } from "@/data/categories/tax"
import { unslugify } from "@/components/helper/slugify"
import { formatToRupiah } from "@/components/helper/formatToRupiah"
import { RiCheckFill, RiInformationFill, RiQuestionFill, RiShoppingBagFill, RiWhatsappFill } from "react-icons/ri"
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
import { BsFillXCircleFill } from "react-icons/bs"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function ProductDetail() {
    const pathname = usePathname()
    const data = KonsultanPajakPackages[6] // nanti disesuaikan dengan slug

    return (
        <>
            <section className="margin my-5">
                <BreadcrumbDynamic />
            </section>

            <main className="margin grid grid-cols-9 gap-5">
                {/* Gambar Produk */}
                <section className="col-span-3">
                    <Image
                        width={500}
                        height={500}
                        className="brightness-95 dark:brightness-80 dark:invert rounded-main"
                        src={data.image || "https://res.cloudinary.com/dbez0ceip/image/upload/v1747294371/imgProdukLotus_11zon_ezptvu.webp"}
                        alt={data.type}
                    />
                </section>

                {/* Informasi Produk */}
                <section className="col-span-6 space-y-4 flex flex-col">
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground font-semibold capitalize">
                            {unslugify(data.sourcePage)}
                        </p>
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-mainColorLight dark:text-mainColorDark">
                            {data.type}
                        </h1>
                    </div>

                    {/* Variant */}
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Pilih variant lainnya:</p>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pelaporan SPT Masa Tahunan Pribadi (Non Pegawai Nihil) 1 Tahun" />
                            </SelectTrigger>
                            <SelectContent>
                                {KonsultanPajakPackages.map((el, idx) => {
                                    return (
                                        <SelectGroup>
                                            <SelectItem value={el.type}>
                                                <div
                                                    className={``}>
                                                    <h1 className="text-sm">
                                                        {el.type}
                                                    </h1>
                                                    <p className="font-bold text-mainColorLight dark:text-mainColorDark text-xl">
                                                        {formatToRupiah(el.price)}
                                                    </p>

                                                </div>
                                            </SelectItem>
                                        </SelectGroup>
                                    )
                                })}
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

                    <section className="mt-auto space-y-5 ">
                        {/* Harga */}
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Harga mulai dari:</p>
                            <div className="flex items-center gap-2">
                                <p className="text-2xl font-bold text-mainColorLight dark:text-mainColorDark ">
                                    {formatToRupiah(data.price)}
                                </p>
                                <p className="px-2 py-1 border rounded-secondary text-secondaryColorLight text-xs border-secondaryColorLight bg-yellow-50 dark:bg-yellow-950 dark:border-secondaryColorDark dark:text-secondaryColorDark font-bold">
                                    Diskon {data.discount}%
                                </p>
                            </div>
                            {data.priceOriginal && data.priceOriginal !== 0 && (
                                <p className="line-through text-sm text-red-600 dark:text-red-300">
                                    {formatToRupiah(data.priceOriginal)}
                                </p>
                            )}
                        </div>

                        {/* CTA */}
                        <div className="mt-auto grid grid-cols-2 gap-2 w-fit">
                            <Link
                                href={data.link}
                            >
                                <Button
                                    size={"lg"}
                                    variant={"outline"}
                                    className="w-full text-green-500 dark:text-green-400 border-green-500 dark:border-green-400 cursor-pointer"
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
            <main className="margin grid grid-cols-9 gap-5 my-5">
                <section className="col-span-3 p-5 rounded-main bg-lightColor dark:bg-darkColor">
                    <p className="font-semibold">
                        FAQ
                    </p>

                    {taxConsultingFAQ.slice(0, 5).map((el, idx) => (
                        <Accordion className="border-b" key={idx} collapsible>
                            <AccordionItem value="item-1">
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
                        </Accordion>
                    ))}
                </section>

                <section className="col-span-6 space-y-4 flex flex-col p-5 rounded-main bg-lightColor/0  border dark:bg-darkColor">
                    <Tabs defaultValue="account" className="w-full">
                        <TabsList className={"w-full"}>
                            <TabsTrigger value="account">Yang Kamu Dapatkan</TabsTrigger>
                            <TabsTrigger value="password">Persyaratan</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                            <div className="">
                                {data.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3 mb-1">
                                        <span>
                                            {feature.status
                                                ? <RiCheckFill className="text-green-500" />
                                                : <BsFillXCircleFill className="text-red-500" />}
                                        </span>
                                        <h4 className="font-medium dark:text-neutral-100 text-neutral-900">
                                            {feature.feature}
                                        </h4>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="password">
                            <div className="">
                                {data.requirements.map((req, i) => (
                                    <div key={i} className="flex items-start gap-3 mb-1">
                                        <RiInformationFill className="dark:text-amber-500 text-yellow-400 mt-1" />
                                        <p className="font-medium dark:text-neutral-100 text-neutral-900">{req}</p>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </section>

            </main>
        </>
    )
}
