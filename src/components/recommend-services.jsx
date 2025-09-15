"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Loader } from "lucide-react";
import { RiWhatsappLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { HiChevronRight } from "react-icons/hi2";

const imgFallback =
  "https://res.cloudinary.com/dbez0ceip/image/upload/v1747294371/imgProdukLotus_11zon_ezptvu.webp";

// Format ke Rupiah
const formatToRupiah = (value) => {
  if (!value) return "Rp0";
  let number = value;
  if (typeof value === "string") {
    number = parseFloat(value.replace(/\./g, "").replace(",", "."));
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number || 0);
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
      <div className="bg-white dark:bg-darkColor rounded-lg shadow-sm p-6 mt-8 flex justify-center items-center h-40">
        <Loader className="animate-spin mr-2" size={20} />
        <span>Memuat rekomendasi...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-darkColor rounded-lg shadow-sm p-6 mt-8 text-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div className="bg-white dark:bg-darkColor rounded-lg shadow-sm p-6 mt-8 text-center">
        <p>Tidak ada layanan tersedia saat ini.</p>
      </div>
    );
  }

  // Randomize jika lebih dari 3 layanan
  const getRandomServices = (arr, count) => {
    if (arr.length <= count) return arr;
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const popularServices = getRandomServices(services, 3);

  return (
    <section className="mx-24" >
      <div>
        <h1 className="text-2xl md:text-3xl font-medium flex flex-col gap-1">
          Paket Pelaporan Pajak
          <span className="text-xs flex items-center gap-1">
            <HiChevronRight />
          </span>
        </h1>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 bg-gradient-to-br from-mainColorDark to-secondaryColorLight
       px-5 py-10 rounded-main">
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
  const productSlug = `/layanan/${item.sourcePath?.replace("/", "") || ""}/${
    item.productId
  }`;
  return (
    <div className="hover:scale-102 bg-white  hover:bg-lightColor/50 cursor-pointer duration-200 rounded-main md:p-3 shadow-custom/2 border border-neutral-300/50 dark:border-darkColor dark:bg-darkColor flex flex-col justify-between">
      {/* Area Klik Produk */}
      <Link href={productSlug}>
        <div className="flex flex-col justify-between h-full md:space-y-4">
          <div className="space-y-2">
            <img
              src={item.thumbnailUrl || imgFallback}
              alt={`img-${item.productName || item.packagesName || ""}`}
              className="brightness-95 dark:brightness-80 dark:invert rounded-b-none md:rounded-b-third rounded-third"
            />
            <h1 className="md:text-base text-sm font-semibold md:px-0 px-3">
              {item.productName || item.packagesName || ""}
            </h1>
          </div>
        </div>
      </Link>

      {/* Area Info Harga & Tombol */}
      <div className="space-y-3 md:p-0 p-3">
        {item.discountPrice === "0,00" || item.umkmPrice === "0,00" ? (
          <Link href={item.ctaLink || "/"} className="w-full">
            <Button className="w-full bg-green-500 dark:bg-green-600 font-semibold text-green-100 border-none cursor-pointer">
              <RiWhatsappLine /> Konsultasi
            </Button>
          </Link>
        ) : (
          <div className="flex flex-col">
            <p className="text-[11.5px] md:text-xs font-medium opacity-60">
              Mulai Dari
            </p>
            <div>
              <p className="font-bold text-mainColorLight dark:text-mainColorDark text-lg md:text-xl flex items-center gap-1">
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

        {showButton && (
          <div className="flex items-center gap-2">
            <Link href={item.ctaLink || "#"}>
              <Button
                size="icon"
                className="bg-green-500 dark:bg-green-500 border-none cursor-pointer"
              >
                <RiWhatsappLine className="text-green-100" />
              </Button>
            </Link>
            <Link href={productSlug} className="grow">
              <Button className="w-full bg-mainColorLight text-lightColor dark:bg-mainColorDark dark:text-darkColor font-semibold">
                Beli
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
