import React from 'react';
import CheckIcon from './icons/CheckIcon';

const IndustrialSolutions: React.FC = () => {
    return (
        <section className="py-20 sm:py-28">
            <div className="max-w-screen-2xl mx-auto px-12 sm:px-16 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-12 items-center">
                    <div>
                        <img 
                            src="https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=2574&auto=format&fit=crop"
                            alt="تاسیسات تولیدی صنعتی با بازوهای رباتیک"
                            className="rounded-lg shadow-xl w-full h-auto"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                            پیشرو در ارائه راهکارهای صنعتی
                        </h2>
                        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                            با بیش از دو دهه تجربه در صنعت، ما در تولید و توزیع سیستم‌های لوله‌کشی پلاستیکی با کیفیت بالا، شیرآلات و اتصالات برای کاربردهای مسکونی، تجاری و صنعتی تخصص داریم.
                        </p>
                        <ul className="mt-8 space-y-4 text-lg">
                            <li className="flex items-start">
                                <CheckIcon />
                                <span className="ml-3 text-gray-700">مواد اولیه و تولید با کیفیت برتر</span>
                            </li>
                            <li className="flex items-start">
                                <CheckIcon />
                                <span className="ml-3 text-gray-700">طیف گسترده محصولات برای تمام کاربردها</span>
                            </li>
                            <li className="flex items-start">
                                <CheckIcon />
                                <span className="ml-3 text-gray-700">پشتیبانی فنی و راهنمایی نصب</span>
                            </li>
                            <li className="flex items-start">
                                <CheckIcon />
                                <span className="ml-3 text-gray-700">قابلیت اطمینان اثبات‌شده در محیط‌های دشوار</span>
                            </li>
                            <li className="flex items-start">
                                <CheckIcon />
                                <span className="ml-3 text-gray-700">قیمت‌گذاری رقابتی و تحویل سریع</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default IndustrialSolutions;