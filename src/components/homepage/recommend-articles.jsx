"use client";

import useArticles from "@/hooks/useArticles";
import { ArticleCard } from "../article-card";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useRef, useState, useEffect } from "react";

export const RecommendedArticlesHome = () => {
  const { articles, loading, error } = useArticles({
    highlight: true,
    sort: "latest",
    page: 1,
  });

  const carouselRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // cek posisi scroll
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const checkScroll = () => {
      setIsAtStart(carousel.scrollLeft === 0);
      setIsAtEnd(
        Math.ceil(carousel.scrollLeft + carousel.clientWidth) >=
        carousel.scrollWidth
      );
    };

    checkScroll();
    carousel.addEventListener("scroll", checkScroll);
    return () => carousel.removeEventListener("scroll", checkScroll);
  }, [articles]);

  if (error) {
    return (
      <section className="margin">
        <p className="text-red-500">
          Gagal memuat artikel rekomendasi: {error}
        </p>
      </section>
    );
  }

  return (
    <section className="my-10">
      <div className="margin flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-2xl md:text-3xl font-medium">
            Rekomendasi Artikel
          </p>
          <a href="/artikel" className="text-xs flex items-center gap-1">
            <HiChevronRight /> Lihat semua
          </a>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              carouselRef.current?.scrollBy({ left: -700, behavior: "smooth" })
            }
            className={`hidden md:block z-10 text-xl p-2 rounded-full bg-lightColor dark:bg-darkColor hover:bg-mainColor/70 active:scale-95 transition-opacity duration-300 ${isAtStart
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100 cursor-pointer"
              }`}
            disabled={isAtStart}
          >
            <HiChevronLeft />
          </button>
          <button
            onClick={() =>
              carouselRef.current?.scrollBy({ left: 700, behavior: "smooth" })
            }
            className={`hidden md:block z-10 text-xl p-2 rounded-full bg-lightColor dark:bg-darkColor hover:bg-mainColor/70 active:scale-95 transition-opacity duration-300 ${isAtEnd
              ? "opacity-50 cursor-not-allowed"
              : "opacity-100 cursor-pointer"
              }`}
            disabled={isAtEnd}
          >
            <HiChevronRight />
          </button>
        </div>
      </div>

      {/* ✅ scrollable container */}
      <div
        ref={carouselRef}
        className="flex gap-4 carousel py-4"
      >
        <ArticleCard
          fixedCardWidth="w-60 sm:w-75"
          cols="flex gap-4 w-full"
          articles={articles}
          loading={loading}
        />
      </div>
    </section>
  );
};
