import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const ArticleCard = ({
    articles = [],
    loading = false,
    imgFallback = "https://images.unsplash.com/photo-1619886384164-a845ee979ee9?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
}) => {
    // Loading skeleton component
    const LoadingSkeleton = () => (
        <div className="rounded-main group mb-5 animate-pulse">
            <div className="overflow-hidden rounded-main min-h-[30lvh] bg-gray-300"></div>
            <div className="h-6 bg-gray-300 rounded mt-3"></div>
            <div className="h-4 bg-gray-300 rounded mt-1 w-3/4"></div>
            <div className="flex items-center justify-between gap-2 mt-2">
                <div className="h-6 bg-gray-300 rounded w-20"></div>
                <div className="h-4 bg-gray-300 rounded w-24"></div>
            </div>
        </div>
    );

    // Show loading skeletons
    if (loading && articles.length === 0) {
        return (
            <main className="margin grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <LoadingSkeleton key={index} />
                ))}
            </main>
        );
    }

    // Show empty state if no articles
    if (!loading && articles.length === 0) {
        return (
            <main className="margin">
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Tidak ada artikel ditemukan</h3>
                    <p className="text-gray-600">Coba ubah filter atau kata kunci pencarian Anda.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="margin grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {articles.map((article, index) => (
                <Link
                    key={article.id || article.slug || index}
                    href={`/artikel/${article.slug}`}
                    className="rounded-main group mb-5"
                >
                    <div className="overflow-hidden rounded-main min-h-[30lvh]">
                        <Image
                            width={800}
                            height={450}
                            src={article.coverImage || imgFallback}
                            alt={article.title}
                            className="rounded-main w-full min-h-[50lvh] group-hover:scale-110 transition-transform duration-300 ease-in-out object-cover"
                            onError={(e) => {
                                e.target.src = '/placeholder-image.jpg'; // Fallback image
                            }}
                        />
                    </div>
                    <h2 className="text-lg font-semibold mt-3 group-hover:text-mainColorLight dark:group-hover:text-mainColorDark truncate-last-2">
                        {article.title}
                    </h2>
                    <p className="text-grayneutral-500 truncate-last-1 text-sm mt-1">
                        {article.exerp || article.excerpt || article.description || ''}
                    </p>

                    <div className="flex items-center justify-between gap-2 mt-2">
                        <div className="px-2 py-0.5 bg-secondaryColorLight/10 dark:bg-secondaryColorDark/15 text-xs font-semibold w-fit text-secondaryColorLight dark:text-secondaryColorDark rounded-secondary">
                            {article.categories || article.category || 'Artikel'}
                        </div>
                        <button>
                            <p className="text-mainColorLight dark:text-mainColorDark font-semibold group-hover:underline flex items-center gap-1 text-[13px]">
                                Baca lebih lanjut
                                <ChevronRightIcon size={15} />
                            </p>
                        </button>
                    </div>

                    {/* Optional: Show date if available */}
                    {(article.createdAt || article.publishedAt || article.date) && (
                        <div className="text-xs text-gray-500 mt-2">
                            {new Date(article.createdAt || article.publishedAt || article.date).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}
                        </div>
                    )}
                </Link>
            ))}

            {/* Loading overlay untuk fetch selanjutnya */}
            {loading && articles.length > 0 && (
                <div className="col-span-full flex justify-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                </div>
            )}
        </main>
    );
}