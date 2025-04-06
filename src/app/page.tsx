'use client'

import { useState } from "react"

import RandomDecision from "@/components/random-decision";
import RandomActivity from "@/components/random-activity";

export type Language = 'en' | 'fr' | 'sp';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'fr' | 'sp'>('en');

  const switchLanguage = () => {
      const newLang = currentLanguage === 'en' ? 'fr' : currentLanguage === 'fr' ? 'sp' : 'en';
      setCurrentLanguage(newLang);
  };

  const [currentTab, setCurrentTab] = useState<string>('DecisionFlow');

  return (
    <>
      <header className="flex items-center justify-center p-4 relative">
        <nav>
          <p className="text-2xl font-semibold">{currentTab}</p>
        </nav>
        <button className="absolute right-0 border border-gray-800 bg-gray-900 rounded-lg p-2 cursor-pointer" onClick={switchLanguage}>{currentLanguage.toUpperCase()}</button>
      </header>

      <main className="flex flex-col items-center mt-12 grow">
        {currentTab === "DecisionFlow" ? (
          <RandomDecision currentLanguage={currentLanguage} />
        ) : (
          <RandomActivity currentLanguage={currentLanguage} />
        )}
      </main>

      <footer className="flex justify-center p-4">
        {currentTab === "DecisionFlow" ? (
          <p className="hover:underline text-center cursor-pointer" onClick={() => setCurrentTab("IDK Do Something (english only)")}>Bored ? Let us generate random stuff to do !</p>
        ) : (
          <p className="hover:underline text-center cursor-pointer" onClick={() => setCurrentTab("DecisionFlow")}>Why should you make a decision ? Let us do it for you</p>
        )}
      </footer>
    </>
  )
}