"use client"
import { useState } from "react";
import { KonsultanPajakPackages } from "@/data/categories/tax";
import { RiCheckFill, RiInformationFill, RiWhatsappLine } from "react-icons/ri";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { BsFillXCircleFill } from "react-icons/bs";
import { formatToRupiah } from "./helper/formatToRupiah";
import { LuPlus } from "react-icons/lu";
import { Button } from "./ui/button";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export const CardCarousel = () => {
    const [expandedFeatures, setExpandedFeatures] = useState([]);
    const [expandedRequirements, setExpandedRequirements] = useState([]);
    const [carouselRef, setCarouselRef] = useState(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [seeMore, setSeeMore] = useState([]);

    const updateCarouselPosition = () => {
        if (carouselRef) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef;
            setIsAtStart(scrollLeft <= 0);
            setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
        }
    };

    const toggleFeature = (idx) => {
        setExpandedFeatures(prev =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );
    };

    const toggleRequirement = (idx) => {
        setExpandedRequirements(prev =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );
    };

    // Add function to toggle seeMore for specific card
    const toggleSeeMore = (idx) => {
        setSeeMore(prev =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );
    };

    return (
        <section className="my-10">
            <div className="margin flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-medium flex flex-col gap-1">
                    Paket Pelaporan Pajak
                    <span className="text-xs flex items-center gap-1">
                        <HiChevronRight />  
                    </span>
                </h1>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => carouselRef?.scrollBy({ left: -700, behavior: "smooth" })}
                        className={`hidden md:block z-10 text-xl p-2 rounded-full bg-lightColor dark:bg-darkColor hover:bg-mainColor/70 active:scale-95 transition-opacity duration-300 ${isAtStart ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
                    >
                        <HiChevronLeft />
                    </button>
                    <button
                        onClick={() => carouselRef?.scrollBy({ left: 700, behavior: "smooth" })}
                        className={`hidden md:block z-10 text-xl p-2 rounded-full bg-lightColor dark:bg-darkColor hover:bg-mainColor/70 active:scale-95 transition-opacity duration-300 ${isAtEnd ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
                    >
                        <HiChevronRight />
                    </button>
                </div>
            </div>
            <div
                ref={ref => setCarouselRef(ref)}
                onScroll={updateCarouselPosition}
                className="carousel w-full gap-3 py-5"
            >
                {KonsultanPajakPackages.map((el, idx) => {
                    const isFeatureExpanded = expandedFeatures.includes(idx);
                    const isRequirementExpanded = expandedRequirements.includes(idx);
                    // Check if this specific card's seeMore is active
                    const isCardExpanded = seeMore.includes(idx);

                    return (
                        <div
                            key={idx}
                            className={`${idx === 0 && "ml-5 md:ml-24"} ${idx === KonsultanPajakPackages.length - 1 && "mr-5 md:mr-24"}
                                min-w-[85lvw] md:min-w-[25lvw] w-full h-fit grow rounded-main p-5 overflow-hidden shadow-secondaryShadow border border-neutral-300/50 dark:border-darkColor dark:bg-darkColor
                            `}
                        >
                            <div className="mb-5 h-fit min-h-[25lvh] flex flex-col gap-1 justify-between space-y-4">
                               <div className="flex items-center justify-between" >
                                 {/* Use isCardExpanded instead of seeMore and call toggleSeeMore with idx */}
                                 <h1 className={isCardExpanded ? `font-semibold text-lg` : `font-semibold text-lg line-clamp-2`}>
                                    {el.type} 
                                </h1>
                                <button 
                                className="text-2xl cursor-pointer"
                                onClick={() => toggleSeeMore(idx)} >
                                    {isCardExpanded ? <IoMdArrowDropdown/> : <IoMdArrowDropup/> }
                                </button>
                               </div>
                                <div className="space-y-3">
                                    <div className="flex flex-col">
                                        <p className="text-sm font-medium opacity-60">
                                            Mulai Dari
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-mainColorLight dark:text-mainColorDark text-xl">
                                                {formatToRupiah(el.price)}
                                            </p>
                                            <h3 className="text-center line-through text-sm dark:text-red-300 text-red-700">
                                                {el.priceOriginal === 0 ? null : formatToRupiah(el.priceOriginal)}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            size={"icon"}
                                            className={"bg-green-500 dark:bg-green-500 border-none cursor-pointer"}
                                        >
                                            <RiWhatsappLine className="text-green-100 dark:text-green-100" />
                                        </Button>
                                        <Button
                                            className={"grow bg-mainColorLight text-lightColor dark:bg-mainColorDark dark:text-darkColor font-semibold"}
                                        >
                                            Beli
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="px-3 py-2 bg-mainColorDark/15 rounded-secondary mb-3">
                                <button
                                    className={`${el.features.length > 2 && "cursor-pointer"} text-sm w-full `}
                                    onClick={() => toggleFeature(idx)}
                                >
                                    <div className="flex items-center justify-between font-semibold mb-2">
                                        Yang kamu dapatkan:
                                        {el.features.length > 2 && (
                                            <div className={`${isFeatureExpanded && "rotate-45"} duration-200 text-lg`}>
                                                <LuPlus />
                                            </div>
                                        )}
                                    </div>
                                </button>
                                {(isFeatureExpanded ? el.features : el.features.slice(0, 2))?.map((feature, i) => (
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

                            <div className="px-3 py-2 bg-secondaryColorDark/15 rounded-secondary">
                                {el.requirements && (
                                    <div onClick={() => toggleRequirement(idx)} className="cursor-pointer">
                                        <button
                                            className="w-full cursor-pointer"
                                        >
                                            {el.requirements && (
                                                <div className="flex items-center justify-between font-semibold text-sm">
                                                    Persyaratan
                                                    <div className={`${isRequirementExpanded && "rotate-45"} duration-200 text-lg`}>
                                                        <LuPlus />
                                                    </div>
                                                </div>
                                            )}
                                        </button>

                                        {isRequirementExpanded && (
                                            <div className="mt-2 space-y-2">
                                                {el.requirements.map((req, i) => (
                                                    <div key={i} className="flex items-start gap-3">
                                                        <RiInformationFill className="dark:text-amber-500 text-yellow-400 mt-1" />
                                                        <p className="text-sm">{req}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section >
    );
};