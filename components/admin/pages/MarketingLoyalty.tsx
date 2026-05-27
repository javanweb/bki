import React, { useState, useMemo } from 'react';
import { 
    Award, 
    Gift, 
    Users, 
    TrendingUp, 
    Settings, 
    CheckCircle2, 
    Save, 
    Medal,
    Trophy,
    Percent,
    Star
} from 'lucide-react';

const StatCard = ({ icon, title, value, subtitle, color }: { icon: any, title: string, value: any, subtitle?: string, color: string }) => (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center gap-4">
        <div className={`p-4 rounded-2xl ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-slate-500 text-sm font-bold mb-1">{title}</p>
            <h4 className="text-2xl font-black text-slate-800">{value}</h4>
            {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
    </div>
);

const MarketingLoyalty = ({ settings, onSaveSettings, customers, orderRequests }) => {
    const [localSettings, setLocalSettings] = useState(settings);
    const [isSaving, setIsSaving] = useState(false);
    const [savedMsg, setSavedMsg] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            onSaveSettings(localSettings);
            setIsSaving(false);
            setSavedMsg(true);
            setTimeout(() => setSavedMsg(false), 2000);
        }, 500);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalSettings(prev => ({
            ...prev,
            [name]: Number(value)
        }));
    };

    // Calculate customer metrics
    const customerMetrics = useMemo(() => {
        return customers.map(c => {
            const cOrders = orderRequests.filter(o => o.customerName === c.name && o.status !== 'لغو شده' && o.status !== 'در انتظار تایید');
            const totalValue = cOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
            
            const base = localSettings?.basePoints || 50;
            const manualPoints = c?.loyaltyPoints || 0;
            const millionRials = Math.floor(totalValue / 1000000);
            const purchasePoints = millionRials * (localSettings?.pointsPerMillion || 10);
            const totalPoints = base + manualPoints + purchasePoints;

            let tier = "برنزی";
            let color = "text-orange-500 bg-orange-50";
            if (totalPoints >= localSettings.platinumThreshold) {
                tier = "پلاتینیوم";
                color = "text-purple-600 bg-purple-50";
            } else if (totalPoints >= localSettings.goldThreshold) {
                tier = "طلایی";
                color = "text-amber-600 bg-amber-50";
            } else if (totalPoints >= localSettings.silverThreshold) {
                tier = "نقره‌ای";
                color = "text-slate-600 bg-slate-100";
            }

            return {
                ...c,
                totalOrders: cOrders.length,
                totalValue,
                points: totalPoints,
                tier,
                color
            };
        }).sort((a, b) => b.points - a.points);
    }, [customers, orderRequests, localSettings]);

    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-black text-slate-800">باشگاه مشتریان و بازاریابی</h1>
                    <p className="text-slate-500 font-medium text-sm mt-1">مدیریت سیاست‌های تشویقی، امتیازات و سطوح وفاداری مشتریان</p>
                </div>
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-75"
                >
                    {isSaving ? (
                        <>در حال ذخیره...</>
                    ) : savedMsg ? (
                        <><CheckCircle2 size={18} /> ذخیره شد</>
                    ) : (
                        <><Save size={18} /> ذخیره تغییرات</>
                    )}
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard 
                    icon={<Users size={28} />} 
                    title="مجموع اعضا" 
                    value={customers.length} 
                    color="bg-blue-50 text-blue-600" 
                />
                <StatCard 
                    icon={<Trophy size={28} />} 
                    title="مشتریان پلاتینیوم/طلایی" 
                    value={customerMetrics.filter(c => c.tier === 'پلاتینیوم' || c.tier === 'طلایی').length} 
                    color="bg-amber-50 text-amber-500" 
                />
                <StatCard 
                    icon={<Gift size={28} />} 
                    title="میانگین امتیازات" 
                    value={Math.round(customerMetrics.reduce((sum, c) => sum + c.points, 0) / (customers.length || 1)).toLocaleString()} 
                    color="bg-emerald-50 text-emerald-500" 
                />
                <StatCard 
                    icon={<TrendingUp size={28} />} 
                    title="بالاترین امتیاز" 
                    value={customerMetrics[0]?.points?.toLocaleString() || 0} 
                    subtitle={customerMetrics[0]?.name}
                    color="bg-purple-50 text-purple-600" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Policy Settings Form */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                <Award size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800">تنظیمات الگوریتم امتیازدهی</h2>
                        </div>
                    </div>
                    
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">امتیاز پایه (هدیه عضویت)</label>
                                <input dir="ltr" 
                                    type="number" 
                                    name="basePoints"
                                    value={localSettings.basePoints} 
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand rtl" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">امتیاز به ازای هر ۱ میلیون خرید</label>
                                <input dir="ltr" 
                                    type="number" 
                                    name="pointsPerMillion"
                                    value={localSettings.pointsPerMillion} 
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand rtl" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">امتیاز معرفی معرف</label>
                                <input dir="ltr" 
                                    type="number" 
                                    name="referralPoints"
                                    value={localSettings.referralPoints} 
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand rtl" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">درصد تخفیف معرفی‌شونده (%)</label>
                                <input dir="ltr" 
                                    type="number" 
                                    name="referralDiscountPercent"
                                    value={localSettings.referralDiscountPercent} 
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand rtl" 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tier Thresholds */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                                <Medal size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800">حد نصاب سطوح وفاداری</h2>
                        </div>
                    </div>
                    
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 text-slate-500">حداقل امتیاز سطح برنزی</label>
                                <input dir="ltr" 
                                    type="number" 
                                    name="bronzeThreshold"
                                    value={localSettings.bronzeThreshold} 
                                    onChange={handleChange}
                                    disabled
                                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-2.5 bg-slate-100 text-slate-400 font-bold rtl cursor-not-allowed" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">حداقل امتیاز سطح <span className="text-slate-500">نقره‌ای</span></label>
                                <input dir="ltr" 
                                    type="number" 
                                    name="silverThreshold"
                                    value={localSettings.silverThreshold} 
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand rtl" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">حداقل امتیاز سطح <span className="text-amber-500">طلایی</span></label>
                                <input dir="ltr" 
                                    type="number" 
                                    name="goldThreshold"
                                    value={localSettings.goldThreshold} 
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand rtl" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">حداقل امتیاز سطح <span className="text-purple-600">پلاتینیوم</span></label>
                                <input dir="ltr" 
                                    type="number" 
                                    name="platinumThreshold"
                                    value={localSettings.platinumThreshold} 
                                    onChange={handleChange}
                                    className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand rtl" 
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Volume Discounts */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mt-2">
                    <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg text-green-600">
                                <Percent size={20} />
                            </div>
                            <h2 className="text-lg font-bold text-slate-800">تخفیف بر اساس حجم خرید</h2>
                        </div>
                    </div>
                    
                    <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Level 1 */}
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <h3 className="font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">سطح ۱</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-2">حجم خرید (ریال)</label>
                                        <input dir="ltr" 
                                            type="number" 
                                            name="volumeDiscountLevel1Amount"
                                            value={localSettings.volumeDiscountLevel1Amount} 
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand rtl" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-2">درصد تخفیف</label>
                                        <input dir="ltr" 
                                            type="number" 
                                            name="volumeDiscountLevel1Percent"
                                            value={localSettings.volumeDiscountLevel1Percent} 
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand rtl" 
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Level 2 */}
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <h3 className="font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">سطح ۲</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-2">حجم خرید (ریال)</label>
                                        <input dir="ltr" 
                                            type="number" 
                                            name="volumeDiscountLevel2Amount"
                                            value={localSettings.volumeDiscountLevel2Amount} 
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand rtl" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-2">درصد تخفیف</label>
                                        <input dir="ltr" 
                                            type="number" 
                                            name="volumeDiscountLevel2Percent"
                                            value={localSettings.volumeDiscountLevel2Percent} 
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand rtl" 
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Level 3 */}
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                <h3 className="font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">سطح ۳</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-2">حجم خرید (ریال)</label>
                                        <input dir="ltr" 
                                            type="number" 
                                            name="volumeDiscountLevel3Amount"
                                            value={localSettings.volumeDiscountLevel3Amount} 
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand rtl" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-600 mb-2">درصد تخفیف</label>
                                        <input dir="ltr" 
                                            type="number" 
                                            name="volumeDiscountLevel3Percent"
                                            value={localSettings.volumeDiscountLevel3Percent} 
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand rtl" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customers Leaderboard */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                            <Star size={20} />
                        </div>
                        <h2 className="text-lg font-bold text-slate-800">عملکرد و رتبه‌بندی مشتریان</h2>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500">
                                <th className="px-6 py-4 font-bold">مشتری</th>
                                <th className="px-6 py-4 font-bold">شرکت</th>
                                <th className="px-6 py-4 font-bold">تعداد سفارشات</th>
                                <th className="px-6 py-4 font-bold">ارزش کل خرید (تومان)</th>
                                <th className="px-6 py-4 font-bold">امتیاز وفاداری</th>
                                <th className="px-6 py-4 font-bold">سطح فعلی</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {customerMetrics.map((customer, idx) => (
                                <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-slate-800">
                                        <div className="flex items-center gap-2">
                                            {idx < 3 && <span className={`text-xs px-2 py-0.5 rounded-full font-black ${idx === 0 ? 'bg-amber-100 text-amber-600' : idx === 1 ? 'bg-slate-200 text-slate-600' : 'bg-orange-100 text-orange-600'}`}>#{idx + 1}</span>}
                                            {customer.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{customer.company}</td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">{customer.totalOrders}</td>
                                    <td className="px-6 py-4 text-slate-600 font-bold">{(customer.totalValue / 10).toLocaleString('fa-IR')}</td>
                                    <td className="px-6 py-4 text-blue-600 font-black text-lg">{customer.points.toLocaleString('fa-IR')}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${customer.color}`}>
                                            {customer.tier}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default MarketingLoyalty;
