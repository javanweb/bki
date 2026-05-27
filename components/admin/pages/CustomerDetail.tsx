


import React, { useState, useEffect } from 'react';
import { BackIcon } from '../../dashboard/DashboardIcons';

const EditableField = ({ label, value, onChange, name, type = "text", placeholder, dir = "rtl", maxLength, minLength, pattern, title, required }: { label: string; value: any; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; name: string; type?: string; placeholder?: string; dir?: string, maxLength?: number, minLength?: number, pattern?: string, title?: string, required?: boolean }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            dir={dir}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            title={title}
            required={required}
            className={`w-full bg-slate-50 border-2 border-slate-300 rounded-lg py-2.5 px-3 text-gray-700 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all ${dir === 'ltr' ? 'text-left' : ''}`}
        />
    </div>
);

const EditableTextArea = ({ label, value, onChange, name, required }: { label: string; value: any; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; name: string, required?: boolean }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={3}
            required={required}
            className="w-full bg-slate-50 border-2 border-slate-300 rounded-lg py-2.5 px-3 text-gray-700 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all"
        />
    </div>
);

const CustomerDetail = ({ customer, onBack, onUpdate }) => {
    const [formData, setFormData] = useState({ ...customer });

    useEffect(() => {
        setFormData({ ...customer });
    }, [customer]);

    const handleRootChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };
    
    const handleDetailsChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            details: {
                ...prev.details,
                [name]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
        onBack();
    };

    return (
        <div>
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black mb-6">
                <BackIcon />
                بازگشت به لیست مشتریان
            </button>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Column 1 */}
                    <div className="flex flex-col gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800 border-b pb-4 mb-6">اطلاعات پایه</h2>
                            <div className="space-y-4">
                                <EditableField label="نام مشتری" name="name" value={formData.name || ''} onChange={handleRootChange} required />
                                <EditableField label="شرکت/فروشگاه" name="company" value={formData.company || ''} onChange={handleRootChange} required />
                                <EditableField label="درصد تخفیف" name="discount" value={formData.discount || 0} onChange={handleRootChange} type="number" dir="ltr" />
                                <EditableTextArea label="دلیل تخفیف (نمایش به مشتری)" name="discountReason" value={formData.discountReason || ''} onChange={handleRootChange} />
                                <EditableField label="شماره موبایل" name="phone" value={formData.phone || ''} onChange={handleRootChange} dir="ltr" type="tel" maxLength={11} minLength={11} pattern="09[0-9]{9}" title="شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد" required placeholder="مثال: 09121234567" />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">وضعیت <span className="text-red-500">*</span></label>
                                    <select name="status" value={formData.status} onChange={handleRootChange} required className="w-full bg-slate-50 border-2 border-slate-300 rounded-lg py-2.5 px-3 text-gray-700 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all">
                                        <option>فعال</option>
                                        <option>غیرفعال</option>
                                        <option>در انتظار تایید</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800 border-b pb-4 mb-6">مدیریت دسترسی</h2>
                            <div className="space-y-4">
                                 <EditableField label="نام کاربری" name="username" value={formData.username || ''} onChange={handleRootChange} dir="ltr" required />
                                <EditableField label="رمز عبور" name="password" value={formData.password || ''} onChange={handleRootChange} type="password" placeholder="برای تغییر، رمز جدید را وارد کنید" dir="ltr" minLength={8} title="رمز عبور حداقل باید ۸ کاراکتر باشد" />
                                <button type="button" className="w-full mt-2 border border-blue-500 text-blue-500 font-semibold py-2 rounded-lg hover:bg-blue-50">
                                    ورود به پنل مشتری
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="flex flex-col gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800 border-b pb-4 mb-6">اطلاعات تکمیلی</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <EditableField label="کد ملی" name="nationalId" value={formData.details?.nationalId || ''} onChange={handleDetailsChange} dir="ltr" maxLength={10} minLength={10} pattern="[0-9]{10}" title="کد ملی باید ۱۰ رقم باشد" required placeholder="مثال: 0123456789" />
                                <EditableField label="نام پدر" name="fatherName" value={formData.details?.fatherName || ''} onChange={handleDetailsChange} />
                                <EditableField label="تلفن ثابت" name="landline" value={formData.details?.landline || ''} onChange={handleDetailsChange} dir="ltr" type="tel" maxLength={11} minLength={11} pattern="0[0-9]{10}" title="شماره ثابت باید با ۰ شروع شود و ۱۱ رقم باشد" required placeholder="مثال: 02112345678" />
                                <EditableField label="استان" name="province" value={formData.details?.province || ''} onChange={handleDetailsChange} required />
                                <EditableField label="شهرستان" name="city" value={formData.details?.city || ''} onChange={handleDetailsChange} required />
                                <EditableField label="نوع مالکیت" name="ownership" value={formData.details?.ownership || ''} onChange={handleDetailsChange} required />
                                <EditableField label="شماره حساب" name="accountNumber" value={formData.details?.accountNumber || ''} onChange={handleDetailsChange} dir="ltr" maxLength={26} minLength={10} pattern="[0-9]{10,26}" title="شماره حساب باید بین ۱۰ تا ۲۶ رقم باشد" required placeholder="فقط عدد وارد کنید" />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h2 className="text-lg font-semibold text-gray-800 border-b pb-4 mb-6">آدرس‌ها</h2>
                            <div className="space-y-4">
                                <EditableTextArea label="آدرس فروشگاه" name="storeAddress" value={formData.details?.storeAddress || ''} onChange={handleDetailsChange} />
                                <EditableTextArea label="آدرس انبار" name="warehouseAddress" value={formData.details?.warehouseAddress || ''} onChange={handleDetailsChange} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    <button type="button" onClick={onBack} className="bg-gray-100 text-gray-700 font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-200">
                        انصراف
                    </button>
                    <button type="submit" className="bg-green-500 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-green-600">
                        ذخیره تغییرات
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CustomerDetail;