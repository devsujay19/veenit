"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Experience", href: "/#approach" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleAnchorClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (pathname === "/") {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled
            ? "rgba(11, 11, 13, 0.95)"
            : "transparent",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 32px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
            {/* Wordmark */}
            <Link
              href="/"
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                gap: "1px",
              }}
              aria-label="Veenit Deshmukh — Home"
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.125rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "#F5F2EC",
                  lineHeight: 1.2,
                  textTransform: "uppercase",
                }}
              >
                Veenit Deshmukh
              </span>
              <span
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 400,
                  letterSpacing: "0.22em",
                  color: "#C5A46D",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                Trader &amp; Market Guide
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              aria-label="Main navigation"
              className="hidden md:flex items-center"
              style={{ gap: "36px" }}
            >
              {navLinks.map((link) => {
                const isContact = link.href === "/contact";
                const isActive =
                  link.href === pathname ||
                  (link.href === "/" && pathname === "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => handleAnchorClick(link.href)}
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      color: isContact
                        ? "#C5A46D"
                        : isActive
                        ? "#F5F2EC"
                        : "#A5A19A",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isContact) (e.currentTarget as HTMLElement).style.color = "#F5F2EC";
                    }}
                    onMouseLeave={(e) => {
                      if (!isContact) (e.currentTarget as HTMLElement).style.color = isActive ? "#F5F2EC" : "#A5A19A";
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Hamburger */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "32px",
              }}
            >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "block",
                height: "1px",
                background: "#F5F2EC",
                transformOrigin: "center",
              }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "block",
                height: "1px",
                background: "#F5F2EC",
              }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "block",
                height: "1px",
                background: "#F5F2EC",
                transformOrigin: "center",
              }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 40,
              backgroundColor: "rgba(11, 11, 13, 0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "0",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.08 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ width: "100%", textAlign: "center" }}
              >
                <Link
                  href={link.href}
                  onClick={() => handleAnchorClick(link.href)}
                  style={{
                    display: "block",
                    padding: "20px 24px",
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: 400,
                    letterSpacing: "0.04em",
                    color: link.href === "/contact" ? "#C5A46D" : "#F5F2EC",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    transition: "color 0.2s ease",
                  }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
