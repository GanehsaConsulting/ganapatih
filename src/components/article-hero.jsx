import { dataArticle } from "@/data/system";
import { Button } from "./ui/button";
import Link from "next/link";
import { slugify } from "./helper/slugify";
import { ChevronRightIcon } from "lucide-react";

export const ArticleHero = () => {
    const d = dataArticle.new[5]
    return (
        <main className="margin grid grid-cols-10 gap-4 min-h-screen py-10">
            <section className="col-span-6">
                <div className="rounded-main overflow-hidden group">
                    <img
                        src={d.thumbnailImg}
                        alt={d.title}
                        className="rounded-main group-hover:scale-110 transition-transform duration-300 ease-in-out bject-cover aspect-video"
                    />
                </div>
                <h1 className="text-2xl font-bold mt-4">{d.title}</h1>
                <p className="text-gray-600 mt-2">{d.exerp}</p>
                <div className="flex items-center justify-between mt-4">
                    <div className="px-2 py-1 bg-secondaryColorLight/10 dark:bg-mainColorDark/15 text-sm font-semibold w-fit text-secondaryColorLight dark:text-mainColorDark rounded-secondary">
                        {d.categories}
                    </div>
                    <Link
                        href={`/artikel/${slugify(d.title)}`}
                        className="text-mainColorLight dark:text-mainColorDark font-semibold hover:underline flex items-center gap-2"
                    >
                        Baca lebih lanjut <ChevronRightIcon size={20} />
                    </Link>
                </div>
            </section>
            <section className="col-span-4">
                <ul className="space-y-3">
                    {dataArticle.new.slice(1, 5).map((article, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <img
                                src={article.thumbnailImg}
                                alt={article.title}
                                className="w-[30%] h-full aspect-square rounded-main object-cover"
                            />
                            <div className="w-[70%]">
                                <h3 className="font-semibold truncate-last-2">{article.title}</h3>
                                <p className="text-neutral-500 text-sm truncate-last-2">{article.exerp}</p>
                                <Link
                                    href={`/artikel/${slugify(article.title)}`}
                                    className="text-mainColorLight dark:text-mainColorDark font-semibold hover:underline flex items-center gap-1 text-[13px]"
                                >
                                    Baca lebih lanjut
                                    <ChevronRightIcon size={15} />
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>

        </main>
    );
}   