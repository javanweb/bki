import React from 'react';
import LogoIcon from './icons/LogoIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import TwitterIcon from './icons/TwitterIcon';
import FacebookIcon from './icons/FacebookIcon';

const Footer: React.FC<{ onNavigateToAdminDashboard?: () => void }> = ({ onNavigateToAdminDashboard }) => {
    const footerLinks = {
        company: ['درباره ما', 'فرصت‌های شغلی', 'اخبار', 'تماس'],
        products: ['سیستم‌های پلی‌پروپیلن', 'شیرآلات و اتصالات برنجی', 'سیستم‌های اتصالات پرسی', 'سیستم‌های لوله PEX'],
        support: ['پشتیبانی فنی', 'راهنمای نصب', 'گارانتی', 'دانلودها', 'مدیریت مشتریان'],
    };

    return (
        <footer className="bg-[#0f172a] text-gray-300">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <a href="#" className="flex items-center gap-3">
                            <LogoIcon />
                            <span className="text-white font-bold text-xl">اینداستری‌پلاست</span>
                        </a>
                        <p className="text-sm leading-relaxed max-w-sm">
                            راهکارهای پلاستیکی صنعتی برتر برای سیستم‌های آبرسانی و گرمایشی.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><LinkedInIcon /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FacebookIcon /></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wider uppercase text-sm">شرکت</h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.company.map(link => (
                                <li key={link}>
                                    <a href="#" className="text-sm hover:text-white transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wider uppercase text-sm">محصولات</h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.products.map(link => (
                                <li key={link}>
                                    <a href="#" className="text-sm hover:text-white transition-colors">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-bold tracking-wider uppercase text-sm">پشتیبانی</h3>
                        <ul className="mt-4 space-y-3">
                            {footerLinks.support.map(link => (
                                <li key={link}>
                                    {link === 'مدیریت مشتریان' ? (
                                        <button onClick={onNavigateToAdminDashboard} className="text-sm hover:text-white transition-colors">{link}</button>
                                    ) : (
                                        <a href="#" className="text-sm hover:text-white transition-colors">{link}</a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-sm">
                    <p className="text-gray-400 order-2 sm:order-2 mt-4 sm:mt-0">&copy; ۲۰۲۵ اینداستری‌پلاست. تمام حقوق محفوظ است.</p>
                    <div className="flex gap-6 order-1 sm:order-1">
                        <a href="#" className="hover:text-white transition-colors">سیاست حفظ حریم خصوصی</a>
                        <a href="#" className="hover:text-white transition-colors">شرایط خدمات</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;