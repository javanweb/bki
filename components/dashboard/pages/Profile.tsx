import React from 'react';
import { User, Building2, MapPin, ShieldCheck, Phone, CreditCard, Hash, Percent } from 'lucide-react';
import { motion } from 'motion/react';

const InfoSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode; }> = ({ title, icon, children }) => (
    <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm"
    >
        <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                {icon}
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {children}
        </div>
    </motion.div>
);

const InfoField = ({ label, value, icon: Icon }: { label: string; value: any; icon: any }) => (
    <div className="group">
        <label className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 transition-colors group-hover:text-blue-500">
            {Icon && <Icon size={12} />}
            {label}
        </label>
        <p className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl py-3.5 px-4 text-slate-900 font-bold text-sm shadow-sm transition-all group-hover:bg-white group-hover:border-blue-300 group-hover:ring-4 group-hover:ring-blue-50">
            {value || '-'}
        </p>
    </div>
);

const Profile = ({ customer }: { customer: any }) => {

    return (
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12" dir="rtl">
            <header className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">پروفایل کاربری</h1>
                    <p className="text-slate-500 font-medium mt-1">مدیریت اطلاعات حساب و تنظیمات اختصاصی همکاران.</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-3 rounded-3xl border border-slate-100 shadow-sm">
                    <img src={`https://i.pravatar.cc/100?u=${customer?.id || 'customer'}`} alt="User Avatar" className="h-16 w-16 rounded-2xl object-cover ring-4 ring-blue-50" />
                    <div className="pl-4">
                        <h2 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">{customer?.company || 'نام شرکت'}</h2>
                        <div className="flex items-center gap-1.5 mt-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">مشتری حقوقی فعال</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="space-y-8">
                <InfoSection title="اطلاعات شخصی" icon={<User size={20} />}>
                    <InfoField label="نام و نام خانوادگی" value={customer?.name} icon={User} />
                    <InfoField label="کد ملی" value={customer?.details?.nationalId} icon={Hash} />
                    <InfoField label="شماره موبایل" value={customer?.phone} icon={Phone} />
                    <InfoField label="تخفیف همکاری" value={`${customer?.discount || 0}%`} icon={Percent} />
                </InfoSection>

                <InfoSection title="اطلاعات شرکت" icon={<Building2 size={20} />}>
                    <InfoField label="نام ثبت شده" value={customer?.company} icon={Building2} />
                    <InfoField label="شناسه ملی" value={customer?.details?.nationalId} icon={Hash} />
                    <InfoField label="شماره ثبت" value={customer?.details?.registrationNumber} icon={Hash} />
                    <InfoField label="کد اقتصادی" value={customer?.details?.economicCode} icon={CreditCard} />
                </InfoSection>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-6">
                        <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                            <MapPin size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 tracking-tight">آدرس‌های ثبت شده</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl group hover:bg-white hover:border-blue-100 transition-all duration-300">
                            <div className="flex items-center gap-2 mb-3">
                                <MapPin size={16} className="text-blue-600" />
                                <p className="text-xs font-bold text-slate-900">آدرس اصلی (پیش‌فرض)</p>
                            </div>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">{customer?.details?.storeAddress || 'آدرس ثبت نشده است'}</p>
                        </div>
                        <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl group hover:bg-white hover:border-blue-100 transition-all duration-300">
                            <div className="flex items-center gap-2 mb-3">
                                <Building2 size={16} className="text-blue-600" />
                                <p className="text-xs font-bold text-slate-900">انبار مرکزی</p>
                            </div>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">{customer?.details?.warehouseAddress || 'آدرس ثبت نشده است'}</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-slate-900 p-8 rounded-[32px] text-white flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-white/10 rounded-2xl">
                            <ShieldCheck size={24} className="text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold tracking-tight">امنیت حساب کاربری</h3>
                            <p className="text-sm text-slate-400 font-medium">رمز عبور شما هر ۹۰ روز یکبار باید تغییر کند.</p>
                        </div>
                    </div>
                    <button className="bg-white text-slate-900 font-bold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all active:scale-95 shadow-xl shadow-black/20">
                        تغییر رمز عبور
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
