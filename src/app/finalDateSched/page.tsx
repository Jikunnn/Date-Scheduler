'use client';
import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

// Main wrapper component
const ConfirmationPage = () => {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <ConfirmationPageContent />
    </Suspense>
  );
};

// Content component that uses useSearchParams
function ConfirmationPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [name, setName] = useState('');
  const [dateType, setDateType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  React.useEffect(() => {
    const nameParam = searchParams.get('name');
    const dateTypeParam = searchParams.get('dateType');
    const dateParam = searchParams.get('date');
    const timeParam = searchParams.get('time');
    
    if (nameParam) setName(nameParam);
    if (dateTypeParam) setDateType(dateTypeParam);
    if (dateParam) setDate(dateParam);
    if (timeParam) setTime(timeParam);
  }, [searchParams]);

  // Function to display date type name
  const getDateTypeName = () => {
    switch(dateType) {
      case 'romantic': return 'Mall Strolling';
      case 'outdoor': return 'Outdoor Adventure';
      case 'movie': return 'Movie Night';
      case 'coffee': return 'Coffee Date';
      default: return 'date';
    }
  };

  // Format date
  const formatDate = () => {
    if (!date) return '';
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric'
    });
  };

  // Format time in 12-hour format
  const formatTime = () => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center fade-in">
      <div className='flex flex-col items-center max-w-md mx-auto p-6'>
        <div className="text-center text-4xl font-gourmet-eatery mb-6">
          It&apos;s a Date!
        </div>
        
        <div className="w-full p-6 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg">
          <div className="text-center mb-4">
            <div className="text-xl mb-6">
              {name && <div className="mb-2">Hi {name}!</div>}
              Now it&apos;s settled! See you on <span className="font-semibold text-[#c3592b]">{formatDate()}</span> at <span className="font-semibold text-[#c3592b]">{formatTime()}</span>.
            </div>
            
            <div className="text-xl mb-8">
              I&apos;m looking forward to our <span className="font-semibold text-[#c3592b]">{getDateTypeName()}</span> date! 💖
            </div>
            
            <div className="my-8">
              <Image 
                src="/celebration.gif" 
                alt="Celebration"
                width={200} 
                height={200}
                className="mx-auto"
                priority 
                unoptimized={true}
              />
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <button 
              onClick={() => router.push('/')}
              className="bg-[#c3592b] hover:bg-[#b44920] text-white font-bold py-3 px-6 rounded-lg
                        transform transition-all duration-300 hover:scale-[1.02] active:scale-95
                        shadow-md hover:shadow-lg"
            >
              Back to Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;