import React from "react";
import { FaStarOfLife, FaLightbulb  } from "react-icons/fa";
import { Badge } from "../ui/badge";
import { BsPersonFillCheck } from "react-icons/bs";
import { HiMiniCheckBadge } from "react-icons/hi2";
import { FaPeopleGroup } from "react-icons/fa6";

const dataValues = [
  {
    icon: <BsPersonFillCheck />,
    title: "Profesional & Berpengalaman",
    desc: "Tim kami terdiri dari para konsultan pajak yang berdedikasi dan memiliki keahlian mendalam untuk memberikan solusi terbaik bagi klien.",
  },
  {
    icon: <HiMiniCheckBadge />,
    title: "Integritas & Transparansi",
    desc: "Setiap langkah, saran, dan keputusan selalu didasarkan pada prinsip kejujuran, keterbukaan, serta etika bisnis yang tinggi.",
  },
  {
    icon: <FaLightbulb />,
    title: "Inovasi & Solusi Tepat",
    desc: "Kami menggabungkan pengetahuan perpajakan dengan pendekatan inovatif agar klien meraih manfaat maksimal dari struktur pajaknya.",
  },
  {
    icon: <FaPeopleGroup />,
    title: "Kepuasan Klien Utama",
    desc: "Keberhasilan dan kenyamanan klien adalah prioritas kami. Layanan kami selalu diarahkan untuk mempermudah urusan perpajakan Anda.",
  },
];

export const OurValues = () => {
  return (
    <section className="w-full px-6 md:px-10 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* kiri */}
        <div className="flex flex-col gap-2 h-full">
          <Badge
            variant="outline"
            className="border border-mainColorLight text-mainColorLight bg-mainColorLight/10 text-xs sm:text-sm md:text-base rounded-full px-3 sm:px-4 py-1"
          >
            Our Values
          </Badge>
          <h1 className="font-medium text-3xl md:text-5xl leading-snug">
            Built On Principles That Matter
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {dataValues.map((e, i) => (
              <div
                key={i}
                className=" p-5 rounded-2xl flex flex-col gap-5 bg-mainColorLight text-white"
              >
                <div className="bg-white p-3 drop-shadow-2xl text-mainColorDark rounded-third text-4xl w-fit">
                  {e.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold">
                  {e.title}
                </h3>
                <p className="text-sm md:text-base">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* kanan */}
        <div className="relative w-full h-80 md:h-full rounded-3xl overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://images.pexels.com/photos/5668802/pexels-photo-5668802.jpeg"
            alt="banner-values"
          />
        </div>
      </div>
    </section>
  );
};
