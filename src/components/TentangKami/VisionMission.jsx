"use client";
import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export const VisionMission = () => {
  return (
    <section className="w-full mb-30 py-12 px-6 md:px-16 ">
      <div className="grid md:grid-cols-2 gap-18 items-center">
        {/* Gambar */}
        <div className="relative">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/assets/vision.png"
              alt="Construction plan"
              width={600}
              height={400}
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-[-40px] right-[-40px] w-[200px] rounded-xl overflow-hidden shadow-lg border-4 border-white">
            <Image
              src="/assets/mission.png"
              alt="Workers discussing project"
              width={300}
              height={200}
              className="object-cover"
            />
          </div>
        </div>

        {/* Teks */}
        <div className="mt-10 md:mt-0">
          <h2 className="text-5xl text-mainColorLight dark:text-mainColorDark font-bold mb-4">Visi</h2>
          <p className="text-main mb-6 leading-relaxed text-xl">
            Kami berkomitmen untuk menjadi kantor konsultan pajak yang
            unggul dalam memberikan layanan profesional dan terbaik dalam
            kinerja.
          </p>
          <h2 className="text-5xl text-mainColorLight dark:text-mainColorDark font-bold mb-4">Misi</h2>
          <p className="text-main mb-6 leading-relaxed text-xl">
            Kami hadir untuk memberikan layanan dan solusi perpajakan yang
            terbaik untuk para klien.
          </p>

          {/* <ul className="space-y-3">
            {[
              "Fostering Sustainable Growth and Green Development",
              "Innovating for a Sustainable Future",
              "Customer-Centric Approach",
              "Building Stronger Communities",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="text-green-600 w-5 h-5 mt-1" />
                <span className="text-gray-800">{item}</span>
              </li>
            ))}
          </ul> */}
        </div>
      </div>
    </section>
  );
};
