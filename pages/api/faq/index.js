// pages/api/faq/index.js
import { getSheetData } from "@/lib/googleSheets";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_FAQ = process.env.GOOGLE_SHEET_RANGE_FAQ;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    const { sourcePath } = req.query;

    if (!sourcePath || typeof sourcePath !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'sourcePath parameter is required'
      });
    }

    if (!SHEET_ID || !SHEET_FAQ) {
      console.error('Missing environment variables:', { SHEET_ID, SHEET_FAQ });
      return res.status(500).json({
        success: false,
        message: 'Server configuration error'
      });
    }

    console.log(`Fetching data for sourcePath: ${sourcePath}`);

    const rawData = await getSheetData(SHEET_ID, SHEET_FAQ);
    console.log('Raw data from Google Sheets:', rawData);

    if (!rawData) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch data from Google Sheets'
      });
    }

    let formattedData = [];

    // Handle different data formats from Google Sheets
    if (Array.isArray(rawData) && rawData.length > 0) {
      // If it's an array of arrays (rows and columns)
      if (Array.isArray(rawData[0])) {
        const headers = rawData[0];
        formattedData = rawData.slice(1).map(row => {
          const obj = {};
          headers.forEach((header, i) => {
            obj[header] = row[i] || '';
          });
          return obj;
        });
      } 
      // If it's already an array of objects
      else if (typeof rawData[0] === 'object') {
        formattedData = rawData;
      }
    }

    console.log('Formatted data:', formattedData);

    const normalizedSourcePath = sourcePath.startsWith('/') 
      ? sourcePath 
      : `/${sourcePath}`;

    console.log('Normalized sourcePath:', normalizedSourcePath);

    // Filter data
    const filtered = formattedData.filter((item) => {
      if (!item || !item.sourcePath) return false;
      
      const itemSourcePath = String(item.sourcePath).toLowerCase().trim();
      const querySourcePath = normalizedSourcePath.toLowerCase().trim();
      
      return itemSourcePath === querySourcePath;
    });

    console.log(`Total formatted items: ${formattedData.length}`);
    console.log(`Filtered items: ${filtered.length}`);

    res.status(200).json({
      success: true,
      data: filtered,
      meta: {
        total: formattedData.length,
        filtered: filtered.length,
        sourcePath: normalizedSourcePath
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat mengambil data FAQ',
      error: error?.message || 'Unknown error'
    });
  }
}