"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeSwitch from "./theme-switch";
import { navbarItems } from "@/data/system";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MegaMenuNavbar } from "./mega-menu";
import { ServicesMegaMenu } from "./services-mega-menu";
import { IoSearchOutline, IoMenuOutline } from "react-icons/io5";
import { Button } from "./ui/button";
import { SearchModal } from "./search-modal";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = ({ children }) => {
  const path = usePathname();
  const [expandedId, setExpandedId] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mega menu when route changes
  useEffect(() => {
    setExpandedId(null);
  }, [path]);

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
  );

  const SearchButton = ({ isMobile = false }) => (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => setShowModal(true)}
      aria-label="Open search"
      className={`bg-lightColor dark:bg-darkColor hover:brightness-110 border ${
        isMobile ? "w-full" : ""
      }`}
    >
      <IoSearchOutline size={18} />
    </Button>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`
          hidden lg:flex navbar min-h-[60px] h-[60px] sticky top-0 z-100
          transition-all duration-300 ease-in-out 
          ${
            isScrolled
              ? "px-6 xl:px-12 dark:bg-baseColorDark/80 bg-baseColorLight/80 border-b border-darkColor/10 dark:border-lightColor/10 shadow-lg backdrop-blur-xl"
              : "px-6 xl:px-24"
          }
        `}
      >
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
                    ${
                      path === el.href
                        ? "bg-neutral-100 dark:bg-neutral-800"
                        : ""
                    }
                  `}
                >
                  {el.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end flex items-center gap-3">
          <SearchButton />
          <ThemeSwitch className="bg-lightColor dark:bg-darkColor p-2 w-9 h-9 rounded-btnMain hover:brightness-110 border transition-all duration-200" />
        </div>
      </nav>

      {/* Search Modal with animation */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] flex justify-center items-start h-full bg-black/50 backdrop-blur-sm"
          >
            <SearchModal
              isScrolled={isScrolled}
              onClose={() => setShowModal(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Navbar */}
      <nav
        className={`
          lg:hidden flex items-center justify-between sticky top-0 z-[555] 
          min-h-[56px] h-[56px] px-4 sm:px-6
          transition-all duration-300 ease-in-out
          ${
            isScrolled && !expandedId
              ? "dark:bg-baseColorDark/80 bg-baseColorLight/80 border-b border-darkColor/10 dark:border-lightColor/10 shadow-lg backdrop-blur-xl"
              : "shadow-none"
          }
        `}
      >
        <Logo />
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <SearchButton />
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
              <ServicesMegaMenu
                onClose={() => setExpandedId(null)}
                expandedId={expandedId}
                isMobile={true}
                path={path}
              />
            </div>
          </MegaMenuNavbar>
        </div>
      </nav>

      {/* Mega Menu Backdrop for Desktop */}
      <div
        className={`fixed top-0 z-[80] transition-opacity duration-500
          ${
            expandedId
              ? "opacity-100 backdrop-blur-none md:backdrop-blur-sm w-screen h-screen"
              : "opacity-0 pointer-events-none"
          } 
          md:bg-lightColor/30 dark:md:bg-lightColor/20 bg-lightColor dark:bg-darkColor
        `}
      />

      {/* Main Content */}
      <div
        className={expandedId === "mobile-menu" ? "pointer-events-none" : ""}
      >
        {children}
      </div>
    </>
  );
};
