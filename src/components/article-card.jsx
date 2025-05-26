import { dataArticle } from "@/data/system";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export const ArticleCard = ({ article }) => {
    return (
        <main className={`margin grid grid-cols-3 gap-4`}>
            {dataArticle.new.map((article, index) => (
                <Link
                    key={index}
                    href={`/artikel/${article.slug}`}
                    className="rounded-main group mb-5"
                >
                    <div className="overflow-hidden rounded-main min-h-[30lvh]">
                        <img
                            src={article.thumbnailImg}
                            alt={article.title}
                            className="rounded-main w-full min-h-[30lvh] group-hover:scale-110 transition-transform duration-300 ease-in-out object-cover aspect-video"
                        />
                    </div>
                    <h2 className="text-lg font-semibold mt-3 group-hover:text-mainColorLight dark:group-hover:text-mainColorDark truncate-last-2">{article.title}</h2>
                    <p className="text-grayneutral-500 truncate-last-1 text-sm mt-1">{article.exerp}</p>

                    <div className="flex items-center justify-between gap-2 mt-2">
                        <div className="px-2 py-1 bg-secondaryColorLight/10 dark:bg-mainColorDark/15 text-sm font-semibold w-fit text-secondaryColorLight dark:text-mainColorDark rounded-secondary">
                            {article.categories}
                        </div>
                        <Link
                            href={`/artikel/${article.slug}`}
                        >
                            <p className="text-mainColorLight dark:text-mainColorDark font-semibold hover:underline flex items-center gap-1 text-[13px]">
                                Baca lebih lanjut
                                <ChevronRightIcon size={15} />
                            </p>
                        </Link>
                    </div>
                </Link>
            ))}
        </main>
    );
}   