import { getSheetData } from "@/lib/googleSheets";
import { formatSheetData } from "@/lib/helpers";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const RANGE = process.env.GOOGLE_SHEET_RANGE_BANNER;

export default async function handler(req, res) {
  try {
    const rawData = await getSheetData(SHEET_ID, RANGE);

    const data = formatSheetData(rawData);
    console.log("banner: " + data);
    

    res.status(200).json({
      success: true,
      message: "Banners fetched successfully",
      data,
    });
  } catch (err) {
    console.error("Error fetching sheet:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch banners",
    });
  }
}
