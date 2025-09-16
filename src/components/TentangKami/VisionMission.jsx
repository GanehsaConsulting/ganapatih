"use client";
import React from "react";
import Image from "next/image";

export const VisionMission = () => {
  return (
    <section className="w-full mb-20 py-12 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Gambar */}
        <div className="relative flex justify-center md:justify-start">
          <div className="rounded-xl overflow-hidden shadow-lg w-full max-w-[600px]">
            <Image
              src="/assets/vision.png"
              alt="Construction plan"
              width={600}
              height={400}
              className="object-cover w-full h-auto"
              priority
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-[140px] sm:w-[180px] md:w-[200px] rounded-xl overflow-hidden shadow-lg border-4 border-white">
            <Image
              src="/assets/mission.png"
              alt="Workers discussing project"
              width={300}
              height={200}
              className="object-cover w-full h-auto"
            />
          </div>
        </div>

        {/* Teks */}
        <div className="mt-12 md:mt-0">
          <h2 className="text-3xl md:text-5xl text-mainColorLight dark:text-mainColorDark font-bold mb-4">
            Visi
          </h2>
          <p className="text-main mb-8 leading-relaxed text-base md:text-xl">
            Kami berkomitmen untuk menjadi kantor konsultan pajak yang unggul
            dalam memberikan layanan profesional dan terbaik dalam kinerja.
          </p>

          <h2 className="text-3xl md:text-5xl text-mainColorLight dark:text-mainColorDark font-bold mb-4">
            Misi
          </h2>
          <p className="text-main mb-6 leading-relaxed text-base md:text-xl">
            Kami hadir untuk memberikan layanan dan solusi perpajakan yang
            terbaik untuk para klien.
          </p>
        </div>
      </div>
    </section>
  );
};
