// /pages/api/search.ts
import { getSheetData } from "@/lib/googleSheets";
import { formatSheetData } from "@/lib/helpers";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const RANGES = {
  services: process.env.GOOGLE_SHEET_RANGE_SERVICES,
  articles: process.env.GOOGLE_SHEET_RANGE_ARTICLE,
  faq: process.env.GOOGLE_SHEET_RANGE_FAQ,
};

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

          const productSlug = (d.productName || "")
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");

          const packageSlug = (d.packagesName || "")
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");

          // ✅ langsung tanpa /products
          href = `/${packageSlug}/${productSlug}`;
        }

        if (key === "articles") {
          searchField = d.title || "";
          excerpt = d.excerpt || "";

          const slug =
            d.slug ||
            searchField
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]/g, "");

          href = `/artikel/${encodeURIComponent(slug)}`;
        }

        if (key === "faq") {
          searchField = d.question || "";
          excerpt = d.answer || "";

          const slug =
            d.slug ||
            searchField
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]/g, "");

          href = `/faq/${encodeURIComponent(slug)}`;
        }

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
