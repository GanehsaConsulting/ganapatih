"use client";
import { useState, useEffect } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { Button } from "../ui/button";

export const Carousel = () => {
  const delay = 4000;
  const [index, setIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data dari API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/banner");
        const json = await res.json();
        console.log("📦 Banner response:", json); // <-- Debug di console

        if (json.success && Array.isArray(json.data)) {
          setBanners(json.data);
        } else {
          console.warn("⚠️ Response format tidak sesuai:", json);
        }
      } catch (err) {
        console.error("❌ Failed to fetch banners:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Auto slide
  useEffect(() => {
    if (banners.length > 1) {
      const timer = setTimeout(() => {
        setIndex((prevIndex) =>
          prevIndex === banners.length - 1 ? 0 : prevIndex + 1
        );
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [index, banners]);

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return (
      <div className="h-[25lvh] md:h-[45lvh] flex items-center justify-center w-auto bg-darkColor/10 dark:bg-lightColor/20 animate-pulse margin rounded-main">
      </div>
    );
  }

  if (banners.length === 0) {
    return (
      <div className="h-[25lvh] md:h-[45lvh] flex items-center justify-center">
        <p className="text-neutral-400">No banners available</p>
      </div>
    );
  }

  return (
    <div className="margin overflow-hidden rounded-main md:h-[45lvh] h-[25lvh] shadow-mainShadow relative flex flex-col items-center justify-center group">
      <div
        className="whitespace-nowrap transition-transform ease-in-out duration-700 w-full h-full"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {banners.map((el, i) => (
          <a
            key={el.id}
            href={el.path}
            className="inline-block shadow w-full relative overflow-hidden rounded-main h-full"
          >
            <img
              width={500}
              height={500}
              className="w-full h-full object-cover rounded-main hover:scale-110 duration-150 bg-baseColor"
              src={el.url}
              alt={el.alt || `Slide ${i + 1}`}
            />
          </a>
        ))}
      </div>

      {/* Indicators */}
      <div className="absolute z-10 bottom-2 flex justify-center mt-5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 mx-1 min-w-0 rounded-full duration-200 cursor-pointer shadow-mainShadow
              ${i === index ? "bg-white w-7" : "bg-white/50"}
            `}
          />
        ))}
      </div>
      <div className="absolute bottom-0 w-[10vw] h-[10%] bg-black/10 blur-xl"></div>

      {/* Prev Button */}
      <Button
        size="icon"
        onClick={handlePrev}
        className="hidden opacity-0 group-hover:opacity-100 border-neutral-200/20 absolute left-4 top-1/2 transform -translate-y-1/2 bg-mainColorLight/20 dark:bg-mainColorDark/20 dark:group-hover:bg-mainColorDark group-hover:bg-mainColorLight text-white w-10 h-10 aspect-square !rounded-full group-hover:shadow-md group-hover:scale-110 scale-90 md:flex items-center justify-center md:!text-2xl"
      >
        <RiArrowLeftSLine />
      </Button>

      {/* Next Button */}
      <Button
        size="icon"
        onClick={handleNext}
        className="hidden opacity-0 group-hover:opacity-100 border-neutral-200/20 absolute right-4 top-1/2 transform -translate-y-1/2 bg-mainColorLight/20 dark:bg-mainColorDark/20 dark:group-hover:bg-mainColorDark group-hover:bg-mainColorLight text-white w-10 h-10 aspect-square !rounded-full group-hover:shadow-md group-hover:scale-110 scale-90 md:flex items-center justify-center md:!text-2xl"
      >
        <RiArrowRightSLine />
      </Button>
    </div>
  );
};
