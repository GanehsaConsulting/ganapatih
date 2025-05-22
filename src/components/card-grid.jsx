"use client"
import { Button } from "@/components/ui/button"
import { RiWhatsappLine } from "react-icons/ri"
import { formatToRupiah } from "./helper/formatToRupiah"
import Link from "next/link"
import { slugify } from "./helper/slugify"

export const CardGrid = ({
    data = [],
    showButton = false,
    showPriceOriginal = true,
    imgFallback = "https://res.cloudinary.com/dbez0ceip/image/upload/v1747294371/imgProdukLotus_11zon_ezptvu.webp",
}) => {
    return (
        <section className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-5">
            {data.map((item, idx) => (
                <Link
                    href={item.sourcePage + "/" + slugify(item.type)}
                    key={idx}
                    className="hover:scale-102 hover:bg-lightColor/50 cursor-pointer duration-200 rounded-main md:p-3 shadow-custom/2 border border-neutral-300/50 dark:border-darkColor dark:bg-darkColor flex flex-col justify-between"
                >
                    <div className="flex flex-col justify-between h-full md:space-y-4">
                        <div className="space-y-2">
                            <img
                                src={item.image || imgFallback}
                                alt={`img-${item.type}`}
                                className="brightness-95 dark:brightness-80 dark:invert rounded-b-none md:rounded-b-third rounded-third"
                            />
                            <h1 className="md:text-base text-sm font-semibold text-md md:px-0 px-3">{item.type}</h1>
                        </div>

                        <div className="space-y-3 md:p-0 p-3">
                            <div className="flex flex-col">
                                <p className="text-[11.5px] md:text-xs font-medium opacity-60">Mulai Dari</p>
                                <div>
                                    <p className="font-bold text-mainColorLight dark:text-mainColorDark text-lg md:text-xl">
                                        {formatToRupiah(item.price)}
                                    </p>
                                    {showPriceOriginal && item.priceOriginal !== 0 && (
                                        <h3 className="line-through text-xs text-red-700 dark:text-red-300">
                                            {formatToRupiah(item.priceOriginal)}
                                        </h3>
                                    )}
                                </div>
                            </div>
                            {showButton === true && (
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={item.link}
                                    >
                                        <Button
                                            size="icon"
                                            className="bg-green-500 dark:bg-green-500 border-none cursor-pointer"
                                        >
                                            <RiWhatsappLine className="text-green-100" />
                                        </Button>
                                    </Link>
                                    <Link
                                        href={item.sourcePage + "/" + textToPath(item.type)}
                                        className="grow"
                                    >
                                        <Button
                                            className="w-full bg-mainColorLight text-lightColor dark:bg-mainColorDark dark:text-darkColor font-semibold"
                                            onClick={() => onBuy?.(item)}
                                        >
                                            Beli
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            ))}
        </section>
    )
}
