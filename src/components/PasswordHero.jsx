// components/PasswordHero.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./theme-provider";
import useThemedClasses from "../hooks/useThemedClasses";

const PasswordHero = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  // apply themed classes to marked elements on mount and when theme changes
  useThemedClasses();

  return (
    <div className="min-h-screen w-full m-0 p-0  flex flex-col theme-light">
      {/* BIG DARK MODE SWITCH */}
      <header className="w-full flex justify-end items-center pt-4 pr-4">
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="group flex items-center gap-3 rounded-full border px-5 py-2.5 shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105"
        >
          <span className="text-xs font-medium uppercase tracking-[0.18em]">
            Theme
          </span>

          <div className="relative flex items-center rounded-full w-16 h-8 border">
            <div
              className={`absolute h-7 w-7 rounded-full shadow transform transition-transform duration-300 ${
                isDark ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </div>

          <span className="text-xs font-semibold">{isDark ? "Dark" : "Light"}</span>
        </button>
      </header>

      {/* HERO */}
      <main className="flex-1 flex items-center">
        <section className="w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-14 px-6 sm:px-10 lg:px-20 pb-16 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full lg:w-3/5 space-y-6 lg:space-y-8"
          >
            <div
              className="light inline-flex items-center gap-3 rounded-full border px-4 py-2 shadow-sm backdrop-blur"
              data-light="theme-light text-stone-900"
              data-dark="theme-dark text-white"
            >
              <span className="h-2 w-2 rounded-full animate-pulse" />
              <p className="text-xs sm:text-[0.8rem] font-medium tracking-[0.18em] uppercase">
                CSC 441 · Research Methods &amp; Seminar
              </p>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight wrap-break-word">
                Designing{" "}
                <span className="relative inline-block">
                  <span className="absolute inset-0 blur-md animate-pulse rounded-full bg-red-400/30" />
                    <span className="relative text-red-600">Passwords</span>
                </span>{" "}
                that refuse to be guessed.
              </h1>

              {/* Word-by-word reveal (keeps bolded phrase) */}
              <AnimatedWords />
            </div>

            <div className="grid gap-4 sm:grid-cols-2" data-light="theme-light text-stone-900" data-dark="theme-dark text-white">
              <div
                className="light rounded-2xl border p-4 sm:p-5 space-y-2 shadow-md backdrop-blur"
                data-light="theme-light text-stone-900"
                data-dark="theme-dark text-white"
              >
                <p className="text-[0.7rem] tracking-[0.18em] uppercase">Supervised by</p>
                <p className="text-base sm:text-lg font-semibold">Dr. Chinedum Amechi</p>
                <p className="text-xs">Department of Computer Science · UNIZIK</p>
              </div>

              <div
                className="light rounded-2xl border p-4 sm:p-5 space-y-2 shadow-md backdrop-blur"
                data-light="theme-light text-stone-900"
                data-dark="theme-dark text-white"
              >
                <p className="text-[0.7rem] tracking-[0.18em] uppercase">Research focus</p>
                <p className="text-sm sm:text-[0.95rem] font-medium">Password Strength Assessment Tool</p>
                <p className="text-xs">Translating ISO-aligned password rules into a usable, student–friendly security interface.</p>
              </div>
            </div>
          </motion.div>

          {/* Right side Live Preview removed */}
        </section>
      </main>
    </div>
  );
};

export default PasswordHero;

/* Helper component: reveal the hero paragraph one word at a time. */
function AnimatedWords() {
  const raw = `This project applies modern frontend engineering to present, visualize, and explain the latest password strength requirements inspired by ISO security standards. Our goal: turn abstract security rules into a clear, interactive experience anyone can understand at a glance.`;

  // Use a placeholder so the bold phrase stays together
  const PLACEHOLDER = "__BOLD_PASSWORD_STRENGTH__";
  const replaced = raw.replace("password strength", PLACEHOLDER);
  const words = replaced.split(/\s+/);

  const [visible, setVisible] = useState(0);

  useEffect(() => {
    // Respect user's reduced-motion preference
    if (typeof window !== "undefined") {
      const prefersReduced =
        window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) {
        setVisible(words.length);
        return;
      }

      const isSmall = window.innerWidth <= 420; // mobile threshold
      const delay = isSmall ? 180 : 110; // slower on mobile so words are readable

      let i = 0;
      const id = setInterval(() => {
        i += 1;
        setVisible(i);
        if (i >= words.length) clearInterval(id);
      }, delay);

      return () => clearInterval(id);
    }

    // Fallback: reveal immediately on server/no-window
    setVisible(words.length);
  }, [words.length]);

  return (
    <p className="text-sm sm:text-base md:text-lg max-w-full sm:max-w-xl md:max-w-2xl leading-relaxed wrap-break-word">
      {/* For screen-readers, expose full text immediately */}
      <span className="sr-only">{raw}</span>

      {words.map((w, idx) => {
        if (w === PLACEHOLDER) {
          const isVisible = idx < visible;
          return (
            <span
              key={idx}
              className={`inline-block mr-1 transition-opacity duration-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
              aria-hidden={!isVisible}
              style={{ willChange: "opacity, transform" }}
            >
              <span className="font-semibold">password strength</span>
            </span>
          );
        }

        const isVisible = idx < visible;
        return (
          <span
            key={idx}
            className={`inline-block mr-1 transition-opacity duration-150 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}
            aria-hidden={!isVisible}
            style={{ willChange: "opacity, transform" }}
          >
            {w}
          </span>
        );
      })}
    </p>
  );
}
