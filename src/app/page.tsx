'use client'

import { useState, FormEvent, useEffect } from "react"

import { Plus, Trash2 } from "lucide-react"

import { french, english, spanish } from "@/lib/translations";

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'fr' | 'sp'>('en');

  const t = currentLanguage === 'en' ? english : currentLanguage === 'sp' ? spanish : french;

  const switchLanguage = () => {
      const newLang = currentLanguage === 'en' ? 'fr' : currentLanguage === 'fr' ? 'sp' : 'en';
      setCurrentLanguage(newLang);
  };

  const [decisions, setDecisions] = useState<string[]>([]);
  const [decision, setDecision] = useState<string>('');

  const [disabled, setDisabled] = useState<boolean>(true);

  const [finalDecision, setFinalDecision] = useState<string>('');

  const addDecision = (e: FormEvent) => {
    e.preventDefault();

    if (decision) {
      setDecisions([...decisions, decision]);
      setDecision('');
    }
  }

  const makeDecision = () => {
    if (decisions.length < 2) return;

    const randomIndex = Math.floor(Math.random() * decisions.length);
    setFinalDecision(`${t.decision}: ${decisions[randomIndex]}`);
  }

  useEffect(() => {
    if (decisions.length >= 2) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [decisions])

  return (
    <>
      <header className="flex items-center justify-center p-4 max-w-128 w-full relative place-self-center">
        <h1 className="text-2xl font-semibold">DecisionFlow</h1>
        <button className="absolute right-0 border border-gray-800 bg-gray-900 rounded-lg p-2 cursor-pointer" onClick={switchLanguage}>{currentLanguage.toUpperCase()}</button>
      </header>

      <main className="flex flex-col items-center max-w-128 w-full place-self-center mt-12">
        {/* INPUT + SUBMIT */}
        <form className="flex space-x-2 w-full" onSubmit={addDecision}>
          <input 
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
            type="text" 
            placeholder={t.input}
            className="border border-gray-800 bg-gray-900 rounded-lg p-2 w-full"
          />
          <button 
            type="submit"
            className="flex items-center justify-center border border-gray-800 bg-gray-900 rounded-lg p-2 cursor-pointer"
          ><Plus className="text-gray-400" strokeWidth={1.5} /></button>
        </form>

        <section className="flex flex-col gap-4 my-4 w-full">
          {decisions.map((decision, index) => (
            <article key={index} className="flex items-center justify-between gap-4 border border-gray-800 bg-gray-900 rounded-lg p-4 w-full">
              <p className="text-sm text-gray-500">{decision}</p>
              <p><Trash2 className="w-4 h-4 text-gray-400 cursor-pointer" onClick={() => setDecisions(decisions.filter((_, i) => i !== index))} strokeWidth={1.5} stroke="currentColor" /></p>
            </article>
          ))}
        </section>

        <p className="text-sm text-gray-500 mb-2">{t.options}</p>
      
        <button
          className={`flex items-center justify-center border border-gray-800 bg-gray-900 rounded-lg p-2 w-full ${disabled ? 'pointer-events-none text-gray-800' : 'text-white cursor-pointer'}`}
          onClick={makeDecision}
          disabled={disabled}
        >{t.submit}</button>

        {finalDecision.length > 0 ? (
          <p className="text-sm text-gray-500 mt-4">{finalDecision}</p>
        ) : null}
      </main>
    </>
  )
}