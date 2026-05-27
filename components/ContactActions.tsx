import React, { useState } from 'react';
import SelectInput from './SelectInput';

interface ContactActionsProps {
    onNavigateToPartnership: () => void;
    onNavigateToStoreLocator: (country?: string, city?: string) => void;
}

const ContactActions: React.FC<ContactActionsProps> = ({ onNavigateToPartnership, onNavigateToStoreLocator }) => {
    const [country, setCountry] = useState('ایران');
    const [city, setCity] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onNavigateToStoreLocator(country, city);
    };

    return (
        <section className="py-16 sm:py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className="relative bg-slate-800 bg-cover bg-center rounded-3xl shadow-2xl p-8 sm:p-12 lg:p-16 text-white overflow-hidden"
                    style={{ backgroundImage: "url('/image/contact-bg.jpg')" }}
                >
                    <div className="absolute inset-0 bg-slate-800/80 backdrop-blur-sm mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/50 to-transparent"></div>
                    <div className="relative grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                        
                        <div className="space-y-6">
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                                نقطه فروش را پیدا کنید
                            </h2>
                            <form className="space-y-4" onSubmit={handleSearch}>
                                <SelectInput value={country} onChange={(e) => setCountry(e.target.value)}>
                                    <option value="ایران" className="bg-gray-800 text-white">ایران</option>
                                    {/* <option className="bg-gray-800 text-white">آلمان</option>
                                    <option className="bg-gray-800 text-white">کانادا</option> */}
                                </SelectInput>
                                <SelectInput value={city} onChange={(e) => setCity(e.target.value)}>
                                    <option value="" className="bg-gray-800 text-white">انتخاب شهر</option>
                                    <option value="تهران" className="bg-gray-800 text-white">تهران</option>
                                    <option value="کرمان" className="bg-gray-800 text-white">کرمان</option>
                                    <option value="شیراز" className="bg-gray-800 text-white">شیراز</option>
                                    <option value="مشهد" className="bg-gray-800 text-white">مشهد</option>
                                    <option value="کرج" className="bg-gray-800 text-white">کرج</option>
                                    <option value="یزد" className="bg-gray-800 text-white">یزد</option>
                                </SelectInput>
                                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                    <button type="submit" className="flex-1 bg-brand text-white font-semibold px-6 py-3 rounded-lg hover:bg-brand-dark transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-brand focus:ring-opacity-75">
                                        جستجو
                                    </button>
                                    <button type="button" onClick={() => onNavigateToStoreLocator(country)} className="flex-1 bg-transparent text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition-colors border border-white/50">
                                        نقشه
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        <div className="hidden md:block absolute left-1/2 top-1/4 h-1/2 w-px bg-white/20 -translate-x-1/2"></div>

                        <div className="space-y-6 md:pr-12 lg:pr-16">
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                                نماینده ما شوید
                            </h2>
                            <p className="text-gray-200 leading-relaxed text-base">
                                اگر می‌خواهید شریک تجاری ما باشید، لطفاً فرم را پر کنید و ما در اسرع وقت با شما تماس گرفته و آنچه را که می‌توانیم با هم انجام دهیم ارزیابی خواهیم کرد.
                            </p>
                            <div className="pt-2">
                                <button type="button" onClick={onNavigateToPartnership} className="w-full sm:w-auto sm:px-12 bg-transparent text-white font-semibold py-3 rounded-lg hover:bg-white/10 transition-colors border border-white/50">
                                    فرم
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactActions;