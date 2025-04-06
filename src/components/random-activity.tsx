'use client';

import { useState } from 'react';
import { Language } from '@/app/page';
import { french, english, spanish } from '@/lib/translations';

export default function RandomActivity({ currentLanguage }: { currentLanguage: Language }) {
    const t = currentLanguage === 'en' ? english : currentLanguage === 'sp' ? spanish : french;

    const [randomActivity, setRandomActivity] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const generateActivity = async () => {
        setIsLoading(true);

        try {
            const res = await fetch('/api/getActivity', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!res.ok) throw new Error('Failed to fetch activity');

            const data = await res.json();
            setRandomActivity(data.activity);
        } catch (err) {
            console.error('Error generating activity:', err);
            setRandomActivity(t.errorFetching || 'Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>        
            <button
                className="flex items-center justify-center border border-gray-800 bg-gray-900 rounded-lg p-2 w-full text-white cursor-pointer"
                onClick={generateActivity}
                disabled={isLoading}
            >
                {isLoading ? (
                    <span className="animate-spin rounded-full w-4 h-4 border-t-blue-500 border-2"></span>
                ) : (
                    "Help me I'm bored"
                )}
            </button>

            {randomActivity && (
                <p className="text-sm text-gray-500 mt-4">{randomActivity}</p>
            )}
        </>
    );
}