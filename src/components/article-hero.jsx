
import Link from "next/link";
import { slugify } from "./helper/slugify";
import { ChevronRightIcon } from "lucide-react";
import useHighlightedArticles from "@/hooks/useHighlightedArticles"; // Adjust path sesuai struktur
import Image from "next/image";

export const ArticleHero = () => {
    const imgFallback = "https://images.unsplash.com/photo-1619886384164-a845ee979ee9?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    // Gunakan hook khusus untuk highlighted articles
    const { highlightedArticles, loading, error, refresh } = useHighlightedArticles();

    // Ambil artikel utama (pertama) dan artikel sidebar
    const mainArticle = highlightedArticles[0];
    const sidebarArticles = highlightedArticles.slice(1, 5);

    // Loading skeleton untuk main article
    const MainArticleSkeleton = () => (
        <section className="col-span-6">
            <div className="rounded-main overflow-hidden bg-gray-300 animate-pulse aspect-video"></div>
            <div className="h-8 bg-gray-300 rounded mt-4 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded mt-2 w-3/4 animate-pulse"></div>
            <div className="flex items-center justify-between mt-4">
                <div className="h-6 bg-gray-300 rounded w-20 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded w-32 animate-pulse"></div>
            </div>
        </section>
    );

    // Loading skeleton untuk sidebar articles
    const SidebarSkeleton = () => (
        <section className="col-span-4">
            <ul className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                    <li key={index} className="flex items-center gap-3">
                        <div className="w-[30%] h-20 bg-gray-300 rounded-main animate-pulse"></div>
                        <div className="w-[70%] space-y-2">
                            <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                            <div className="h-3 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                            <div className="h-3 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );

    if (error) {
        return (
            <main className="margin min-h-screen py-10 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-semibold mb-2">Gagal memuat artikel unggulan</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={refresh}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                        Coba Lagi
                    </button>
                </div>
            </main>
        );
    }

    // Show loading state
    if (loading && highlightedArticles.length === 0) {
        return (
            <main className="margin grid grid-cols-10 gap-4 min-h-screen py-10">
                <MainArticleSkeleton />
                <SidebarSkeleton />
            </main>
        );
    }


    // Main render dengan data
    return (
        <main className="margin grid grid-cols-1 lg:grid-cols-10 gap-4 min-h-screen py-10">
            {/* Main Featured Article */}
            <section className="lg:col-span-6 group">
                {mainArticle && (
                    <>
                        <div className="rounded-main overflow-hidden">
                            <Image
                                width={800}
                                height={450}
                                src={mainArticle.coverImage || imgFallback}
                                alt={mainArticle.title}
                                className="rounded-main group-hover:scale-110 transition-transform duration-200 ease-in-out object-cover aspect-video w-full"
                                onError={(e) => {
                                    e.target.src = '/placeholder-image.jpg';
                                }}
                            />
                        </div>
                        <h1 className="text-xl lg:text-2xl font-bold mt-4 group-hover:text-mainColorLight dark:group-hover:text-mainColorDark">{mainArticle.title}</h1>
                        <p className="text-gray-600 mt-2">{mainArticle.exerp || mainArticle.excerpt || mainArticle.description}</p>

                        {/* Article meta info */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3">
                            <div className="flex items-center gap-3">
                                <div className="px-2 py-1 bg-secondaryColorLight/10 dark:bg-mainColorDark/15 text-sm font-semibold w-fit text-secondaryColorLight dark:text-mainColorDark rounded-secondary">
                                    {mainArticle.category || 'Unggulan'}
                                </div>
                                {/* Show date if available */}
                                {(mainArticle.createdAt || mainArticle.publishedAt || mainArticle.date) && (
                                    <span className="text-sm text-gray-500">
                                        {new Date(mainArticle.createdAt || mainArticle.publishedAt || mainArticle.date).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </span>
                                )}
                            </div>
                            <Link
                                href={`/artikel/${mainArticle.slug || slugify(mainArticle.title)}`}
                                className="text-mainColorLight dark:text-mainColorDark font-semibold group-hover:underline flex items-center gap-2 w-fit"
                            >
                                Baca lebih lanjut <ChevronRightIcon size={20} />
                            </Link>
                        </div>
                    </>
                )}
            </section>

            {/* Sidebar Articles */}
            <section className="lg:col-span-4">
                {sidebarArticles.length > 0 ? (
                    <div>
                        <h2 className="text-lg font-semibold mb-4 lg:hidden">Artikel Unggulan Lainnya</h2>
                        <ul className="space-y-3">
                            {sidebarArticles.map((article, index) => (
                                <li key={article.id || article.slug || index} className="flex items-center gap-3 group">
                                    <div className="rounded-main overflow-hidden w-[30%]">
                                        <Image
                                            width={800}
                                            height={450}
                                            src={article.coverImage || imgFallback}
                                            alt={article.title}
                                            className="group-hover:scale-110 duration-200 w-full h-full aspect-square rounded-main object-cover min-h-[60px]"
                                            onError={(e) => {
                                                e.target.src = '/placeholder-image.jpg';
                                            }}
                                        />
                                    </div>
                                    <div className="w-[70%]">
                                        <div className="mb-2 px-2 py-0.5 bg-secondaryColorLight/10 dark:bg-mainColorDark/15 text-xs font-semibold w-fit text-secondaryColorLight dark:text-mainColorDark rounded-secondary">
                                            {article.category || 'Unggulan'}
                                        </div>
                                        <h3 className="font-semibold truncate-last-3 text-sm lg:text-base group-hover:text-mainColorLight dark:group-hover:text-mainColorDark">{article.title}</h3>
                                        <Link
                                            href={`/artikel/${article.slug || slugify(article.title)}`}
                                            className="text-mainColorLight dark:text-mainColorDark font-semibold group-hover:underline flex items-center gap-1 text-[11px] lg:text-[13px] mt-1"
                                        >
                                            Baca lebih lanjut
                                            <ChevronRightIcon size={12} />
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    // Fallback jika hanya ada 1 artikel highlight
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-500">
                            <p className="text-sm">Artikel unggulan lainnya akan muncul di sini</p>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}