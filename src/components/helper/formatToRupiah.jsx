export const formatToRupiah = (amount) => {
  // Jika input bukan number, coba parse string rupiah dulu
  let numberAmount = amount;

  if (typeof amount === 'string') {
    // Buang spasi & "Rp"
    let cleaned = amount.replace(/\s/g, '').replace(/Rp/gi, '');
    // Hilangkan titik ribuan
    cleaned = cleaned.replace(/\./g, '');
    // Ganti koma desimal jadi titik
    cleaned = cleaned.replace(/,/g, '.');
    // Parse ke float
    numberAmount = parseFloat(cleaned);
  }

  if (typeof numberAmount !== 'number' || isNaN(numberAmount)) {
    return 'Invalid Input';
  }

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(numberAmount);
};
