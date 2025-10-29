import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  variable: "--font-tajawal-arabic",
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  subsets: ["arabic", "latin"],
});

// layout.js
export const metadata: Metadata = {
  title: "زخرفة المقالات | أداة احترافية",
  description: "زخرف نصوصك ومقالاتك العربية بسهولة واحترافية.",
  keywords: [
    "زخرفة المقالات",
    "زخرفه المقالات",
    "زخرفه مقالات",
    "زخرف النصوص",
    "كتابة مزخرفة",
    "تزيين المقالات",
  ],
  openGraph: {
    title: "زخرفة المقالات | أداة احترافية",
    description: "زخرف نصوصك ومقالاتك العربية بسهولة واحترافية.",
    // url: "https://articles.ct.ws",
    siteName: "زخرفة المقالات",
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
