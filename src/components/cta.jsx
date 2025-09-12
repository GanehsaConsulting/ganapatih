"use client";

import React from "react";
import Link from "next/link";

export const CTA = () => {
  return (
    <div className="p-7 mt-6 px-5 md:px-24">
      <Link href="https://wa.me/6281234567890" target="_blank" className="block">
        <picture>
          {/* Gambar untuk mobile (max-width: 640px) */}
          <source media="(max-width: 640px)" srcSet="/assets/cta-mobile.png" />
          {/* Gambar default (desktop) */}
          <img
            src="/assets/cta-dekstop.png"
            alt="cta-image"
            className="rounded-2xl w-full shadow-md"
          />
        </picture>
      </Link>
    </div>
  );
};
