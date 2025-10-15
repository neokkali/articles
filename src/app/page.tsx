"use client";

import * as React from "react";

export default function Home() {
  const [article, setArticle] = React.useState("");
  const [separator, setSeparator] = React.useState(" . ");
  const [wordsLength, setWordsLength] = React.useState(10);

  const manageArticle = (article: string) => {
    if (!article.trim()) return "";

    // تقسيم النص إلى كلمات
    const words = article.trim().split(/\s+/);

    // تجميع الكلمات في أسطر
    const lines: string[] = [];
    for (let i = 0; i < words.length; i += wordsLength) {
      // نأخذ مجموعة من الكلمات حسب wordsLength
      const group = words.slice(i, i + wordsLength);
      // نجمعها بفاصل separator
      const line = group.join(separator);
      lines.push(line);
    }

    // كل سطر جديد في سطر منفصل
    return lines.join("\n");
  };

  return (
    <div className="w-full md:max-w-[80%] mx-auto px-2" dir="rtl">
      <div className="text-center p-4 text-2xl md:text-4xl">
        زخرفة المقالات ✨
      </div>

      <div className="space-y-4">
        <textarea
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          rows={10}
          placeholder="ضع المقال هنا..."
          className="bg-red-100 w-full p-4 rounded-lg text-right"
        />

        <div className="flex flex-wrap items-center gap-2">
          <label>عدد الكلمات في كل سطر:</label>
          <input
            type="number"
            value={wordsLength}
            onChange={(e) => setWordsLength(parseInt(e.target.value))}
            className="border p-1 w-24 text-center"
          />

          <label>الفاصل بين الكلمات:</label>
          <input
            type="text"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            className="border p-1 w-24 text-center"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded-lg whitespace-pre-wrap leading-relaxed">
          {manageArticle(article)}
        </div>
      </div>
    </div>
  );
}
