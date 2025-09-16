# CardCarousel Usage Guide

Komponen CardCarousel telah diperbaiki mengikuti pola fetch yang sama dengan CategoryPage untuk konsistensi API.

## 🔧 Parameter Props

### `sourcePath` (Required)
- **Format**: Harus dimulai dengan `/` seperti `/konsultan-pajak`
- **Contoh**: `/konsultan-pajak`, `/web-development`, `/digital-marketing`
- **Penting**: Ini harus match dengan data `sourcePath` di Google Sheets

### `title` (Optional)
- **Default**: `"Paket Layanan"`
- **Contoh**: `"Paket Pelaporan Pajak"`, `"Layanan Web Development"`

### `viewAllLink` (Optional)
- **Default**: Sama dengan `sourcePath`
- **Contoh**: `"/konsultan-pajak/semua-paket"`

### `category` (Optional)
- **Default**: `""` (kosong = semua kategori)
- **Contoh**: `"tax-consulting"`, `"web-design"`

### `subCategory` (Optional)
- **Default**: `""` (kosong = semua subkategori)
- **Contoh**: `"monthly-reporting"`, `"responsive-design"`

### `isPriority` (Optional)
- **Default**: `undefined` (tidak difilter)
- **Options**: 
  - `undefined` = tampilkan semua produk
  - `true` = hanya produk priority
  - `false` = hanya produk non-priority

### `perPage` (Optional)
- **Default**: `10`
- **Range**: `1-50` (recommended)

## 📝 Contoh Penggunaan

### Basic Usage
```jsx
<CardCarousel 
    sourcePath="/konsultan-pajak"
    title="Paket Pelaporan Pajak"
/>
```

### Priority Products Only
```jsx
<CardCarousel 
    sourcePath="/konsultan-pajak"
    title="Paket Rekomendasi"
    isPriority={true}
    perPage={6}
/>
```

### Specific Category
```jsx
<CardCarousel 
    sourcePath="/web-development"
    title="Paket Website Bisnis"
    category="business-website"
    viewAllLink="/web-development/bisnis"
    perPage={8}
/>
```

### Multiple Carousels
```jsx
{/* Featured Products */}
<CardCarousel 
    sourcePath="/konsultan-pajak"
    title="Paket Unggulan"
    isPriority={true}
    perPage={6}
/>

{/* Category Specific */}
<CardCarousel 
    sourcePath="/konsultan-pajak"
    title="Paket Pelaporan Bulanan"
    category="monthly-reporting"
    perPage={8}
/>

{/* All Products */}
<CardCarousel 
    sourcePath="/konsultan-pajak"
    title="Semua Paket Pajak"
    perPage={12}
/>
```

## 🛠 Data Requirements

Pastikan data di Google Sheets memiliki struktur:

```
sourcePath: /konsultan-pajak
productName: Paket Pelaporan Pajak Bulanan
category: tax-consulting
subCategory: monthly-reporting
isPriority: TRUE
isPublished: TRUE
discountPrice: 500000
retailPrice: 750000
features: [{"feature": "Laporan bulanan", "status": true}]
requirements: [{"requirement": "Dokumen keuangan lengkap"}]
```

## 🐛 Debug dan Troubleshooting

### 1. Gunakan Debug Component
```jsx
import { DebugCardCarousel } from './debug-card-carousel'

// Tambahkan sementara untuk debug
<DebugCardCarousel 
    sourcePath="/konsultan-pajak"
    isPriority={true}
/>
```

### 2. Check Console Logs
CardCarousel akan log informasi penting:
- API URL yang dipanggil
- Raw API response
- Processed products data

### 3. Common Issues

**Tidak ada data muncul:**
- Pastikan `sourcePath` dimulai dengan `/`
- Check apakah data di Google Sheets memiliki `isPublished: TRUE`
- Verify `sourcePath` di Google Sheets match dengan props

**Data tidak sesuai filter:**
- Check parameter `isPriority` - gunakan `undefined` untuk tidak filter
- Verify `category` dan `subCategory` match dengan data

**Error 404/500:**
- Pastikan API endpoint `/api/products` berfungsi
- Test dengan `DebugCardCarousel` component

## 🔄 API Endpoint Format

CardCarousel memanggil endpoint yang sama dengan CategoryPage:
```
GET /api/products?sourcePath=/konsultan-pajak&searchTerm=&sort=default&category=&subCategory=&isPriority=true&minPrice=0&maxPrice=999999999&page=1&perPage=10
```

Response format yang didukung:
```json
{
  "data": [...],
  "pagination": {...}
}
// atau
[...products...]
// atau  
{
  "success": true,
  "data": {...}
}
```

## ✅ Best Practices

1. **Selalu gunakan sourcePath dengan leading slash**: `/konsultan-pajak` bukan `konsultan-pajak`
2. **Test dengan DebugCardCarousel** sebelum production
3. **Set perPage yang reasonable**: 6-12 untuk carousel
4. **Gunakan isPriority=true** untuk featured products
5. **Berikan title yang descriptive** untuk UX yang baik