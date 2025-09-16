"use client"
import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProducts"; // Adjust the import path as needed
import { RiCheckFill, RiInformationFill, RiWhatsappLine } from "react-icons/ri";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { BsFillXCircleFill } from "react-icons/bs";
import { formatToRupiah } from "./helper/formatToRupiah";
import { LuPlus } from "react-icons/lu";
import { Button } from "./ui/button";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { slugify } from "./helper/slugify";
// Helper function to parse semicolon-separated strings into arrays
const parseStringToArray = (str) => {
    if (!str) return [];
    return str
        .split(/[,;]+/)
        .map(item => item.trim())
        .filter(item => item.length > 0);
};

// Skeleton Loading Component for Card
const CardSkeleton = () => (
    <div className="min-w-[85lvw] md:min-w-[25lvw] w-full h-fit grow rounded-main p-5 overflow-hidden shadow-secondaryShadow border border-neutral-300/50 dark:border-darkColor dark:bg-darkColor animate-pulse">
        {/* Header Section */}
        <div className="mb-5 h-fit min-h-[25lvh] flex flex-col gap-1 justify-between space-y-4">
            <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            </div>

            <div className="space-y-3">
                <div className="flex flex-col space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                    <div className="flex items-center gap-2">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>
        </div>

        {/* Features Section */}
        <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-secondary mb-3">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
            </div>
        </div>

        {/* Requirements Section */}
        <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-secondary">
            <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        </div>
    </div>
);

export const CardCarousel = ({
    sourcePath, // Harus dimulai dengan "/" seperti "/konsultan-pajak"
    title = "Paket Layanan",
    viewAllLink,
    category = "",
    subCategory = "",
    isPriority = undefined, // undefined = tidak difilter, true = hanya priority
    perPage = 10
}) => {
    const [expandedFeatures, setExpandedFeatures] = useState([]);
    const [expandedRequirements, setExpandedRequirements] = useState([]);
    const [carouselRef, setCarouselRef] = useState(null);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [seeMore, setSeeMore] = useState([]);

    // Use custom fetch with same pattern as CategoryPage
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Ensure sourcePath starts with "/"
    const normalizedSourcePath = sourcePath?.startsWith('/') ? sourcePath : `/${sourcePath || ''}`;
    const finalViewAllLink = viewAllLink || normalizedSourcePath;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const params = new URLSearchParams();

                // Add sourcePath - key parameter seperti di CategoryPage
                if (normalizedSourcePath && normalizedSourcePath !== '/') {
                    params.append('sourcePath', normalizedSourcePath);
                }

                // Add other filters - sama seperti CategoryPage
                params.append('searchTerm', ''); // Empty search term for normal browsing
                params.append('sort', 'default');

                if (category) params.append('category', category);
                if (subCategory) params.append('subCategory', subCategory);

                // Key: handle isPriority sama seperti CategoryPage (undefined = tidak difilter)
                if (typeof isPriority === 'boolean') {
                    params.append('isPriority', isPriority.toString());
                }

                // Set default filters
                params.append('minPrice', '0');
                params.append('maxPrice', '999999999');
                params.append('page', '1');
                params.append('perPage', perPage.toString());

                console.log('CardCarousel API URL:', `/api/products?${params.toString()}`);

                const response = await fetch(`/api/products?${params.toString()}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('CardCarousel API Response:', data);

                // Handle different API response formats - sama seperti useProducts hook
                let productsData = [];
                if (Array.isArray(data)) {
                    productsData = data;
                } else if (data.data && Array.isArray(data.data)) {
                    productsData = data.data;
                } else if (data.success && data.data) {
                    productsData = Array.isArray(data.data) ? data.data : [data.data];
                }

                setProducts(productsData);
                console.log('CardCarousel Processed Products:', productsData);

            } catch (err) {
                console.error('CardCarousel fetch error:', err);
                setError(err.message);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        if (normalizedSourcePath) {
            fetchProducts();
        } else {
            setLoading(false);
            setError('SourcePath is required');
        }
    }, [normalizedSourcePath, category, subCategory, isPriority, perPage]);

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

    const toggleSeeMore = (idx) => {
        setSeeMore(prev =>
            prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
        );
    };

    // Handle error state
    if (error) {
        return (
            <section className="my-10">
                <div className="margin">
                    <div className="bg-white dark:bg-darkColor rounded-lg shadow-sm p-6 text-center">
                        <p className="text-red-500">Error: {error}</p>
                    </div>
                </div>
            </section>
        );
    }

    // Handle empty state
    if (!loading && (!products || products.length === 0)) {
        return (
            <section className="my-10">
                <div className="margin">
                    <div className="text-2xl md:text-3xl font-medium mb-5">
                        {title}
                    </div>
                    <div className="bg-white dark:bg-darkColor rounded-lg shadow-sm p-6 text-center">
                        <p>Tidak ada produk tersedia saat ini.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="my-10">
            <div className="margin flex items-center justify-between">
                <div className="text-2xl md:text-3xl font-medium flex flex-col gap-1">
                    <p className="text-2xl md:text-3xl font-medium flex flex-col gap-1">
                        {title}
                        <a
                            href={finalViewAllLink}
                            className="text-xs flex items-center gap-1">
                            <HiChevronRight /> Lihat semua
                        </a>
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => carouselRef?.scrollBy({ left: -700, behavior: "smooth" })}
                        className={`hidden md:block z-10 text-xl p-2 rounded-full bg-lightColor dark:bg-darkColor hover:bg-mainColor/70 active:scale-95 transition-opacity duration-300 ${isAtStart ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
                        disabled={isAtStart}
                    >
                        <HiChevronLeft />
                    </button>
                    <button
                        onClick={() => carouselRef?.scrollBy({ left: 700, behavior: "smooth" })}
                        className={`hidden md:block z-10 text-xl p-2 rounded-full bg-lightColor dark:bg-darkColor hover:bg-mainColor/70 active:scale-95 transition-opacity duration-300 ${isAtEnd ? 'opacity-50 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
                        disabled={isAtEnd}
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
                {loading ? (
                    <div className="grid md:grid-cols-3 gap-2 w-full md:mx-24 mx-4">
                        {[...Array(3)].map((_, idx) => (
                            <CardSkeleton key={idx} />
                        ))}
                    </div>
                ) : (
                    products?.map((product, idx) => {
                        const isFeatureExpanded = expandedFeatures.includes(idx);
                        const isRequirementExpanded = expandedRequirements.includes(idx);
                        const isCardExpanded = seeMore.includes(idx);

                        // Parse features and requirements from actual API response format
                        // Features and requirements are semicolon-separated strings
                        const featuresString = product.features || "";
                        const requirementsString = product.requirements || "";

                        const features = parseStringToArray(featuresString);
                        const requirements = parseStringToArray(requirementsString);

                        const hasFeatures = features.length > 0;
                        const hasRequirements = requirements.length > 0;

                        return (
                            <div
                                key={product.productId || idx}
                                className={`${idx === 0 && "ml-5 md:ml-24"} ${idx === products.length - 1 && "mr-5 md:mr-24"}
                                    min-w-[85lvw] md:min-w-[25lvw] w-full h-fit grow rounded-main p-5 overflow-hidden shadow-secondaryShadow border border-neutral-300/50 dark:border-darkColor dark:bg-darkColor
                                `}
                            >
                                <div className="mb-5 h-fit min-h-[25lvh] flex flex-col gap-1 justify-between space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h1
                                            onClick={() => toggleSeeMore(idx)}
                                            className={`hover:text-mainColorDark dark:hover:text-mainColorLight cursor-pointer ${isCardExpanded ? `font-semibold text-lg` : `font-semibold text-lg line-clamp-2`}`}>
                                            {product.productName || product.packagesName || product.name}
                                        </h1>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex flex-col">
                                            <p className="text-sm font-medium opacity-60">
                                                Mulai Dari
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <p className="font-bold text-mainColorLight dark:text-mainColorDark text-xl">
                                                    {formatToRupiah(
                                                        product.discountPrice ||
                                                        product.umkmPrice ||
                                                        product.retailPrice ||
                                                        product.price ||
                                                        0
                                                    )}
                                                </p>
                                                {/* Show original price if there's a discount */}
                                                {product.retailPrice &&
                                                    product.discountPrice &&
                                                    product.retailPrice !== product.discountPrice && (
                                                        <h3 className="text-center line-through text-sm dark:text-red-300 text-red-700">
                                                            {formatToRupiah(product.retailPrice)}
                                                        </h3>
                                                    )}
                                                {/* Show discount percentage */}
                                                {product.discount && product.discount !== "0" && (
                                                    <span className="text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-1 rounded-full">
                                                        -{product.discount}%
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button
                                                size={"icon"}
                                                className={"bg-green-500 dark:bg-green-500 border-none cursor-pointer"}
                                                onClick={() => {
                                                    const whatsappLink = product.ctaLink ||
                                                        product.whatsappLink ||
                                                        product.link ||
                                                        `https://wa.me/6281234567890?text=Halo, saya tertarik dengan ${encodeURIComponent(product.productName || product.name)}`;
                                                    window.open(whatsappLink, '_blank');
                                                }}
                                            >
                                                <RiWhatsappLine className="text-green-100 dark:text-green-100" />
                                            </Button>
                                            <Button
                                                className={"grow bg-mainColorLight text-lightColor dark:bg-mainColorDark dark:text-darkColor font-semibold"}
                                                onClick={() => {
                                                    // Handle buy action - navigate to product detail page
                                                    const productSlug = product.slug ||
                                                        slugify(product.productName || product.name || '');
                                                    const sourcePath = product.sourcePath?.replace("/", "") || sourcePath || "";
                                                    const productUrl = `/${sourcePath}/${productSlug}`;
                                                    window.location.href = productUrl;
                                                }}
                                            >
                                                Beli
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Features Section */}
                                {hasFeatures && (
                                    <div className="px-3 py-2 bg-mainColorDark/15 rounded-secondary mb-3">
                                        <button
                                            className={`${features.length > 2 ? "cursor-pointer" : "cursor-default"} text-sm w-full `}
                                            onClick={() => features.length > 2 && toggleFeature(idx)}
                                        >
                                            <div className="flex items-center justify-between font-semibold mb-2">
                                                Yang kamu dapatkan:
                                                {features.length > 2 && (
                                                    <div className={`${isFeatureExpanded && "rotate-45"} duration-200 text-lg flex items-center `}>
                                                        <LuPlus />

                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                        {/* Show first 2 items by default, all when expanded */}
                                        {(isFeatureExpanded ? features : features.slice(0, 2))?.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3 mb-1">
                                                <span>
                                                    <RiCheckFill className="text-green-500" />
                                                </span>
                                                <h4 className="font-medium dark:text-neutral-100 text-neutral-900">
                                                    {feature}
                                                </h4>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Requirements Section */}
                                {hasRequirements && (
                                    <div className="px-3 py-2 bg-secondaryColorDark/15 rounded-secondary">
                                        <div onClick={() => toggleRequirement(idx)} className="cursor-pointer">
                                            <button className="w-full cursor-pointer">
                                                <div className="flex items-center justify-between font-semibold text-sm">
                                                    Persyaratan
                                                    <div className={`${isRequirementExpanded && "rotate-45"} duration-200 text-lg`}>
                                                        <LuPlus />
                                                    </div>
                                                </div>
                                            </button>

                                            {isRequirementExpanded && (
                                                <div className="mt-2 space-y-2">
                                                    {requirements.map((req, i) => (
                                                        <div key={i} className="flex items-start gap-3">
                                                            <RiInformationFill className="dark:text-amber-500 text-yellow-400 mt-1 flex-shrink-0" />
                                                            <p className="text-sm">{req}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Fallback content if no features or requirements */}
                                {!hasFeatures && !hasRequirements && (
                                    <div className="px-3 py-2 bg-mainColorDark/15 rounded-secondary mb-3">
                                        <div className="text-sm">
                                            <div className="font-semibold mb-2">Deskripsi:</div>
                                            <p className="text-neutral-700 dark:text-neutral-300">
                                                {product.description || product.descriptions || "Informasi lebih lanjut tersedia saat pembelian."}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </section>
    );
};