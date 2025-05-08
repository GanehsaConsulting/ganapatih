"use client";
import Link from "next/link";
import { services } from "@/data/system";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Opsional: untuk bantu className conditional

export const ServicesMegaMenu = ({ expandedId, onClose }) => {
    const expandAnimationClass = expandedId ? "scale-100 -translate-y-0 opacity-100 duration-500 ease-in-out origin-top" : "scale-[.99] -translate-y-1 opacity-0 duration-500 ease-in-out origin-top";

    const [search, setSearch] = useState("");

    const allServices = [
        ...(services.finance || []),
        ...(services.law || []),
        ...(services.management || []),
        ...(services.workspace || []),
        ...(services.creative || []),
    ].sort((a, b) => a.id - b.id);

    const mainTiles = allServices.filter(item => item.mainProduct === true);
    const seondaryTiles = allServices.filter(item => item.mainProduct === false);
    const filtered = allServices.filter(item =>
        item.label.toLowerCase().includes(search.toLowerCase()) ||
        item.subs?.some(sub => sub.toLowerCase().includes(search.toLowerCase()))

    );

    return (
        <section className="w-full pb-10">
            <div className={`${expandAnimationClass} mb-7 grid grid-cols-3 gap-3`}>
                <p className="text-xs font-base text-neutral-500 dark:text-neutral-400">
                    Layanan Populer
                </p>
                <p className="text-xs font-base text-neutral-500 dark:text-neutral-400">
                    Lainnya di Ganapatih
                </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div className="grid gap-4 transition-all duration-500 ease-in-out h-fit">
                    {mainTiles.map((el, idx) => (
                        <Link
                            style={{ transitionDelay: `${idx * 100}ms` }}
                            key={idx}
                            href={el.href}
                            className={cn(
                                expandAnimationClass,
                                "group flex flex-row items-center gap-2 hover:p-3 rounded-xl transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            )}
                        >
                            <div className="relative w-12 h-12">
                                <Image
                                    src={el.logo}
                                    alt={el.label}
                                    fill
                                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-[20px] text-neutral-900 dark:text-neutral-100">
                                    {el.label}
                                </h3>
                                {el.subs?.length > 0 && (
                                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2">
                                        {el.subs.slice(0, 2).join(", ")}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="grid gap-2 transition-all duration-500 ease-in-out">
                    {seondaryTiles.map((el, idx) => (
                        <Link
                            style={{ transitionDelay: `${idx * 40}ms` }}
                            key={idx}
                            href={el.href}
                            className={cn(
                                expandAnimationClass,
                                "group flex flex-row items-center gap-2 hover:p-3 rounded-xl transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            )}
                        >
                            <div>
                                <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
                                    {el.label}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
                <div>
                    
                </div>
            </div>

        </section>
    );
};
