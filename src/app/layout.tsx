import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Veenit Deshmukh — Forex & Stock Market Trader",
  description:
    "Veenit Deshmukh helps individuals understand financial markets, learn trading, and explore forex and stock market opportunities with greater confidence.",
  keywords: [
    "Veenit Deshmukh",
    "forex trader",
    "stock market trader",
    "trading education",
    "investment guidance",
    "market knowledge",
  ],
  openGraph: {
    title: "Veenit Deshmukh — Forex & Stock Market Trader",
    description:
      "Helping individuals understand financial markets and develop informed trading knowledge.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
