import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Footer from "@/components/layout/Footer";

// Global SEO & Metadata Configuration
// Optimized for search-first content marketing visibility.
export const metadata = {
  title: "Rise at Seven | Award Winning Search-First Content Marketing Agency",
  description:
    "Engineering semantic relevancy and category signals for both the internet and people.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#f5f4f0] font-sans selection:bg-black selection:text-white">
        {/* Global UI Components */}
        <AnnouncementBar />
        <Navbar />
        <main className="grow focus:outline-none" id="main-content">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
