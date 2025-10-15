import * as React from "react";
import { Metadata } from "next";
import Article from "@/components/article";

export const metadata: Metadata = {
  title: "زخرفة المقالات ✨ أداة احترافية",
  description: "زخرف نصوصك ومقالاتك العربية بسهولة.",
  keywords: ["زخرفة", "زخرفة المقالات", "نصوص عربية", "كتابة مزخرفة"],
  openGraph: {
    title: "زخرفة المقالات ✨ أداة احترافية",
    description: "زخرف نصوصك ومقالاتك العربية بسهولة.",
    url: "https://articles-virid.vercel.app",
    siteName: "زخرفه المقالات",
    type: "website",
  },
};

export default function Home() {
  return <Article />;
}
