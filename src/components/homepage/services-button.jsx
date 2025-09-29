"use client";
import Link from "next/link";
import { services } from "@/data/system";
import { RiApps2Fill } from "react-icons/ri";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import Image from "next/image";

export const ServicesButton = () => {
  const [search, setSearch] = useState("");
  const data = [
    ...(services.finance || []),
    ...(services.law || []),
    ...(services.management || []),
    ...(services.workspace || []),
    ...(services.creative || []),
  ].sort((a, b) => a.id - b.id);

  const mainTiles = data.slice(0, 9);
  const mobileTiles = data.slice(0, 7);
  const filtered = data.filter(
    (item) =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.subs.some((sub) => sub.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <section className="my-5 md:my-10">
        <div className="margin flex flex-col font-semibold gap-2">
          <p className="hidden md:block text-xl md:text-2xl">Layanan Kami</p>

          {/* Desktop View */}
          <div className="hidden md:flex gap-2">
            <div className="w-full grid grid-cols-5 gap-2">
              {mainTiles.map((item, idx) => (
                <Link href={item.href} key={idx}>
                  <div className="overflow-hidden aspect-square rounded-main flex flex-col p-4 relative hover:shadow transition bg-lightColor dark:bg-darkColor">
                    <div className="z-10 h-full flex flex-col justify-center items-center">
                      <div className="h-[50%]">
                        <Image
                          width={80}
                          height={80}
                          src={item.logo}
                          alt={item.label}
                        />
                      </div>
                      <div className="h-[20%] text-center">
                        <h4
                          style={{ color: item.accentLight }}
                          className="font-semibold dark:brightness-150"
                        >
                          {item.label}
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}

              <button
                onClick={() =>
                  document.getElementById("services-button")?.showModal()
                }
                className="cursor-pointer bg-mainColorLight text-white rounded-main aspect-square flex flex-col p-6 justify-center items-center gap-3"
              >
                <RiApps2Fill className="text-4xl" />
                Semua Layanan
              </button>
            </div>
          </div>

          {/* Mobile View */}
          <div className="flex md:hidden gap-2">
            <div className="w-full grid grid-cols-4 gap-2">
              {mobileTiles.map((item, idx) => (
                <Link href={item.href} key={idx} className="mt-2">
                  <div
                    style={{ background: `${item.accentLight}33` }}
                    className="flex flex-col items-center justify-center aspect-square rounded-third"
                  >
                    <Image
                      width={50}
                      height={50}
                      src={item.logo}
                      alt={item.label}
                    />
                  </div>
                  <div className="text-center mt-2">
                    <h4
                      style={{ color: item.accentLight }}
                      className="text-[10px] font-bold dark:brightness-150 leading-tight"
                    >
                      {item.label}
                    </h4>
                  </div>
                </Link>
              ))}

              <button
                onClick={() =>
                  document.getElementById("services-button")?.showModal()
                }
              >
                <div className="flex flex-col items-center justify-center aspect-square rounded-third bg-mainColorLight/10 dark:bg-mainColorDark/20 text-mainColorLight dark:text-mainColorDark">
                  <RiApps2Fill className="text-5xl" />
                </div>
                <div className="text-center text-mainColorLight dark:text-mainColorDark">
                  <span className="text-[10px]">Semua</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Semua Layanan */}
      <dialog id="services-button" className="modal modal-bottom">
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>

        {/* Tombol Close */}
        <div className="modal-action absolute top-2 right-2">
          <form method="dialog">
            <Button
              className="rotate-45 !rounded-full bg-destructive w-10 h-10 flex items-center justify-center"
              variant="secondary"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </form>
        </div>

        <div className="modal-box rounded-t-main bg-white dark:bg-black pt-0 px-0">
          <div className="sticky top-0 z-30 bg-white/50 dark:bg-black/30 backdrop-blur-xl pt-5 px-5">
            <h3 className="font-bold text-xl mb-2">Semua Layanan</h3>
            <label className="z-30 input bg-lightColor/80 shadow-none dark:bg-darkColor/80 rounded-main w-full mb-4">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="text"
                placeholder="Cari layanan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="grow text-base"
              />
            </label>
          </div>

          {/* Desktop Content */}
          <div className="md:block hidden h-[60svh] px-5">
            <div className="grid grid-cols-6 gap-4 !py-5">
              {filtered.map((item, idx) => (
                <Link href={item.href} key={idx}>
                  <div className="overflow-hidden aspect-square rounded-main flex flex-col p-6 relative">
                    <div className="absolute inset-0 z-0 transition-opacity duration-300 bg-lightColor dark:bg-darkColor dark:saturate-150" />
                    <div className="z-10 w-full h-full flex flex-col justify-between">
                      <div>
                        <Image
                          width={55}
                          height={55}
                          src={item.logo}
                          alt={item.label}
                        />
                        <h4
                          style={{ color: item.accentLight }}
                          className="text-sm font-semibold mt-1"
                        >
                          {item.label}
                        </h4>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {item.subs.map((sub, subIndex) => (
                          <p
                            key={subIndex}
                            className="text-[9px] rounded-sm px-[4px] py-[2px] bg-white dark:bg-black truncate"
                          >
                            {sub}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              {filtered.length === 0 && (
                <p className="col-span-6 text-center text-sm text-gray-400">
                  Tidak ada layanan ditemukan
                </p>
              )}
            </div>
          </div>

          {/* Mobile Content Drawer */}
          <div className="md:hidden block h-[60svh] px-5">
            <div className="grid grid-cols-4 gap-3 pb-10">
              {filtered.map((item, idx) => (
                <Link href={item.href} key={idx}>
                  <div
                    style={{ background: `${item.accentLight}33` }}
                    className="flex flex-col items-center justify-center aspect-square rounded-third"
                  >
                    <Image
                      width={70}
                      height={70}
                      src={item.logo}
                      alt={item.label}
                    />
                  </div>
                  <div className="text-center mt-2">
                    <h4
                      style={{ color: item.accentLight }}
                      className="text-[10px] font-bold dark:brightness-150 leading-tight"
                    >
                      {item.label}
                    </h4>
                  </div>
                </Link>
              ))}
              {filtered.length === 0 && (
                <p className="col-span-4 text-center text-sm text-gray-400">
                  Tidak ada layanan ditemukan
                </p>
              )}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};
