'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const DateType = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [name, setName] = useState('');
  const [selectedDateType, setSelectedDateType] = useState('');
  
  useEffect(() => {
    // Get the name from URL parameter
    const nameParam = searchParams.get('name');
    if (nameParam) {
      setName(nameParam);
    }
  }, [searchParams]);

  const handleDateTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDateType(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedDateType) {
      router.push(`/dateSched?name=${encodeURIComponent(name)}&dateType=${encodeURIComponent(selectedDateType)}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center fade-in">
      <div className='flex flex-col items-center max-w-md mx-auto p-6'>
        <div className="text-center text-3xl font-gourmet-eatery mb-8">
          Hi {name}! What type of date would you prefer?
        </div>
        
        <div className="w-full p-5 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="relative w-full">
              <select 
                value={selectedDateType}
                onChange={handleDateTypeChange}
                className="w-full px-5 py-4 rounded-lg bg-[#faf3eb] border-2 border-[#d69264] 
                          text-[#c3592b] font-medium text-lg appearance-none
                          focus:outline-none focus:ring-2 focus:ring-[#c3592b] focus:border-transparent
                          transition-all duration-300 cursor-pointer shadow-inner"
              >
                <option value="" disabled>Choose your adventure...</option>
                <option value="romantic">✨ Mall Strolling</option>
                <option value="outdoor">🌲 Outdoor Adventure</option>
                <option value="movie">🎬 Movie Night</option>
                <option value="coffee">☕ Coffee Date</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#c3592b] pointer-events-none">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            
            <button 
              type="submit"
              className="mt-8 w-full bg-[#c3592b] hover:bg-[#b44920] text-white font-bold py-3 px-6 rounded-lg
                        transform transition-all duration-300 hover:scale-[1.02] active:scale-95
                        shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedDateType}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DateType;