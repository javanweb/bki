
import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

interface FittingItem {
    id: number;
    name: string;
    imageUrl: string;
}

interface DetailedProduct {
    name: string;
    description: string;
    mainImageUrl: string;
    thumbnails: { type: 'image' | 'video'; url: string }[];
    colors: string[];
    productCode: string;
}

const fittingNames = [
    "بوشن",
    "زانو 90 درجه",
    "زانو 45 درجه",
    "زانو تبدیل 90 درجه",
    "سه راه",
    "تبدیل",
    "سه راه تبدیل",
    "شیرفلکه واشری",
    "لوله خم بلند",
    "لوله خم بوشن دار",
    "زانو بوشن فلزی",
    "زانو بوشن فلزی بست دار",
    "زانو بوشن فلزی دوقلو",
    "زانو بوشن فلزی دوقلو رادیاتوری",
    "زانو مغزی فلزی",
    "زانو مغزی فلزی بست دار",
    "اتصال بوشن فلزی",
    "اتصال مغزی فلزی",
    "سه راه بوشن فلزی",
    "سه راه بوشن فلزی بست دار",
    "مهره ماسوره ی یک سر بوشن فلزی",
    "مهره ماسوره ی دو سر جوش",
    "درپوش مخروطی بلند",
    "درپوش رزوه دار کوتاه",
    "کپ",
    "بست تک",
    "بست دوقلو",
    "شابلن شیر مخلوط",
    "شابلون رادیاتور 50 سانتی",
    "شیر فلکه دسته گازی"
];

// Helper to determine fitting type and properties for better images/desc
const getFittingInfo = (name: string) => {
    let type = 'general';
    let description = '';
    // Base images for variety
    let images = [
        'https://kavirbaspar.com/wp-content/uploads/2022/03/%D8%A8%D9%88%D8%B4%D9%86-1.jpg',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800',
        'https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=800'
    ];

    if (name.includes('زانو') || name.includes('لوله خم')) {
        type = 'elbow';
        description = 'جهت تغییر مسیر لوله‌کشی و ایجاد زاویه در سیستم‌های آبرسانی. طراحی شده با زاویه دقیق جهت جلوگیری از افت فشار.';
        images = [
            'https://kavirbaspar.com/wp-content/uploads/2022/03/%D8%B2%D8%A7%D9%86%D9%88-90-%D8%AF%D8%B1%D8%AC%D9%87-1-1.jpg',
            'https://images.unsplash.com/photo-1532593198780-3c2048675812?q=80&w=800',
            'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800'
        ];
    } else if (name.includes('سه راه')) {
        type = 'tee';
        description = 'جهت انشعاب‌گیری و تقسیم جریان آب در مسیرهای لوله‌کشی. با مقاومت بالا در برابر تنش‌های مکانیکی.';
        images = [
            'https://kavirbaspar.com/wp-content/uploads/2022/03/%D8%B3%D9%87-%D8%B1%D8%A7%D9%87%DB%8C-1-1.jpg',
            'https://images.unsplash.com/photo-1585561005661-39c5d7b194f7?q=80&w=800',
            'https://images.unsplash.com/photo-1605118732641-3495e23b771d?q=80&w=800'
        ];
    } else if (name.includes('شیر')) {
        type = 'valve';
        description = 'جهت قطع و وصل و کنترل دقیق جریان سیال. دارای مکانیزم آب‌بندی پیشرفته و طول عمر بالا.';
        images = [
            'https://kavirbaspar.com/wp-content/uploads/2022/03/%D8%B4%DB%8C%D8%B1-%D9%81%D9%84%DA%A9%D9%87-1-1.jpg',
            'https://images.unsplash.com/photo-1595416927025-1499459823a3?q=80&w=800',
            'https://images.unsplash.com/photo-1517646287309-9f76dd6f4ba9?q=80&w=800'
        ];
    } else if (name.includes('بوشن') || name.includes('تبدیل') || name.includes('اتصال')) {
        type = 'socket';
        description = 'جهت اتصال دو لوله هم‌سایز یا با سایزهای متفاوت به یکدیگر. تضمین کننده اتصال پایدار و بدون نشتی.';
        images = [
            'https://kavirbaspar.com/wp-content/uploads/2022/03/%D8%A8%D9%88%D8%B4%D9%86-1.jpg',
            'https://images.unsplash.com/photo-1580584126903-c17d41830450?q=80&w=800',
            'https://images.unsplash.com/photo-1616738335345-0e5c9b4e5b3f?q=80&w=800'
        ];
    } else if (name.includes('بست') || name.includes('شابلن')) {
        type = 'accessory';
        description = 'تجهیزات جانبی جهت نصب دقیق، فیکس کردن لوله‌ها و رعایت استانداردهای فاصله‌گذاری در اجرا.';
        images = [
            'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800',
            'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800',
            'https://images.unsplash.com/photo-1584622412117-b22470679b6e?q=80&w=800'
        ];
    } else if (name.includes('درپوش') || name.includes('کپ')) {
        type = 'cap';
        description = 'جهت مسدود کردن انتهای لوله‌ها به صورت موقت یا دائم و تست فشار سیستم.';
        images = [
            'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800',
            'https://images.unsplash.com/photo-1628132766483-94318842e026?q=80&w=800',
            'https://kavirbaspar.com/wp-content/uploads/2022/02/taklayeh.jpg'
        ];
    }

    // Add suffix specific details based on modifiers
    if (name.includes('فلزی') || name.includes('مغزی')) {
        description += ' دارای رزوه فلزی برنجی با آلیاژ مرغوب جهت اتصال به تجهیزات رزوه‌دار.';
    }
    if (name.includes('بست دار')) {
        description += ' دارای صفحه نصب جهت اتصال محکم به دیوار.';
    }

    return { description, images };
};

const items: FittingItem[] = fittingNames.map((name, index) => {
    const info = getFittingInfo(name);
    return {
        id: index + 1,
        name: name,
        imageUrl: info.images[0]
    };
});

interface PolymerFittingsProps {
    onBack: () => void;
    onNavigateToLogin: () => void;
    onNavigateToAdminDashboard: () => void;
    onNavigateHome: () => void;
    onProductSelect: (product: DetailedProduct) => void;
    onNavigateToPartnership: () => void;
    onNavigateToAbout: () => void;
    onNavigateToGoals: () => void;
    onNavigateToArticles?: () => void;
    onNavigateToContact?: () => void;
    onNavigateToFAQ?: () => void;
    onNavigateToFeedback?: () => void;
}

const PolymerFittings: React.FC<PolymerFittingsProps> = ({ 
    onBack, 
    onNavigateToLogin, 
    onNavigateToAdminDashboard, 
    onNavigateHome,
    onProductSelect,
    onNavigateToPartnership,
    onNavigateToAbout,
    onNavigateToGoals,
    onNavigateToArticles,
    onNavigateToContact,
    onNavigateToFAQ,
    onNavigateToFeedback
}) => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleItemClick = (item: FittingItem) => {
        const info = getFittingInfo(item.name);
        
        const detailedProduct: DetailedProduct = {
            name: item.name,
            description: `${info.description} این محصول از بهترین مواد اولیه پلی پروپیلن (PPR) تهیه شده است و برای اتصالات لوله‌کشی آب سرد و گرم و سیستم‌های گرمایشی مناسب می‌باشد. مقاومت بالا در برابر خوردگی و رسوب، نصب آسان و آب‌بندی مطمئن از ویژگی‌های بارز این محصول است که طول عمر بالای سیستم تاسیسات را تضمین می‌کند.`,
            mainImageUrl: item.imageUrl,
            thumbnails: info.images.map(url => ({ type: 'image', url })),
            colors: ['#FFFFFF', '#34A853'], // White and Green
            productCode: `FIT-${2000 + item.id}`,
        };
        onProductSelect(detailedProduct);
    };

    return (
        <div className="min-h-screen bg-white font-sans" dir="rtl">
            {/* Hero Section */}
            <div className="relative w-full h-[405px] overflow-hidden">
                {/* Header */}
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
                />

                <div 
                    className="absolute inset-0 bg-cover bg-center transform transition-transform duration-1000 scale-105" 
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2669&auto=format&fit=crop')" }}
                >
                    {/* Gradient Overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-black/30"></div>
                </div>

                <div className="relative z-10 h-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-full flex flex-col justify-center relative">
                        {/* Text Content */}
                        <div className="max-w-3xl space-y-4 mr-4 md:mr-12 mt-0">
                            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight drop-shadow-2xl">
                                اتصالات پلیمری
                            </h1>
                            <p className="text-lg md:text-xl text-gray-100 font-light leading-relaxed drop-shadow-md max-w-2xl">
                                راهکاری مطمئن برای سیستم‌های لوله‌کشی صنعتی و ساختمانی.<br/>
                                با ما، کیفیت و دوام را تجربه کنید.
                            </p>
                        </div>

                        {/* CTA Section - Positioned at Bottom Left */}
                        <div className="absolute bottom-8 left-8 md:left-16 flex flex-col items-start gap-3">
                            {/* CTA Text */}
                            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border-r-2 border-white/50 animate-fade-in-up">
                                <p className="text-white text-sm font-medium">
                                    همین حالا به جمع شرکای تجاری ما بپیوندید
                                </p>
                            </div>
                            {/* Button */}
                             <button 
                                onClick={onNavigateToPartnership}
                                className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/40 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-1"
                             >
                                <span className="font-bold text-base tracking-wide">درخواست نمایندگی</span>
                                <div className="bg-white text-black rounded-full p-1 transition-transform duration-300 group-hover:translate-x-[-4px]">
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

             <div className="max-w-screen-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                     {items.map((item) => (
                         <div 
                            key={item.id} 
                            onClick={() => handleItemClick(item)}
                            className="group bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                         >
                             <div className="w-full aspect-square mb-6 bg-gray-50 rounded-xl flex items-center justify-center relative overflow-hidden">
                                 <img 
                                    src={item.imageUrl || undefined} 
                                    alt={item.name} 
                                    className="w-4/5 h-4/5 object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" 
                                 />
                             </div>
                             <h3 className="text-gray-700 font-bold text-lg group-hover:text-brand transition-colors" dir="rtl">{item.name}</h3>
                         </div>
                     ))}
                 </div>
             </div>
             <Footer onNavigateToAdminDashboard={onNavigateToAdminDashboard} />
        </div>
    );
};

export default PolymerFittings;
