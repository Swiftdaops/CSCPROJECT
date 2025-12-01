// components/ISOHistoryCard.jsx
import React from "react";
import { motion } from "framer-motion";
import useThemedClasses from "../hooks/useThemedClasses";

export default function ISOHistoryCard() {
  // apply themed classes to elements marked in this card
  useThemedClasses();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="light rounded-3xl border shadow-xl p-8 backdrop-blur "
      data-light="theme-light text-stone-900"
      data-dark="theme-dark text-white"
    >
      <h2 className="text-2xl font-semibold mb-4">
        The History of ISO & Password Security Standards
      </h2>

      <p className="leading-relaxed">
        The International Organization for Standardization (ISO) was founded in
        1947 to unify global standards in technology, safety, quality, and
        security. As digital systems evolved, ISO introduced the{" "}
        <span className="font-semibold">ISO/IEC 27000 series</span>, which set
        global guidelines for cybersecurity.
      </p>

      <p className="mt-3 leading-relaxed">
        Within these standards, password creation and authentication rules were
        defined to help organizations protect users from brute-force attacks,
        credential theft, data breaches, and poor security practices.
      </p>

      <p className="mt-3">
        Today, ISO password guidelines remain the backbone for secure digital
        authentication across banks, apps, government systems, and cloud
        platforms.
      </p>
    </motion.div>
  );
}
