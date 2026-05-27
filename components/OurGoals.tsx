
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import ArrowRightIcon from './icons/ArrowRightIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import GlobeIcon from './icons/GlobeIcon';

const OurGoals: React.FC<{ 
    onNavigateHome: () => void; 
    onNavigateToLogin: () => void; 
    onNavigateToPartnership: () => void;
    onNavigateToAbout: () => void;
    onNavigateToGoals: () => void;
    onNavigateToArticles?: () => void;
    onProductSelect?: (product: any) => void;
    onNavigateToContact?: () => void;
    onNavigateToFAQ?: () => void;
    onNavigateToFeedback?: () => void;
}> = ({ onNavigateHome, onNavigateToLogin, onNavigateToPartnership, onNavigateToAbout, onNavigateToGoals, onNavigateToArticles, onProductSelect, onNavigateToContact, onNavigateToFAQ, onNavigateToFeedback }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const strategicGoals = [
        {
            title: 'پیشرو در نوآوری',
            desc: 'دستیابی به جایگاه نخست در تحقیق و توسعه محصولات پلیمری هوشمند در منطقه خاورمیانه.',
            icon: (
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            )
        },
        {
            title: 'توسعه بازارهای جهانی',
            desc: 'صادرات محصولات به بیش از ۲۰ کشور جهان و حضور فعال در بازارهای بین‌المللی تا سال ۲۰۳۰.',
            icon: <GlobeIcon className="w-10 h-10" />
        },
        {
            title: 'تضمین کیفیت مطلق',
            desc: 'ارتقای استانداردهای کیفی فراتر از الزامات قانونی برای تضمین عمر مفید ۵۰ ساله محصولات.',
            icon: <ShieldCheckIcon className="w-10 h-10" />
        }
    ];

    const values = [
        {
            title: 'رضایت مشتری',
            desc: 'مشتری‌مداری نه یک شعار، بلکه هسته اصلی تمامی فعالیت‌های ما در صنایع لوله آینده است.',
        },
        {
            title: 'حفاظت از محیط زیست',
            desc: 'کاهش حداکثری ضایعات تولید و استفاده از تکنولوژی‌های بازیافت‌پذیر در تمامی خطوط.',
        },
        {
            title: 'توسعه سرمایه انسانی',
            desc: 'سرمایه‌گذاری مستمر بر آموزش و رفاه کارکنان به عنوان ارزشمندترین دارایی سازمان.',
        }
    ];

    return (
        <div className="bg-white min-h-screen font-sans selection:bg-brand/20 selection:text-brand-dark" dir="rtl">
            {/* --- Hero Section --- */}
            <div className="relative h-[60vh] flex flex-col overflow-hidden bg-slate-900">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-white"></div>
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
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
                        <div className="max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                                چشم‌انداز و <span className="text-brand">اهداف استراتژیک</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
                                ما در صنایع لوله آینده، مسیری را ترسیم کرده‌ایم که در آن کیفیت، نوآوری و پایداری، ارکان اصلی حرکت ما به سوی آینده‌ای روشن‌تر هستند.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Mission & Vision --- */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-12">
                            <div className="bg-brand/5 p-10 rounded-[2.5rem] border border-brand/10">
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-white">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                    ماموریت ما
                                </h2>
                                <p className="text-lg text-slate-700 leading-relaxed text-justify">
                                    ماموریت ما تولید و عرضه سیستم‌های انتقال سیالات با بالاترین استانداردهای جهانی، به منظور ارتقای کیفیت زیرساخت‌های عمرانی و صنعتی کشور و منطقه است. ما متعهدیم با بهره‌گیری از دانش روز و تکنولوژی‌های پاک، محصولاتی ایمن و بادوام برای نسل‌های آینده خلق کنیم.
                                </p>
                            </div>
                            
                            <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white">
                                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-brand-light rounded-xl flex items-center justify-center text-white">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                    چشم‌انداز ما
                                </h2>
                                <p className="text-lg text-slate-300 leading-relaxed text-justify">
                                    تبدیل شدن به معتبرترین برند تولیدکننده لوله‌های پلیمری در منطقه و پیشرو در ارائه راهکارهای هوشمند مدیریت سیالات، با تکیه بر نوآوری مستمر و مسئولیت‌پذیری اجتماعی تا پایان دهه جاری.
                                </p>
                            </div>
                        </div>
                        
                        <div className="relative">
                            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop" 
                                    alt="Modern Office" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand rounded-[2rem] p-8 text-white hidden md:block">
                                <p className="text-5xl font-black mb-2">۱۰۰٪</p>
                                <p className="text-lg font-bold">تعهد به کیفیت</p>
                                <p className="text-sm opacity-80 mt-2">در تمامی مراحل تولید و عرضه</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Strategic Goals --- */}
            <section className="py-24 bg-slate-50 border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-sm font-black text-brand tracking-[0.3em] uppercase mb-4">اهداف کلان</h2>
                        <p className="text-3xl md:text-5xl font-extrabold text-slate-900">نقشه راه ما برای آینده</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {strategicGoals.map((goal, index) => (
                            <div key={index} className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-brand/20 group">
                                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-brand mb-8 group-hover:bg-brand group-hover:text-white transition-all duration-500">
                                    {goal.icon}
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4">{goal.title}</h3>
                                <p className="text-gray-500 leading-relaxed font-light">
                                    {goal.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Values --- */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black text-slate-900">ارزش‌های بنیادین ما</h2>
                        <div className="w-24 h-1.5 bg-brand mx-auto mt-4 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {values.map((value, index) => (
                            <div key={index} className="text-center space-y-4">
                                <div className="text-brand font-black text-6xl opacity-10">0{index + 1}</div>
                                <h3 className="text-xl font-bold text-slate-900">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA Section --- */}
            <section className="pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-brand rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-8">همراه ما در مسیر تعالی باشید</h2>
                            <p className="text-xl text-brand-light mb-12 max-w-2xl mx-auto font-light">
                                ما معتقدیم که اهداف بزرگ تنها با همکاری و اعتماد متقابل محقق می‌شوند.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <button onClick={onNavigateToPartnership} className="bg-white text-brand px-10 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-xl flex items-center gap-2">
                                    درخواست همکاری
                                    <ArrowRightIcon />
                                </button>
                                <button onClick={onNavigateHome} className="bg-transparent border border-brand-light text-white px-10 py-4 rounded-xl font-bold hover:bg-brand-dark transition-all">
                                    بازگشت به صفحه اصلی
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

export default OurGoals;
