import { ArticleCard } from "@/components/article-card";
import { ArticleHero } from "@/components/article-hero";
import DropdownSort from "@/components/dropdown-sort";
import { PaginationNumber } from "@/components/pagination";

export default function ArtikelPage() {
    return (
        <>
            <ArticleHero />
            <div className="margin flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Artikel</h1>
                <DropdownSort
                buttonClassName="w-fit"
                    items={[
                        { label: 'Terbaru', value: 'desc' },
                        { label: 'Terlama', value: 'asc' },
                        { label: 'Populer', value: 'popular' },
                    ]}
                />
            </div>
            <ArticleCard />
            <PaginationNumber/>
        </>
    );
}