import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer"; // ✅ corrected import case
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Veloxlogistics",
  description: "Velox Logistics provides fast, reliable, and affordable delivery services for businesses and individuals. From local courier to nationwide shipping, we ensure your packages arrive safely and on time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
