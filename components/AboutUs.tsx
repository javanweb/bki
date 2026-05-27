
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CheckIcon from './icons/CheckIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

const AboutUs: React.FC<{ 
    onNavigateHome: () => void; 
    onNavigateToLogin: () => void; 
    onNavigateToPartnership: () => void;
    onNavigateToAbout: () => void;
    onNavigateToGoals?: () => void;
    onNavigateToArticles?: () => void;
    onProductSelect?: (product: any) => void;
    onNavigateToContact?: () => void;
    onNavigateToFAQ?: () => void;
    onNavigateToFeedback?: () => void;
}> = ({ onNavigateHome, onNavigateToLogin, onNavigateToPartnership, onNavigateToAbout, onNavigateToGoals, onNavigateToArticles, onProductSelect, onNavigateToContact, onNavigateToFAQ, onNavigateToFeedback }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const stats = [
        { label: 'دهه تجربه درخشان', value: '۲+' },
        { label: 'پروژه زیرساختی ملی', value: '۸۵۰' },
        { label: 'ظرفیت تولید سالانه (تن)', value: '۱۲,۰۰۰' },
        { label: 'استان تحت پوشش', value: '۳۱' },
    ];

    const coreValues = [
        {
            title: 'مهندسی دقیق',
            desc: 'هر میلی‌متر از محصولات ما نتیجه محاسبات دقیق مهندسی و شبیه‌سازی‌های پیشرفته است.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A2 2 0 013 15.487V6.513a2 2 0 011.553-1.943L12 2l7.447 2.57a2 2 0 011.553 1.943v8.974a2 2 0 01-1.553 1.943L15 20l-3 2-3-2z" />
                </svg>
            )
        },
        {
            title: 'پایداری محیطی',
            desc: 'تعهد به تولید سبز و استفاده از موادی که کمترین ردپای کربنی را در چرخه طبیعت باقی می‌گذارند.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h.5A2.5 2.5 0 0018 9.5V5a2 2 0 00-2-2h-1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
            )
        },
        {
            title: 'تکنولوژی آلمانی',
            desc: 'بهره‌گیری از پیشرفته‌ترین خطوط تولید اکستروژن و استانداردهای سخت‌گیرانه DIN آلمان.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a2 2 0 002 2h3a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 00-2 2v3a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1a2 2 0 00-2-2H9a2 2 0 00-2 2v1a2 2 0 01-2 2H4a2 2 0 01-2-2v-3a2 2 0 012-2h1a2 2 0 002-2V9a2 2 0 012-2h1a2 2 0 002-2V4z" />
                </svg>
            )
        }
    ];

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-brand/20 selection:text-brand-dark" dir="rtl">
            {/* --- Hero Section --- */}
            <div className="relative h-[85vh] flex flex-col overflow-hidden bg-slate-900">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110 hover:scale-100"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2670&auto=format&fit=crop')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/40 to-white"></div>
                </div>
                
                <Header 
                    onNavigateToLogin={onNavigateToLogin} 
                    onNavigateHome={onNavigateHome} 
                    onNavigateToPartnership={onNavigateToPartnership}
                    onNavigateToAbout={onNavigateToAbout}
                    onNavigateToGoals={onNavigateToGoals}
                    onNavigateToArticles={onNavigateToArticles}
                    onProductSelect={onProductSelect}
                    onNavigateToContact={onNavigateToContact}
                    onNavigateToFAQ={onNavigateToFAQ}
                    onNavigateToFeedback={onNavigateToFeedback}
                    variant="dark" 
                />
                
                <div className="relative z-10 flex-grow flex items-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="max-w-3xl">
                            <span className="inline-block py-1 px-3 bg-brand/20 backdrop-blur-md border border-brand/30 text-brand rounded-full text-xs font-bold tracking-widest mb-6 animate-fade-in">
                                SINCE 2002
                            </span>
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.1] drop-shadow-2xl">
                                فراتر از یک لوله؛ <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-l from-brand to-brand-light">جریان هوشمند زندگی</span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-10 leading-relaxed font-light max-w-2xl">
                                صنایع لوله آینده با تمرکز بر تکنولوژی‌های نوین پلیمری، راهکارهایی را خلق می‌کند که نبض تپنده زیرساخت‌های مدرن امروز و فرداست.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button onClick={onNavigateHome} className="bg-brand hover:bg-brand-dark text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-brand/20 flex items-center gap-2 group">
                                    مشاهده توانمندی‌ها
                                    <ArrowRightIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Legacy Section --- */}
            <section className="relative -mt-20 z-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200 border border-gray-100 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            <div className="p-12 md:p-20 space-y-8">
                                <div className="space-y-4">
                                    <h2 className="text-sm font-black text-brand tracking-[0.2em] uppercase">اصالت و نوآوری</h2>
                                    <p className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                                        ما داستان آب و انرژی را <br/> بازنویسی می‌کنیم.
                                    </p>
                                </div>
                                <p className="text-lg text-gray-600 leading-relaxed text-justify font-light">
                                    دو دهه پیش، با یک ایده ساده اما جسورانه آغاز کردیم: تولید لوله‌هایی که هرگز تسلیم خوردگی نشوند. امروز، صنایع لوله آینده (FPI) به عنوان نماد اعتماد در پروژه‌های عظیم ملی شناخته می‌شود. ما فقط لوله نمی‌سازیم؛ ما امنیت و پایداری را به خانه‌ها و صنایع هدیه می‌دهیم.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                    {[
                                        'استاندارد کیفیت ISO 9001:2015',
                                        'تکنولوژی انحصاری چندلایه',
                                        'شبکه توزیع هوشمند کشوری',
                                        'واحد تحقیق و توسعه پیشرو'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center">
                                                <CheckIcon />
                                            </div>
                                            <span className="text-slate-700 font-medium text-sm">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative group overflow-hidden">
                                <img 
                                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop" 
                                    alt="Factory Floor" 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Interactive Stats --- */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-24">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="text-5xl md:text-7xl font-black text-slate-900 mb-4 transition-transform group-hover:-translate-y-2">
                                    {stat.value}
                                </div>
                                <div className="h-1 w-12 bg-blue-500 mx-auto mb-6 rounded-full"></div>
                                <p className="text-gray-500 font-bold text-sm tracking-wide">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Core Values (Modern Cards) --- */}
            <section className="py-24 bg-slate-50 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-sm font-black text-brand tracking-[0.3em] uppercase mb-4">DNA سازمانی</h2>
                        <p className="text-3xl md:text-5xl font-extrabold text-slate-900">ارزش‌هایی که ما را تعریف می‌کنند</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {coreValues.map((value, index) => (
                            <div key={index} className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-brand/20 group">
                                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-brand mb-8 group-hover:bg-brand group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4">{value.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-light">
                                    {value.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Leadership Quote --- */}
            <section className="py-32 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <svg className="w-20 h-20 text-brand/10 mx-auto mb-10" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V3L14.017 2H21.017C22.1216 2 23.017 2.89543 23.017 4V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1.017 21L1.017 18C1.017 16.8954 1.91243 16 3.017 16H6.017C6.56928 16 7.017 15.5523 7.017 15V9C7.017 8.44772 6.56928 8 6.017 8H3.017C1.91243 8 1.017 7.10457 1.017 6V3L1.017 2H8.017C9.12157 2 10.017 2.89543 10.017 4V15C10.017 18.3137 7.33072 21 4.017 21H1.017Z" />
                    </svg>
                    <p className="text-2xl md:text-3xl font-medium text-slate-800 leading-relaxed italic mb-10">
                        «هدف ما در این مجموعه، ساختن پلی بین محدودیت‌های امروز و پتانسیل‌های فرداست. ما متعهدیم که جریان زندگی را در امن‌ترین و باکیفیت‌ترین بستر ممکن برقرار سازیم.»
                    </p>
                    <div className="space-y-1">
                        <p className="text-lg font-black text-slate-900">مهندس علوی</p>
                        <p className="text-sm text-brand font-bold uppercase tracking-widest">مدیرعامل صنایع لوله آینده</p>
                    </div>
                </div>
                {/* Background Decor */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-50 rounded-full blur-3xl opacity-30 -z-10"></div>
            </section>

            {/* --- CTA Section --- */}
            <section className="pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-8">آماده همکاری در پروژه‌های بزرگ هستید؟</h2>
                            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
                                تیم فنی و مهندسی ما آماده ارائه مشاوره‌های تخصصی برای انتخاب بهترین سیستم‌های لوله‌کشی متناسب با نیاز پروژه شماست.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <button onClick={onNavigateHome} className="bg-white text-slate-900 px-10 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-xl">
                                    کاتالوگ محصولات
                                </button>
                                <button className="bg-transparent border border-slate-700 text-white px-10 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
                                    تماس با واحد فنی
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutUs;
