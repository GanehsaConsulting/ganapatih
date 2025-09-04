"use client"
import Link from "next/link"
import Image from "next/image"
import ThemeSwitch from "./theme-switch"
import { navbarItems } from "@/data/system"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { MegaMenuNavbar } from "./mega-menu"
import { ServicesMegaMenu } from "./services-mega-menu"
import { IoSearchOutline, IoMenuOutline, IoChevronForward } from "react-icons/io5"
import { Button } from "./ui/button"

export const Navbar = ({ children }) => {
    const path = usePathname()
    const [showSearch, setShowSearch] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [expandedId, setExpandedId] = useState(null)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY
            setIsScrolled(scrollPosition > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mega menu when route changes
    useEffect(() => {
        setExpandedId(null)
    }, [path])

    const handleSearchToggle = () => {
        setShowSearch(!showSearch)
        if (showSearch) {
            setSearchValue("")
        }
    }

    const handleSearchBlur = () => {
        if (!searchValue) {
            setShowSearch(false)
        }
    }

    const closeMobileMenu = () => {
        setExpandedId(null)
    }

    const Logo = () => (
        <Link href="/" className="flex items-center gap-1 z-50">
            <Image
                width={21}
                height={21}
                src="/assets/icon.png"
                alt="Ganapatih Logo"
                className="dark:brightness-125"
            />
            <Image
                width={130}
                height={21}
                src="/assets/icon-text.png"
                alt="Ganapatih Logo"
                className="dark:brightness-125"
            />
        </Link>
    )

    const SearchComponent = ({ isMobile = false }) => (
        <>
            {showSearch ? (
                <div className={`flex items-center ${isMobile ? 'w-full' : ''}`}>
                    <label className={`input h-[36px] border border-neutral-400/15 bg-lightColor dark:bg-darkColor rounded-btnMain flex items-center pr-2 ${isMobile ? 'flex-1' : ''}`}>
                        <svg className="h-[1em] opacity-50 ml-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
                            className="grow bg-transparent outline-none px-2"
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            onBlur={handleSearchBlur}
                            onKeyDown={e => {
                                if (e.key === 'Escape') {
                                    setShowSearch(false)
                                    setSearchValue("")
                                }
                            }}
                        />
                    </label>
                </div>
            ) : (
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleSearchToggle}
                    aria-label="Open search"
                    className="bg-lightColor dark:bg-darkColor hover:brightness-110 border"
                >
                    <IoSearchOutline size={18} />
                </Button>
            )}
        </>
    )

    return (
        <>
            {/* Desktop Navbar */}
            <nav className={`
                hidden lg:flex navbar min-h-[60px] h-[60px] sticky top-0 z-10 
                transition-all duration-300 ease-in-out 
                ${isScrolled
                    ? "px-6 xl:px-12 dark:bg-baseColorDark/80 bg-baseColorLight/80 border-b border-darkColor/10 dark:border-lightColor/10 shadow-lg backdrop-blur-xl"
                    : "px-6 xl:px-24"
                }
            `}>
                <div className="navbar-start flex items-center">
                    <Logo />
                    <ul className="menu menu-horizontal px-1 ml-8">
                        <MegaMenuNavbar
                            id="service"
                            title="Layanan"
                            expandedId={expandedId}
                            setExpandedId={setExpandedId}
                        >
                            <ServicesMegaMenu
                                onClose={() => setExpandedId(null)}
                                expandedId={expandedId}
                            />
                        </MegaMenuNavbar>
                        {navbarItems.slice(0, 4).map((el, idx) => (
                            <li key={idx}>
                                <Link
                                    href={el.href}
                                    className={`
                                        hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg
                                        transition-colors duration-200
                                        ${path === el.href ? 'bg-neutral-100 dark:bg-neutral-800' : ''}
                                    `}
                                >
                                    {el.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="navbar-end flex items-center gap-3">
                    <SearchComponent />
                    <ThemeSwitch className="bg-lightColor dark:bg-darkColor p-2 w-9 h-9 rounded-btnMain hover:brightness-110 border transition-all duration-200" />
                </div>
            </nav>

            {/* Mobile Navbar */}
            <nav className={`
                lg:hidden flex items-center justify-between sticky top-0 z-[555] 
                min-h-[56px] h-[56px] px-4 sm:px-6
                transition-all duration-300 ease-in-out
                ${isScrolled && !expandedId
                    ? "dark:bg-baseColorDark/80 bg-baseColorLight/80 border-b border-darkColor/10 dark:border-lightColor/10 shadow-lg backdrop-blur-xl"
                    : "shadow-none"
                }
            `}>
                <Logo />

                <div className="flex items-center gap-2">
                    <div className="hidden sm:block">
                        <SearchComponent />
                    </div>
                    <ThemeSwitch className="bg-lightColor dark:bg-darkColor p-2 w-9 h-9 rounded-btnMain hover:brightness-110 border transition-all duration-200" />

                    {/* Mobile Menu */}
                    <MegaMenuNavbar
                        id="mobile-menu"
                        expandedId={expandedId}
                        setExpandedId={setExpandedId}
                        arrowVisibility="hidden"
                        icon={<IoMenuOutline size={18} />}
                        iconClassName="bg-lightColor dark:bg-darkColor hover:brightness-110 border p-2 w-9 h-9 rounded-btnMain transition-all duration-200"
                        isMobile={true}
                    >
                        <div className="p-6 space-y-6 min-h-screen">
                            {/* Services Section */}
                            <div className="">
                                <ServicesMegaMenu
                                    onClose={closeMobileMenu}
                                    expandedId={expandedId}
                                    isMobile={true}
                                    path={path}
                                />
                            </div>
                        </div>
                    </MegaMenuNavbar>
                </div>
            </nav>

            {/* Mega Menu Backdrop for Desktop */}
            <div className={`fixed top-0 z-[80] transition-opacity duration-500
                ${expandedId
                    ? "opacity-100 backdrop-blur-none md:backdrop-blur-sm w-screen h-screen"
                    : "opacity-0 pointer-events-none"
                } 
                md:bg-lightColor/30 dark:md:bg-lightColor/20 bg-lightColor dark:bg-darkColor
            `} />

            {/* Main Content */}
            <div className={expandedId === 'mobile-menu' ? 'pointer-events-none' : ''}>
                {children}
            </div>
        </>
    )
}