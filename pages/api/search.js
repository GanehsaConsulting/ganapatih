// /pages/api/search.ts
import { getSheetData } from "@/lib/googleSheets";
import { formatSheetData } from "@/lib/helpers";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const RANGES = {
  services: process.env.GOOGLE_SHEET_RANGE_SERVICES,
  articles: process.env.GOOGLE_SHEET_RANGE_ARTICLE,
  // faq: process.env.GOOGLE_SHEET_RANGE_FAQ,
};

// Helper function untuk membuat slug yang bersih
function createSlug(text) {
  if (!text) return "";
  
  return text
    .toLowerCase()
    .trim()
    // Ganti + dengan spasi dulu sebelum processing
    .replace(/\+/g, " ")
    // Ganti multiple spasi dengan single spasi
    .replace(/\s+/g, " ")
    // Baru ganti spasi dengan dash
    .replace(/\s/g, "-")
    // Remove karakter yang tidak diinginkan kecuali dash
    .replace(/[^\w-]/g, "")
    // Remove multiple dashes
    .replace(/-+/g, "-")
    // Remove dash di awal dan akhir
    .replace(/^-+|-+$/g, "");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { query } = req.body;
    if (!query || !query.trim()) {
      return res.status(400).json({ error: "Query is required" });
    }

    // Ambil semua section
    const sheetPromises = Object.entries(RANGES)
      .filter(([_, range]) => !!range) // ✅ hanya ambil yang ada di ENV
      .map(([key, range]) =>
        getSheetData(SHEET_ID, range).then((raw) => ({
          key,
          data: formatSheetData(raw),
        }))
      );

    const rawResults = await Promise.all(sheetPromises);

    // Normalisasi data + URL dinamis
    const allData = rawResults.flatMap(({ key, data }) =>
      data.map((d) => {
        let searchField = "";
        let excerpt = "";
        let href = "";

        if (key === "services") {
          searchField = d.productName || "";
          excerpt = d.features || "";

          // ✅ Gunakan helper function untuk slug yang bersih
          const productSlug = createSlug(d.productName || "");
          const packageSlug = createSlug(d.sourcePath || "");

          // ✅ langsung tanpa /products
          href = `/${packageSlug}/${productSlug}`;
        }

        if (key === "articles") {
          searchField = d.title || "";
          excerpt = d.excerpt || "";

          // ✅ Gunakan helper function atau slug yang sudah ada
          const slug = d.slug || createSlug(searchField);
          href = `/artikel/${encodeURIComponent(slug)}`;
        }

        // if (key === "faq") {
        //   searchField = d.question || "";
        //   excerpt = d.answer || "";

        //   const slug = d.slug || createSlug(searchField);
        //   href = `/faq/${encodeURIComponent(slug)}`;
        // }

        return {
          title: searchField,
          excerpt,
          category: key,
          href,
        };
      })
    );

    // Filtering
    const q = query.toLowerCase();
    const filteredData = allData.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q)
    );

    res.status(200).json({
      success: true,
      total: filteredData.length,
      data: filteredData,
    });
  } catch (error) {
    console.error("Error searching data:", error);
    res.status(500).json({
      error: "Failed to search data",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
}