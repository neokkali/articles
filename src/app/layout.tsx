import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  variable: "--font-tajawal-arabic",
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  subsets: ["arabic", "latin"],
});

export const metadata: Metadata = {
  title: "زخرفة المقالات ✨ أداة احترافية",
  description: "زخرف نصوصك ومقالاتك العربية بسهولة واحترافية.",
  keywords: ["زخرفة", "نصوص مزخرفة", "زخرفة المقالات", "كتابة بالعربية"],
  openGraph: {
    title: "زخرفة المقالات ✨ أداة احترافية",
    description: "أداة عربية لزخرفة المقالات والنصوص بسهولة واحترافية.",
    url: "https://articles-virid.vercel.app",
    siteName: "زخرفة المقالات",
    locale: "ar",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta
          name="google-site-verification"
          content="qFH1UgQsCxcsRptyv38ySF7EkmT6encpPGOnvMFiOGg"
        />
      </head>
      <body className={`${tajawal.className} antialiased`}>{children}</body>
    </html>
  );
}
