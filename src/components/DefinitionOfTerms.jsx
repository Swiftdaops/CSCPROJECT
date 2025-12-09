
import React from "react";
import useThemedClasses from "../hooks/useThemedClasses";

const terms = [
  [
    "Password Strength",
    "A measure of how resistant a password is to guessing, cracking, or brute-force attacks based on length, complexity, and unpredictability.",
  ],
  ["ISO/IEC 27001", "A global standard for establishing and maintaining an Information Security Management System (ISMS)."],
  ["ISO/IEC 27002", "A complementary standard that provides detailed security control guidelines, including password policy recommendations."],
  ["Authentication", "The process of verifying a user's identity before granting access to a system."],
  ["Brute-Force Attack", "A hacking method that systematically tries all possible password combinations until the correct one is found."],
  ["Hashing", "A one-way cryptographic technique used to store passwords securely by converting them into unreadable values."],
  ["Multi-Factor Authentication (MFA)", "A security mechanism requiring two or more verification steps, such as a password and a one-time code."],
  ["Password Entropy", "A mathematical value that expresses how unpredictable or random a password is."],
  ["Password Policy", "A set of rules defining acceptable password requirements within an organization."],
  ["User Interface (UI)", "The visual and interactive elements through which a user interacts with the password assessment tool."],
];

export default function DefinitionOfTerms() {
  useThemedClasses();

  return (
    <section className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div
        className="light rounded-2xl border shadow-lg p-6 backdrop-blur"
        data-light="theme-light text-stone-900"
        data-dark="theme-dark text-white"
      >
        <h2 className="text-2xl font-bold mb-4">1.7 Definition of Terms</h2>

        <p className="text-sm sm:text-base mb-4">
          The following terms are defined to provide clarity and ensure proper
          understanding of the concepts used in this study:
        </p>

        <ul className="grid gap-4 sm:grid-cols-2">
          {terms.slice(0, 10).map(([title, desc], i) => (
            <li key={i} className="space-y-1">
              <strong className="block">{title}:</strong>
              <div className="text-sm leading-relaxed">{desc}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
