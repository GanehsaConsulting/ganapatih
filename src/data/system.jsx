import { RiBarChartLine, RiBuilding2Line, RiBuilding3Line, RiBuildingLine, RiCalculatorLine, RiCheckDoubleLine, RiFileCopyLine, RiFileTextLine, RiGlobalLine, RiScalesLine, RiSearchLine, RiSettings3Line, RiSmartphoneLine, RiUser3Line } from "react-icons/ri";

export const navbarItems = [
    { label: 'Tentang Kami', href: '/tentang' },
    { label: 'Testimoni', href: '/testimoni' },
    { label: 'Kontak', href: '/kontak' },
];

export const sidebarItems = {
    categories: [
        { key: "law", label: "Layanan Hukum" },
        { key: "creative", label: "Layanan Kreatif" },
        { key: "finance", label: "Layanan Finansial" },
        { key: "management", label: "Layanan Manajemen" },
        { key: "workspace", label: "Layanan Workspace" },
    ],
    rangeHarga: [
        { label: '< Rp 500.000', value: '0-500000' },
        { label: '< Rp 1.000.000', value: '500000-1000000' },
        { label: '< Rp 2.000.000', value: '1000000-2000000' },
        { label: '> Rp. 2.000.000', value: '2000000-9999999999' },
    ]


}

export const heroSection = {
    title: 'Solusi Pajak Terpercaya untuk Bisnis Anda',
    subtitle: 'Ganapatih, bagian dari PT Mitra Optimis Bersama, memberikan layanan konsultasi pajak yang profesional, efisien, dan aman untuk kebutuhan pribadi maupun perusahaan.',
    cta: {
        label: 'Mulai Konsultasi',
        href: '/konsultasi',
    },
    image: '/images/hero-tax-consultant.jpg',
};


export const services = {
    law: [
        {
            logo: "https://cms-ganesha.ganeshaconsulting.co.id/uploads/PT_b10fa5d6c0.webp",
            href: "/pendirian-pt",
            icon: <RiBuilding2Line />,
            label: "Legalitas PT",
            desc: "Ayo Mulai Bisnis Anda dengan Langkah Tepat! Kami menyediakan layanan pendirian PT yang cepat.",
            accentLight: "#37938c",
            accentDark: "#8BD9D2",
            subs: ["PT Dasar", "PT Lengkap", "PT PKP"],
            mainProduct: true,
            id: 2
        },
        {
            logo: "https://cms-ganesha.ganeshaconsulting.co.id/uploads/CV_2e52983e66.webp",
            href: "/pendirian-cv",
            icon: <RiBuilding3Line />,
            label: "Legalitas CV",
            desc: "Ayo Mulai Bisnis Anda dengan Langkah Tepat! Kami menyediakan layanan pendirian CV yang cepat.",
            accentLight: "#b49377",
            accentDark: "#E8D0BE",
            subs: ["CV Dasar", "CV Lengkap"],
            mainProduct: true,
            id: 3
        },
        {
            logo: "https://cms-ganesha.ganeshaconsulting.co.id/uploads/Badan_Usaha_af40b3bdf6.webp",
            href: "/badan-usaha",
            icon: <RiBuildingLine />,
            label: "Badan Usaha",
            desc: "Mulai Bisnis Anda dengan Langkah Yang Tepat! Kami menyediakan layanan pendirian badan usaha yang cepat.",
            accentLight: "#0cb0c6",
            accentDark: "#a3f4ff",
            subs: ["Yayasan", "Koperasi", "Firma"],
            mainProduct: false,
            id: 5
        },
        {
            logo: "https://cms-ganesha.ganeshaconsulting.co.id/uploads/Izin_505cbde047.webp",
            href: "/perizinan",
            icon: <RiFileTextLine />,
            label: "Izin Tambahan",
            desc: "Bantuan penuh pengalaman untuk memperoleh izin tambahan secara cepat dan efisien.",
            accentLight: "#9298E0",
            accentDark: "#c9ccf8",
            subs: ["Izin Usaha Mikro Kecil (IUMK)", "Surat Izin Usaha Perdagangan (SIUP)", "Nomor Induk Berusaha (NIB)"],
            mainProduct: false,
            id: 4
        },
        {
            logo: "https://cms-ganesha.ganeshaconsulting.co.id/uploads/HAKI_dbf6b3b0b5.webp",
            href: "/haki",
            icon: <RiFileCopyLine />,
            label: "HAKI",
            desc: "Lindungi merek, hak cipta, dan paten bisnis Anda dengan layanan HAKI kami.",
            accentLight: "#e94949",
            accentDark: "#eb9090",
            subs: ["Pendaftaran Merek Dagang", "Pendaftaran Hak Cipta", "Pendaftaran Paten"],
            mainProduct: false,
            id: 6
        }
    ],
    creative: [
        {
            logo: "https://cms-ganesha.ganeshaconsulting.co.id/uploads/Web_60e1017d97.webp",
            href: "/web-development",
            icon: <RiGlobalLine />,
            label: "Pendirian Website",
            desc: "Optimalkan presensi digital perusahaan Anda dengan layanan pembuatan website kami.",
            accentLight: "#2a83ff",
            accentDark: "#7DADF2",
            subs: ["Mini Web Company Profile", "Custom Website"],
            mainProduct: true,
            id: 5
        },
        {
            logo: "https://cms-ganesha.ganeshaconsulting.co.id/uploads/SOCMED_ca55c6f9c6.webp",
            href: "/social-media-management",
            icon: <RiSmartphoneLine />,
            label: "Social Media Management",
            desc: "Sosial Media Manajemen adalah kunci sukses modern untuk membentuk citra merek yang kuat.",
            accentLight: "#6b4bc3",
            accentDark: "#a889ef",
            subs: ["Content Creation", "Account Management", "Social Media Ads"],
            mainProduct: false,
            id: 12
        },
        {
            logo: "https://cms-ganesha.ganeshaconsulting.co.id/uploads/Software_02c0abf6d4.webp",
            href: "/software-management-system",
            icon: <RiSettings3Line />,
            label: "Software Management System",
            desc: "Solusi terkini untuk meningkatkan efisiensi dan kinerja operasional.",
            accentLight: "#D7985C",
            accentDark: "#e4ba93",
            subs: ["Accounting Software", "Inventory Management", "CRM System"],
            mainProduct: false,
            id: 7
        }
    ],
    finance: [
        {
            logo: "https://cms-ganesha.ganeshaconsulting.co.id/uploads/TAX_379ea7fdaf.webp",
            href: "/konsultan-pajak",
            icon: <RiBarChartLine />,
            label: "Konsultan Pajak",
            desc: "Optimalisasi Pajak Anda dengan Bantuan Ahli Pajak Terpercaya!",
            accentLight: "#1175af",
            accentDark: "#80cbf7",
            subs: ["Konsultasi Pajak", "Perencanaan Pajak", "Pelaporan Pajak"],
            mainProduct: true,
            id: 1
        },
        {
            logo: "https://cms-ganesha.ganeshaconsulting.co.id/uploads/Akuntansi_c91813d5a3.webp",
            href: "/pelayanan-akuntansi",
            icon: <RiCalculatorLine />,
            label: "Pelayanan Akuntansi",
            desc: "Dukungan akuntansi terpercaya untuk pencatatan keuangan dan pelaporan pajak.",
            accentLight: "#adad0f",
            accentDark: "#f5f597",
            subs: ["Pembukuan", "Laporan Keuangan", "Kepatuhan Pajak"],
            mainProduct: false,
            id: 7
        },
        {
            logo: "https://cms-ganesha.ganeshaconsulting.co.id/uploads/AUDIT_5ca40549b9.webp",
            href: "/audit",
            icon: <RiUser3Line />,
            label: "Audit",
            desc: "Layanan Audit profesional kami memberikan keyakinan terhadap informasi keuangan Anda.",
            accentLight: "#a17f30",
            accentDark: "#ead08d",
            subs: ["Audit Internal", "Audit Eksternal", "Audit Kepatuhan"],
            mainProduct: false,
            id: 9
        }
    ],
    management: [
        {
            logo: "https://cms-ganesha.ganeshaconsulting.co.id/uploads/MANAJEMEN_0ddf250b03.webp",
            href: '/pelayanan-manajemen',
            icon: <RiSettings3Line />,
            label: 'Pelayanan Manajemen',
            desc: "Layanan pengelolaan bisnis yang terintegrasi dan efisien.",
            accentLight: "#6851E1",
            accentDark: "#af9fff",
            subs: ["Alamat Bisnis", "Layanan Resepsionis", "Pengelolaan Surat"],
            mainProduct: false,
            id: 10
        }
    ],
    workspace: [
        {
            logo: "https://cms-ganesha.ganeshaconsulting.co.id/uploads/GO_SPACE_3f8b8b02fc.webp",
            href: "/go-space",
            icon: <RiCheckDoubleLine />,
            label: "Go Space",
            desc: "Nikmati layanan virtual office, meeting space, dan workspace yang fleksibel di lokasi strategis Jakarta",
            accentLight: "#9801a3",
            accentDark: "#ce8be9",
            subs: ["Virtual Office", "Meeting Room", "Coworking Space"],
            mainProduct: false,
            id: 8
        },
        {
            logo: "https://cms-ganesha.ganeshaconsulting.co.id/uploads/VO_df81a85a83.webp",
            href: "/virtual-office",
            icon: <RiBuilding3Line />,
            label: "Virtual Office",
            desc: "Alamat bisnis strategis dan profesional untuk kebutuhan domisili perusahaan Anda.",
            accentLight: "#555e67",
            accentDark: "#b4bdc6",
            subs: ["Alamat Bisnis", "Layanan Resepsionis", "Pengelolaan Surat"],
            main: false,
            id: 11
        }
    ]
};
