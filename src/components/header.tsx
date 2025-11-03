"use client";

import Image from "next/image";
import { ThemeSwitcher } from "./theme-swicher";
import { motion } from "framer-motion";
import { Reem_Kufi_Fun } from "next/font/google";

const reemKufi = Reem_Kufi_Fun({
  variable: "--font-reem-kufi",
  weight: ["400", "600", "700"],
  subsets: ["arabic", "latin"],
});

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/60 border-b border-gray-200/40 dark:border-gray-700/50 shadow-sm">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
        {/* الشعار */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center select-none"
        >
          <Image
            src="/logo.png"
            alt="زخرفة المقالات"
            width={40}
            height={40}
            className="mt-1"
            priority
          />
          <span
            className={`${reemKufi.className} text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 dark:from-blue-400 dark:to-purple-300 bg-clip-text text-transparent tracking-tight`}
          >
            زخرفة المقالات
          </span>
        </motion.div>

        {/* أدوات */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <ThemeSwitcher />
        </motion.div>
      </div>
    </header>
  );
};
