"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const SearchModal = ({ isScrolled, onClose }) => {
  const [resultSearch, setResultSearch] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    setSearchQuery(searchValue.trim());
  };

  return (
    <section
      className={`
        fixed left-0 top-[55px] w-full 
        dark:bg-baseColorDark/80 bg-baseColorLight/80 
        shadow-lg backdrop-blur-xl border-t 
        z-[200] h-[calc(100vh-60px)] pt-7 transition-all
      `}
    >
      {/* Container putih */}
      <div
        className={`block bg-white dark:bg-darkColor transition-all rounded-xl ${
          isScrolled
            ? "mx-6 py-6 xl:mx-12 shadow-lg backdrop-blur-xl"
            : "mx-6 py-6 xl:mx-24"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 font-semibold border-b border-black/40 pb-4 mb-7 mx-6 text-xl text-mainColorLight dark:text-mainColorDark dark:border-mainColorLight">
          <h1>Cari di Ganapatih</h1>
          <button
            onClick={() => onClose?.()}
            className="cursor-pointer hover:opacity-80"
          >
            <IoClose className="text-2xl text-gray-500" />
          </button>
        </div>

        {/* Search Form */}
        <form
          onSubmit={handleGlobalSearch}
          className="rounded-lg flex sm:flex-row flex-col items-center gap-3 px-6"
        >
          <div className="relative flex-1 w-full">
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 border border-mainColorLight text-black w-full"
              placeholder="Cari di sini..."
            />
          </div>
          <Button
            type="submit"
            className="sm:shrink-0 bg-mainColorLight text-white dark:bg-mainColorLight w-full sm:w-auto"
          >
            Cari
          </Button>
        </form>

        {/* Search Result */}
        <div className="flex flex-col mt-4">
          {resultSearch.length > 0
            ? resultSearch.map((e, idx) => (
                <Link
                  key={idx}
                  href={`/search/${encodeURIComponent(e.title)}`}
                  className="hover:bg-gray-200 px-6 py-4"
                >
                  <h1 className="font-medium text-mainColorLight">{e.title}</h1>
                  <p className="text-sm text-black">{e.desc}</p>
                </Link>
              ))
            : searchQuery && (
                <p className="px-6 py-3 text-neutral-500">
                  Tidak ada hasil untuk{" "}
                  <span className="font-medium">{searchQuery}</span>
                </p>
              )}
        </div>
      </div>
    </section>
  );
};
