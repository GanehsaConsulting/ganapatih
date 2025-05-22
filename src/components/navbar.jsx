"use client"
import Link from "next/link"
import Image from "next/image"
import ThemeSwitch from "./theme-switch"
import { navbarItems } from "@/data/system"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { MegaMenuNavbar } from "./mega-menu"
import { ServicesMegaMenu } from "./services-mega-menu"
import { IoSearchOutline } from "react-icons/io5";
import { Button } from "./ui/button"

export const Navbar = ({ children }) => {
    const path = usePathname();

    const [showSearch, setShowSearch] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [expandedId, setExpandedId] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>
            <nav className={`${isScrolled && "pl-4 pr-4 dark:bg-mainColorLight/25 bg-mainColorDark/10 border-b border-darkColor/15 dark:border-lightColor/15 shadow-mainShadow/5 backdrop-blur-3xl"} hidden md:flex navbar min-h-[55px] h-[55px] sticky top-0 px-24 z-[555] duration-200`}>
                <div className="navbar-start flex items-center">
                    <Link
                        href={"/"}
                        className="flex items-center"
                    >
                        <Image
                            width={21}
                            height={21}
                            src={"/assets/icon.png"}
                            alt="Ganapatih Logo"
                            className="dark:brightness-125 z-50"
                        />
                        <Image
                            width={130}
                            height={21}
                            src={"/assets/icon-text.png"}
                            alt="Ganapatih Logo"
                            className="dark:brightness-125 z-50 -ml-1"
                        />
                    </Link>
                    <ul className="menu menu-horizontal px-1">
                        <MegaMenuNavbar
                            id="service"
                            title="Layanan"
                            expandedId={expandedId}
                            setExpandedId={setExpandedId}

                        >
                            <ServicesMegaMenu
                                onClose={() => setExpandedId(null)}
                                expandedId={expandedId} />
                        </MegaMenuNavbar>
                        {navbarItems.slice(0, 4).map((el, idx) => (
                            <li key={idx}>
                                <Link
                                    href={el.href}
                                >
                                    {el.label}
                                </Link>
                            </li>

                        ))}
                    </ul>
                </div>
                <div className="navbar-end space-x-2 relative">
                    {showSearch ? (
                        <label
                            className="input h-[36px] border border-neutral-400/15 bg-lightColor dark:bg-darkColor rounded-btnMain flex items-center pr-2"
                            onBlur={() => {
                                if (!searchValue) setShowSearch(false);
                            }}
                            tabIndex={-1}
                        >
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2.5"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Cari layanan..."
                                className="grow bg-transparent outline-none"
                                value={searchValue}
                                onChange={e => setSearchValue(e.target.value)}
                                onBlur={() => {
                                    if (!searchValue) setShowSearch(false);
                                }}
                            />
                        </label>
                    ) : (
                        <Button
                            size="icon"
                            onClick={() => setShowSearch(true)}
                            aria-label="Show search"
                        >
                            <IoSearchOutline />
                        </Button>
                    )}
                    <ThemeSwitch
                        className={'bg-lightColor dark:bg-darkColor p-2 w-9 h-9 rounded-btnMain aspect-square hover:brightness-110 border'}
                    />
                </div>
            </nav>
            <nav className="md:hidden flex navbar">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">daisyUI</a>
                </div>
                <div className="flex gap-2 items-center">
                         <ThemeSwitch
                        className={'bg-lightColor dark:bg-darkColor p-2 w-9 h-9 rounded-btnMain aspect-square hover:brightness-110 border'}
                    />
                </div>
            </nav>
            <div className={`fixed top-0 z-[80] ${expandedId ? "opacity-100 backdrop-blur-sm w-screen h-screen" : "opacity-0"} noBar bg-lightColor/30 dark:bg-lightColor/20 transition-opacity duration-500`} />
            <div>
                {children}
            </div>
        </>
    )
}