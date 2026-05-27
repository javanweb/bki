import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, Search, HelpCircle, MessageCircle, PhoneCall } from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-100 last:border-0">
            <button 
                onClick={onClick}
                className="w-full py-6 flex items-center justify-between text-right gap-4 hover:bg-gray-50 transition-colors px-4 rounded-xl group"
            >
                <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-brand' : 'text-gray-900 group-hover:text-brand-light'}`}>
                    {question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-brand text-white rotate-180' : 'bg-gray-100 text-gray-400 group-hover:bg-brand/10 group-hover:text-brand'}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pb-8 px-4 text-gray-600 leading-relaxed font-medium">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

interface FAQProps {
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

const FAQ: React.FC<FAQProps> = ({ 
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
    const [searchQuery, setSearchQuery] = useState('');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            category: 'محصولات و کیفیت',
            questions: [
                {
                    question: 'تفاوت لوله‌های تک لایه و پنج لایه در چیست؟',
                    answer: 'لوله‌های تک لایه (PPR) برای آب سرد و گرم بهداشتی مناسب هستند، اما در برابر نفوذ اکسیژن نفوذپذیرند. لوله‌های پنج لایه (PEX-AL-PEX) دارای یک لایه آلومینیوم هستند که از نفوذ اکسیژن جلوگیری کرده و تحمل فشار و دمای بالاتری دارند، به همین دلیل برای سیستم‌های گرمایشی رادیاتور و گرمایش از کف ایده‌آل هستند.'
                },
                {
                    question: 'آیا محصولات شما دارای گواهینامه استاندارد هستند؟',
                    answer: 'بله، تمامی محصولات ما طبق استانداردهای ملی ایران و گواهینامه‌های بین‌المللی ISO تولید می‌شوند و دارای تاییدیه مرکز تحقیقات راه، مسکن و شهرسازی هستند.'
                },
                {
                    question: 'عمر مفید لوله‌های پلیمری چقدر است؟',
                    answer: 'عمر مفید لوله‌های پلیمری با کیفیت در صورت اجرای صحیح و طبق استانداردهای مهندسی، تا ۵۰ سال و بیشتر تضمین می‌شود.'
                }
            ]
        },
        {
            category: 'خرید و نمایندگی',
            questions: [
                {
                    question: 'چگونه می‌توانم درخواست نمایندگی ارسال کنم؟',
                    answer: 'شما می‌توانید از منوی بالا گزینه "درخواست نمایندگی" را انتخاب کرده و فرم مربوطه را پر کنید. کارشناسان ما در سریع‌ترین زمان ممکن با شما تماس خواهند گرفت.'
                },
                {
                    question: 'حداقل مبلغ سفارش برای خرید عمده چقدر است؟',
                    answer: 'حداقل مبلغ سفارش بسته به نوع محصول و منطقه جغرافیایی متفاوت است. برای دریافت لیست قیمت و جزئیات بیشتر با واحد فروش تماس بگیرید.'
                }
            ]
        },
        {
            category: 'فنی و مهندسی',
            questions: [
                {
                    question: 'آیا برای نصب محصولات نیاز به ابزار خاصی است؟',
                    answer: 'بله، برای نصب لوله‌های PPR نیاز به دستگاه اتو (جوش حرارتی) و برای لوله‌های پنج لایه نیاز به ابزار پرس یا کوپلی مخصوص است.'
                },
                {
                    question: 'خدمات پس از فروش شامل چه مواردی می‌شود؟',
                    answer: 'خدمات پس از فروش ما شامل ضمانت‌نامه کتبی ۱۰ ساله، بیمه‌نامه مسئولیت محصولات و مشاوره فنی در حین اجرای پروژه می‌باشد.'
                }
            ]
        }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filteredFaqs = faqs.map(cat => ({
        ...cat,
        questions: cat.questions.filter(q => 
            q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => cat.questions.length > 0);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans" dir="rtl">
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

            {/* Hero Section */}
            <section className="relative h-[300px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50"></div>
                </div>
                <div className="relative z-10 text-center px-4">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        سوالات متداول
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-300 text-lg font-medium"
                    >
                        پاسخ پرسش‌های احتمالی خود را اینجا بیابید
                    </motion.p>
                </div>
            </section>

            <main className="flex-grow max-w-4xl mx-auto w-full px-4 -mt-16 pb-20 relative z-20">
                {/* Search Bar */}
                <div className="bg-white p-2 rounded-3xl shadow-xl shadow-slate-200/50 mb-12 flex items-center gap-4 border border-gray-100">
                    <div className="flex-grow relative">
                        <input 
                            type="text" 
                            placeholder="نام موضوع یا کلمه کلیدی را جستجو کنید..."
                            className="w-full py-4 pr-14 pl-6 rounded-2xl bg-gray-50 outline-none focus:bg-white focus:ring-4 focus:ring-brand/10 transition-all font-medium text-gray-700"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                    </div>
                </div>

                <div className="space-y-12">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((category, catIdx) => (
                            <motion.div 
                                key={catIdx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: catIdx * 0.1 }}
                            >
                                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-brand rounded-full"></span>
                                    {category.category}
                                </h2>
                                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                                    {category.questions.map((faq, qIdx) => {
                                        const globalIdx = catIdx * 100 + qIdx;
                                        return (
                                            <FAQItem 
                                                key={qIdx}
                                                question={faq.question}
                                                answer={faq.answer}
                                                isOpen={openIndex === globalIdx}
                                                onClick={() => setOpenIndex(openIndex === globalIdx ? null : globalIdx)}
                                            />
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 font-bold text-xl">متاسفانه موردی یافت نشد!</p>
                            <p className="text-gray-400 mt-2">لطفاً کلمه کلیدی دیگری را جستجو کنید.</p>
                        </div>
                    )}
                </div>

                {/* Support CTA */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-brand rounded-3xl p-8 text-white relative overflow-hidden group">
                        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-brand-light rounded-full opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                        <div className="relative z-10">
                            <MessageCircle className="w-10 h-10 mb-4 opacity-80" />
                            <h3 className="text-xl font-bold mb-2">هنوز سوالی دارید؟</h3>
                            <p className="text-brand-light mb-6 font-medium leading-relaxed">
                                اگر پاسخ خود را نیافتید، می‌توانید مستقیم با پشتیبانی چت کنید.
                            </p>
                            <button onClick={onNavigateToContact} className="bg-white text-brand px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all active:scale-95">
                                ارتباط با ما
                            </button>
                        </div>
                    </div>
                    <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group border border-slate-800">
                        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-slate-800 rounded-full opacity-50 group-hover:scale-125 transition-transform duration-500"></div>
                        <div className="relative z-10">
                            <PhoneCall className="w-10 h-10 mb-4 opacity-80" />
                            <h3 className="text-xl font-bold mb-2">تماس تلفنی</h3>
                            <p className="text-slate-400 mb-6 font-medium leading-relaxed">
                                کارشناسان فنی ما آماده راهنمایی تلفنی شما هستند.
                            </p>
                            <a href="tel:02112345678" className="inline-block bg-slate-800 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-700 transition-all active:scale-95">
                                ۱۰ ۱۲ ۳۴ ۵۶ ۰۲۱
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <Footer onNavigateToAdminDashboard={onNavigateToAdminDashboard || (() => {})} />
        </div>
    );
};

export default FAQ;
