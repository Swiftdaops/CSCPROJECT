import React from "react";
import PasswordHero from "./components/PasswordHero";
import ISOHistoryCard from "./components/ISOHistoryCard";
import ISORequirements from "./components/ISORequirements";
import PasswordAssessmentTool from "./components/PasswordAssessmentTool";
import Footer from "./components/Footer";
import studentsData from "./data";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <PasswordHero />

        {/* ISO history + requirements placed below the hero */}
        <div className="px-6 sm:px-10 lg:px-20 -mt-8 mb-12 space-y-8">
          <ISOHistoryCard />
          <ISORequirements />

          {/* Password assessment tool */}
          <div>
            <PasswordAssessmentTool />
          </div>
        </div>

        {/* Footer with the project authors/students */}
        <Footer students={studentsData} />
      </div>
    </ThemeProvider>
  );
}

export default App;
