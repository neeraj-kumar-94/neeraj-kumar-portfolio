import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neeraj Kumar — Frontend Developer | WordPress, Shopify & React",
  description:
    "Portfolio of Neeraj Kumar, a frontend developer with 4+ years of experience building responsive, performance-driven websites and eCommerce platforms with WordPress, Shopify, React.js, and Next.js.",
};

// Applies the stored theme before first paint, so switching never flashes.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Entrance animations start from opacity 0, which is server-rendered as
            an inline style. Without JavaScript nothing would ever reveal them,
            so force everything visible in that case. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <a href="#main" className="skip-link rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
