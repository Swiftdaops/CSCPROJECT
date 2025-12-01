import React from "react";
import { motion } from "framer-motion";
import studentsData from "../data";
import useThemedClasses from "../hooks/useThemedClasses";

export default function Footer({ students }) {
  // ensure the themed classes are applied to marked elements in the footer
  useThemedClasses();
  const list = Array.isArray(students) && students.length ? students : studentsData;

  return (
    <footer
      className="light mt-20 pb-12 pt-12 relative text-stone-900"
      data-light="bg-transparent text-stone-900"
      data-dark="theme-dark text-white"
    >
      {/* Gradient Divider */}
      <div className="w-full h-0.5 bg-linear-to-r from-transparent via-emerald-400/60 to-transparent mb-8" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20 text-left"
      >
        {/* Goodbye Message */}
        <div className="space-y-2 mb-4">
          <h2
            className="light text-2xl font-semibold"
            data-light="text-stone-900"
            data-dark="text-white"
          >
            Thank you for exploring our Password Security Project.
          </h2>
          <p
            className="light text-sm leading-relaxed max-w-3xl"
            data-light="text-stone-600"
            data-dark="text-stone-300"
          >
            We hope this experience helped you understand modern ISO password standards
            and why strong authentication matters in today’s digital world.
          </p>
        </div>

        {/* Credits header */}
        <div className="mb-3">
          <p
            className="light text-xs tracking-wider uppercase"
            data-light="text-stone-500"
            data-dark="text-stone-400"
          >
            Designed & Presented By
          </p>
        </div>

        {/* Student list: responsive grid with badges */}
        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {},
          }}
        >
          {list.map((s, i) => (
            <motion.li
              key={i}
              className="light flex items-center gap-3 p-3 rounded-xl shadow-sm"
              data-light="bg-white/80"
              data-dark="theme-dark"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.03 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="h-9 w-9 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 font-semibold">
                {i + 1}
              </div>

              <div className="text-sm font-medium text-stone-900 dark:text-white wrap-break-word">
                <span
                  className="light student-name"
                  data-light="text-stone-900"
                  data-dark="text-white"
                >
                  {s}
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* Final Goodbye */}
        <p className="text-xs text-stone-500 dark:text-stone-400 pt-6">
          Have a secure day ✨ — Stay safe, stay encrypted.
        </p>
      </motion.div>
    </footer>
  );
}
