import * as React from "react";
import { Metadata } from "next";
import Article from "@/components/article";

export const metadata: Metadata = {
  title: "زخرفة المقالات - الصفحة الرئيسية",
  description:
    "اكتشف أداة زخرفة المقالات لتزيين النصوص والمقالات العربية بسرعة وسهولة.",
};

export default function Home() {
  return <Article />;
}
