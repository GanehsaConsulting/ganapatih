"use client"
import { ArticleCard } from "@/components/article-card";
import { ArticleHero } from "@/components/article-hero";
import DropdownSort from "@/components/dropdown-sort";
import { PaginationNumber } from "@/components/pagination-number";
import useArticles from "@/hooks/useArticles"; // Adjust import path sesuai struktur project

export default function ArtikelPage() {
    const {
        // Data
        articles,
        loading,
        error,
        pagination,
        filters,
        
        // Actions
        sortArticles,
        
        // Pagination
        goToPage,
        nextPage,
        prevPage,
        changeLimit,
        
        // Helper states
        hasNextPage,
        hasPrevPage,
    } = useArticles();

    // Handle sort change dari dropdown
    const handleSortChange = (sortValue) => {
        // Map dari dropdown values ke hook values
        const sortMapping = {
            'desc': 'latest',     // Terbaru -> latest
            'asc': 'oldest',      // Terlama -> oldest  
            'popular': 'popular'  // Populer -> popular
        };
        
        sortArticles(sortMapping[sortValue] || sortValue);
    };

    // Error state
    if (error) {
        return (
            <>
                <ArticleHero />
                <div className="margin">
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="text-red-500 mb-4">
                                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Gagal memuat artikel</h3>
                            <p className="text-gray-600 mb-4">{error}</p>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Coba Lagi
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <ArticleHero 
                articles={articles}
                loading={loading}
            />
            <div className="margin flex items-center justify-between mb-4">
            <div>
                <h1 className="text-3xl font-bold">Artikel Kami</h1>
                {/* {!loading && pagination.total > 0 && (
                    <p className="text-gray-600 text-sm mt-1">
                        Menampilkan {articles.length} dari {pagination.total} artikel
                    </p>
                )} */}
            </div>
                <DropdownSort
                    buttonClassName="w-fit"
                    items={[
                        { label: 'Terbaru', value: 'desc' },
                        { label: 'Terlama', value: 'asc' },
                        { label: 'Populer', value: 'popular' },
                    ]}
                    value={
                        filters.sort === 'latest' ? 'desc' : 
                        filters.sort === 'oldest' ? 'asc' : 
                        filters.sort === 'popular' ? 'popular' : 'desc'
                    }
                    onChange={handleSortChange}
                />
            </div>
            {/* Article Cards */}
            <ArticleCard 
                articles={articles}
                loading={loading}
            />

            {/* Pagination - hanya tampil jika ada artikel */}
            {articles.length > 0 && pagination.totalPages > 1 && (
                <div className="margin mt-8">
                    <PaginationNumber
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        onPageChange={goToPage}
                        onNextPage={hasNextPage ? nextPage : undefined}
                        onPrevPage={hasPrevPage ? prevPage : undefined}
                        showInfo={false}
                        totalItems={pagination.total}
                        itemsPerPage={pagination.limit}
                    />
                </div>
            )}
        </>
    );
}