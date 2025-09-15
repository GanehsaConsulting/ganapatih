// file: /[category]/productId

"use client";

import Image from "next/image";
import { BreadcrumbDynamic } from "@/components/breadcrumb-dynamic";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  KonsultanPajakPackages,
  taxConsultingFAQ,
} from "@/data/categories/tax";
import { unslugify } from "@/components/helper/slugify";
import { formatToRupiah } from "@/components/helper/formatToRupiah";
import {
  RiCheckboxCircleFill,
  RiInformationFill,
  RiQuestionFill,
  RiShoppingBagFill,
  RiWhatsappFill,
  RiCloseLine,
  RiQrCodeLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import ProductQuantityCounter from "@/components/counter-product-quantity";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { ProductDetailSkeleton } from "@/components/skeleton/product-detail-skeleton";

export default function ProductDetail() {
  const router = useRouter();
  const slug = usePathname() || {};

  const [data, setData] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // QR Payment states
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const { category } = useParams();
  const [faqData, setFaqData] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (!res.ok) throw new Error("Produk tidak ditemukan");

        const json = await res.json();

        if (json.success && json.data) {
          setData(json.data);
          setRelatedProducts([json.data, ...(json.relatedProducts || [])]);
          setSelectedVariant(json.data);
        } else {
          throw new Error(json.error || "Data produk tidak valid");
        }
      } catch (err) {
        setError(err.message || "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    const fetchDataFAQ = async () => {
      try {
        // Mengirim category sebagai query parameter
        const res = await fetch(`/api/faq?sourcePath=/${category}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (data.success && data.data) {
          setFaqData(data.data);
        } else {
          setFaqData([]);
        }
      } catch (err) {
        console.error("Gagal ambil data FAQ:", err);
        setFaqData([]);
      }
    };

    fetchData();
    fetchDataFAQ();
  }, [slug, category]);

  // Handle QR Payment
  const handleQRPayment = async () => {
    setPaymentLoading(true);
    setPaymentError(null);

    try {
      // Validate required data
      if (!selectedVariant || !selectedVariant.price) {
        throw new Error("Data produk tidak valid");
      }

      // Create a shorter order ID (max 50 characters for Midtrans)
      const orderId = `ord-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 8)}`;

      // Calculate total amount
      const totalAmount = selectedVariant.price * quantity;

      // Create payment request
      const paymentData = {
        payment_type: "qris",
        transaction_details: {
          order_id: orderId,
          gross_amount: totalAmount,
        },
        item_details: [
          {
            id:
              selectedVariant.id ||
              selectedVariant.slug?.substring(0, 20) ||
              "unknown",
            price: selectedVariant.price,
            quantity: quantity,
            name: (selectedVariant.name || "Product").substring(0, 50),
          },
        ],
        currency: "IDR",
      };

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || result.error || `HTTP Error: ${response.status}`
        );
      }

      if (result.status_code === "201" || result.status_code === 201) {
        setQrData(result);
        setShowQRModal(true);
      } else {
        throw new Error(
          result.status_message || result.message || "Gagal membuat QR Code"
        );
      }
    } catch (err) {
      console.error("Payment error:", err);
      setPaymentError(
        err.message || "Terjadi kesalahan saat membuat pembayaran"
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  // QR Code Modal Component
  const QRPaymentModal = () => {
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
      if (qrData && showQRModal) {
        // Get QR code URL from actions
        const qrAction = qrData.actions?.find(
          (action) =>
            action.name === "generate-qr-code" ||
            action.name === "generate-qr-code-v2"
        );

        if (qrAction) {
          setQrCodeUrl(qrAction.url);
        }

        // Calculate time left
        if (qrData.expiry_time) {
          const expiryTime = new Date(qrData.expiry_time);
          const now = new Date();
          const timeDiff = Math.floor((expiryTime - now) / 1000);
          setTimeLeft(timeDiff > 0 ? timeDiff : 0);
        }
      }
    }, [qrData, showQRModal]);

    // Countdown timer
    useEffect(() => {
      if (timeLeft > 0) {
        const timer = setTimeout(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }, [timeLeft]);

    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    };

    // Calculate total amount - use qrData if available, otherwise calculate from selectedVariant
    const totalAmount = qrData?.gross_amount
      ? parseInt(qrData.gross_amount)
      : selectedVariant
      ? selectedVariant.price * quantity
      : 0;

    return (
      <Dialog open={showQRModal} onOpenChange={setShowQRModal}  >
        <DialogContent className="w-full sm:max-w-md sm:my-2 mb-2 fixed  z-[200]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <RiQrCodeLine className="text-blue-600" />
              Pembayaran QRIS
            </DialogTitle>
            <DialogDescription className="mb-5">
              Scan QR code di bawah ini dengan aplikasi pembayaran Anda
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center space-y-4">
            {/* QR Code */}
            <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg bg-white">
              {qrCodeUrl ? (
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="w-48 h-48 object-contain"
                />
              ) : qrData?.qr_string ? (
                // Fallback: generate QR using a service or library
                <div className="w-48 h-48 flex items-center justify-center bg-gray-100 rounded">
                  <span className="text-xs text-center px-2">
                    QR String: {qrData.qr_string.substring(0, 50)}...
                  </span>
                </div>
              ) : (
                <div className="w-48 h-48 flex items-center justify-center bg-gray-100 rounded">
                  <RiQrCodeLine className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>

            {/* Payment Info */}
            <div className="text-center space-y-2">
              <p className="text-lg font-semibold">
                {formatToRupiah(totalAmount)}
              </p>
              <p className="text-sm text-muted-foreground">
                Order ID: {qrData?.order_id}
              </p>
              {timeLeft > 0 && (
                <p className="text-sm text-orange-600 font-medium">
                  Berlaku hingga: {formatTime(timeLeft)}
                </p>
              )}
              {timeLeft === 0 && (
                <p className="text-sm text-red-600 font-medium">
                  QR Code telah expired
                </p>
              )}
            </div>

            {/* Instructions */}
            <div className="text-xs text-muted-foreground text-center space-y-1">
              <p>1. Buka aplikasi pembayaran (GoPay, OVO, Dana, dll)</p>
              <p>2. Pilih menu Scan QR</p>
              <p>3. Arahkan kamera ke QR code di atas</p>
              <p>4. Konfirmasi pembayaran</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                onClick={() => setShowQRModal(false)}
                className="flex-1"
              >
                Tutup
              </Button>
              {timeLeft === 0 && (
                <Button
                  onClick={handleQRPayment}
                  disabled={paymentLoading}
                  className="flex-1"
                >
                  {paymentLoading ? "Loading..." : "Generate Ulang"}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  if (loading) return <ProductDetailSkeleton />;
  if (error) return <p className="text-center my-10 text-red-600">{error}</p>;
  if (!data) return null;

  return (
    <>
      <section className="margin my-5 hidden md:block">
        <BreadcrumbDynamic />
      </section>

      <main className="margin md:grid md:grid-cols-9 gap-5 flex flex-col">
        {/* Gambar Produk */}
        <section className="md:col-span-3 ">
          <Image
            width={500}
            height={500}
            className="brightness-95 dark:brightness-80 dark:invert rounded-main"
            src={
              selectedVariant.image ||
              "https://res.cloudinary.com/dbez0ceip/image/upload/v1747294371/imgProdukLotus_11zon_ezptvu.webp"
            }
            alt={selectedVariant.name || "Gambar Produk"}
          />
          {/* Harga Mobile */}
          <div className="md:hidden block mt-2">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold text-mainColorLight dark:text-mainColorDark ">
                {formatToRupiah(selectedVariant.price)}
              </p>
              <p className="text-destructive font-bold">
                - {selectedVariant.discount}%
              </p>
            </div>
            {selectedVariant.priceOriginal &&
              selectedVariant.priceOriginal !== 0 && (
                <p className="line-through text-sm text-muted-foreground">
                  {formatToRupiah(selectedVariant.priceOriginal)}
                </p>
              )}
          </div>
        </section>

        {/* Informasi Produk */}
        <section className="col-span-6 space-y-4 flex flex-col">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground font-semibold capitalize">
              {selectedVariant.packageName}
            </p>
            <h1 className="text-xl sm:text-4xl font-bold tracking-tight text-mainColorLight dark:text-mainColorDark">
              {selectedVariant.name}
            </h1>
          </div>

          {/* Variant */}
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Pilih variant lainnya:
            </p>

            <Select
              onValueChange={(value) => {
                const selected = relatedProducts.find((p) => p.name === value);
                if (selected) {
                  setSelectedVariant(selected);
                  router.push(
                    `${selected.sourcePath}/${selected.slug}`,
                    undefined,
                    {
                      shallow: true,
                    }
                  );
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={selectedVariant?.name} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {relatedProducts.map((el, idx) => (
                    <SelectItem key={idx} value={el.name}>
                      <div className="max-w-full w-full flex items-center gap-2 justify-between">
                        <h1 className="text-sm">{el.name}</h1>
                        <p className="font-bold text-mainColorLight dark:text-mainColorDark">
                          {formatToRupiah(el.price)}
                        </p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Pilih Kuantitas:</p>
            <ProductQuantityCounter
              min={1}
              max={20}
              onChange={(val) => setQuantity(val)}
            />
          </div>

          {/* Error message */}
          {paymentError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{paymentError}</p>
            </div>
          )}

          <section className="mt-auto space-y-5">
            {/* Harga Desktop*/}
            <div className="space-y-1 md:block hidden">
              <p className="text-sm text-muted-foreground">Harga mulai dari:</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-mainColorLight dark:text-mainColorDark ">
                  {formatToRupiah(selectedVariant.price * quantity)}
                </p>
                <p className="px-2 py-1 border rounded-secondary text-secondaryColorLight text-xs border-secondaryColorLight bg-yellow-50 dark:bg-yellow-950 dark:border-secondaryColorDark dark:text-secondaryColorDark font-bold">
                  Diskon {selectedVariant.discount}%
                </p>
              </div>
              {selectedVariant.priceOriginal &&
                selectedVariant.priceOriginal !== 0 && (
                  <p className="line-through text-sm text-red-600 dark:text-red-300">
                    {formatToRupiah(selectedVariant.priceOriginal * quantity)}
                  </p>
                )}
            </div>

            {/* CTA */}
            <div className=" mt-auto hidden md:grid grid-cols-2 gap-2 md:w-fit z-10">
              <Link href={selectedVariant.ctaLink}>
                <Button
                  size={"lg"}
                  variant={"outlineSubmit"}
                  className="w-full  cursor-pointer"
                >
                  <RiWhatsappFill />
                  Konsultasi
                </Button>
              </Link>
              <Button
                size={"lg"}
                variant={"main"}
                onClick={handleQRPayment}
                disabled={paymentLoading}
              >
                <RiShoppingBagFill />
                {paymentLoading ? "Loading..." : "Beli Sekarang"}
              </Button>
            </div>
          </section>
        </section>
      </main>

      <main className="margin my-10">
        <Tabs defaultValue="desc">
          <TabsList
            className={
              "w-full md:w-fit md:bg-transparent space-x-5 sticky top-5 md:shadow-none shadow-secondaryShadow"
            }
          >
            <TabsTrigger
              className={
                "md:data-[state=active]:bg-transparent data-[state=active]:shadow-none text-lg md:text-2xl md:px-0 dark:opacity-70 opacity-50 dark:data-[state=active]:opacity-100 data-[state=active]:opacity-100 data-[state=active]:font-semibold md:data-[state=active]:scale-105"
              }
              value="desc"
            >
              Deskripsi
            </TabsTrigger>

            <TabsTrigger
              className={
                "md:data-[state=active]:bg-transparent data-[state=active]:shadow-none text-lg md:text-2xl md:px-0 dark:opacity-70 opacity-50 dark:data-[state=active]:opacity-100 data-[state=active]:opacity-100 data-[state=active]:font-semibold md:data-[state=active]:scale-105"
              }
              value="faq"
            >
              FAQ
            </TabsTrigger>
          </TabsList>
          <TabsContent value="desc">
            <section className="grid">
              {/* Deskripsi (optional) */}
              {selectedVariant.description && (
                <div>
                  <p className="font-semibold mb-2 mt-5">
                    Tentang {selectedVariant?.name}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedVariant.description}
                  </p>
                </div>
              )}

              {/* Fitur */}
              {Array.isArray(selectedVariant.features) &&
                selectedVariant.features.length > 0 && (
                  <div>
                    <p className="font-semibold mb-2 mt-5">
                      Yang Kamu Dapatkan
                    </p>
                    <div>
                      {selectedVariant.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 mb-1">
                          <span>
                            <RiCheckboxCircleFill className="text-green-500" />
                          </span>
                          <h4 className="font-medium dark:text-neutral-100 text-neutral-900">
                            {feature.feature || feature}
                          </h4>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Syarat */}
              {Array.isArray(selectedVariant.requirements) &&
                selectedVariant.requirements.length > 0 && (
                  <div>
                    <p className="font-semibold mb-2 mt-5">Persyaratan</p>
                    <div>
                      {selectedVariant.requirements.map((req, i) => (
                        <div key={i} className="flex items-start gap-3 mb-1">
                          <RiInformationFill className="dark:text-amber-500 text-yellow-400 mt-1" />
                          <p className="font-medium dark:text-neutral-100 text-neutral-900">
                            {req}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </section>
          </TabsContent>

          <TabsContent value="faq">
            <Accordion type="single" collapsible className="w-full">
              {/* ✅ Better conditional rendering */}
              {faqData && faqData.length > 0 ? (
                faqData.map((el, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger>
                      <div className="flex items-start gap-3 text-left">
                        <RiQuestionFill className="mt-1 min-w-[20px] text-muted-foreground" />
                        <span className="text-sm font-medium leading-snug">
                          {el.question}
                        </span>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className={"px-8 text-justify"}>
                      {el.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                // ✅ Show message when no FAQ data
                <div className="p-4 text-center text-muted-foreground">
                  {faqData === null
                    ? "Memuat FAQ..."
                    : "Belum ada FAQ untuk kategori ini."}
                </div>
              )}
            </Accordion>
          </TabsContent>
        </Tabs>
      </main>

      {/* CTA Mobile*/}
      <div className=" fixed bottom-0 w-full px-3 py-5 bg-lightColor/50 dark:bg-darkColor/50 backdrop-blur-lg z-10 border-t md:hidden grid grid-cols-2 gap-2 md:w-fit">
        <Link href={selectedVariant.ctaLink}>
          <Button
            size={"lg"}
            variant={"outlineSubmit"}
            className="w-full bg-white dark:bg-black cursor-pointer"
          >
            <RiWhatsappFill />
            Konsultasi
          </Button>
        </Link>
        <Button
          size={"lg"}
          variant={"main"}
          onClick={handleQRPayment}
          disabled={paymentLoading}
        >
          <RiShoppingBagFill />
          {paymentLoading ? "Loading..." : "Beli Sekarang"}
        </Button>
      </div>

      {/* QR Payment Modal */}
      <QRPaymentModal />
    </>
  );
}
