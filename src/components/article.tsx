"use client";

import * as React from "react";
import { motion } from "framer-motion";

type ObfuscationMode =
  | "between-chars"
  | "after-chars"
  | "between-words"
  | "mixed";

const hiddenPool = [
  "\u200C",
  "\u200D",
  "\u2060",
  "\u0610",
  "\u0611",
  "\u0612",
  "\u0613",
  "\u0614",
  "\u06DD",
  "\u06DE",
  "\u06E0",
  "\u06E1",
  "\u06E2",
  "\u0650",
  "\u064E",
  "\u064F",
  "\u0652",
  "\u0651",
  "\u0670",
];

const visibleDecorPool = [
  "ٰ",
  "ـ",
  "ۛ",
  "ۚ",
  "ْ",
  "ً",
  "ٍ",
  "ٌ",
  "ّ",
  "ٖ",
  "ٗ",
];

const randomChoice = <T,>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const generateWordPattern = (): { mode: ObfuscationMode; density: number } => {
  const modes: ObfuscationMode[] = [
    "between-chars",
    "after-chars",
    "between-words",
    "mixed",
  ];
  return { mode: randomChoice(modes), density: Math.random() * 0.6 + 0.2 };
};

const obfuscateWordWithPattern = (
  word: string,
  mode: ObfuscationMode,
  density: number,
) => {
  if (!word) return word;
  const hasLatin = /[A-Za-z0-9]/.test(word);
  const useVisibleDecor = Math.random() < 0.25;
  const baseInsertChance = Math.max(0.05, Math.min(0.9, density));
  let result = "";

  if (mode === "between-words") return word;

  for (let i = 0; i < word.length; i++) {
    const ch = word[i];
    result += ch;
    const p = Math.random();
    if (mode === "between-chars" && p < baseInsertChance) {
      result += randomChoice(hiddenPool);
      if (useVisibleDecor && Math.random() < 0.25)
        result += randomChoice(visibleDecorPool);
    } else if (mode === "after-chars") {
      if (
        (p < baseInsertChance * 0.6 && i === word.length - 1) ||
        (p < baseInsertChance * 0.25 && Math.random() < 0.5)
      )
        result += randomChoice(hiddenPool);
    } else if (mode === "mixed" && p < baseInsertChance * 0.9) {
      result += randomChoice(hiddenPool);
      if (Math.random() < 0.2) result += randomChoice(visibleDecorPool);
    }
  }

  if (word.length <= 2 && Math.random() < 0.6)
    result += randomChoice(hiddenPool);

  if (hasLatin && Math.random() < 0.5) return result;

  return result;
};

const obfuscateWordsArray = (
  words: string[],
  protect: boolean,
  intensity: number,
) => {
  if (!protect) return words;
  return words.map((w) => {
    const pattern = generateWordPattern();
    const adjustedDensity = Math.min(0.95, pattern.density * (0.5 + intensity));
    return obfuscateWordWithPattern(w, pattern.mode, adjustedDensity);
  });
};

const ArticleSecure: React.FC = () => {
  const [article, setArticle] = React.useState("");
  const [separator, setSeparator] = React.useState(" • ");
  const [wordsPerLine, setWordsPerLine] = React.useState(10);
  const [useBrackets, setUseBrackets] = React.useState(true);

  const [protectAgainstCopy, setProtectAgainstCopy] = React.useState(false);
  const [protectIntensity, setProtectIntensity] = React.useState(0.6);
  const [decorIntensity, setDecorIntensity] = React.useState(0.18);
  const [nonce, setNonce] = React.useState(0);

  const buildResult = React.useCallback(() => {
    if (!article.trim()) return "";
    const words = article.trim().split(/\s+/);
    const lines: string[] = [];

    for (let i = 0; i < words.length; i += wordsPerLine) {
      const group = words.slice(i, i + wordsPerLine);
      if (useBrackets && group.length > 0) {
        const idx = Math.floor(Math.random() * group.length);
        group[idx] = `[ ${group[idx]} ]`;
      }
      const processed = obfuscateWordsArray(
        group,
        protectAgainstCopy,
        protectIntensity,
      );
      const processedWithDecor = processed.map((pw) => {
        if (protectAgainstCopy && Math.random() < decorIntensity)
          return pw + randomChoice(hiddenPool) + randomChoice(visibleDecorPool);
        return pw;
      });
      lines.push(processedWithDecor.join(separator));
    }

    return lines.join("\n");
  }, [
    article,
    wordsPerLine,
    useBrackets,
    protectAgainstCopy,
    protectIntensity,
    separator,
    nonce,
    decorIntensity,
  ]);

  const result = React.useMemo(buildResult, [buildResult]);

  const regenerate = () => setNonce((n) => n + 1);

  const handleCopyObfuscated = async () => {
    try {
      await navigator.clipboard.writeText(result);
      alert("تم نسخ النص المزخرف، الرموز المخفية تجعل النسخ الآلي صعبًا.");
    } catch {
      alert("فشل النسخ — ربما المتصفح منع الوصول للحافظة.");
    }
  };

  return (
    <section className="p-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold">
            أداة زخرفة متقدّمة — حماية ضد النسخ
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            النصوص واضحة للعين، لكنها محمية من برامج النسخ والتنظيف الآلي.
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-4 space-y-4">
          <textarea
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            rows={6}
            placeholder="✍️ اكتب السطور هنا..."
            className="w-full p-3 rounded border resize-none"
            dir="rtl"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold">
                عدد الكلمات في السطر
              </label>
              <input
                type="number"
                className="w-20 p-1 border rounded text-center"
                value={wordsPerLine}
                onChange={(e) =>
                  setWordsPerLine(Math.max(1, parseInt(e.target.value || "1")))
                }
              />
            </div>

            <div className="flex items-center justify-end gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useBrackets}
                  onChange={(e) => setUseBrackets(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm">تفعيل الأقواس العشوائية</span>
              </label>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <label className="text-sm font-semibold block">
                حماية النصوص
              </label>
              <div className="flex items-center gap-3 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={protectAgainstCopy}
                    onChange={(e) => setProtectAgainstCopy(e.target.checked)}
                    className="w-5 h-5"
                  />
                  تفعيل حماية ذكية
                </label>
                <button
                  onClick={regenerate}
                  className="px-3 py-1 rounded border"
                >
                  إعادة توليد الرموز
                </button>
                <button
                  onClick={handleCopyObfuscated}
                  className="px-3 py-1 rounded bg-blue-600 text-white"
                >
                  نسخ المزخرف
                </button>
              </div>
            </div>

            <div className="col-span-1 sm:col-span-2">
              <div className="flex items-center gap-2">
                <label className="text-sm">قوة الحماية</label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={protectIntensity}
                  onChange={(e) =>
                    setProtectIntensity(parseFloat(e.target.value))
                  }
                  className="flex-1"
                />
                <span className="text-xs w-12 text-right">
                  {Math.round(protectIntensity * 100)}%
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <label className="text-sm">الزخارف الإضافية للنص</label>
                <input
                  type="range"
                  min={0}
                  max={0.5}
                  step={0.02}
                  value={decorIntensity}
                  onChange={(e) =>
                    setDecorIntensity(parseFloat(e.target.value))
                  }
                  className="flex-1"
                />
                <span className="text-xs w-12 text-right">
                  {Math.round(decorIntensity * 100)}%
                </span>
              </div>
            </div>
          </div>

          <div
            className="bg-gray-50 dark:bg-gray-800 border rounded p-3 text-lg whitespace-pre-wrap leading-relaxed"
            style={{ fontFamily: "inherit" }}
          >
            {result || (
              <span className="text-gray-400">
                ستظهر النتيجة هنا بعد إدخال نص والضغط على توليد.
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleSecure;
