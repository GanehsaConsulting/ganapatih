"use client";

import Link from "next/link";
import React, { useState } from "react";
import { IoSearch, IoClose } from "react-icons/io5";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

export const SearchModal = ({ isScrolled, onClose }) => {
  const [resultSearch, setResultSearch] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGlobalSearch = async (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    setSearchQuery(searchValue.trim());

    try {
      setIsLoading(true);
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchValue.trim() }),
      });

      if (!res.ok) throw new Error("Gagal mencari data");

      const json = await res.json();
      console.log(json);

      setResultSearch(json.data || []);
    } catch (err) {
      console.error(err);
      setResultSearch([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className={`fixed left-0 top-[50px] w-full dark:bg-baseColorDark/80 bg-baseColorLight/80 shadow-lg backdrop-blur-xl border-t z-90 h-[calc(100vh-50px)] py-5 transition-all`}
    >
      <div
        className={`block bg-white/80 dark:bg-darkColor transition-all rounded-xl h-full ${
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
            <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white" />
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10 border border-mainColorLight text-black dark:text-white w-full"
              placeholder="Cari di sini..."
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="sm:shrink-0 bg-mainColorLight text-white dark:bg-mainColorLight w-full sm:w-auto"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <IoSearch className="animate-spin" /> Loading...
              </div>
            ) : (
              "Cari"
            )}
          </Button>
        </form>

        {/* Search Result */}
        {isLoading ? (
          <div className="flex justify-center items-center h-[50vh]">
            <IoSearch className="animate-spin text-3xl text-mainColorLight" />
            <p className="ml-3 text-mainColorLight font-medium">
              Sedang mencari...
            </p>
          </div>
        ) : (
          <>
            {resultSearch.length > 0 && (
              <p className="px-6 font-semibold italic my-4">Hasil Pencarian:</p>
            )}

            {/* ✅ scroll container full height */}
            <div className="flex flex-col overflow-y-auto h-[calc(100%-180px)] px-2">
              {resultSearch.length > 0
                ? resultSearch.map((e, idx) => (
                    <Link key={idx} href={e.href} passHref>
                      <div
                        onClick={() => onClose?.()}
                        className="cursor-pointer hover:bg-gray-200 px-6 py-5 flex flex-col gap-3 rounded-lg"
                      >
                        <Badge className="bg-secondaryColorLight/10 dark:bg-secondaryColorDark/15 border border-secondaryColorLight text-secondaryColorLight rounded-full px-3 sm:px-4 py-1 w-fit">
                          {e.category}
                        </Badge>
                        <h1 className="font-medium text-mainColorLight">
                          {e.title}
                        </h1>
                        <p className="text-sm text-black dark:text-gray-300">
                          {e.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))
                : searchQuery && (
                    <div className="h-full flex flex-col justify-center items-center mt-10">
                      <img
                        src="/assets/not-found.png"
                        alt="not found 3d illustration"
                        className="w-40"
                      />
                      <p className="px-6 py-3 text-neutral-500 text-xl">
                        Tidak ada hasil untuk{" "}
                        <span className="font-medium">"{searchQuery}"</span>
                      </p>
                    </div>
                  )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
