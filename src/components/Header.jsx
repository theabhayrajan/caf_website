"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, MoreVertical, Globe, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname(); // ✅ Detect current route

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Evaluation", href: "/evaluation" },
    { name: "Programs & resources", href: "/videoLearningPage" },
    { name: "Articles & Discussions", href: "/articles" },
  ];

  return (
    <header
      className={`w-full z-50 top-0 transition-all duration-300 ${
        isSticky ? "fixed bg-white/95 backdrop-blur-xs" : "relative"
      }`}
    >
      {/* --- Top Black Bar --- */}
      <div className="bg-black text-white">
        <div className="flex items-center justify-between px-4 md:px-6 h-16 max-w-7xl mx-auto 2xl:max-w-none 2xl:mx-0 2xl:px-20">
          {/* Left: Logo + Name */}
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="CAF Logo"
              width={50}
              height={50}
              className="object-contain rounded-sm"
            />
            <span className="font-bold text-sm sm:text-md leading-none hidden sm:inline">
              Cognitive Alliance Forumz (CAF)
            </span>
            <span className="font-medium text-xs sm:hidden">CAF</span>
          </div>

          {/* Right: Greeting + Icons + Hamburger */}
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            <span className="whitespace-nowrap hidden sm:inline mr-5">
              Hi Daniel Brin
            </span>
            <User className="w-5 h-5" />
            <MoreVertical className="w-5 h-5 hidden sm:flex" />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded hover:bg-white/10 active:scale-[.98] transition"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- Navigation Bar --- */}
      <div
        className={`bg-white transition-all duration-300 ${
          isSticky ? "shadow-md" : "shadow-md"
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-6 md:h-14 max-w-7xl mx-auto 2xl:max-w-none 2xl:mx-0 2xl:px-20">
          {/* Left-aligned Nav Links */}
           <nav className="hidden md:flex items-center gap-10 text-sm sm:text-lg md:text-base lg:text-base xl:text-lg font-semibold text-gray-800 h-full justify-center w-full lg:ml-30 [@media(min-width:1180px)_and_(max-width:1278px)]:ml-35 [@media(min-width:1280px)_and_(max-width:1350px)]:ml-50 [@media(min-width:1351px)_and_(max-width:1490px)]:ml-35 [@media(min-width:1490px)_and_(max-width:1535px)]:ml-20  2xl:ml-22">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                (pathname.startsWith(link.href) && link.href !== "/");

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative flex items-center h-full transition-colors duration-200 ${
                    isActive ? "text-[#2E98DA]" : "text-gray-800"
                  } hover:text-[#2E98DA] group`}
                >
                  <span className="pb-1">{link.name}</span>
                  <span
                    className={`absolute left-0 bottom-0 h-[2px] bg-[#2E98DA] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right-side options (desktop only) */}
          <div className="hidden md:flex items-center gap-6 text-sm text-[#2E98DA]">
            <Link
              href="/login"
              className="hover:text-[#2E98DA] transition-colors duration-200 whitespace-nowrap"
            >
              Member login
            </Link>
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#2E98DA] transition-colors duration-200">
              <Globe className="w-4 h-4" />
              <span>English</span>
            </div>
          </div>
        </div>

        {/* --- Mobile Menu --- */}
        <div
          className={`md:hidden bg-white shadow-md transition-max-height duration-300 overflow-hidden ${
            mobileOpen ? "max-h-[400px]" : "max-h-0"
          }`}
        >
          <div className="pb-6 space-y-4">
            <nav className="flex flex-col gap-2">
              {links.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (pathname.startsWith(link.href) && link.href !== "/");

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2 rounded font-medium ${
                      isActive ? "text-[#2E98DA]" : "text-gray-800"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded text-[#2E98DA] font-semibold hover:bg-gray-50"
              >
                Member login
              </Link>
              <button
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50 text-sm"
                onClick={() => setMobileOpen(false)}
              >
                <Globe className="w-4 h-4" />
                <span>English</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
