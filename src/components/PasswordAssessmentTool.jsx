// components/PasswordAssessmentTool.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useThemedClasses from "../hooks/useThemedClasses";
import { Eye, EyeOff, CopyPlus, CopyCheck } from "lucide-react";

export default function PasswordAssessmentTool() {
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState({
    hashedEnv: false,
    noReuse: false,
    mfa: false,
  });

  // apply themed classes to marked elements inside this component
  useThemedClasses();

  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleShow = () => setShowPassword((s) => !s);

  const copyToClipboard = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      // ignore
    }
  };

  const meetsLength = password.length >= 12;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  const notCommon = !/(password|12345|qwerty|admin)/i.test(password);

  const allChecklist =
    checked.hashedEnv && checked.noReuse && checked.mfa;

  const isStrong =
    meetsLength && hasUpper && hasLower && hasNumber && hasSymbol && notCommon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="light rounded-3xl border border-stone-200 shadow-xl p-8 backdrop-blur space-y-6"
      data-light="theme-light text-stone-900 bg-white/70"
      data-dark="theme-dark text-white bg-stone-900/70"
    >
      <h2 className="text-xl font-semibold">Password Strength Assessment</h2>

      {/* Pre-checklist */}
      <div className="space-y-3">
        <p className="text-sm font-medium">
          Before setting a password, confirm these security standards:
        </p>

        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={checked.hashedEnv}
            onChange={() =>
              setChecked((p) => ({ ...p, hashedEnv: !p.hashedEnv }))
            }
          />
          My .env or server password is hashed (not plain text).
        </label>

        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={checked.noReuse}
            onChange={() =>
              setChecked((p) => ({ ...p, noReuse: !p.noReuse }))
            }
          />
          I am not reusing a password from another website.
        </label>

        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            checked={checked.mfa}
            onChange={() =>
              setChecked((p) => ({ ...p, mfa: !p.mfa }))
            }
          />
          MFA is enabled for this account/system.
        </label>
      </div>

      {/* Password Input */}
      <div className="flex flex-col gap-2">
        <AnimatePresence>
          {!allChecklist && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="rounded-lg border border-red-300/40 bg-red-600/6 text-red-700 p-3 mb-2"
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l5.516 9.8c.75 1.333-.213 2.992-1.742 2.992H4.483c-1.53 0-2.492-1.66-1.742-2.992l5.516-9.8zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-.993.883L8.8 8h2.4l-.207-2.117A1 1 0 0010 5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-sm">Please confirm security checks</p>
                  <p className="text-xs text-red-600/90">You must complete all pre-checklist items before entering a password.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Type your password..."
            className={`light w-full border-2 sm:border rounded-xl px-4 py-3 pr-24 sm:pr-16 ${!allChecklist ? "opacity-60 cursor-not-allowed" : ""}`}
            data-light="bg-white text-stone-900"
            data-dark="bg-stone-800 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password input"
            disabled={!allChecklist}
          />

          {/* icons container inside the input on the right */}
          <div className="absolute inset-y-0 right-2 flex items-center gap-2 pr-1">
            <button
              type="button"
              onClick={toggleShow}
              className={`inline-flex items-center justify-center w-9 h-9 rounded-md border bg-white/40 backdrop-blur ${!allChecklist ? "opacity-60 cursor-not-allowed" : ""}`}
              aria-pressed={showPassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
              disabled={!allChecklist}
            >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
            </button>

            <button
              type="button"
              onClick={copyToClipboard}
              className={`inline-flex items-center justify-center w-9 h-9 rounded-md border ${copied ? "bg-emerald-50 border-emerald-200" : "bg-white/40"} backdrop-blur ${!allChecklist ? "opacity-60 cursor-not-allowed" : ""}`}
              aria-label="Copy password"
              disabled={!allChecklist}
            >
              <AnimatePresence initial={false}>
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.18 }}
                    className="text-emerald-600"
                  >
                    <CopyCheck className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="text-stone-800"
                  >
                    <CopyPlus className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {copied && (
            <span className="text-xs absolute right-24 top-1/2 -translate-y-1/2 text-emerald-600">Copied!</span>
          )}
        </div>

        {!allChecklist && (
          <p className="text-xs text-red-600 dark:text-red-400 mt-1">
            Complete all security checks before testing this password.
          </p>
        )}
      </div>

      {/* Results */}
      {password.length > 0 && (
        <div className="space-y-3">
          <StrengthLine label="12+ Characters" pass={meetsLength} />
          <StrengthLine label="Uppercase Letters" pass={hasUpper} />
          <StrengthLine label="Lowercase Letters" pass={hasLower} />
          <StrengthLine label="Numbers" pass={hasNumber} />
          <StrengthLine label="Symbols" pass={hasSymbol} />
          <StrengthLine label="Not a Common Password" pass={notCommon} />

          <p
            className={`text-sm font-semibold pt-3 ${
              isStrong
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {isStrong
              ? "This password meets ISO strength standards."
              : "Password is weak or missing ISO requirements."}
          </p>
        </div>
      )}
    </motion.div>
  );
}

function StrengthLine({ label, pass }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span>{label}</span>
      <span
        className={`text-xs px-2 py-1 rounded-full ${
          pass
            ? "bg-emerald-500/20 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
            : "bg-red-500/20 text-red-700 dark:bg-red-500/10 dark:text-red-300"
        }`}
      >
        {pass ? "Pass" : "Fail"}
      </span>
    </div>
  );
}
