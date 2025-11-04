"use client";

import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="border-t border-gray-200/40 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/60 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-start text-gray-700 dark:text-gray-300">
        {/* النص */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-sm md:text-base"
        >
          صنع لمحبي المقالات 💙
        </motion.div>

        {/* البريد */}
        <motion.a
          href="mailto:contact@articles.ct.ws"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-sm md:text-base"
        >
          <Mail className="w-4 h-4 mb-1" />
          qo9@hotmail.fr
        </motion.a>
      </div>

      <div className="py-3 text-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200/30 dark:border-gray-700/30">
        © {new Date().getFullYear()} زخرفة المقالات — جميع الحقوق محفوظة.
      </div>
    </footer>
  );
};
