// components/ISORequirements.jsx
import React from "react";
import { motion } from "framer-motion";
import useThemedClasses from "../hooks/useThemedClasses";

const rules = [
  {
    title: "Minimum 12 Characters",
    reason: "Longer passwords exponentially reduce brute-force success.",
  },
  {
    title: "Use Uppercase + Lowercase",
    reason:
      "Mixed-case characters increase unique combinations, making guessing harder.",
  },
  {
    title: "Include Numbers & Symbols",
    reason:
      "Symbols distort predictable patterns attackers rely on during cracking.",
  },
  {
    title: "Avoid Common Words",
    reason:
      "Hackers use dictionaries of millions of known passwords. Avoid easy words.",
  },
  {
    title: "No Repeating or Sequential Patterns",
    reason: "Sequences like 12345 or qwerty are the first tested by attackers.",
  },
  {
    title: "No Personal Information",
    reason:
      "Birthdays, names, or phone numbers can be guessed through social engineering.",
  },
  {
    title: "Enable Multi-Factor Authentication",
    reason:
      "Even if the password leaks, MFA stops unauthorized access.",
  },
  {
    title: "Hash Passwords in Storage",
    reason:
      "Plain-text passwords must NEVER be stored. ISO requires hashing algorithms.",
  },
];

export default function ISORequirements() {
  useThemedClasses();

  return (
    <section className="grid gap-6">
      <div className="mb-2">
        <p className="text-xs uppercase tracking-wider">
          Password Requirements
        </p>

        <h2 className="text-2xl font-semibold">Key ISO-aligned Rules</h2>

        {/* INLINE APA CITATION */}
        <p className="text-xs mt-1 opacity-70">
          Based on authentication guidance provided in ISO/IEC 27002:2022 
          (International Organization for Standardization, 2022).
        </p>
      </div>

      <div className="grid gap-6">
        {rules.map((rule, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="light rounded-2xl border shadow-lg p-6 backdrop-blur flex gap-4 items-start"
            data-light="theme-light text-stone-900"
            data-dark="theme-dark text-white"
          >
            <div className="shrink-0">
              <span className="inline-flex items-center justify-center h-9 w-9 rounded-full font-semibold">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">{rule.title}</h3>
              <p className="text-sm leading-relaxed">{rule.reason}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
