import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/providers/theme-provider";

const tajawal = Tajawal({
  variable: "--font-tajawal-arabic",
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  subsets: ["arabic", "latin"],
});

// layout.js
// export const metadata: Metadata = {
//   title: "زخرفة المقالات | أداة احترافية",
//   description: "زخرف نصوصك ومقالاتك العربية بسهولة واحترافية.",
//   keywords: [
//     "زخرفة المقالات",
//     "زخرفه المقالات",
//     "زخرفه مقالات",
//     "زخرف النصوص",
//     "كتابة مزخرفة",
//     "تزيين المقالات",
//   ],
//   openGraph: {
//     title: "زخرفة المقالات | أداة احترافية",
//     description: "زخرف نصوصك ومقالاتك العربية بسهولة واحترافية.",
//     // url: "https://articles.ct.ws",
//     siteName: "زخرفة المقالات",
//     type: "website",
//   },
// };
//
export const metadata: Metadata = {
  title: "زخرفة المقالات | زخرف نصوصك ومقالاتك بسهولة",
  description:
    "زخرف نصوصك ومقالاتك العربية بسهولة واحترافية. أداة زخرفة النصوص والمقالات تدعم جميع الحروف العربية والإنجليزية وتوفر أنماطًا جميلة ومميزة للكتابة.",
  keywords: [
    "زخرفة المقالات",
    "زخرفه المقالات",
    "زخرفه مقالات",
    "زخرفة مقالات",
    "زخرف النصوص",
    "زخرفة النصوص",
    "كتابة مزخرفة",
    "زخرفة الكتابة",
    "تزيين المقالات",
    "زخرفة الأسماء",
    "زخرف مقالك",
    "زخارف عربية",
    "زخرفة اونلاين",
    "زخرفة تلقائية",
  ],
  openGraph: {
    title: "زخرفة المقالات | أداة احترافية لزخرفة النصوص والمقالات",
    description:
      "استخدم أداة زخرفة المقالات لتزيين نصوصك وكتاباتك العربية بشكل احترافي وجميل. سهلة الاستخدام وسريعة وتعمل على جميع الأجهزة.",
    siteName: "زخرفة المقالات",
    type: "website",
    locale: "ar_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "زخرفة المقالات | أداة احترافية",
    description:
      "زخرف نصوصك ومقالاتك العربية بسهولة واحترافية باستخدام أفضل أداة زخرفة عربية.",
  },
  // alternates: {
  //   canonical: "https://articles.ct.ws",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="qFH1UgQsCxcsRptyv38ySF7EkmT6encpPGOnvMFiOGg"
        />
      </head>
      <body className={`${tajawal.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
