'use client'

import { useState, FormEvent, useEffect } from "react"

import { Plus, Trash2 } from "lucide-react"

import { Language } from "@/app/page";
import { french, english, spanish } from "@/lib/translations";


export default function RandomDecision({ currentLanguage }: { currentLanguage: Language }) {
    const t = currentLanguage === 'en' ? english : currentLanguage === 'sp' ? spanish : french;

    const [decisions, setDecisions] = useState<string[]>([]);
    const [decision, setDecision] = useState<string>('');

    const [disabled, setDisabled] = useState<boolean>(true);

    const [finalDecision, setFinalDecision] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addDecision = (e: FormEvent) => {
        e.preventDefault();

        if (decision) {
        setDecisions([...decisions, decision]);
        setDecision('');
        }
    }

    const makeDecision = () => {
        if (decisions.length < 2) return;

        setIsLoading(true);

        setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * decisions.length);
        setFinalDecision(`${t.decision}: ${decisions[randomIndex]} !`);
        setIsLoading(false);
        }, 1000)   
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
            >{isLoading ? 
                <span
                    className={"animate-spin rounded-full w-4 h-4 border-t-blue-500 border-2"}
                ></span> : t.submit}
            </button>

            {finalDecision.length > 0 ? (
                <p className="text-sm text-gray-500 mt-4">{finalDecision}</p>
            ) : null}
        </>
    )
}