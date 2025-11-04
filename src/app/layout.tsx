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

export const metadata: Metadata = {
  title: "زخرفة المقالات | زخرفه مقالاتك بسهولة واحترافية",
  description:
    "زخرفة المقالات أو زخرفه المقالات بسهولة. أداة عربية لتزيين النصوص والمقالات بشكل احترافي. زخرفة النصوص والأسماء تلقائيًا مجانًا.",
  keywords: [
    "زخرفة المقالات",
    "زخرفه المقالات",
    "زخرفة مقالات",
    "زخرفه مقالات",
    "زخرف المقالات",
    "زخرفة النصوص",
    "زخرف النصوص",
    "تزيين المقالات",
    "زخرفة الأسماء",
    "زخرفة الكتابة",
    "كتابة مزخرفة",
    "زخرفة تلقائية",
    "زخرفة اونلاين",
  ],
  openGraph: {
    title: "زخرفة المقالات | أداة زخرفة النصوص والمقالات العربية",
    description:
      "أداة زخرفة المقالات العربية — زخرف نصوصك ومقالاتك وأسماءك تلقائيًا وبأنماط جميلة ومتنوعة. تدعم العربية والإنجليزية.",
    url: "https://mkalat.eu.org",
    siteName: "زخرفة المقالات",
    type: "website",
    locale: "ar_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "زخرفة المقالات | أداة زخرفة عربية احترافية",
    description:
      "زخرف نصوصك ومقالاتك العربية بسهولة واحترافية. أداة زخرفة اونلاين تدعم العربية والإنجليزية.",
  },
  alternates: {
    canonical: "https://mkalat.eu.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="qFH1UgQsCxcsRptyv38ySF7EkmT6encpPGOnvMFiOGg"
        />
        {/* Schema.org (Structured Data) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://mkalat.eu.org/#website",
                  url: "https://mkalat.eu.org",
                  name: "زخرفة المقالات",
                  alternateName: "زخرفه المقالات",
                  inLanguage: "ar",
                  description:
                    "أداة زخرفة المقالات العربية لتزيين النصوص والأسماء والكتابة بشكل جميل ومزخرف. زخرف نصوصك بسهولة واحترافية مجانًا.",
                  publisher: {
                    "@type": "Organization",
                    name: "زخرفة المقالات",
                    logo: {
                      "@type": "ImageObject",
                      url: "https://mkalat.eu.org/icon.png",
                    },
                  },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://mkalat.eu.org/?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "WebApplication",
                  "@id": "https://mkalat.eu.org/#app",
                  name: "زخرفة المقالات",
                  operatingSystem: "All",
                  applicationCategory: "UtilitiesApplication",
                  url: "https://mkalat.eu.org",
                  description:
                    "أداة ويب عربية لتزخرف المقالات والنصوص والأسماء تلقائيًا بأسلوب جميل ومميز. تدعم اللغة العربية والإنجليزية.",
                  browserRequirements: "يتطلب متصفح حديث يعمل بالويب.",
                  featureList: [
                    "زخرفة المقالات تلقائيًا",
                    "زخرفة النصوص والأسماء العربية",
                    "تنسيقات زخرفة متعددة",
                    "واجهة عربية سهلة الاستخدام",
                  ],
                  creator: {
                    "@type": "Organization",
                    name: "زخرفة المقالات",
                  },
                  keywords: [
                    "زخرفة المقالات",
                    "زخرفه المقالات",
                    "زخرفة النصوص",
                    "زخرف المقالات",
                    "زخرفة الأسماء",
                    "كتابة مزخرفة",
                    "زخرفة اونلاين",
                  ],
                },
              ],
            }),
          }}
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
            <main className="flex-1 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 flex flex-col justify-center py-10 md:py-12 transition-colors duration-300">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
