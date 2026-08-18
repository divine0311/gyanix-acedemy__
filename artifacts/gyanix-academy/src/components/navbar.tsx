import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, MessageCircle, MapPin, Clock } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/courses", label: "Courses" },
  { href: "/scholarship", label: "G-SET Scholarship" },
  { href: "/results", label: "Results" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faculty", label: "Faculty" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* Top Info Bar */}
      <div className="hidden lg:block bg-[#075E54] text-white text-xs py-2 z-50 relative border-b border-[#128C7E]">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="tel:+918950175314" className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors font-medium">
              <Phone className="w-3 h-3 text-[#25D366]" />
              89501-75314
            </a>
            <span className="flex items-center gap-1.5 text-white/90">
              <MapPin className="w-3 h-3 text-[#25D366]" />
              Defence Colony, Kaithal, Haryana
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/90">
              <Clock className="w-3 h-3 text-[#25D366]" />
              Mon–Sat: 9 AM – 7 PM
            </span>
            <span className="flex items-center gap-1.5 text-[#25D366] font-bold">
              ★ 5.0 Google · 84+ Justdial Reviews
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 border-t-2 border-[#25D366] transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAFAFA]/95 backdrop-blur-md shadow-md py-2"
            : "bg-[#FAFAFA] py-3"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative">
              <svg
                width="38" height="38" viewBox="0 0 40 40" fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:scale-110"
              >
                <path d="M12 28L20 12L28 28" stroke="#1e3a8a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 21L24 21" stroke="#1e3a8a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="28" cy="12" r="4.5" fill="#f4841f"/>
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[22px] font-extrabold text-primary tracking-tight">Gyanix</span>
              <span className="text-[9px] font-black text-secondary tracking-[0.3em] uppercase mt-0.5">Academy</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-3 py-2 text-sm font-medium group"
                >
                  <span
                    className={`transition-colors duration-200 ${
                      isActive ? "text-secondary" : "text-gray-700 group-hover:text-secondary"
                    }`}
                  >
                    {link.label}
                  </span>
                  {/* Animated underline */}
                  <span
                    className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-secondary transition-all duration-300 origin-left ${
                      isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/918950175314"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] text-white text-sm font-bold shadow-md shadow-[#25D366]/30 hover:bg-[#128C7E] hover:scale-105 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
              WhatsApp
            </a>
            <Link href="/contact">
              <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-secondary text-white text-sm font-bold shadow-md shadow-secondary/30 hover:bg-secondary/90 hover:scale-105 hover:shadow-xl hover:shadow-secondary/50 transition-all duration-200 active:scale-95">
                <Phone className="w-4 h-4" />
                Enquire Now
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden z-50 relative p-2 rounded-lg text-primary hover:bg-primary/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-gray-100 bg-white shadow-xl"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = location === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                          isActive
                            ? "bg-secondary/10 text-secondary"
                            : "text-gray-700 hover:bg-gray-50 hover:text-secondary"
                        }`}
                      >
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                        )}
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.04 + 0.05 }}
                  className="flex gap-3 mt-3 pt-3 border-t border-gray-100"
                >
                  <a
                    href="https://wa.me/918950175314"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-green-500 text-green-600 text-sm font-bold hover:bg-green-50 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <Link href="/contact" className="flex-1">
                    <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-white text-sm font-bold hover:bg-secondary/90 transition-colors">
                      <Phone className="w-4 h-4" />
                      Enquire Now
                    </button>
                  </Link>
                </motion.div>

                {/* Mobile Info */}
                <div className="flex items-center justify-center gap-4 py-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 9 AM – 7 PM</span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-secondary font-semibold">★ 5.0 Rated</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
