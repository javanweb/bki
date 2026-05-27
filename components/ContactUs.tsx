
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Globe } from 'lucide-react';
import TwitterIcon from './icons/TwitterIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import FacebookIcon from './icons/FacebookIcon';

interface ContactUsProps {
    onNavigateHome: () => void;
    onNavigateToLogin: () => void;
    onNavigateToPartnership: () => void;
    onNavigateToAbout: () => void;
    onNavigateToGoals: () => void;
    onNavigateToArticles: () => void;
    onNavigateToContact?: () => void;
    onProductSelect?: (product: any) => void;
    onNavigateToAdminDashboard?: () => void;
    onNavigateToFAQ?: () => void;
    onNavigateToFeedback?: () => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ 
    onNavigateHome, 
    onNavigateToLogin, 
    onNavigateToPartnership, 
    onNavigateToAbout, 
    onNavigateToGoals, 
    onNavigateToArticles,
    onNavigateToContact,
    onProductSelect,
    onNavigateToAdminDashboard,
    onNavigateToFAQ,
    onNavigateToFeedback
}) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const contactInfo = [
        {
            icon: <Phone className="w-6 h-6" />,
            title: 'شماره تماس',
            details: ['۰۲۱-۱۲۳۴۵۶۷۸', '۰۲۱-۸۷۶۵۴۳۲۱'],
            color: 'bg-brand/10 text-brand',
        },
        {
            icon: <Mail className="w-6 h-6" />,
            title: 'ایمیل',
            details: ['info@fpi-pipe.ir', 'sales@fpi-pipe.ir'],
            color: 'bg-brand/10 text-brand',
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            title: 'آدرس دفتر مرکزی',
            details: ['تهران، خیابان ولیعصر، بالاتر از میدان ونک، کوچه نگار، پلاک ۱۰'],
            color: 'bg-brand/10 text-brand',
        },
        {
            icon: <Clock className="w-6 h-6" />,
            title: 'ساعات کاری',
            details: ['شنبه تا چهارشنبه: ۸:۰۰ الی ۱۷:۰۰', 'پنجشنبه: ۸:۰۰ الی ۱۳:۰۰'],
            color: 'bg-brand/10 text-brand',
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans" dir="rtl">
            <Header 
                onNavigateHome={onNavigateHome}
                onNavigateToLogin={onNavigateToLogin}
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

            {/* Hero Section */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')" }}
                >
                    <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"></div>
                </div>
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                    >
                        با ما در ارتباط باشید
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-200 font-medium"
                    >
                        تیم پشتیبانی و فروش ما آماده پاسخگویی به سوالات و نیازهای شماست.
                    </motion.p>
                </div>
            </section>

            <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Contact Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-32 relative z-20 mb-20">
                        {contactInfo.map((info, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:border-brand/20 transition-all group"
                            >
                                <div className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    {info.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{info.title}</h3>
                                <div className="space-y-2">
                                    {info.details.map((detail, dIdx) => (
                                        <p key={dIdx} className="text-gray-600 leading-relaxed font-medium">{detail}</p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100"
                        >
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-12 bg-brand text-white rounded-2xl flex items-center justify-center shadow-lg shadow-brand/20">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">ارسال پیام</h2>
                                    <p className="text-gray-500 font-medium">نظرات و پیشنهادات خود را با ما در میان بگذارید.</p>
                                </div>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 mr-2">نام و نام خانوادگی</label>
                                        <input 
                                            type="text" 
                                            required
                                            className="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl px-6 py-4 outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all font-medium"
                                            placeholder="مثال: علی علوی"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 mr-2">شماره تماس</label>
                                        <input 
                                            type="tel" 
                                            required
                                            maxLength={11}
                                            minLength={11}
                                            pattern="09[0-9]{9}"
                                            title="شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد"
                                            className="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl px-6 py-4 outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all font-medium text-left"
                                            dir="ltr"
                                            placeholder="09123456789"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 mr-2">ایمیل (اختیاری)</label>
                                    <input 
                                        type="email" 
                                        className="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl px-6 py-4 outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all font-medium text-left"
                                        dir="ltr"
                                        placeholder="info@example.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 mr-2">موضوع پیام</label>
                                    <select className="w-full bg-slate-50 border-2 border-slate-300 rounded-2xl px-6 py-4 outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all font-medium">
                                        <option>واحد فروش</option>
                                        <option>واحد پشتیبانی فنی</option>
                                        <option>واحد مدیریت عالی</option>
                                        <option>سایر موارد</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 mr-2">متن پیام</label>
                                    <textarea 
                                        rows={5}
                                        required
                                        className="w-full bg-slate-50 border-2 border-slate-300 rounded-3xl px-6 py-4 outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all font-medium resize-none"
                                        placeholder="پیام خود را اینجا بنویسید..."
                                    ></textarea>
                                </div>
                                <button className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-5 rounded-2xl shadow-lg shadow-brand/20 transition-all flex items-center justify-center gap-3 active:scale-95">
                                    <Send className="w-5 h-5 -rotate-45" />
                                    <span>ارسال پیام</span>
                                </button>
                            </form>
                        </motion.div>

                        {/* Map & Socials */}
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-white p-4 rounded-3xl shadow-2xl border border-gray-100 overflow-hidden h-[450px]"
                            >
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d103684.053805904!2d51.35032596953125!3d35.70061730000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e07085c8e441d%3A0xbc5388c4b182d8d8!2sTehran%20Province%2C%20Tehran%2C%20District%203%2C%20Valiasr%20St%2C%20Iran!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
                                    className="w-full h-full rounded-2xl border-0"
                                    allowFullScreen={true} 
                                    loading="lazy" 
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <a href="#" className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 hover:bg-brand hover:text-white transition-all group">
                                    <FacebookIcon className="w-6 h-6 text-brand group-hover:text-white" />
                                    <span className="font-bold">فیس‌بوک</span>
                                </a>
                                <a href="#" className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 hover:bg-brand-dark hover:text-white transition-all group">
                                    <LinkedInIcon className="w-6 h-6 text-brand-dark group-hover:text-white" />
                                    <span className="font-bold">لینکدین</span>
                                </a>
                                <a href="#" className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 hover:bg-gray-900 hover:text-white transition-all group">
                                    <TwitterIcon className="w-6 h-6 text-blue-400 group-hover:text-white" />
                                    <span className="font-bold">توییتر</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer onNavigateToAdminDashboard={onNavigateToAdminDashboard || (() => {})} />
        </div>
    );
};

export default ContactUs;
