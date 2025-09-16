"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader } from "lucide-react";
import { RiWhatsappLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { HiChevronRight } from "react-icons/hi2";
import { slugify } from "./helper/slugify";
import { formatToRupiah } from "./helper/formatToRupiah";

const imgFallback =
  "https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Skeleton Loading Component
const ServiceCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden bg-white dark:bg-darkColor rounded-main shadow-custom/2 border border-neutral-300/50 dark:border-darkColor flex flex-col justify-between animate-pulse">
      {/* Image Skeleton */}
      <div className="h-[40vh] sm:h-[50vh] md:h-[60vh] bg-gray-200 dark:bg-gray-700 rounded-b-none md:rounded-b-third rounded-third" />

      {/* Content Skeleton */}
      <div className="space-y-3 m-3 absolute bottom-0 left-0 right-0">
        <div className="p-3 bg-white dark:bg-black rounded-lg space-y-3">
          {/* Organization Badge Skeleton */}
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />

          {/* Title Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          </div>

          {/* Price Section Skeleton */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const RecommendServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/products?isPriority=true");

        if (!response.ok) {
          throw new Error("Gagal mengambil data layanan");
        }

        const data = await response.json();
        setServices(data.data || []);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 py-10 bg-mainColorDark/5 dark:bg-mainColorLight/20 relative overflow-hidden">
        <div className="absolute -right-100 -bottom-100 bg-secondaryColorDark/30 dark:bg-secondaryColorLight/20 w-250 h-250 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute -left-50 -top-50 bg-mainColorDark/20 w-100 h-100 rounded-full blur-[100px] -z-10"></div>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-medium flex flex-col gap-1">
          Best Selling!
          <span className="text-xs flex items-center gap-1">
            <HiChevronRight /> Cek Semua
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {[...Array(3)].map((_, idx) => (
            <ServiceCardSkeleton key={idx} />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="bg-white dark:bg-darkColor rounded-lg shadow-sm p-6 mt-8 text-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div className="px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="bg-white dark:bg-darkColor rounded-lg shadow-sm p-6 mt-8 text-center">
          <p>Tidak ada layanan tersedia saat ini.</p>
        </div>
      </div>
    );
  }

  // Randomize jika lebih dari 3 layanan
  const getRandomServices = (arr, count) => {
    if (arr.length <= count) return arr;
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const popularServices = services;

  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-24 py-10 bg-mainColorDark/5 dark:bg-mainColorLight/20 relative overflow-hidden">
      <div className="absolute -right-100 -bottom-100 bg-secondaryColorDark/30 dark:bg-secondaryColorLight/20 w-250 h-250 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute -left-50 -top-50 bg-mainColorDark/20 w-100 h-100 rounded-full blur-[100px] -z-10"></div>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-medium flex flex-col gap-1">
        Best Selling!
        <span className="text-xs flex items-center gap-1">
          <HiChevronRight /> Cek Semua
        </span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 bggr">
        {popularServices.map((item, idx) => (
          <RecommendedServiceCard key={item.productId || idx} item={item} />
        ))}
      </div>
    </section>
  );
};

export const RecommendedServiceCard = ({
  item,
  showPriceOriginal = true,
  showButton = true,
}) => {
  const productSlug = `/${item.sourcePath?.replace("/", "") || ""}/${slugify(item.productName)}`;

  return (
    <div className="relative overflow-hidden hover:scale-102 bg-white hover:bg-lightColor/50 cursor-pointer duration-200 rounded-main md:p-0 shadow-custom/2 border border-neutral-300/50 dark:border-darkColor dark:bg-darkColor flex flex-col justify-between">
      {/* Area Klik Produk */}
      <Link href={productSlug}>
        <div className="flex flex-col justify-between md:space-y-4">
          <img
            src={item.thumbnailUrl || imgFallback}
            alt={`img-${item.productName || item.packagesName || ""}`}
            className="rounded-b-none md:rounded-b-third rounded-third h-[40vh] sm:h-[50vh] md:h-[60vh] object-cover w-full"
          />
        </div>
      </Link>

      <div className="absolute bottom-0 w-full h-[40%] linear-blur-to-t bg-gradient-to-t from-darkColor/10 via-darkColor/5 to-transparent" />

      {/* Area Info Harga & Tombol */}
      <div className="space-y-3 m-2 sm:m-3 absolute bottom-0 left-0 right-0">
        <div className="p-2 sm:p-3 bg-white dark:bg-black rounded-lg">
          <p className="text-xs font-medium mb-2 px-2 sm:px-3 py-1 bg-mainColorDark/10 border rounded-full w-fit">
            {item.organization}
          </p>

          <h1 className="text-sm sm:text-base font-semibold px-2 sm:px-3 md:px-0 mb-2 line-clamp-2">
            {item.productName || item.packagesName || ""}
          </h1>

          {item.discountPrice === "0,00" || item.umkmPrice === "0,00" ? (
            <>
              <h1 className="text-sm sm:text-base font-semibold px-2 sm:px-3 md:px-0">
                {item.productName || item.packagesName || ""}
              </h1>
              <Link href={item.ctaLink || "/"} className="w-full">
                <Button className="w-full bg-green-500 dark:bg-green-600 font-semibold text-green-100 border-none cursor-pointer text-sm sm:text-base">
                  <RiWhatsappLine className="mr-1" /> Konsultasi
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex flex-col">
              <p className="text-[10px] sm:text-[11.5px] md:text-xs font-medium opacity-60">
                Mulai Dari
              </p>
              <div>
                <p className="font-bold text-mainColorLight dark:text-mainColorDark text-base sm:text-lg md:text-xl flex items-center gap-1">
                  {formatToRupiah(item.discountPrice || item.umkmPrice)}{" "}
                  {item.discount && (
                    <span className="text-xs text-destructive">
                      -{item.discount}%
                    </span>
                  )}
                </p>
                {showPriceOriginal &&
                  item.retailPrice &&
                  item.retailPrice !== item.discountPrice && (
                    <h3 className="line-through text-xs text-muted-foreground">
                      {formatToRupiah(item.retailPrice)}
                    </h3>
                  )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};