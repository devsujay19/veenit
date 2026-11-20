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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
        className="navbar-header"
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
        <div className="navbar-inner">
            {/* Wordmark */}
            <Link
              href="/"
              className="navbar-brand"
              onClick={() => setMenuOpen(false)}
              aria-label="Veenit Deshmukh — Home"
            >
              <span className="navbar-brand-name">
                Veenit Deshmukh
              </span>
              <span className="navbar-brand-subtitle">
                Trader &amp; Market Guide
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              aria-label="Main navigation"
              className="navbar-desktop"
            >
              <ul>
                {navLinks.map((link) => {
                  const isContact = link.href === "/contact";
                  const isActive =
                    link.href === pathname ||
                    (link.href === "/" && pathname === "/");
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => handleAnchorClick(link.href)}
                        style={{
                          color: isContact
                            ? "#C5A46D"
                            : isActive
                            ? "#F5F2EC"
                            : "#A5A19A",
                        }}
                        onMouseEnter={(e) => {
                          if (!isContact) e.currentTarget.style.color = "#F5F2EC";
                        }}
                        onMouseLeave={(e) => {
                          if (!isContact) {
                            e.currentTarget.style.color = isActive ? "#F5F2EC" : "#A5A19A";
                          }
                        }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Mobile menu toggle */}
            <button
              className="navbar-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              type="button"
            >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="navbar-toggle-line navbar-toggle-line-top"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="navbar-toggle-line navbar-toggle-line-middle"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="navbar-toggle-line navbar-toggle-line-bottom"
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
            className="mobile-menu-overlay"
          >
            <nav id="mobile-navigation" aria-label="Mobile navigation">
              <ul>
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.08 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => handleAnchorClick(link.href)}
                      className={link.href === "/contact" ? "mobile-menu-link mobile-menu-contact" : "mobile-menu-link"}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
