"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question:
        "Apa layanan utama yang ditawarkan oleh Mitra Optimis Bersama (Ganapathi)?",
      answer:
        "Kami menyediakan layanan konsultasi pajak, perencanaan pajak, kepatuhan perpajakan, serta pendampingan dalam menghadapi pemeriksaan dan sengketa pajak.",
    },
    {
      question: "Mengapa saya perlu menggunakan jasa konsultan pajak?",
      answer:
        "Konsultan pajak membantu Anda memahami regulasi perpajakan yang kompleks, memastikan kepatuhan, meminimalkan risiko, dan mengoptimalkan struktur pajak agar lebih efisien.",
    },
    {
      question:
        "Bagaimana cara Mitra Optimis Bersama memastikan kualitas layanan?",
      answer:
        "Tim kami terdiri dari para profesional berpengalaman yang selalu mengikuti perkembangan regulasi perpajakan. Kami menjunjung tinggi standar integritas, transparansi, dan memberikan solusi berbasis data serta strategi yang terukur.",
    },
    {
      question: "Apakah data dan informasi klien terjamin kerahasiaannya?",
      answer:
        "Ya, kami memegang teguh prinsip integritas dan kerahasiaan. Semua informasi klien dilindungi sesuai dengan standar etika profesi dan regulasi yang berlaku.",
    },
    {
      question:
        "Bagaimana cara memulai konsultasi dengan Mitra Optimis Bersama?",
      answer:
        "Anda dapat menghubungi kami melalui formulir kontak di website, email, atau nomor telepon yang tersedia. Tim kami akan segera mengatur jadwal konsultasi sesuai kebutuhan Anda.",
    },
  ];

  return (
    <section className="sm:mb-20 w-full max-w-6xl mx-auto mt-12 grid md:grid-cols-3 sm:grid-cols-2 gap-10">
      <div className="flex flex-col sm:justify-start justify-center">
        <h2 className="text-mainColorLight dark:text-mainColorDark smtext-7xl text-5xl font-bold mb-6">FAQs</h2>
        <p className="text-gray-600 dark:text-white/80 leading-relaxed">
          Berikut adalah beberapa pertanyaan yang sering diajukan mengenai
          layanan kami. Jika Anda memiliki pertanyaan lain, tim Mitra Optimis
          Bersama (Ganapathi) siap membantu memberikan jawaban yang jelas dan
          terpercaya.
        </p>
      </div>
      <div className="md:col-span-2">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} >
              <AccordionTrigger  >{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
