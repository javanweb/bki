import React from 'react';
import DotPattern from './icons/DotPattern';

// --- Logo Components ---
// These are simplified representations of the logos shown in the image.

const ThirtyYearsLogo = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-1 text-center text-gray-400 w-28">
        <div className="w-24 h-24 rounded-full border-2 border-current flex flex-col items-center justify-center p-2">
             <div className="flex items-baseline gap-1">
                <p className="text-4xl font-extrabold">30</p>
                <p className="text-base font-semibold tracking-widest">YEARS</p>
             </div>
             <p className="text-xs tracking-widest">WARRANTY</p>
        </div>
    </div>
);

const UlproLogo = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-1 text-center text-gray-400 w-28">
        <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-current mb-1">
            <path d="M49.61,35.43c-1-3.37-3.66-5.59-3.71-5.64a13.88,13.88,0,0,0-6.1-3.23c-3.15-.83-6.42.33-8.15,3.31a15.2,15.2,0,0,0-5.18,10.13c.1,4,2,7.79,4.41,10.37,2.44,2.5,5.34,3.75,8.27,3.61,1.13,0,2.27-.19,3.39-.53s2.2-.87,3.19-1.56c.9-.62,1.69-1.4,2.33-2.29.1-.13.19-.27.28-.41.77-1.12,1.25-2.48,1.41-4C52.1,41.9,51.27,38.11,49.61,35.43Z" stroke="currentColor" strokeWidth="2.5" strokeMiterlimit="10"/>
            <path d="M41.1,26.79c1.68-2.15,2.71-5.11,2.59-7.85-2.29.17-5.12,1.4-7,3.66" stroke="currentColor" strokeWidth="2.5" strokeMiterlimit="10"/>
        </svg>
        <p className="text-xs font-semibold">I.R.FDO</p>
    </div>
);

const RoadHousingLogo = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-2 text-center text-gray-400 w-36">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-current">
            <path d="M21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12 6V18" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 10L16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8 14L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8 6L5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M16 6L19 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8 18L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M16 18L19 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <p className="text-xs leading-relaxed font-semibold">Road, Housing & Urban Development Research Center</p>
    </div>
);

const IranianIndustryLogo = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-2 text-center text-gray-400 w-36">
       <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-current">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M16.24 7.76L7.76 16.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M18 12H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M16.24 16.24L7.76 7.76" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <p className="text-xs leading-relaxed font-semibold">Iranian Installation Industry Association</p>
   </div>
);

const IecsLogo = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-2 text-center text-gray-400 w-28">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-current">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor" opacity="0.5"/>
            <path d="M12 6C9.28 6 7.5 9.17 7.5 12C7.5 14.21 8.84 16.65 10.5 18C10.79 17.75 11.23 17.21 11.5 16.7C10.5 15.65 10 13.9 10 12C10 10.3 10.78 7.5 12 7.5C13.22 7.5 14 10.3 14 12C14 13.9 13.5 15.65 12.5 16.7C12.77 17.21 13.21 17.75 13.5 18C15.16 16.65 16.5 14.21 16.5 12C16.5 9.17 14.72 6 12 6Z" fill="currentColor"/>
        </svg>
        <p className="text-3xl font-bold tracking-widest">IECS.</p>
    </div>
);


const Partnership: React.FC = () => {
    return (
        <section className="relative bg-slate-900 pt-[40rem] pb-20 sm:pt-[48rem] sm:pb-28 overflow-hidden">
            <div className="absolute inset-0 opacity-20 mix-blend-soft-light">
                <img 
                    src="https://images.unsplash.com/photo-1485322221921-a240d8a4f836?q=80&w=2574&auto=format&fit=crop" 
                    alt="Industrial background" 
                    className="w-full h-full object-cover" 
                />
            </div>
            <div className="absolute inset-x-0 top-0 h-1/2 pointer-events-none" aria-hidden="true">
                <DotPattern className="w-full h-full" />
            </div>

            <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                    <div className="text-center md:text-right md:flex-grow">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                            نماینده ما هستید؟
                        </h2>
                        <p className="mt-4 text-base text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0">
                            اگر نماینده یا عامل فروش مجاز و رسمی محصولات گروه صنایع گیتی‌پسند هستید، سفارش خود را در گیتی‌کالا ثبت کنید.
                        </p>
                    </div>
                    <div className="w-full sm:w-auto md:w-auto flex-shrink-0">
                        <a 
                            href="#"
                            className="inline-block w-full text-center bg-red-600 text-white font-bold px-10 py-3 rounded-lg text-base hover:bg-red-700 transition-colors shadow-lg"
                        >
                            ورود به گیتی‌کالا
                        </a>
                    </div>
                </div>

                <div className="mt-24">
                     <div className="flex flex-wrap items-center justify-center lg:justify-between gap-y-12 gap-x-8">
                        <div className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-300 cursor-pointer"><ThirtyYearsLogo /></div>
                        <div className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-300 cursor-pointer"><UlproLogo /></div>
                        <div className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-300 cursor-pointer"><RoadHousingLogo /></div>
                        <div className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-300 cursor-pointer"><IranianIndustryLogo /></div>
                        <div className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition duration-300 cursor-pointer"><IecsLogo /></div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Partnership;