"use client";

import { ThemeSwitcher } from "./theme-swicher";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/60 border-b border-gray-200/40 dark:border-gray-700/50 shadow-sm">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-4 flex items-center justify-between">
        {/* الشعار */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 select-none"
        >
          <Sparkles className="w-6 h-6 text-blue-500 dark:text-purple-400" />
          <h1 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 dark:from-blue-400 dark:to-purple-300 bg-clip-text text-transparent tracking-tight">
            زخرفة
          </h1>
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
