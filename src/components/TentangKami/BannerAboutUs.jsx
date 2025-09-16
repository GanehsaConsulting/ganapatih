import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { Mona_Sans } from "next/font/google";
import clsx from "clsx";
import { MdArrowOutward } from "react-icons/md";
import { FaQuoteRight } from "react-icons/fa6";

const monaSans = Mona_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const BannerAboutUs = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-10 flex flex-col">
      <div
        className="relative rounded-2xl sm:rounded-3xl lg:rounded-4xl overflow-hidden"
        style={{ height: "calc(100svh - 15svh)" }}
      >
        <img
          src="https://images.pexels.com/photos/7641842/pexels-photo-7641842.jpeg"
          alt="banner image"
          className="w-full h-full object-cover"
        />

        {/* Card center di tengah gambar */}
        <div className=" absolute inset-0 flex items-center p-4 sm:p-6">
          <div className="bg-white/65 border border-white-70 backdrop-blur-md p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl w-full max-w-sm sm:max-w-md lg:max-w-xl flex flex-col gap-3 sm:gap-4 lg:gap-5 shadow-lg">
            <Badge
              variant="outline"
              className="border border-mainColorLight text-mainColorLight dark:border-mainColorDark dark:text-mainColorDark bg-mainColorLight/10 dark:bg-mainColorDark/10 text-xs sm:text-sm lg:text-base rounded-full px-3 sm:px-4 py-1 w-fit"
            >
              About Ganapatih
            </Badge>
            <h1
              className={clsx(
                "text-xl sm:text-2xl lg:text-4xl font-semibold leading-tight text-black/90",
                monaSans.className
              )}
            >
              Solusi perpajakan dan bisnis Anda. Profesional, terpercaya, dan
              berpengalaman.
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-black/90 leading-relaxed">
              Pusat Pelayanan Pajak yang menghadirkan kemudahan disetiap
              Layanannya. Temukan beragam solusi pajak untuk Bisnis dan Pribadi
              Anda hanya di Ganapatih! Kami siap menjadikan urusan Perpajakan
              Anda menjadi lebih mudah dan efisien!
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button className="bg-mainColorLight dark:bg-mainColorDark text-white rounded-full text-sm sm:text-base px-4 sm:px-6 py-2 flex items-center gap-3">
                <Link href="/login" className="block w-full">
                  Get Started With us
                </Link>
                <MdArrowOutward className="text-3xl" />
              </Button>
              <Button
                variant="outline"
                className="rounded-full text-sm sm:text-base text-mainColorLight dark:text-mainColorDark border border-mainColorLight dark:border-mainColorDark font-bold px-4 sm:px-6 py-2"
              >
                <Link href="/login" className="block w-full">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Section Our Story */}
      <div className="px-4 sm:px-8 lg:px-30 py-12 sm:py-16 lg:py-20 flex flex-col items-center gap-4 sm:gap-5">
        <Badge
          variant="outline"
          className="border border-mainColorLight text-mainColorLight dark:text-mainColorDark bg-mainColorLight/10 text-xs sm:text-sm lg:text-base rounded-full px-3 sm:px-4 py-1 w-fit"
        >
          Our Story
        </Badge>
        <p className="text-center font-semibold text-lg sm:text-xl leading-relaxed max-w-4xl">
          Mitra Optimis Bersama (Ganapatih) adalah Perusahaan Tax Consultant
          yang terdiri dari para profesional perpajakan yang berdedikasi serta
          berkomitmen untuk memberikan layanan konsultasi pajak yang berkualitas
          tinggi. Kami menggabungkan pengetahuan perpajakan dengan pendekatan
          yang inovatif untuk memastikan klien kami meraih manfaat maksimal dari
          struktur perpajakan yang mereka miliki karena keberhasilan dan
          kepuasan klien adalah prioritas utama kami. Kami juga menjunjung
          tinggi standar integritas dan etika bisnis, setiap saran dan keputusan
          yang kami ambil didasarkan pada prinsip kejujuran dan transparansi.
        </p>
        <FaQuoteRight className="text-3xl sm:text-4xl lg:text-6xl text-mainColorLight dark:text-mainColorDark mt-2" />
      </div>
    </section>
  );
};
