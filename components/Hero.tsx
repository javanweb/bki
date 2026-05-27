
import React, { useState, useEffect } from 'react';

const slides = [
  { id: 1, number: '۰۱', text: 'راهکارهای لوله‌کشی کامپوزیت' },
  { id: 2, number: '۰۲', text: 'کامپوزیت‌ها - مواد آینده' },
  { id: 3, number: '۰۳', text: 'فناوری‌های نوآورانه برای مدیریت آب' },
  { id: 4, number: '۰۴', text: 'محصولات سبز برای پروژه‌های سبز شما' },
  { id: 5, number: '۰۵', text: 'راهکارهای پایدار برای فردایی بهتر' },
];

const Hero: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(3); // Start at slide 04

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const displaySlides = [...slides, ...slides.slice(0, 2)];

  return (
    <div className="h-full flex flex-col justify-end p-8 sm:p-12 md:p-20 relative">
      <div className="absolute top-1/2 -translate-y-1/2 right-8 sm:right-12 md:right-20">
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-white max-w-3xl leading-tight">
          محصولات سبز برای پروژه‌های سبز شما
        </h1>
      </div>

      <div className="absolute bottom-[20%] left-10 sm:left-20">
        <div className="bg-brand-dark/50 backdrop-blur-md p-6 rounded-2xl border border-white/20 w-80 text-center space-y-4 shadow-2xl"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
          <h3 className="text-white font-semibold text-lg leading-tight">
            دانلود کاتالوگ کویر بسپار کلیک کنید
          </h3>
          <button className="bg-white text-black px-8 py-3 rounded-full flex items-center justify-center w-full font-bold hover:bg-gray-200 transition-colors">
            دانلود کاتالوگ
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center gap-6">
          <span className="text-lg font-semibold">{slides[activeSlide].number}</span>
          <div className="flex-grow h-0.5 bg-white/20 relative">
             <div
                className="absolute top-0 left-0 h-full bg-white transition-all duration-500 ease-in-out"
                style={{ width: `${((activeSlide + 1) / slides.length) * 100}%` }}
              ></div>
          </div>
        </div>
        <div className="mt-4 flex overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(${(activeSlide - 1) * 100/3}%)` }}
          >
            {displaySlides.map((slide, index) => (
              <div key={index} className="basis-1/3 flex-shrink-0 px-4 flex items-center justify-center gap-4">
                <p
                  className={`text-lg transition-opacity duration-500 text-center ${
                    index === activeSlide || (index === activeSlide + slides.length) ? 'opacity-100 font-semibold' : 'opacity-50'
                  }`}
                >
                  {slide.text}
                </p>
                <div className="w-px h-6 bg-white/50" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
