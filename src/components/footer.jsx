import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="bg-lightColor dark:bg-darkColor border-t border-border mt-10">
            <div className="margin wrapper py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-muted-foreground">
                <div>
                    <div className="flex items-center">
                        <Image
                            width={35}
                            height={35}
                            src={"/assets/icon.png"}
                            alt="Ganapatih Logo"
                            className="dark:brightness-125 z-50"
                        />
                        <Image
                            width={220}
                            height={21}
                            src={"/assets/icon-text.png"}
                            alt="Ganapatih Logo"
                            className="dark:brightness-125 z-50 -ml-3"
                        />
                    </div>
                    <h2 className="text-base font-semibold text-mainColorLight dark:text-mainColorDark mb-2 mt-5">
                        PT Mitra Optimis Bersama
                    </h2>
                    <p className="text-xs leading-relaxed">
                        Solusi perpajakan dan bisnis Anda. Profesional, terpercaya, dan berpengalaman.
                    </p>
                </div>
                <div>
                    <h3 className="font-semibold text-mainColorLight dark:text-mainColorDark mb-2">
                        Navigasi
                    </h3>
                    <ul className="space-y-1">
                        <li><a href="/" className="hover:underline">Beranda</a></li>
                        <li><a href="/tentang-kami" className="hover:underline">Tentang Kami</a></li>
                        <li><a href="/layanan" className="hover:underline">Layanan</a></li>
                        <li><a href="/kontak" className="hover:underline">Kontak</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-mainColorLight dark:text-mainColorDark mb-2">
                        Kontak
                    </h3>
                    <ul className="space-y-1">
                        <li>Email: info@ganeshaconsulting.id</li>
                        <li>Telepon: +62 812-3456-7890</li>
                        <li>Alamat: Jl. Contoh No. 123, Jakarta</li>
                    </ul>
                </div>
            </div>
            <div className="text-center text-xs py-4 border-t border-border text-muted-foreground">
                &copy; {new Date().getFullYear()} Ganapatih. All rights reserved.
            </div>
        </footer>
    );
};
