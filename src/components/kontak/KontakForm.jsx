"use client"

import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export const KontakForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "", agree: false });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.agree) {
      setStatus("⚠️ Mohon setujui kebijakan privasi sebelum mengirim.");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("✅ Terima kasih! Masukan Anda telah berhasil dikirim.");
        setForm({ name: "", email: "", message: "", agree: false });
      } else {
        setStatus("❌ Maaf, terjadi kendala saat mengirim masukan. Silakan coba lagi.");
      }
    } catch (err) {
      setStatus("❌ Koneksi bermasalah. Mohon periksa internet Anda dan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm w-full md:w-1/2 h-full flex flex-col">
      <Badge
        variant="outline"
        className="border border-mainColorLight text-mainColorLight bg-mainColorLight/10 rounded-full px-3 sm:px-4 py-1"
      >
        Hubungi Kami
      </Badge>

      <h2 className="text-3xl font-bold mt-2 text-mainColorLight">
        Mari Mengobrol, Hubungi Kami
      </h2>

      <p className="text-gray-600 mt-2">
        Punya pertanyaan atau masukan? Kami siap membantu. Kirimkan pesan, dan tim kami akan merespons dalam 24 jam.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 flex-1 flex flex-col">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama Lengkap"
          className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-orange-500"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Alamat Email"
          className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-orange-500"
          required
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tulis pesan Anda di sini"
          className="w-full rounded-lg border px-4 py-3 focus:ring-2 focus:ring-orange-500"
          rows={5}
          required
        ></textarea>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="privacy"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <label htmlFor="privacy" className="text-sm text-gray-600">
            Saya setuju dengan kebijakan privasi
          </label>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="block w-full bg-mainColorLight text-white mt-auto disabled:opacity-50"
        >
          {loading ? "Mengirim..." : "Kirim Pesan"}
        </Button>

        {status && (
          <p className="mt-3 text-sm text-gray-700 text-center">{status}</p>
        )}
      </form>
    </div>
  );
};
