"use client";

import * as React from "react";
import { motion } from "framer-motion";

const Article = () => {
  const [article, setArticle] = React.useState("");
  const [separator, setSeparator] = React.useState(" • ");
  const [wordsLength, setWordsLength] = React.useState(10);
  const [useBrackets, setUseBrackets] = React.useState(true);

  const manageArticle = (article: string) => {
    if (!article.trim()) return "";

    const words = article.trim().split(/\s+/);
    const lines: string[] = [];

    for (let i = 0; i < words.length; i += wordsLength) {
      const group = words.slice(i, i + wordsLength);

      if (useBrackets && group.length > 0) {
        const randomIndex = Math.floor(Math.random() * group.length);
        group[randomIndex] = `[ ${group[randomIndex]} ]`;
      }

      lines.push(group.join(separator));
    }

    return lines.join("\n");
  };

  return (
    <section
      className="
        bg-gradient-to-br 
        from-gray-50 to-gray-200 
        dark:from-gray-900 dark:to-gray-950 
        text-gray-900 dark:text-gray-100 
        flex flex-col justify-center
        py-10 md:py-14
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6">
        {/* العنوان الرئيسي */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10 md:mb-14 py-2"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            أداة زخرفة المقالات ✨
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            حول مقالاتك العادية إلى نصوص جميلة ومزخرفة تلقائيًا. اكتب المقال،
            اختر الإعدادات المناسبة، ودع الأداة تتكفل بالباقي.
          </p>
        </motion.div>

        {/* واجهة الأداة */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-4 sm:p-6 md:p-8 space-y-8 overflow-hidden"
        >
          {/* مربع النص */}
          <textarea
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            rows={10}
            placeholder="✍️ اكتب نص مقالك هنا..."
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-5 text-right text-base sm:text-lg md:text-xl focus:ring-2 focus:ring-blue-500 outline-none transition resize-none placeholder:text-gray-400"
            dir="rtl"
          />

          {/* إعدادات التنسيق */}
          <div
            className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              lg:grid-cols-3 
              gap-4 sm:gap-6 
              justify-items-center 
              text-base sm:text-lg
            "
          >
            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <label className="font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
                عدد الكلمات في كل سطر:
              </label>
              <input
                type="number"
                value={wordsLength}
                onChange={(e) => setWordsLength(parseInt(e.target.value))}
                className="w-full sm:w-24 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-center focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
              <label className="font-semibold text-gray-800 dark:text-gray-200 whitespace-nowrap">
                الفاصل بين الكلمات:
              </label>
              <input
                type="text"
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="w-full sm:w-24 p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-center focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <label className="flex items-center justify-center gap-2 cursor-pointer select-none w-full sm:w-auto">
              <input
                type="checkbox"
                checked={useBrackets}
                onChange={(e) => setUseBrackets(e.target.checked)}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                تفعيل الأقواس العشوائية
              </span>
            </label>
          </div>

          {/* النتيجة */}
          {article.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-5 text-lg sm:text-xl md:text-2xl whitespace-pre-wrap leading-relaxed shadow-inner"
            >
              {manageArticle(article)}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Article;
