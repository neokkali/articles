import * as React from "react";
import { Metadata } from "next";
import Article from "@/components/article";

export const metadata: Metadata = {
  title: "زخرفة المقالات | زخرف نصوصك ومقالاتك بسهولة",
  description:
    "استخدم أداة زخرفة المقالات لتزيين النصوص والمقالات العربية والإنجليزية بسهولة واحترافية. زخرف نصك الآن مجانًا.",
  keywords: [
    "زخرفة المقالات",
    "زخرفه المقالات",
    "زخرفة النصوص",
    "زخرف المقالات",
    "زخرفه مقالات",
    "كتابة مزخرفة",
  ],
};

export default function Home() {
  return <Article />;
}
