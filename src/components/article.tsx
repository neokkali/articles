"use client";

import * as React from "react";
import { motion } from "framer-motion";

/**
 * ArticleSecure.tsx
 * أداة زخرفة مع حماية قوية ضد برامج النسخ والتنظيف.
 *
 * ملاحظات:
 * - النص واضح للعين ولا يتغير شكله ظاهرياً (معظم الأحوال) لأن الرموز المستخدمة
 *   هي تشكيلات عربية وسمات Unicode شبه مرئية.
 * - كل توليد عشوائي (regenerate) يغيّر الرموز لتصعيب الاستخراج الآلي.
 * - يمكنك تعديل المصفوفات `hiddenPool` و `visibleDecorPool` لتخصيص السلوك.
 */

type ObfuscationMode =
  | "between-chars"
  | "after-chars"
  | "between-words"
  | "mixed";

// مجموعة من الرموز المخفية / شبه المخفية مفيدة للغة العربية
const hiddenPool = [
  "\u200C", // ZERO WIDTH NON-JOINER
  "\u200D", // ZERO WIDTH JOINER
  "\u2060", // WORD JOINER
  "\u0610", // Arabic sign
  "\u0611",
  "\u0612",
  "\u0613",
  "\u0614",
  "\u06DD", // End of ayah (decorative)
  "\u06DE",
  "\u06E0",
  "\u06E1",
  "\u06E2",
  "\u0650", // kasra (visible diacritic)
  "\u064E", // fatha
  "\u064F", // damma
  "\u0652", // sukun
  "\u0651", // shadda
  "\u0670", // dagger alif
];

// بعض الرموز الزخرفية المرئية الخفيفة (لا تؤثر على القراءة)
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
const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * توليد نمط عشوائي لكل كلمة: يحدد أين توضع الرموز (بين الحروف، بعد الحروف، بين الكلمات، أو خليط).
 * أيضاً يضبط مدى كثافة إدراج الرموز (0..1).
 */
const generateWordPattern = (): { mode: ObfuscationMode; density: number } => {
  const modes: ObfuscationMode[] = [
    "between-chars",
    "after-chars",
    "between-words",
    "mixed",
  ];
  return {
    mode: randomChoice(modes),
    density: Math.random() * 0.6 + 0.2, // كثافة بين 0.2 و 0.8
  };
};

/** إدراج رموز مخفية/زخرفية داخل كلمة مع الحفاظ على قابلية القراءة */
const obfuscateWordWithPattern = (
  word: string,
  mode: ObfuscationMode,
  density: number,
) => {
  if (!word) return word;

  // إذا كانت الكلمة فيها أحرف إنجليزية أو أرقام، نحافظ على سلوك بسيط
  const hasLatin = /[A-Za-z0-9]/.test(word);
  const useVisibleDecor = Math.random() < 0.25; // أحياناً نستخدم زخرفة مرئية خفيفة

  // إذا كانت الكلمة قصيرة، نضع رمز واحد أو اثنين فقط
  const baseInsertChance = Math.max(0.05, Math.min(0.9, density));

  // builder
  let result = "";

  if (mode === "between-words") {
    // وضع رموز بين الكلمات يتم في مستوى الربط بين الكلمات (سيتم معالجته أعلى)
    return word;
  }

  for (let i = 0; i < word.length; i++) {
    const ch = word[i];
    result += ch;

    // قرارات إدراج
    const p = Math.random();
    if (mode === "between-chars") {
      if (p < baseInsertChance) {
        result += randomChoice(hiddenPool);
        if (useVisibleDecor && Math.random() < 0.25)
          result += randomChoice(visibleDecorPool);
      }
    } else if (mode === "after-chars") {
      // أدخل رمز بعد حرف كامل أحياناً
      if (p < baseInsertChance * 0.6 && i === word.length - 1) {
        // بعد الكلمة (آخر حرف)
        result += randomChoice(hiddenPool);
      } else if (p < baseInsertChance * 0.25 && Math.random() < 0.5) {
        result += randomChoice(hiddenPool);
      }
    } else if (mode === "mixed") {
      if (p < baseInsertChance * 0.9) {
        result += randomChoice(hiddenPool);
        if (Math.random() < 0.2) result += randomChoice(visibleDecorPool);
      }
    }
  }

  // إذا كانت كلمة قصيرة جداً وإدراج قليل → أضف رمز واحد في النهاية أحياناً
  if (word.length <= 2 && Math.random() < 0.6) {
    result += randomChoice(hiddenPool);
  }

  // إذا اللغة لاتينية، لا نزيد الحركة كثيراً لتجنب تشويه شديد
  if (hasLatin && Math.random() < 0.5) {
    return result;
  }

  return result;
};

const obfuscateWordsArray = (
  words: string[],
  protect: boolean,
  intensity: number,
) => {
  // intensity: 0..1 يضرب في كثافة النمط
  if (!protect) return words;

  return words.map((w) => {
    const pattern = generateWordPattern();
    // نمط معدل بحسب مستوى الشدة
    const adjustedDensity = Math.min(0.95, pattern.density * (0.5 + intensity));
    const mode: ObfuscationMode = pattern.mode;
    const obWord = obfuscateWordWithPattern(w, mode, adjustedDensity);
    return obWord;
  });
};

const ArticleSecure: React.FC = () => {
  const [article, setArticle] = React.useState("");
  const [separator, setSeparator] = React.useState(" • ");
  const [wordsPerLine, setWordsPerLine] = React.useState(10);
  const [useBrackets, setUseBrackets] = React.useState(true);

  // خيار الحماية الرئيسي (حماية ذكية ضد النسخ والتنظيف)
  const [protectAgainstCopy, setProtectAgainstCopy] = React.useState(false);
  // شدة الحماية (0 = خفيفة جداً، 1 = أقصى)
  const [protectIntensity, setProtectIntensity] = React.useState(0.6);
  // إكسبيرمنت: مستوى الرموز المرئية (تجربة لزيادة مقاومة OCR)
  const [visibleDecorChance, setVisibleDecorChance] = React.useState(0.18);
  // مفتاح لإعادة توليد الرموز (يجعلها مختلفة عند كل توليد)
  const [nonce, setNonce] = React.useState(0);

  // دالة إعداد الأسطر والنتيجة النهائية
  const buildResult = React.useCallback(() => {
    if (!article.trim()) return "";

    const words = article.trim().split(/\s+/);

    // تقسيم إلى أسطر
    const lines: string[] = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
      const group = words.slice(i, i + wordsPerLine);

      // نطبق الأقواس العشوائية لكن على النسخة الأصلية أولاً
      if (useBrackets && group.length > 0) {
        const idx = Math.floor(Math.random() * group.length);
        group[idx] = `[ ${group[idx]} ]`;
      }

      // حماية: نحصل على نسخة معتمدة من الكلمات بعد التعطيل/التشويش
      const processed = obfuscateWordsArray(
        group,
        protectAgainstCopy,
        protectIntensity,
      );

      // إذا وضعنا وضع "between-words" في بعض الأنماط: نضيف بعض الرموز بين الكلمات أيضًا
      const processedWithBetweenWords = processed.map((pw) => {
        // أحياناً نضيف رمز بين الكلمات (عندما تكون الكلمة قصيرة)
        if (protectAgainstCopy && Math.random() < 0.25 * protectIntensity) {
          return pw + randomChoice(hiddenPool);
        }
        return pw;
      });

      lines.push(processedWithBetweenWords.join(separator));
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
  ]);

  const result = React.useMemo(buildResult, [buildResult]);

  // زر إعادة توليد (يغير nonce ليتغير النمط العشوائي)
  const regenerate = () => {
    setNonce((n) => n + 1);
  };

  // اختياري: نسخ النسخة المزخرفة (ستنسخ النص المزخرف - وليس النص الأصلي)
  const handleCopyObfuscated = async () => {
    try {
      await navigator.clipboard.writeText(result);
      alert(
        "تم نسخ النص المزخرف. ملاحظة: ما تم نسخه يحتوي على الرموز المخفية.",
      );
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
            أداة زخرفة متقدّمة — حماية ضد النسخ والتنظيف
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            النص يبقى واضحاً للمتسابقين، لكن برامج النسخ والتنظيف ستفشل في
            استخراج النص الأصلي.
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-4 space-y-4">
          <textarea
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            rows={6}
            placeholder="✍️ اكتب السطور هنا (المشرف ينسخ ويضع في غرفة الدردشة)..."
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
                حماية ضد النسخ والبرامج
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
                  إعادة توليد (تغيير الرموز)
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
                <label className="text-sm">شدة الحماية</label>
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
                <label className="text-sm">
                  نسبة الزخارف المرئية (تعديل لمقاومة OCR)
                </label>
                <input
                  type="range"
                  min={0}
                  max={0.5}
                  step={0.02}
                  value={visibleDecorChance}
                  onChange={(e) =>
                    setVisibleDecorChance(parseFloat(e.target.value))
                  }
                  className="flex-1"
                />
                <span className="text-xs w-12 text-right">
                  {Math.round(visibleDecorChance * 100)}%
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
                النتيجة ستظهر هنا بعد إدخال نص والضغط على توليد أو إعادة
                التوليد.
              </span>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                setNonce((n) => n + 1);
              }}
              className="px-3 py-1 rounded border"
            >
              تحديث (اجعل الرموز جديدة)
            </button>
            <button
              onClick={() => {
                navigator.clipboard
                  ?.writeText(result)
                  .then(() => alert("تم نسخ النص المزخرف"));
              }}
              className="px-3 py-1 rounded bg-green-600 text-white"
            >
              نسخ النتيجة
            </button>
          </div>

          <p className="text-xs text-gray-500">
            ملاحظة مهمة: هذه الطريقة تصعّب جداً استخراج النص الأصلي بواسطة برامج
            النسخ والتنظيف الآلي. لكنها ليست حصناً ضد مهاجم له تحكّم كامل بجهازه
            (مثل التقاط شاشة + OCR متطوّر). إن أردت مقاومة OCR أيضاً، يمكنني
            إضافة طبقات تشويش ذكيّة (نقش خفيف أو تداخل خطوط) مع المحافظة على
            وضوح الإنسان — أضيفها لك لو تريد.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ArticleSecure;
