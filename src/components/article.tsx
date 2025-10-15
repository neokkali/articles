"use client";

import * as React from "react";

const Article = () => {
  const [article, setArticle] = React.useState("");
  const [separator, setSeparator] = React.useState(" . ");
  const [wordsLength, setWordsLength] = React.useState(10);
  const [useBrackets, setUseBrackets] = React.useState(true);

  const manageArticle = (article: string) => {
    if (!article.trim()) return "";

    const words = article.trim().split(/\s+/);
    const lines: string[] = [];

    for (let i = 0; i < words.length; i += wordsLength) {
      const group = words.slice(i, i + wordsLength);

      if (useBrackets && group.length > 0) {
        // نختار كلمة عشوائية من السطر
        const randomIndex = Math.floor(Math.random() * group.length);
        // نضع الأقواس حولها مع مسافة
        group[randomIndex] = `[ ${group[randomIndex]} ]`;
      }

      const line = group.join(separator);
      lines.push(line);
    }

    return lines.join("\n");
  };

  return (
    <div className="w-full md:max-w-[80%] mx-auto px-2" dir="rtl">
      <div className="text-center p-4">
        <h1 className="text-4xl">زخرفة المقالات ✨</h1>
        <p className="max-w-md mx-auto text-base md:text-lg">
          يمكنك استخدام أداة زخرفة المقالات لكتابة النصوص العربية بشكل مزخرف
          وجميل. اختر عدد الكلمات والفواصل،
        </p>
      </div>

      <div className="space-y-4">
        <textarea
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          rows={10}
          placeholder="ضع المقال هنا..."
          className="bg-gray-50/80 w-full p-4 rounded-lg text-right text-base md:text-lg"
        />

        <div className="flex flex-wrap items-center gap-3 text-lg">
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

          <label className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={useBrackets}
              onChange={(e) => setUseBrackets(e.target.checked)}
            />
            <span>وضع أقواس عشوائية</span>
          </label>
        </div>

        <div className="bg-gray-50/80  p-4 rounded-lg whitespace-pre-wrap leading-relaxed text-xl">
          {manageArticle(article)}
        </div>
      </div>
    </div>
  );
};

export default Article;
