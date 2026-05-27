
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import PersianDatePicker from './dashboard/PersianDatePicker';
import CheckIcon from './icons/CheckIcon';

const PartnershipRequest: React.FC<{ 
    onBack: () => void; 
    onNavigateHome: () => void; 
    onNavigateToLogin: () => void; 
    onNavigateToAbout: () => void;
    onNavigateToPartnership: () => void;
    onNavigateToGoals: () => void;
    onNavigateToArticles?: () => void;
    onSubmitRequest: (data: any) => void;
    onProductSelect?: (product: any) => void;
    onNavigateToContact?: () => void;
    onNavigateToFAQ?: () => void;
    onNavigateToFeedback?: () => void;
}> = ({ onBack, onNavigateHome, onNavigateToLogin, onNavigateToAbout, onNavigateToPartnership, onNavigateToGoals, onNavigateToArticles, onSubmitRequest, onProductSelect, onNavigateToContact, onNavigateToFAQ, onNavigateToFeedback }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [formData, setFormData] = useState({
        fullName: '',
        nationalId: '',
        fatherName: '',
        accountNumber: '',
        landline: '',
        mobile: '',
        storeName: '',
        storeAddress: '',
        birthDate: '',
        province: '',
        city: '',
        annualPurchase: '',
        brands: '',
        ownership: '',
        experience: '',
        workingHours: '',
        instagram: '',
    });

    const [files, setFiles] = useState<{ storefront: File | null; interior: File | null }>({
        storefront: null,
        interior: null,
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const numericFields = ['mobile', 'landline', 'accountNumber', 'experience', 'annualPurchase', 'nationalId'];
        if (numericFields.includes(name)) {
            setFormData(prev => ({ ...prev, [name]: value.replace(/[^0-9]/g, '') }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'storefront' | 'interior') => {
        if (e.target.files?.[0]) {
            setFiles(prev => ({ ...prev, [type]: e.target.files![0] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        let storefrontBase64 = '';
        let interiorBase64 = '';

        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });

        if (files.storefront) storefrontBase64 = await toBase64(files.storefront);
        if (files.interior) interiorBase64 = await toBase64(files.interior);

        console.log('Form Submitted:', formData, files);
        onSubmitRequest({
            ...formData,
            storefrontImage: storefrontBase64,
            interiorImage: interiorBase64,
            id: Date.now().toString(),
            date: new Date().toLocaleDateString('fa-IR'),
            status: 'در انتظار بررسی'
        });
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const IRAN_PROVINCES = [
        "آذربایجان شرقی", "آذربایجان غربی", "اردبیل", "اصفهان", "البرز", "ایلام", "بوشهر", 
        "تهران", "چهارمحال و بختیاری", "خراسان جنوبی", "خراسان رضوی", "خراسان شمالی", 
        "خوزستان", "زنجان", "سمنان", "سیستان و بلوچستان", "فارس", "قزوین", "قم", "کردستان", 
        "کرمان", "کرمانشاه", "کهگیلویه و بویراحمد", "گلستان", "گیلان", "لرستان", "مازندران", 
        "مرکزی", "هرمزگان", "همدان", "یزد"
    ];

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans" dir="rtl">
                <Header 
                    onNavigateToLogin={onNavigateToLogin} 
                    onNavigateHome={onNavigateHome} 
                    onNavigateToAbout={onNavigateToAbout}
                    onNavigateToPartnership={onNavigateToPartnership}
                    onNavigateToGoals={onNavigateToGoals}
                    onNavigateToArticles={onNavigateToArticles}
                    onProductSelect={onProductSelect}
                    onNavigateToContact={onNavigateToContact}
                    onNavigateToFAQ={onNavigateToFAQ}
                    onNavigateToFeedback={onNavigateToFeedback}
                    variant="light" 
                />
                <main className="flex-grow flex items-center justify-center p-6 pt-32 pb-20">
                    <div className="max-w-md w-full bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 text-center animate-fade-in transition-all">
                        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 drop-shadow-sm">درخواست شما ثبت شد</h2>
                        <p className="text-gray-600 leading-relaxed mb-10 text-lg">
                            سپاس از اعتماد شما.<br/> اطلاعات شما با موفقیت دریافت شد و کارشناسان فروش کویر بسپار پس از بررسی اولیه در اسرع وقت با شما تماس خواهند گرفت.
                        </p>
                        <button 
                            onClick={onNavigateHome} 
                            className="w-full bg-gradient-to-r from-brand to-brand-dark text-white font-bold px-8 py-4 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            بازگشت به سایت
                        </button>
                    </div>
                </main>
                <Footer onNavigateToAbout={onNavigateToAbout} onNavigateToGoals={onNavigateToGoals}
                    onNavigateToArticles={onNavigateToArticles} onNavigateToPartnership={onNavigateToPartnership} />
            </div>
        );
    }

    const inputClasses = "w-full bg-slate-50 border-2 border-slate-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all";
    const labelClasses = "block text-sm font-semibold text-gray-700 mb-2 mr-1";
    const requiredSpan = <span className="text-red-500 mr-1">*</span>;

    return (
        <div className="min-h-screen bg-gray-50 font-sans" dir="rtl">
            <Header 
                onNavigateToLogin={onNavigateToLogin} 
                onNavigateHome={onNavigateHome} 
                onNavigateToAbout={onNavigateToAbout}
                onNavigateToPartnership={onNavigateToPartnership}
                onNavigateToGoals={onNavigateToGoals}
                    onNavigateToArticles={onNavigateToArticles}
                onProductSelect={onProductSelect}
                onNavigateToContact={onNavigateToContact}
                onNavigateToFAQ={onNavigateToFAQ}
                onNavigateToFeedback={onNavigateToFeedback}
                variant="light" 
            />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">درخواست اخذ نمایندگی</h1>
                    <div className="max-w-3xl mx-auto p-6 bg-blue-50 border-r-4 border-brand rounded-xl">
                        <p className="text-brand text-lg font-medium leading-relaxed">
                            چنانچه تمایل دارید که عضوی از خانواده کویر بسپار شوید لطفا کلیه آیتم‌های فرم زیر را تکمیل فرمایید تا کارشناسان فروش ما در اسرع وقت با شما تماس حاصل فرمایند.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Personal Info */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-blue-100 text-brand flex items-center justify-center text-sm">۱</span>
                                اطلاعات هویتی
                            </h3>
                            <div>
                                <label className={labelClasses}>نام و نام خانوادگی {requiredSpan}</label>
                                <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} className={inputClasses} placeholder="مثال: علی علوی" />
                            </div>
                            <div>
                                <label className={labelClasses}>کد ملی {requiredSpan}</label>
                                <input type="text" name="nationalId" required value={formData.nationalId} onChange={handleChange} dir="ltr" className={`text-left ${inputClasses}`} placeholder="مثال: ۰۰۱۲۳۴۵۶۷۸" maxLength={10} minLength={10} pattern="[0-9]{10}" title="کد ملی باید ۱۰ رقم باشد" />
                            </div>
                            <div>
                                <label className={labelClasses}>نام پدر {requiredSpan}</label>
                                <input type="text" name="fatherName" required value={formData.fatherName} onChange={handleChange} className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}>تاریخ تولد</label>
                                <PersianDatePicker value={formData.birthDate} onChange={(date) => setFormData(p => ({...p, birthDate: date}))} inputClassName={inputClasses} />
                            </div>
                             <div>
                                <label className={labelClasses}>شماره حساب {requiredSpan}</label>
                                <input type="text" name="accountNumber" required value={formData.accountNumber} onChange={handleChange} dir="ltr" className={`text-left ${inputClasses}`} placeholder="شماره حساب فعال جهت مراودات مالی" maxLength={26} minLength={10} pattern="[0-9]{10,26}" title="شماره حساب باید بین ۱۰ تا ۲۶ رقم باشد" />
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-blue-100 text-brand flex items-center justify-center text-sm">۲</span>
                                اطلاعات تماس و مکان
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className={labelClasses}>استان {requiredSpan}</label>
                                    <select name="province" required value={formData.province} onChange={handleChange} className={inputClasses}>
                                        <option value="">انتخاب استان...</option>
                                        {IRAN_PROVINCES.map(prov => (
                                            <option key={prov} value={prov}>{prov}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClasses}>شهر {requiredSpan}</label>
                                    <input type="text" name="city" required value={formData.city} onChange={handleChange} className={inputClasses} placeholder="نام شهر" />
                                </div>
                            </div>
                            <div>
                                <label className={labelClasses}>تلفن همراه (ضروری) {requiredSpan}</label>
                                <input type="tel" name="mobile" required value={formData.mobile} onChange={handleChange} dir="ltr" className={`text-left ${inputClasses}`} placeholder="۰۹۱۲۰۰۰۰۰۰۰" maxLength={11} minLength={11} pattern="09[0-9]{9}" title="شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد" />
                            </div>
                            <div>
                                <label className={labelClasses}>تلفن ثابت</label>
                                <input type="tel" name="landline" value={formData.landline} onChange={handleChange} dir="ltr" className={`text-left ${inputClasses}`} maxLength={11} minLength={11} pattern="0[0-9]{10}" title="شماره ثابت باید با ۰ شروع شود و ۱۱ رقم باشد" placeholder="02112345678" />
                            </div>
                        </div>

                        {/* Business Info */}
                        <div className="md:col-span-2 space-y-6">
                            <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-blue-100 text-brand flex items-center justify-center text-sm">۳</span>
                                اطلاعات کسب و کار
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelClasses}>نام فروشگاه {requiredSpan}</label>
                                    <input type="text" name="storeName" required value={formData.storeName} onChange={handleChange} className={inputClasses} />
                                </div>
                                <div>
                                    <label className={labelClasses}>نوع مالکیت {requiredSpan}</label>
                                    <select name="ownership" required value={formData.ownership} onChange={handleChange} className={inputClasses}>
                                        <option value="">انتخاب کنید...</option>
                                        <option value="تملیکی">تملیکی</option>
                                        <option value="استیجاری">استیجاری</option>
                                        <option value="سایر">سایر</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={labelClasses}>سابقه فعالیت (سال)</label>
                                    <input type="text" name="experience" value={formData.experience} onChange={handleChange} dir="ltr" className={`text-left ${inputClasses}`} />
                                </div>
                                <div>
                                    <label className={labelClasses}>حجم خرید سالانه (ریال)</label>
                                    <input type="text" name="annualPurchase" value={formData.annualPurchase} onChange={handleChange} dir="ltr" className={`text-left ${inputClasses}`} placeholder="مثال: ۵,۰۰۰,۰۰۰,۰۰۰" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelClasses}>آدرس فروشگاه {requiredSpan}</label>
                                    <textarea name="storeAddress" required rows={2} value={formData.storeAddress} onChange={handleChange} className={inputClasses}></textarea>
                                </div>
                                <div>
                                    <label className={labelClasses}>برندهای موجود در فروشگاه</label>
                                    <input type="text" name="brands" value={formData.brands} onChange={handleChange} className={inputClasses} placeholder="برندهایی که در حال حاضر با آن‌ها کار می‌کنید" />
                                </div>
                                <div>
                                    <label className={labelClasses}>ساعات کاری</label>
                                    <input type="text" name="workingHours" value={formData.workingHours} onChange={handleChange} dir="ltr" className={`text-left ${inputClasses}`} placeholder="مثال: 08-20" />
                                </div>
                                <div>
                                    <label className={labelClasses}>آیدی اینستاگرام</label>
                                    <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} dir="ltr" className={`text-left ${inputClasses}`} placeholder="@username" />
                                </div>
                            </div>
                        </div>

                        {/* File Uploads */}
                        <div className="md:col-span-2 space-y-6">
                            <h3 className="text-xl font-bold text-gray-800 border-b pb-3 mb-6 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-lg bg-blue-100 text-brand flex items-center justify-center text-sm">۴</span>
                                مدارک و تصاویر
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="p-6 border-2 border-dashed border-gray-200 rounded-2xl text-center hover:border-brand transition-colors bg-gray-50 group">
                                    <label className="cursor-pointer block">
                                        <div className="text-brand mb-3 flex justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <span className="block text-gray-700 font-bold mb-1">عکس سردر فروشگاه {requiredSpan}</span>
                                        <span className="text-xs text-gray-500">{files.storefront ? files.storefront.name : 'فایلی انتخاب نشده است'}</span>
                                        <input type="file" required accept="image/*" onChange={(e) => handleFileChange(e, 'storefront')} className="hidden" />
                                    </label>
                                </div>
                                <div className="p-6 border-2 border-dashed border-gray-200 rounded-2xl text-center hover:border-brand transition-colors bg-gray-50 group">
                                    <label className="cursor-pointer block">
                                        <div className="text-brand mb-3 flex justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                        <span className="block text-gray-700 font-bold mb-1">عکس نمای داخلی {requiredSpan}</span>
                                        <span className="text-xs text-gray-500">{files.interior ? files.interior.name : 'فایلی انتخاب نشده است'}</span>
                                        <input type="file" required accept="image/*" onChange={(e) => handleFileChange(e, 'interior')} className="hidden" />
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-12 flex flex-col items-center gap-4">
                        <button 
                            type="submit" 
                            className="w-full md:w-auto md:px-20 bg-brand text-white font-bold py-4 rounded-xl hover:bg-brand-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 focus:ring-4 focus:ring-blue-100"
                        >
                            ارسال درخواست نهایی
                        </button>
                        <p className="text-sm text-gray-400">
                             با کلیک بر روی دکمه بالا، تمامی اطلاعات وارد شده جهت بررسی به واحد فروش ارسال خواهد شد.
                        </p>
                    </div>
                </form>
            </main>

            <Footer />
        </div>
    );
};

export default PartnershipRequest;
