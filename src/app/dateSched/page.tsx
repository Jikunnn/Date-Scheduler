'use client';
import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Main wrapper component
const DateScheduler = () => {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <DateSchedulerContent />
    </Suspense>
  );
};

// Content component that uses useSearchParams
function DateSchedulerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [name, setName] = useState('');
  const [dateType, setDateType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  React.useEffect(() => {
    // Get parameters from URL
    const nameParam = searchParams.get('name');
    const dateTypeParam = searchParams.get('dateType');
    
    if (nameParam) {
      setName(nameParam);
    }
    
    if (dateTypeParam) {
      setDateType(dateTypeParam);
    }
  }, [searchParams]);

  // Function to display friendly date type name
  const getDateTypeName = () => {
    switch(dateType) {
      case 'romantic': return 'Mall Strolling';
      case 'outdoor': return 'Outdoor Adventure';
      case 'movie': return 'Movie Night';
      case 'coffee': return 'Coffee Date';
      default: return 'your date';
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedDate && selectedTime) {
      router.push(`/finalDateSched?name=${encodeURIComponent(name)}&dateType=${encodeURIComponent(dateType)}&date=${encodeURIComponent(selectedDate)}&time=${encodeURIComponent(selectedTime)}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center fade-in">
      <div className='flex flex-col items-center max-w-md mx-auto p-6'>
        <div className="text-center text-3xl font-gourmet-eatery mb-4">
          Perfect, {name}!
        </div>
        
        <div className="text-center text-xl mb-6">
          I see you want to go on a <span className="font-semibold text-[#c3592b]">{getDateTypeName()}</span>
        </div>
        
        <div className="text-center mb-8">
          Now, let&apos;s pick a time that works for you:
        </div>
        
        <div className="w-full p-5 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
<div className="w-full mb-6">
  <label className="block text-sm font-medium mb-2 text-gray-700">Select a date:</label>
  <input
    type="date"
    value={selectedDate}
    onChange={(e) => setSelectedDate(e.target.value)}
    min={new Date().toISOString().split('T')[0]} // Prevent past dates
    className="w-full px-5 py-4 rounded-lg bg-[#faf3eb] border-2 border-[#d69264] 
              text-[#c3592b] font-medium text-lg
              focus:outline-none focus:ring-2 focus:ring-[#c3592b] focus:border-transparent
              transition-all duration-300 cursor-pointer shadow-inner"
    required
  />
</div>
            
            <div className="w-full mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-700">Select a time:</label>
              <input
                type="text"
                placeholder="HH:MM (24-hour format)"
                value={selectedTime}
                onChange={(e) => {
                  // Allow typing by only restricting to reasonable characters
                  const input = e.target.value;
                  
                  // Only allow digits and colon, up to 5 characters
                  if (/^[0-9:]*$/.test(input) && input.length <= 5) {
                    setSelectedTime(input);
                  }
                }}
                onBlur={() => {
                  // Validate format when user leaves the field
                  const timeRegex = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
                  if (!timeRegex.test(selectedTime) && selectedTime !== '') {
                    // If invalid format, clear the field or set to a default
                    setSelectedTime('');
                    alert('Please enter a valid time in 24-hour format (HH:MM)');
                  }
                }}
                className="w-full px-5 py-4 rounded-lg bg-[#faf3eb] border-2 border-[#d69264] 
                        text-[#c3592b] font-medium text-lg
                        focus:outline-none focus:ring-2 focus:ring-[#c3592b] focus:border-transparent
                        transition-all duration-300 cursor-pointer shadow-inner"
                required
              />
              <p className="mt-1 text-xs text-gray-500">Enter time in 24-hour format (e.g., 14:00 = 2:00 PM)</p>
            </div>
            
            <button 
              type="submit"
              className="mt-4 w-full bg-[#c3592b] hover:bg-[#b44920] text-white font-bold py-3 px-6 rounded-lg
                        transform transition-all duration-300 hover:scale-[1.02] active:scale-95
                        shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedDate || !selectedTime}
            >
              Schedule Date
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DateScheduler;