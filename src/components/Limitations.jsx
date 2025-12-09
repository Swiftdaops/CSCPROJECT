import React from "react";
import useThemedClasses from "../hooks/useThemedClasses";

export default function Limitation() {
  useThemedClasses();

  return (
    <section className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div
        className="light rounded-2xl border shadow-lg p-6 backdrop-blur"
        data-light="theme-light text-stone-900"
        data-dark="theme-dark text-white"
      >
        <h2 className="text-2xl font-bold mb-4">1.6 Limitations of the Study</h2>

        <div className="space-y-4 leading-relaxed text-sm sm:text-base">
          <p>
            Despite the successful development of the Password Strength Assessment
            Tool, several limitations were identified during the course of this
            study:
          </p>

          <ul className="grid gap-3 sm:grid-cols-2 list-inside">
            <li>
              <strong>Limited Dataset for Password Patterns:</strong>
              <div>
                The system evaluates passwords using ISO-aligned rules but does not
                incorporate large real-world breached password datasets that could
                improve accuracy.
              </div>
            </li>

            <li>
              <strong>No Backend Authentication Integration:</strong>
              <div>
                The tool functions entirely on the client side to avoid storing or
                processing sensitive user data, which limits real-world
                authentication analysis.
              </div>
            </li>

            <li>
              <strong>Variation in ISO Implementations:</strong>
              <div>
                Organizations often modify ISO standards to suit internal policies.
                This study uses general ISO/IEC 27001 and 27002 guidelines, which may
                not reflect every organization’s exact requirements.
              </div>
            </li>

            <li>
              <strong>Browser-Dependent Performance:</strong>
              <div>
                Since the assessment runs purely in the browser, user device
                performance or browser version may slightly influence responsiveness.
              </div>
            </li>

            <li>
              <strong>Non-Exhaustive Security Evaluation:</strong>
              <div>
                The tool focuses on password composition, entropy, and common
                weaknesses. Advanced threats—such as phishing resilience or reuse
                detection—are outside the study’s scope.
              </div>
            </li>

            <li>
              <strong>No Machine Learning Analysis:</strong>
              <div>
                Due to time constraints, the study does not include predictive
                crack-time models or AI-based evaluation.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
