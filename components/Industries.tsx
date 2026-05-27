import React from 'react';
import IndustryCard from './IndustryCard';

const industriesData = [
    {
        title: 'ساختمان‌های مسکونی',
        imageUrl: 'https://images.unsplash.com/photo-1582298532433-22873cda8cb2?q=80&w=800&auto=format&fit=crop'
    },
    {
        title: 'تاسیسات تجاری',
        imageUrl: 'https://images.unsplash.com/photo-1579892128911-4752b0c169a2?q=80&w=800&auto=format&fit=crop'
    },
    {
        title: 'کارخانه‌های صنعتی',
        imageUrl: 'https://images.unsplash.com/photo-1616738335345-0e5c9b4e5b3f?q=80&w=800&auto=format&fit=crop'
    },
    {
        title: 'مراکز بهداشتی و درمانی',
        imageUrl: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a1e6?q=80&w=800&auto=format&fit=crop'
    }
];

const Industries: React.FC = () => {
    return (
        <section className="py-20 sm:py-28 bg-white">
            <div className="max-w-screen-2xl mx-auto px-12 sm:px-16 lg:px-24">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        صنایع و کاربردها
                    </h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
                        خدمت‌رسانی به بخش‌های مختلف با راهکارهای لوله‌کشی سفارشی
                    </p>
                </div>

                <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {industriesData.map((industry, index) => (
                        <IndustryCard 
                            key={index}
                            title={industry.title}
                            imageUrl={industry.imageUrl}
                        />
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="bg-brand text-white font-semibold px-8 py-3 rounded-lg hover:bg-brand-dark transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand focus:ring-opacity-50">
                        دانلود کاتالوگ
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Industries;