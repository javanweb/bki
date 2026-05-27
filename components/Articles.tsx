import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface ArticlesProps {
  onNavigateHome: () => void;
  onNavigateToLogin: () => void;
  onNavigateToPartnership: () => void;
  onNavigateToAbout: () => void;
  onNavigateToGoals: () => void;
  onNavigateToArticles: () => void;
  onNavigateToContact?: () => void;
  onNavigateToFAQ?: () => void;
  onNavigateToFeedback?: () => void;
  onProductSelect?: (product: any) => void;
  onNavigateToAdminDashboard?: () => void;
}

const articlesData = [
    {
        id: 1,
        title: 'مزایای استفاده از لوله‌های پلیمری در ساختمان‌های مدرن',
        excerpt: 'لوله‌های پلیمری به دلیل مقاومت بالا، وزن سبک و نصب راحت، انتخاب اول مهندسان در سیستم‌های آبرسانی هستند...',
        imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800',
        date: '۱۵ اردیبهشت ۱۴۰۳',
        category: 'تکنولوژی',
        author: 'تیم فنی',
        readTime: '۵ دقیقه',
    },
    {
        id: 2,
        title: 'تفاوت لوله تک لایه و سه لایه فایبرگلاس',
        excerpt: 'در این مقاله به بررسی تفاوت‌های کلیدی بین لوله‌های تک لایه و سه لایه فایبرگلاس و کاربردهای هر یک می‌پردازیم...',
        imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a78e?q=80&w=800',
        date: '۲۲ فروردین ۱۴۰۳',
        category: 'آموزشی',
        author: 'مهندس احمدی',
        readTime: '۸ دقیقه',
    },
    {
        id: 3,
        title: 'نگهداری و افزایش طول عمر سیستم‌های تاسیساتی',
        excerpt: 'راهکارهای عملی برای جلوگیری از رسوب و خرابی در تاسیسات آبرسانی ساختمان با استفاده از محصولات استاندارد...',
        imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800',
        date: '۱۰ اسفند ۱۴۰۲',
        category: 'راهنمای کاربردی',
        author: 'بخش پشتیبانی',
        readTime: '۶ دقیقه',
    },
    {
        id: 4,
        title: 'صرفه جویی در مصرف انرژی با لوله‌های عایق',
        excerpt: 'لوله‌های عایق دار با کاهش اتلاف حرارتی می‌توانند هزینه‌های انرژی را به طرز چشمگیری کاهش دهند...',
        imageUrl: 'https://images.unsplash.com/photo-1621252179027-9c9aeab97072?q=80&w=800',
        date: '۵ بهمن ۱۴۰۲',
        category: 'توسعه پایدار',
        author: 'مدیریت کیفیت',
        readTime: '۴ دقیقه',
    },
    {
        id: 5,
        title: 'راهنمای انتخاب لوله و اتصالات برای گرمایش از کف',
        excerpt: 'سیستم گرمایش از کف نیازمند لوله‌هایی با مقاومت حرارتی عالی و انعطاف پذیری بالا است. در این مقاله به ویژگی‌های آن می‌پردازیم...',
        imageUrl: 'https://images.unsplash.com/photo-1574360773950-891df42fbf91?q=80&w=800',
        date: '۱۸ دی ۱۴۰۲',
        category: 'آموزشی',
        author: 'تیم مهندسی فروش',
        readTime: '۱۰ دقیقه',
    },
    {
        id: 6,
        title: 'آشنایی با استانداردهای ملی و بین‌المللی لوله‌های پلیمری',
        excerpt: 'برای تضمین کیفیت، تمام محصولات باید دارای استانداردهای تایید شده باشند. مرور کلی بر ایزوها...',
        imageUrl: 'https://images.unsplash.com/photo-1605118732641-3495e23b771d?q=80&w=800',
        date: '۲ آذر ۱۴۰۲',
        category: 'استانداردها',
        author: 'واحد کنترل کیفیت',
        readTime: '۷ دقیقه',
    }
];

const Articles: React.FC<ArticlesProps> = ({ 
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
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('همه');

    const categories = ['همه', ...Array.from(new Set(articlesData.map(a => a.category)))];

    const filteredArticles = articlesData.filter(article => {
        const matchSearch = article.title.includes(searchTerm) || article.excerpt.includes(searchTerm);
        const matchCategory = selectedCategory === 'همه' || article.category === selectedCategory;
        return matchSearch && matchCategory;
    });

    return (
        <div className="bg-gray-50 min-h-screen font-sans" dir="rtl">
            <Header 
                variant="light"
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
            />

            <main className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Hero Zone */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
                        مجله آموزشی و مقالات
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        آخرین اخبار، مقالات تخصصی، تحقیقات و راهنماهای کاربردی در زمینه لوله‌های پلیمری و تاسیسات پیشرفته ساختمان.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
                                    selectedCategory === cat
                                        ? 'bg-brand text-white shadow-md'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-80 border-t md:border-t-0 md:border-r border-gray-100 pt-4 md:pt-0 md:pr-6">
                        <svg className="w-5 h-5 absolute right-4 md:right-10 top-1/2 -translate-y-1/2 mt-2 md:mt-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input 
                            type="text" 
                            placeholder="جستجو در مقالات..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 focus:border-brand focus:ring-brand outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Articles Grid */}
                {filteredArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.map(article => (
                            <article key={article.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-50 flex flex-col group">
                                <div className="relative h-64 overflow-hidden">
                                    <img 
                                        src={article.imageUrl} 
                                        alt={article.title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 relative">
                                        <div className="absolute inset-0 bg-black/20 rounded-full blur"></div>
                                        <span className="relative bg-white/90 backdrop-blur-sm text-brand px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-4 font-light">
                                        <span className="flex items-center gap-1.5">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            {article.date}
                                        </span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span className="flex items-center gap-1.5">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            {article.readTime}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-brand transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>
                                    
                                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3 text-sm flex-grow">
                                        {article.excerpt}
                                    </p>
                                    
                                    <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand to-brand-light text-white flex items-center justify-center text-xs font-bold">
                                                {article.author.charAt(0)}
                                            </div>
                                            <span className="text-xs font-medium text-gray-700">{article.author}</span>
                                        </div>
                                        <button className="text-brand text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                                            ادامه مطلب 
                                            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8" />
                        </svg>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">مقاله‌ای یافت نشد</h3>
                        <p className="text-gray-500">موردی با جستجوی شما مطابقت نداشت. لطفاً کلمات دیگری را امتحان کنید.</p>
                    </div>
                )}
            </main>

            <Footer onNavigateToAdminDashboard={onNavigateToAdminDashboard} />
        </div>
    );
};

export default Articles;
