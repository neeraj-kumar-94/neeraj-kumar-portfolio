import "./globals.css";

export const metadata = {
  title: "Neeraj Kumar Portfolio",
  description:
    "Portfolio of Neeraj Kumar, a frontend, WordPress, and Shopify developer based in Shamli, Uttar Pradesh.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
