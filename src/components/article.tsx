"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const separators = [
  { label: "نقطة", value: " . " },
  { label: "النقطة العادية •", value: " • " },
  { label: "النقطة الكبيرة ●", value: " ● " },
  { label: "قلب ♥", value: " ♥ " },
  { label: "فاصلة ,", value: " , " },
  { label: "فاصلة عربية ،", value: " ، " },
  { label: "نقطة صغيرة ·", value: " · " },
  { label: "شرطة -", value: " - " },
  { label: "شرطة طويلة —", value: " — " },
  { label: "موجة ~", value: " ~ " },
  { label: "نجمة ✦", value: " ✦ " },
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
  const [separator, setSeparator] = React.useState(" . ");
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
      <div className="max-w-5xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            أداة زخرفة متقدمة — حماية ضد النسخ
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            النصوص واضحة للعين، لكنها محمية من برامج النسخ والتنظيف الآلي.
          </p>
        </motion.div>

        <textarea
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          rows={6}
          placeholder="✍️ اكتب السطور هنا..."
          className="w-full p-3 rounded-2xl border border-gray-300 dark:border-gray-700 resize-none"
          dir="rtl"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <Label>عدد الكلمات في السطر</Label>
            <input
              type="number"
              className="w-20 p-1 border rounded text-center"
              value={wordsPerLine}
              onChange={(e) =>
                setWordsPerLine(Math.max(1, parseInt(e.target.value || "1")))
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={useBrackets}
              onCheckedChange={(val) => setUseBrackets(!!val)}
              id="brackets"
            />
            <Label htmlFor="brackets" className="cursor-pointer">
              تفعيل الأقواس العشوائية
            </Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={protectAgainstCopy}
              onCheckedChange={(val) => setProtectAgainstCopy(!!val)}
              id="protect"
            />
            <Label htmlFor="protect" className="cursor-pointer">
              تفعيل حماية ذكية
            </Label>
          </div>

          {/* Dropdown لاختيار الفاصل */}
          <div className="flex flex-col gap-1">
            <Label>اختر الفاصل بين الكلمات</Label>
            <Select
              value={separator}
              onValueChange={(val) => setSeparator(val)}
            >
              <SelectTrigger className="w-full" dir="rtl">
                <SelectValue placeholder="اختر فاصل..." />
              </SelectTrigger>
              <SelectContent dir="rtl">
                {separators.map((sep) => (
                  <SelectItem key={sep.value} value={sep.value}>
                    {sep.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1 col-span-1 sm:col-span-2">
            <Label>شدة الحماية ضد النسخ</Label>
            <div className="flex items-center gap-2">
              <Slider
                value={[protectIntensity]}
                onValueChange={(val) => setProtectIntensity(val[0])}
                step={0.05}
                min={0}
                max={1}
                className="flex-1"
              />
              <span className="text-xs w-12 text-right">
                {Math.round(protectIntensity * 100)}%
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 col-span-1 sm:col-span-2">
            <Label>الزخارف الإضافية للنص</Label>
            <div className="flex items-center gap-2">
              <Slider
                value={[decorIntensity]}
                onValueChange={(val) => setDecorIntensity(val[0])}
                step={0.02}
                min={0}
                max={0.5}
                className="flex-1"
              />
              <span className="text-xs w-12 text-right">
                {Math.round(decorIntensity * 100)}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-end">
          <Button
            variant="outline"
            className="border-blue-500 text-blue-600"
            onClick={regenerate}
          >
            إعادة توليد الرموز
          </Button>
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={handleCopyObfuscated}
          >
            نسخ المزخرف
          </Button>
        </div>

        <div
          className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl p-4 text-lg whitespace-pre-wrap leading-relaxed"
          style={{ fontFamily: "inherit" }}
        >
          {result || (
            <span className="text-gray-400">
              ستظهر النتيجة هنا بعد إدخال نص والضغط على توليد.
            </span>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArticleSecure;
