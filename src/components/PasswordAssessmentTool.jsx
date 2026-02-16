import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, CopyPlus, CopyCheck, ShieldCheck, Zap, Clock } from "lucide-react";
import zxcvbn from 'zxcvbn';

// Mock hook based on your provided code
const useThemedClasses = () => {}; 

export default function PasswordAssessmentTool() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [checked, setChecked] = useState({
    hashedEnv: false,
    noReuse: false,
    mfa: false,
  });

  useThemedClasses();

  // Modern Entropy Calculation using zxcvbn
  const assessment = useMemo(() => {
    return zxcvbn(password);
  }, [password]);

  const allChecklist = checked.hashedEnv && checked.noReuse && checked.mfa;
  const isISOCompliant = password.length >= 12 && assessment.score >= 3;

  const toggleShow = () => setShowPassword((s) => !s);

  const copyToClipboard = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {}
  };

  // Helper for strength color
  const getStrengthColor = (score) => {
    const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-blue-500", "bg-emerald-500"];
    return colors[score] || "bg-stone-200";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="light rounded-3xl border border-stone-200 shadow-xl p-8 backdrop-blur space-y-8 max-w-lg mx-auto"
      data-light="theme-light text-stone-900 bg-white/70"
      data-dark="theme-dark text-white bg-stone-900/70"
    >
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">Security Assessment</h2>
        <p className="text-sm text-stone-500">ISO/IEC 27002 & NIST Entropy Standards</p>
      </header>

      {/* 1. Pre-Checklist: Regulatory Compliance */}
      <div className="space-y-4 bg-stone-50 p-5 rounded-2xl border border-stone-100">
        <div className="flex items-center gap-2 text-stone-700 mb-2">
          <ShieldCheck className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Baseline Requirements</span>
        </div>

        <div className="space-y-3">
          <ComplianceCheck 
            label="Storage: Hashed & Salted (No Plaintext)" 
            checked={checked.hashedEnv} 
            onChange={() => setChecked(p => ({...p, hashedEnv: !p.hashedEnv}))}
          />
          <ComplianceCheck 
            label="Uniqueness: No Credential Reuse" 
            checked={checked.noReuse} 
            onChange={() => setChecked(p => ({...p, noReuse: !p.noReuse}))}
          />
          <ComplianceCheck 
            label="Protection: MFA Policy Active" 
            checked={checked.mfa} 
            onChange={() => setChecked(p => ({...p, mfa: !p.mfa}))}
          />
        </div>
      </div>

      {/* 2. Password Input Section */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter secure password..."
            className={`w-full border-2 rounded-2xl px-5 py-4 transition-all duration-300 ${!allChecklist ? "opacity-50 cursor-not-allowed grayscale" : "focus:ring-4 focus:ring-blue-500/10 border-stone-200"}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!allChecklist}
          />
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
            <IconButton onClick={toggleShow} disabled={!allChecklist}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </IconButton>
            <IconButton onClick={copyToClipboard} disabled={!allChecklist} success={copied}>
              {copied ? <CopyCheck size={18} /> : <CopyPlus size={18} />}
            </IconButton>
          </div>
        </div>

        {/* 3. Real-time Entropy Metrics */}
        <AnimatePresence>
          {password.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-5 pt-2"
            >
              {/* Strength Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium px-1">
                  <span>Entropy Score</span>
                  <span>{["Very Weak", "Weak", "Fair", "Strong", "ISO Standard"][assessment.score]}</span>
                </div>
                <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden flex gap-1">
                   {[0,1,2,3].map((step) => (
                     <div key={step} className={`h-full flex-1 transition-colors duration-500 ${assessment.score > step ? getStrengthColor(assessment.score) : 'bg-stone-200'}`} />
                   ))}
                </div>
              </div>

              {/* Heuristic Data Points */}
              <div className="grid grid-cols-2 gap-4">
                <MetricBox 
                  icon={<Clock size={14} />} 
                  label="Offline Crack Time" 
                  value={assessment.crack_times_display.offline_slow_hashing_1e4_per_second} 
                />
                <MetricBox 
                  icon={<Zap size={14} />} 
                  label="Length (NIST)" 
                  value={`${password.length} Chars`}
                  pass={password.length >= 12}
                />
              </div>

              {/* Smart Feedback */}
              {assessment.feedback.warning && (
                <div className="text-xs bg-red-50 text-red-600 p-3 rounded-xl border border-red-100 flex gap-2 italic">
                  <span>⚠️</span> {assessment.feedback.warning}
                </div>
              )}
              
              <div className="pt-2">
                <p className={`text-sm font-semibold flex items-center gap-2 ${isISOCompliant ? "text-emerald-600" : "text-stone-400"}`}>
                   <ShieldCheck size={16} />
                   {isISOCompliant ? "Fully ISO/NIST Compliant" : "Analysis in progress..."}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// Sub-components for neatness
function ComplianceCheck({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 text-sm cursor-pointer group">
      <input type="checkbox" className="w-4 h-4 rounded border-stone-300 text-stone-900 focus:ring-stone-900" checked={checked} onChange={onChange} />
      <span className={`transition-colors ${checked ? "text-stone-900" : "text-stone-400 group-hover:text-stone-600"}`}>{label}</span>
    </label>
  );
}

function MetricBox({ icon, label, value, pass = true }) {
  return (
    <div className="p-3 rounded-2xl border border-stone-100 bg-white shadow-sm">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-stone-400 mb-1">
        {icon} {label}
      </div>
      <div className={`text-xs font-bold ${!pass ? "text-red-500" : "text-stone-800"}`}>{value}</div>
    </div>
  );
}

function IconButton({ children, onClick, disabled, success }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2.5 rounded-xl border transition-all ${success ? "bg-emerald-50 border-emerald-200 text-emerald-600" : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"}`}
    >
      {children}
    </button>
  );
}