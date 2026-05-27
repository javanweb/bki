

import React, { useMemo, useState } from 'react';
import { 
    Clock, 
    CreditCard, 
    Megaphone, 
    AlertCircle, 
    Ticket, 
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    Eye,
    TrendingUp,
    ChevronRight,
    ShoppingBag,
    Award,
    Trophy,
    Gift,
    Star,
    Share2,
    Copy,
    CheckCircle2,
    BarChart2
} from 'lucide-react';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    change?: string;
    isUp?: boolean;
    color: string;
    index: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, isUp, color, index }) => (
    <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, ease: 'easeOut' }}
        className="bg-white p-5 lg:p-6 rounded-[28px] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group"
    >
        <div className="flex justify-between items-start mb-6 w-full">
            <div className={`p-3.5 rounded-[20px] ${color} bg-opacity-10 transition-colors group-hover:bg-opacity-20 flex items-center justify-center`}>
                <div className={`${color.replace('bg-', 'text-')}`}>
                    {icon}
                </div>
            </div>
            {change && (
                <div className={`flex items-center gap-1 mt-1 px-2.5 py-1.5 rounded-xl text-xs font-bold ${isUp ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                    {isUp ? <ArrowUpRight size={12} strokeWidth={3} /> : <ArrowDownRight size={12} strokeWidth={3} />}
                    {change}
                </div>
            )}
        </div>
        <div>
            <h3 className="text-xs font-bold text-slate-400 mb-2 truncate">{title}</h3>
            <p className="text-2xl font-black text-slate-800 tracking-tight">{value}</p>
        </div>
    </motion.div>
);

const CustomerTierCard = ({ marketingSettings, points }) => {
    
    let currentTier = "برنزی";
    let tierColor = "text-orange-400";
    let nextTier = "نقره‌ای";
    let nextTierColor = "text-slate-300";
    let nextTierThreshold = marketingSettings?.silverThreshold || 1000;
    let nextTierDiscount = "۲٪";

    if (points >= (marketingSettings?.platinumThreshold || 10000)) {
        currentTier = "پلاتینیوم";
        tierColor = "text-purple-400";
        nextTier = "بالاترین سطح";
        nextTierColor = "text-purple-400";
        nextTierThreshold = points;
        nextTierDiscount = "بیشترین";
    } else if (points >= (marketingSettings?.goldThreshold || 3000)) {
        currentTier = "طلایی";
        tierColor = "text-amber-400";
        nextTier = "پلاتینیوم";
        nextTierColor = "text-purple-400";
        nextTierThreshold = marketingSettings?.platinumThreshold || 10000;
        nextTierDiscount = "۱۰٪";
    } else if (points >= (marketingSettings?.silverThreshold || 1000)) {
        currentTier = "نقره‌ای";
        tierColor = "text-slate-300";
        nextTier = "طلایی";
        nextTierColor = "text-amber-400";
        nextTierThreshold = marketingSettings?.goldThreshold || 3000;
        nextTierDiscount = "۵٪";
    }

    const progress = points >= nextTierThreshold ? 100 : (points / nextTierThreshold) * 100;
    const remainingPoints = nextTierThreshold - points;

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-[32px] shadow-xl text-white relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Trophy size={160} className="rotate-12" />
            </div>
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Award className={tierColor} size={24} />
                            <h3 className="font-bold text-xl text-white tracking-tight">سطح وفاداری شما</h3>
                        </div>
                        <p className="text-sm text-slate-400 font-medium">مشتری ویژه (سطح {currentTier})</p>
                    </div>
                    <div className="text-left">
                        <p className={`text-3xl font-black ${tierColor}`}>{points.toLocaleString('fa-IR')}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">امتیاز فعلی</p>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-xs font-bold">
                        <span className={tierColor}>{currentTier}</span>
                        <span className={nextTierColor}>{nextTier} (نیاز به {nextTierThreshold.toLocaleString('fa-IR')} امتیاز)</span>
                    </div>
                    <div className="h-3 w-full bg-slate-700 rounded-full overflow-hidden border border-slate-600">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                            className={`h-full rounded-full relative ${
                                currentTier === 'طلایی' ? 'bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]' :
                                currentTier === 'نقره‌ای' ? 'bg-gradient-to-r from-slate-500 to-slate-300 shadow-[0_0_10px_rgba(203,213,225,0.5)]' :
                                currentTier === 'پلاتینیوم' ? 'bg-gradient-to-r from-purple-600 to-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]' :
                                'bg-gradient-to-r from-orange-700 to-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]'
                            }`}
                        >
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[shimmer_2s_linear_infinite]" />
                        </motion.div>
                    </div>
                    {remainingPoints > 0 && (
                        <p className="text-xs text-slate-400 font-medium">تنها <strong className="text-white">{remainingPoints.toLocaleString('fa-IR')} امتیاز</strong> تا سطح {nextTier} و دریافت <strong className={nextTierColor}>{nextTierDiscount} تخفیف مازاد</strong> فاصله دارید.</p>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-sm font-bold transition-all backdrop-blur-sm">
                        <Gift size={18} />
                        کاتالوگ جوایز
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-500 hover:bg-blue-400 text-white rounded-2xl text-sm font-bold transition-all shadow-lg shadow-blue-500/20">
                        نحوه کسب امتیاز
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const ReferralPromoCard = ({ marketingSettings, customer }) => {
    const [copied, setCopied] = useState(false);
    const referralCode = customer?.id ? `KB-REF-${customer.id}` : "KB-2026-FPI";
    const discount = marketingSettings?.referralDiscountPercent || 10;
    const points = marketingSettings?.referralPoints || 100;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-emerald-500 p-8 rounded-[32px] text-white relative overflow-hidden group h-full">
            <div className="absolute -bottom-16 -left-16 h-48 w-48 bg-emerald-400 rounded-full blur-3xl opacity-50 group-hover:scale-125 transition-transform duration-700"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-emerald-400 rounded-2xl shadow-inner">
                        <Share2 size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg tracking-tight">معرفی به همکاران</h3>
                        <p className="text-[11px] text-emerald-100 font-medium mt-0.5">دعوت کنید، هردو سود ببرید</p>
                    </div>
                </div>
                
                <p className="text-sm font-medium text-emerald-50 mb-6 leading-relaxed">
                    با معرفی کویر بسپار به همکاران خود، <strong className="text-white">{points.toLocaleString('fa-IR')} امتیاز وفاداری</strong> برای خود و <strong className="text-white">{discount.toLocaleString('fa-IR')}٪ تخفیف اولین خرید</strong> برای همکارتان دریافت کنید.
                </p>

                <div className="bg-emerald-600/50 backdrop-blur-md border border-emerald-400/50 rounded-2xl p-2 flex items-center justify-between">
                    <span className="font-mono font-bold text-lg px-4 tracking-widest">{referralCode}</span>
                    <button 
                        onClick={handleCopy}
                        className={`flex items-center gap-2 py-2 px-4 rounded-xl text-sm font-bold transition-all ${
                            copied ? 'bg-white text-emerald-600' : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-900/20'
                        }`}
                    >
                        {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                        {copied ? 'کپی شد' : 'کپی کد'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const OrderAnalysisCard = ({ customerOrders }: { customerOrders: any[] }) => {
    const approvedOrdersCount = useMemo(() => {
        if (!customerOrders) return 0;
        return customerOrders.filter(order => order.status === 'تایید شده').length;
    }, [customerOrders]);

    const totalOrdersCount = customerOrders?.length || 0;
    const percentage = totalOrdersCount > 0 ? (approvedOrdersCount / totalOrdersCount) * 100 : 0;

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm h-full"
        >
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="font-bold text-xl text-slate-900 tracking-tight">تحلیل سفارشات</h3>
                    <p className="text-sm text-slate-500 font-medium">وضعیت تحقق سفارشات شما</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                    <TrendingUp size={24} />
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="relative h-48 w-48 flex items-center justify-center">
                    <svg className="h-full w-full rotate-[-90deg]">
                        <circle 
                            cx="50%" cy="50%" r="70" 
                            className="stroke-slate-100 fill-none" 
                            strokeWidth="12" 
                        />
                        <motion.circle 
                            initial={{ strokeDasharray: "0, 440" }}
                            animate={{ strokeDasharray: `${percentage * 4.4}, 440` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            cx="50%" cy="50%" r="70" 
                            className="stroke-blue-600 fill-none" 
                            strokeWidth="12" 
                            strokeLinecap="round" 
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-slate-900">{Math.round(percentage)}%</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">تکمیل شده</span>
                    </div>
                </div>

                <div className="flex-1 space-y-6 w-full">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 font-medium">سفارشات تایید شده</span>
                            <span className="text-slate-900 font-bold">{approvedOrdersCount}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                className="h-full bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500 font-medium">کل سفارشات</span>
                            <span className="text-slate-900 font-bold">{totalOrdersCount}</span>
                        </div>
                        <div className="h-2 w-full bg-slate-50 rounded-full" />
                    </div>
                    <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-[0.98]">
                        مشاهده جزئیات کامل
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const RecentOrders = () => {
    const orders = [
        { id: 'KB-95784', date: '۱۴۰۳/۰۴/۲۵', total: '۱۲۵,۰۰۰,۰۰۰', status: 'تحویل شده', statusColor: 'emerald' },
        { id: 'KB-95780', date: '۱۴۰۳/۰۴/۲۲', total: '۸۲,۰۰۰,۰۰۰', status: 'در حال ارسال', statusColor: 'blue' },
        { id: 'KB-95775', date: '۱۴۰۳/۰۴/۲۰', total: '۳۱۰,۰۰۰,۰۰۰', status: 'در حال پردازش', statusColor: 'amber' },
    ];
    
    return (
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-slate-900 tracking-tight">آخرین سفارشات</h3>
                <button className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">همه سفارشات</button>
            </div>
            <div className="space-y-4">
                {orders.map(order => (
                    <div key={order.id} className="group flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-200">
                        <div className="flex items-center gap-4">
                            <div className={`h-12 w-12 rounded-xl flex items-center justify-center bg-${order.statusColor}-50 text-${order.statusColor}-600 group-hover:scale-110 transition-transform`}>
                                <ShoppingBag size={20} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-900">{order.id}</p>
                                <p className="text-[10px] text-slate-400 font-medium mt-0.5">{order.date}</p>
                            </div>
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-black text-slate-900 tracking-tight">{order.total}</p>
                            <div className="flex items-center justify-end gap-1 mt-1">
                                <span className={`h-1.5 w-1.5 rounded-full bg-${order.statusColor}-500`}></span>
                                <span className="text-[10px] text-slate-500 font-bold">{order.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SpecialOffers = ({ offers, customer, onNavigate }) => {
    const relevantOffers = useMemo(() => {
        if (!offers || !customer) return [];
        return offers.filter(o => o.type === 'public' || (o.type === 'specific' && o.customerId === customer.id)).slice(0, 2);
    }, [offers, customer]);

    if (relevantOffers.length === 0) return null;

    return (
        <div className="bg-blue-600 p-8 rounded-[32px] text-white overflow-hidden relative group h-full flex flex-col justify-between">
            <div className="absolute -top-12 -left-12 h-40 w-40 bg-blue-500 rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                    <Megaphone size={18} className="text-blue-200 animate-bounce" />
                    <h3 className="font-bold text-lg tracking-tight">پیشنهادات طلایی</h3>
                </div>
                <div className="space-y-4">
                    {relevantOffers.map(offer => (
                        <div key={offer.id} className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl flex items-center gap-4 group/item hover:bg-white/20 transition-colors cursor-pointer" onClick={() => onNavigate && onNavigate('catalog')}>
                            <div className="h-14 w-14 bg-white rounded-xl flex items-center justify-center p-2 shadow-sm group-hover/item:scale-110 transition-transform shrink-0">
                                <img src={offer.imageUrl || undefined} alt={offer.productName} className="max-h-full max-w-full object-contain text-black text-[8px]" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-blue-50 truncate">{offer.productName}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm font-black text-white">{offer.discount}</span>
                                    <span className="text-[8px] bg-red-500 text-white px-1.5 py-0.5 rounded-full animate-pulse whitespace-nowrap">فروش ویژه</span>
                                </div>
                            </div>
                            <button className="h-10 w-10 shrink-0 flex items-center justify-center bg-white text-blue-600 rounded-xl shadow-lg ring-4 ring-white/0 hover:ring-white/20 transition-all">
                                <ChevronRight size={20} className="rotate-180" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const PurchasesChart = () => {
    const data = [
        { name: 'فروردین', 'مقدار سفارش': 40 },
        { name: 'اردیبهشت', 'مقدار سفارش': 30 },
        { name: 'خرداد', 'مقدار سفارش': 60 },
        { name: 'تیر', 'مقدار سفارش': 45 },
        { name: 'مرداد', 'مقدار سفارش': 80 },
        { name: 'شهریور', 'مقدار سفارش': 110 },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm"
        >
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h3 className="font-bold text-xl text-slate-900 tracking-tight">روند خریدها</h3>
                    <p className="text-sm text-slate-500 font-medium">سفارشات ۶ ماه گذشته (میلیون تومان)</p>
                </div>
                <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                    <BarChart2 size={24} />
                </div>
            </div>
            
            <div className="h-72 w-full pt-4" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} 
                            dy={10} 
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#64748b', fontSize: 13, fontWeight: 500 }} 
                        />
                        <Tooltip 
                            cursor={{ fill: '#f8fafc' }} 
                            contentStyle={{ 
                                borderRadius: '16px', 
                                border: 'none', 
                                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                                fontFamily: 'inherit',
                                direction: 'rtl',
                                textAlign: 'right'
                            }} 
                            itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                        />
                        <Bar 
                            dataKey="مقدار سفارش" 
                            fill="#3b82f6" 
                            radius={[6, 6, 0, 0]} 
                            barSize={32}
                            animationDuration={1500}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

const DashboardOverview = ({ specialOffers, productDiscounts, customer, customerOrders, marketingSettings, onNavigate }) => {
    
    // Calculate customer points
    const totalPurchaseValue = useMemo(() => {
        return customerOrders
            .filter(order => order.status !== 'لغو شده' && order.status !== 'در انتظار تایید')
            .reduce((sum, order) => sum + (order.totalAmount || 0), 0);
    }, [customerOrders]);

    const totalOrdersCount = customerOrders.length;

    const applicableDiscounts = useMemo(() => {
        if (!productDiscounts || !customer) return [];
        return productDiscounts.filter(d => d.type === 'public' || (d.type === 'specific' && d.customerIds?.includes(customer.id)));
    }, [productDiscounts, customer]);
    
    // Base points + manual loyalty points + points per million purchased
    const customerPoints = useMemo(() => {
        const base = marketingSettings?.basePoints || 50;
        const manualPoints = customer?.loyaltyPoints || 0;
        const millionRials = Math.floor(totalPurchaseValue / 1000000);
        const purchasePoints = millionRials * (marketingSettings?.pointsPerMillion || 10);
        return base + manualPoints + purchasePoints;
    }, [totalPurchaseValue, customer, marketingSettings]);

    const volumeInfo = useMemo(() => {
        const levels = [
            { threshold: marketingSettings?.volumeDiscountLevel1Amount || 0, percent: marketingSettings?.volumeDiscountLevel1Percent || 0 },
            { threshold: marketingSettings?.volumeDiscountLevel2Amount || 0, percent: marketingSettings?.volumeDiscountLevel2Percent || 0 },
            { threshold: marketingSettings?.volumeDiscountLevel3Amount || 0, percent: marketingSettings?.volumeDiscountLevel3Percent || 0 },
        ].filter(l => l.threshold > 0).sort((a, b) => a.threshold - b.threshold);

        let currentDiscount = 0;
        let nextTarget = null;
        for (let i = 0; i < levels.length; i++) {
            if (totalPurchaseValue >= levels[i].threshold) {
                currentDiscount = levels[i].percent;
            } else {
                nextTarget = levels[i];
                break;
            }
        }
        return { currentDiscount, nextTarget };
    }, [marketingSettings, totalPurchaseValue]);

    const activeDiscount = Math.max(customer?.discount || 0, volumeInfo.currentDiscount);

    const stats = [
        { icon: <Clock size={20} />, title: "در حال پردازش", value: "۱۲ مورد", color: "bg-blue-500", change: "۱۵٪", isUp: true },
        { icon: <CreditCard size={20} />, title: "خرید ماه", value: "۱.۲ میلیارد", color: "bg-cyan-500", change: "۸٪", isUp: true },
        { icon: <Megaphone size={20} />, title: "اطلاعیه‌ها", value: "۳ جدید", color: "bg-amber-500" },
        { icon: <AlertCircle size={20} />, title: "فاکتور باز", value: "۲ عدد", color: "bg-rose-500", change: "۵٪", isUp: false },
        { icon: <Ticket size={20} />, title: "تیکت باز", value: "۱ مورد", color: "bg-indigo-500" },
        { icon: <Wallet size={20} />, title: "اعتبار کل", value: "۲۵۰ میلیون", color: "bg-emerald-500" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500" dir="rtl">
            <header className="mb-2">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">سلام، {customer?.name?.split(' ')[0] || 'همکار'} عزیز 👋</h1>
                <p className="text-slate-500 font-medium mt-1">خوش آمدید! بیایید نگاهی به وضعیت امروز بیندازیم و از مزایای ویژه خود لذت ببرید.</p>
            </header>

            {applicableDiscounts.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="my-6 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 rounded-[28px] p-6 sm:p-8 shadow-2xl text-white border border-white/10 group cursor-pointer"
                    onClick={() => onNavigate && onNavigate('catalog')}
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-white/20 transition-all duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-fuchsia-400/30 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 group-hover:scale-150 transition-all duration-500"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-5 sm:gap-6 w-full md:w-auto">
                            <div className="bg-white/20 p-4 rounded-2xl flex-shrink-0 backdrop-blur-md shadow-inner group-hover:rotate-12 transition-transform duration-500 border border-white/20">
                                <Megaphone size={36} className="text-pink-200" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="bg-yellow-400 text-yellow-900 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">شگفت‌انگیز</span>
                                    <h2 className="text-xl sm:text-2xl font-black drop-shadow-md tracking-tight">پیشنهاد اختصاصی شما!</h2>
                                </div>
                                <p className="text-indigo-50 font-medium text-sm sm:text-base leading-relaxed max-w-xl">
                                    شما یک تخفیف استثنایی <span className="inline-block bg-white text-purple-700 px-2 py-0.5 rounded-lg shadow-sm font-black mx-1 text-base sm:text-lg">{applicableDiscounts[0].percentage}٪</span> برای محصول <span className="font-bold underline decoration-pink-400/50 underline-offset-4 decoration-2">{applicableDiscounts[0].productName}</span> دریافت کرده‌اید. همین حالا خرید کنید!
                                </p>
                            </div>
                        </div>
                        <button className="w-full md:w-auto flex-shrink-0 bg-white text-purple-700 hover:bg-slate-50 font-bold py-3.5 px-8 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(255,255,255,0.2)] transition-all hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-2 group/btn border border-white/40">
                            مشاهده و خرید
                            <ChevronRight size={20} className="group-hover/btn:-translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            )}

            {activeDiscount > 0 || volumeInfo.nextTarget ? (
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-l from-green-500 to-emerald-600 rounded-3xl p-6 shadow-lg text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-green-400"
                >
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-2xl flex-shrink-0">
                            <Star size={32} className="text-yellow-300 fill-yellow-300 animate-pulse" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold mb-1">
                                {activeDiscount > 0 ? (
                                    <>مشتری گرامی درحال حاضر درصد تخفیف شما از لیست قیمت <span className="text-yellow-300 text-2xl font-black">{activeDiscount}٪</span> می باشد</>
                                ) : (
                                    <>مشتری گرامی با افزایش حجم خرید سالانه خود، از تخفیف‌های ویژه ما بهره‌مند شوید!</>
                                )}
                            </h2>
                            <p className="text-green-50 text-sm font-medium opacity-90 leading-relaxed max-w-2xl mt-2">
                                {volumeInfo.nextTarget ? (
                                    <>
                                        {activeDiscount > 0 ? 'چنانچه خریدهای سالانه شما، ' : 'متاسفانه به دلیل پایین بودن خرید سالانه، در حال حاضر تخفیف پایه دارید. در صورت خرید '}
                                        <span className="font-bold text-yellow-100">
                                            {(volumeInfo.nextTarget.threshold - totalPurchaseValue).toLocaleString('fa-IR')} ریال
                                        </span>
                                        {' '} دیگر، شامل تخفیف <span className="font-bold text-yellow-100">{volumeInfo.nextTarget.percent}٪</span> در محاسبه قیمت‌های لیست خواهید شد.
                                    </>
                                ) : (
                                    customer?.discountReason || 'به پاس همراهی شما با مجموعه کویر بسپار، بالاترین سطح تخفیف به صورت پیش‌فرض در تمام خرید‌های شما لحاظ خواهد شد.'
                                )}
                            </p>
                        </div>
                    </div>
                    <button className="flex-shrink-0 bg-white text-green-700 hover:bg-green-50 hover:text-green-800 px-6 py-3 rounded-xl font-bold transition-colors shadow-sm whitespace-nowrap">
                        مشاهده لیست قیمت
                    </button>
                </motion.div>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 xl:gap-6">
                {stats.map((stat, i) => <StatCard key={stat.title} {...stat} index={i} />)}
            </div>
            
            {/* Marketing & Loyalty Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8">
                    <CustomerTierCard marketingSettings={marketingSettings} points={customerPoints} />
                </div>
                <div className="lg:col-span-4 max-lg:order-first">
                    <ReferralPromoCard marketingSettings={marketingSettings} customer={customer} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-12 xl:col-span-8 flex flex-col gap-8">
                    <OrderAnalysisCard customerOrders={customerOrders} />
                    <PurchasesChart />
                </div>
                <div className="lg:col-span-12 xl:col-span-4 flex flex-col gap-8">
                   <SpecialOffers offers={specialOffers} customer={customer} onNavigate={onNavigate} />
                   <RecentOrders />
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;