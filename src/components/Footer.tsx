"use client";

import Link from "next/link";

const footerNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Expertise", href: "/#expertise" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX";

  return (
    <footer
      style={{
        backgroundColor: "#0B0B0D",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "60px 32px 36px",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Top section */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "40px",
            marginBottom: "48px",
          }}
        >
          {/* Identity */}
          <div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.25rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                color: "#F5F2EC",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}
            >
              Veenit Deshmukh
            </p>
            <p
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: "0.7rem",
                fontWeight: 400,
                letterSpacing: "0.18em",
                color: "#C5A46D",
                textTransform: "uppercase",
              }}
            >
              Forex &amp; Stock Market Trader
            </p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px 24px",
                padding: 0,
              }}
            >
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 400,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#A5A19A",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#F5F2EC";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.color = "#A5A19A";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact Veenit on WhatsApp"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 20px",
              border: "1px solid rgba(197, 164, 109, 0.3)",
              borderRadius: "2px",
              textDecoration: "none",
              color: "#C5A46D",
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "#C5A46D";
              (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(197, 164, 109, 0.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(197, 164, 109, 0.3)";
              (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
            }}
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>

        {/* Disclaimer */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "28px",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: "0.6875rem",
              fontWeight: 400,
              lineHeight: 1.7,
              color: "rgba(165, 161, 154, 0.6)",
              maxWidth: "760px",
            }}
          >
            Financial markets involve risk. Information and guidance provided through this website are for
            educational and informational purposes and should not be considered guaranteed investment returns
            or personalised financial advice.
          </p>
        </div>

        {/* Copyright */}
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "0.6875rem",
            fontWeight: 400,
            color: "rgba(165, 161, 154, 0.4)",
          }}
        >
          © {currentYear} Veenit Deshmukh. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
