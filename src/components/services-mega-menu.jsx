"use client";
import Image from "next/image";
import Link from "next/link";
import { navbarItems, services } from "@/data/system";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { IoSearchOutline, IoChevronForward, IoChevronBack, IoGridOutline } from "react-icons/io5";
import useHighlightedArticles from "@/hooks/useHighlightedArticles";
import { RiApps2Fill } from "react-icons/ri";
import { Input } from "./ui/input";

export const ServicesMegaMenu = ({ expandedId, onClose, isMobile = false, path }) => {
    const [search, setSearch] = useState("");
    const [showAllServices, setShowAllServices] = useState(false);
    const { highlightedArticles, loading, error, refresh } = useHighlightedArticles();

    const expandAnimationClass = expandedId
        ? "scale-100 translate-y-0 opacity-100 duration-500 ease-in-out origin-top"
        : "scale-[.99] -translate-y-1 opacity-0 duration-500 ease-in-out origin-top";

    const allServices = [
        ...(services.finance || []),
        ...(services.law || []),
        ...(services.management || []),
        ...(services.workspace || []),
        ...(services.creative || []),
    ].sort((a, b) => a.id - b.id);

    const mainTiles = allServices.filter(item => item.mainProduct === true);
    const secondaryTiles = allServices.filter(item => item.mainProduct === false);

    const filtered = search
        ? allServices.filter(item =>
            item.label.toLowerCase().includes(search.toLowerCase()) ||
            item.subs?.some(sub => sub.toLowerCase().includes(search.toLowerCase()))
        )
        : null;

    if (isMobile) {
        return (
            <div className="w-full h-full py-10">
                {/* Mobile Search */}
                <div className="relative mb-6">
                    <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
                    <Input
                        type="text"
                        placeholder="Cari layanan..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-0 bg-secondaryLight dark:bg-secondaryDark focus:outline-none focus:ring focus:ring-mainColorLight dark:focus:ring-mainColorDark"
                    />
                </div>

                <div className={`transition-all duration-300 ease-in-out ${showAllServices ? 'transform translate-x-[-100%] opacity-0 absolute inset-0' : 'transform translate-x-0 opacity-100'}`}>
                    {filtered ? (
                        // Search Results
                        <div className="space-y-3">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                    Hasil Pencarian ({filtered.length})
                                </h3>
                            </div>
                            {filtered.length > 0 ? (
                                <div className="space-y-2">
                                    {filtered.map((el, idx) => (
                                        <Link
                                            key={idx}
                                            href={el.href}
                                            onClick={onClose}
                                            className="group flex items-center gap-3 py-2 rounded-lg transition-colors duration-200 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700"
                                        >
                                            {el.logo && (
                                                <div className="relative w-10 h-10 flex-shrink-0">
                                                    <Image
                                                        src={el.logo}
                                                        alt={el.label}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-mainColorLight dark:group-hover:text-mainColorDark truncate">
                                                    {el.label}
                                                </h4>
                                                {el.subs?.length > 0 && (
                                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                                                        {el.subs.slice(0, 3).join(", ")}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <IoSearchOutline className="mx-auto text-neutral-300 dark:text-neutral-600 mb-4" size={48} />
                                    <p className="text-neutral-500 dark:text-neutral-400">
                                        Tidak ada layanan yang ditemukan
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Default View
                        <div className="space-y-2">
                            {/* Popular Services */}
                            <div>
                                <h3 className="text-xs font-semibold text-muted-foreground mb-4">
                                    Layanan Kami
                                </h3>
                                <div className="space-y-1">
                                    {mainTiles.map((el, idx) => (
                                        <Link
                                            key={idx}
                                            href={el.href}
                                            onClick={onClose}
                                            className="group flex items-center gap-4 transition-all duration-200"
                                        >
                                            <div className="relative w-12 h-12 flex-shrink-0">
                                                <Image
                                                    src={el.logo}
                                                    alt={el.label}
                                                    fill
                                                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="flex items-center justify-between gap-2 border-b pb-3 w-full">
                                                <div>
                                                    <h4 className="font-semibold text-base text-neutral-900 dark:text-neutral-100 group-hover:text-mainColorLight dark:group-hover:text-mainColorDark">
                                                        {el.label}
                                                    </h4>
                                                    {el.subs?.length > 0 && (
                                                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1">
                                                            {el.subs.slice(0, 2).join(", ")}
                                                        </p>
                                                    )}
                                                </div>
                                                <IoChevronForward className="text-neutral-400 dark:text-neutral-700" size={16} />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* All Services Button */}
                            <div>
                                <button
                                    onClick={() => setShowAllServices(true)}
                                    className="group w-full flex items-center gap-4 transition-all duration-200 pb-2"
                                >
                                    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-mainColorLight/10 dark:bg-mainColorDark/10 rounded-lg">
                                        <RiApps2Fill className="text-mainColorLight dark:text-mainColorDark" size={24} />
                                    </div>

                                    <div className="flex items-center justify-between gap-2 border-b pb-3 w-full">
                                        <div>
                                            <h4 className="font-semibold text-base text-neutral-900 dark:text-neutral-100 group-hover:text-mainColorLight dark:group-hover:text-mainColorDark">
                                                Semua Layanan
                                            </h4>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                                Lihat {secondaryTiles.length} layanan lainnya
                                            </p>
                                        </div>
                                        <IoChevronForward className="text-neutral-400 dark:text-neutral-700" size={16} />
                                    </div>

                                </button>
                            </div>


                            {/* Navigation Links */}
                            <nav className="space-y-2">
                                <h3 className="text-xs font-semibold text-muted-foreground mb-4">
                                    Menu
                                </h3>
                                {navbarItems.slice(0, 4).map((el, idx) => (
                                    <Link
                                        key={idx}
                                        href={el.href}
                                        className={`
                                            block py-1 rounded-lg text-sm font-medium
                                            ${path === el.href
                                                ? 'bg-neutral-100 dark:bg-neutral-800 text-blue-600 dark:text-blue-400'
                                                : 'text-neutral-700 dark:text-neutral-300'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center justify-between gap-2 border-b pb-3 w-full">
                                            <div>
                                                <h4 className="font-medium text-base text-neutral-900 dark:text-neutral-100 group-hover:text-mainColorLight dark:group-hover:text-mainColorDark">
                                                    {el.label}
                                                </h4>

                                            </div>
                                            <IoChevronForward className="text-neutral-400 dark:text-neutral-700" size={16} />
                                        </div>
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    )}
                </div>

                {/* All Services View */}
                <div className={`absolute z-100 bg-lightColor dark:bg-darkColor inset-0 transition-all duration-300 ease-in-out ${showAllServices ? 'transform translate-x-0 opacity-100' : 'transform translate-x-full opacity-0 pointer-events-none'}`}>
                    <div className="space-y-2 pb-10 pt-14">
                        {/* Header */}
                        <div className="flex items-center gap-3 ">
                            <button
                                onClick={() => setShowAllServices(false)}
                                className="p-2 rounded-lg transition-colors text-muted-foreground flex items-center gap-1"
                            >
                                <IoChevronBack className="text-neutral-600 dark:text-neutral-400" size={20} />
                                Kembali
                            </button>
                        </div>

                        {/* All Services List */}
                        <div className="grid grid-cols-1">
                            {secondaryTiles.map((el, idx) => (
                                <Link
                                    key={idx}
                                    href={el.href}
                                    onClick={onClose}
                                    className="group flex items-center gap-3 p-3 rounded-lg transition-colors duration-200"
                                >

                                    <span className='pb-3 text-lg'>
                                        {el.icon}
                                    </span>
                                    <div className='flex items-center justify-between gap-2 border-b pb-3 w-full'>
                                        {el.label}
                                        <IoChevronForward className="text-muted-foreground" size={14} />

                                    </div>

                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Desktop version (unchanged)
    return (
        <section className="w-full pb-10">
            <div className={`${expandAnimationClass} mb-7 grid grid-cols-3 gap-3`}>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Layanan Populer
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Lainnya di Ganapatih
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Rekomendasi untuk Anda
                </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Popular Services */}
                <div className="grid gap-4 transition-all duration-500 ease-in-out h-fit">
                    {mainTiles.map((el, idx) => (
                        <Link
                            style={{ transitionDelay: `${idx * 100}ms` }}
                            key={idx}
                            href={el.href}
                            onClick={onClose}
                            className={cn(
                                expandAnimationClass,
                                "group flex flex-row items-center gap-3 hover:scale-102 rounded-xl transition-all duration-300"
                            )}
                        >
                            <div className="relative w-12 h-12 flex-shrink-0">
                                <Image
                                    src={el.logo}
                                    alt={el.label}
                                    fill
                                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-100 group-hover:text-mainColorLight dark:group-hover:text-mainColorDark">
                                    {el.label}
                                </h3>
                                {el.subs?.length > 0 && (
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1">
                                        {el.subs.slice(0, 2).join(", ")}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Secondary Services */}
                <div className="grid gap-4 transition-all duration-500 ease-in-out">
                    {secondaryTiles.map((el, idx) => (
                        <Link
                            style={{ transitionDelay: `${idx * 40}ms` }}
                            key={idx}
                            href={el.href}
                            onClick={onClose}
                            className={cn(
                                expandAnimationClass,
                                "group flex flex-row items-center gap-2 hover:scale-102 rounded-xl transition-all duration-300"
                            )}
                        >
                            <div>
                                <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-mainColorLight dark:group-hover:text-mainColorDark">
                                    {el.label}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Third column */}
                <div className="space-y-4">
                    {highlightedArticles.length > 0 && (
                        <div className="space-y-4">
                            {highlightedArticles.map((el, idx) => (
                                <Link
                                    style={{ transitionDelay: `${idx * 40}ms` }}
                                    key={idx}
                                    href={`/artikel/${el.slug}`}
                                    onClick={onClose}
                                    className={cn(
                                        expandAnimationClass,
                                        "group flex flex-row items-center gap-2 hover:scale-102 rounded-xl transition-all duration-300"
                                    )}
                                >
                                    <div>
                                        <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-mainColorLight dark:group-hover:text-mainColorDark">
                                            {el.title}
                                        </h3>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                    <div className={`${expandAnimationClass} p-4 rounded-main bg-gradient-to-br from-mainColorLight/5 to-mainColorDark/30`}>
                        <h4 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 mb-2">
                            Butuh Bantuan?
                        </h4>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
                            Tim ahli kami siap membantu Anda memilih layanan yang tepat.
                        </p>
                        <Link
                            href="/kontak"
                            onClick={onClose}
                            className="inline-flex items-center text-xs font-medium text-mainColorLight dark:text-mainColorDark hover:underline"
                        >
                            Hubungi Kami →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};