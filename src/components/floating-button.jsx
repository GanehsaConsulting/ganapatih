"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { RiWhatsappFill } from "react-icons/ri";

export const FloatingButton = () => {
  const WaLink = "https://wa.me/6281234567890";

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fungsi yang dijalankan setiap kali komponen di-mount atau nilai isVisible berubah
    const handleScroll = () => {
      // Tentukan titik scroll ketika tombol muncul
      const scrollThreshold = 200;

      // Periksa posisi scroll
      if (window.scrollY > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Pasang event listener untuk memantau scroll
    window.addEventListener("scroll", handleScroll);

    // Membersihkan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Dependency array kosong agar useEffect hanya dijalankan sekali saat komponen di-mount

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Animasi scroll ke atas
    });
  };
  return (
    <>
      <div className="fixed bottom-15 md:bottom-5 right-4 md:right-5 z-[100]">
        <section className="flex flex-col gap-2 md:gap-3 duration-300">
          <button
            onClick={scrollToTop}
            className={`${
              isVisible ? "scale-100 " : "scale-0 translate-x-full"
            } bg-mainColor/50 duration-300 backdrop-blur-md hover:bg-mainColor hover:text-baseColor dark:text-white text-otherMuted rounded-full p-2 md:p-4 shadow-lg`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              ></path>
            </svg>
          </button>
          <Link
            href={WaLink}
            target="_blank"
            className={`${
              isVisible ? "scale-100 " : "scale-0 translate-x-full"
            } duration-300 ease-in-out`}
          >
            <button className="bg-[#4DED69] hover:bg-[#35a549] hover:scale-95 duration-300 ease-in-out text-white font-bold p-2 md:p-4 rounded-full shadow-lg">
              <RiWhatsappFill size={25} />
            </button>
          </Link>
        </section>
      </div>
    </>
  );
};
