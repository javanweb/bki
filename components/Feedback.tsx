import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'motion/react';
import { MessageSquare, Send, Heart, Shield, Star, ThumbsUp, AlertCircle } from 'lucide-react';

interface FeedbackProps {
    onNavigateHome: () => void;
    onNavigateToLogin: () => void;
    onNavigateToPartnership: () => void;
    onNavigateToAbout: () => void;
    onNavigateToGoals: () => void;
    onNavigateToArticles: () => void;
    onNavigateToContact: () => void;
    onNavigateToFAQ: () => void;
    onNavigateToFeedback: () => void;
    onProductSelect?: (product: any) => void;
    onNavigateToAdminDashboard?: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({ 
    onNavigateHome, 
    onNavigateToLogin, 
    onNavigateToPartnership, 
    onNavigateToAbout, 
    onNavigateToGoals, 
    onNavigateToArticles,
    onNavigateToContact,
    onNavigateToFAQ,
    onNavigateToFeedback,
    onProductSelect,
    onNavigateToAdminDashboard
}) => {
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('submitting');
        // Simulate API call
        setTimeout(() => setFormStatus('success'), 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans" dir="rtl">
            <Header 
                onNavigateHome={onNavigateHome}
                onNavigateToLogin={onNavigateToLogin}
                onNavigateToPartnership={onNavigateToPartnership}
                onNavigateToAbout={onNavigateToAbout}
                onNavigateToGoals={onNavigateToGoals}
                onNavigateToArticles={onNavigateToArticles}
                onNavigateToContact={onNavigateToContact}
                onNavigateToFAQ={onNavigateToFAQ}
                onNavigateToFeedback={onNavigateToFeedback}
                onProductSelect={onProductSelect}
                variant="dark"
            />

            {/* Banner Section - Redesigned */}
            <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
                {/* Background Layer */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[#0f172a]"></div>
                    <div 
                        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070&auto=format&fit=crop')" }}
                    ></div>
                    {/* Animated Gradients */}
                    <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[80%] bg-brand/30 blur-[120px] rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[70%] bg-blue-500/20 blur-[100px] rounded-full animate-pulse transition-all duration-1000 delay-700"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-2.5 rounded-full text-blue-200 font-bold mb-8 border border-white/10 shadow-2xl shadow-black/20"
                    >
                        <div className="relative">
                            <Heart className="w-5 h-5 text-rose-500 animate-pulse" />
                            <div className="absolute inset-0 bg-rose-500 blur-sm opacity-50 scale-125"></div>
                        </div>
                        <span className="tracking-wide text-sm md:text-base">صدای شما برای ما ارزشمند است</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-[1.2] drop-shadow-2xl"
                    >
                        انتقادات و <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">پیشنهادات</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed"
                    >
                        ما با اشتیاق تمام، تجربیات و دیدگاه‌های شما را می‌خوانیم. نظرات هوشمندانه شما، مهم‌ترین ابزار ما برای رسیدن به قله‌های کیفیت و رضایت است.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-12 flex flex-wrap justify-center gap-4"
                    >
                        <div className="flex items-center gap-2 text-slate-400 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/5">
                            <Shield className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm">۱۰۰٪ محرمانه و ایمن</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 bg-white/5 px-4 py-2 rounded-xl backdrop-blur-sm border border-white/5">
                            <MessageSquare className="w-4 h-4 text-blue-400" />
                            <span className="text-sm">بررسی مستقیم مدیریت</span>
                        </div>
                    </motion.div>
                </div>

                {/* Decorative Bottom Curve */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
            </section>

            <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        
                        {/* Why Feedback Matters */}
                        <div className="lg:col-span-5 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
                            >
                                <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center text-white shadow-lg mb-6">
                                    <Shield className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">شفافیت و اعتماد</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    تمامی پیام‌های ارسالی مستقیماً توسط واحد بازرسی و مدیریت عالی بررسی می‌شوند. ما به شما اطمینان می‌دهیم که تک تک نظرات مورد توجه قرار گرفته و در صورت نیاز، اقدامات اصلاحی لازم انجام خواهد شد.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
                            >
                                <div className="w-14 h-14 bg-brand rounded-2xl flex items-center justify-center text-white shadow-lg mb-6">
                                    <ThumbsUp className="w-8 h-8" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">بهترین خدمات برای شما</h3>
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    پیشنهادات شما برای بهبود فرآیندهای تولید، بسته‌بندی، توزیع و حتی نحوه پاسخگویی کارشناسان فروش ما می‌تواند به ما کمک کند تا تجربه‌ای متمایز را برای شما رقم بزنیم.
                                </p>
                            </motion.div>

                            <div className="bg-slate-900 p-8 rounded-3xl text-white overflow-hidden relative group">
                                <div className="absolute right-0 top-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                                <div className="relative z-10">
                                    <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <AlertCircle className="w-6 h-6 text-amber-400" />
                                        نکته مهم
                                    </h4>
                                    <p className="text-slate-400 font-medium leading-relaxed">
                                        اگر برای یکی از محصولات خریداری شده مشکل فنی دارید، لطفاً از بخش <span className="text-brand font-bold decoration-dotted underline cursor-pointer" onClick={onNavigateToContact}>تماس با ما</span> با واحد پشتیبانی فنی در ارتباط باشید.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Feedback Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="lg:col-span-7"
                        >
                            <div className="bg-white rounded-[2rem] shadow-2xl shadow-brand/5 p-8 md:p-12 border border-gray-100 relative overflow-hidden">
                                
                                <div className="relative z-10">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                        <div>
                                            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">ثبت نظر</h2>
                                            <p className="text-gray-500 font-medium">فرم زیر را برای ارسال بازخورد خود تکمیل کنید.</p>
                                        </div>
                                        <div className="flex items-center gap-1 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => setRating(s)}
                                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${rating >= s ? 'bg-amber-400 text-white scale-110 shadow-lg shadow-amber-200' : 'text-gray-300 hover:text-amber-300'}`}
                                                >
                                                    <Star className="w-6 h-6" fill={rating >= s ? 'currentColor' : 'none'} />
                                                </button>
                                            ))}
                                            <span className="text-xs font-bold text-gray-400 mr-2 ml-2">امتیاز شما</span>
                                        </div>
                                    </div>

                                    {formStatus === 'success' ? (
                                        <motion.div 
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="text-center py-20"
                                        >
                                            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                                                <ThumbsUp className="w-12 h-12" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-gray-900 mb-4">پیام شما با موفقیت ثبت شد</h3>
                                            <p className="text-gray-500 font-medium text-lg mb-10 max-w-md mx-auto">
                                                از اینکه وقت گذاشتید و نظر خود را با ما در میان گذاشتید سپاسگزاریم. نظر شما در بهبود کیفیت ما موثر خواهد بود.
                                            </p>
                                            <button 
                                                onClick={() => setFormStatus('idle')}
                                                className="bg-brand text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-brand/20 hover:bg-brand-dark transition-all active:scale-95"
                                            >
                                                ارسال پیام جدید
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-8">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="space-y-2 group">
                                                    <label className="text-sm font-bold text-gray-700 mr-2 flex items-center gap-2 group-focus-within:text-brand transition-colors">
                                                        نام و نام خانوادگی
                                                        <span className="text-rose-500">*</span>
                                                    </label>
                                                    <input 
                                                        required
                                                        type="text" 
                                                        className="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl px-6 py-4 outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all font-medium text-gray-700"
                                                        placeholder="مثال: علی علوی"
                                                    />
                                                </div>
                                                <div className="space-y-2 group">
                                                    <label className="text-sm font-bold text-gray-700 mr-2 flex items-center gap-2 group-focus-within:text-brand transition-colors">
                                                        شماره همراه
                                                        <span className="text-rose-500">*</span>
                                                    </label>
                                                    <input 
                                                        required
                                                        type="tel" 
                                                        maxLength={11}
                                                        minLength={11}
                                                        pattern="09[0-9]{9}"
                                                        title="شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد"
                                                        className="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl px-6 py-4 outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all font-medium text-left text-gray-700"
                                                        dir="ltr"
                                                        placeholder="09123456789"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2 group">
                                                <label className="text-sm font-bold text-gray-700 mr-2 flex items-center gap-2 group-focus-within:text-brand transition-colors">
                                                    واحد مربوطه برای بازخورد
                                                </label>
                                                <select className="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl px-6 py-4 outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all font-medium text-gray-700 appearance-none">
                                                    <option>واحد فروش و قراردادها</option>
                                                    <option>واحد تولید و کیفیت محصول</option>
                                                    <option>واحد توزیع و لجستیک</option>
                                                    <option>واحد روابط عمومی و وب‌سایت</option>
                                                    <option>سایر بخش‌ها</option>
                                                </select>
                                            </div>

                                            <div className="space-y-2 group">
                                                <label className="text-sm font-bold text-gray-700 mr-2 flex items-center gap-2 group-focus-within:text-brand transition-colors">
                                                    متن پیام یا پیشنهاد
                                                    <span className="text-rose-500">*</span>
                                                </label>
                                                <textarea 
                                                    required
                                                    rows={6}
                                                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-3xl px-6 py-4 outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all font-medium resize-none text-gray-700"
                                                    placeholder="شما می‌توانید هرگونه انتقاد، پیشنهاد یا سپاسگزاری خود را اینجا بنویسید..."
                                                ></textarea>
                                            </div>

                                            <div className="flex flex-col md:flex-row items-center gap-6">
                                                <button 
                                                    type="submit"
                                                    disabled={formStatus === 'submitting'}
                                                    className="w-full md:w-auto bg-brand hover:bg-brand-dark text-white font-extrabold px-12 py-5 rounded-2xl shadow-xl shadow-brand/20 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                                >
                                                    {formStatus === 'submitting' ? (
                                                        <>
                                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                            <span>در حال ارسال...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Send className="w-5 h-5 -rotate-45" />
                                                            <span>ثبت و ارسال نهایی</span>
                                                        </>
                                                    )}
                                                </button>
                                                <p className="text-xs font-bold text-gray-400 text-center md:text-right flex items-center gap-1">
                                                    <Shield className="w-4 h-4" />
                                                    اطلاعات شما نزد ما محفوظ است.
                                                </p>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer onNavigateToAdminDashboard={onNavigateToAdminDashboard || (() => {})} />
        </div>
    );
};

export default Feedback;
