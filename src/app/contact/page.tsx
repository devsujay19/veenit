import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact — Veenit Deshmukh",
  description:
    "Get in touch with Veenit Deshmukh to discuss forex, stock markets, trading education, or collaboration.",
};

export default function Page() {
  return (
    <>
      <Navbar />
      <ContactPage />
      <Footer />
    </>
  );
}
