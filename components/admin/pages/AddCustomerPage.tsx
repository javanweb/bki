

import React, { useState } from 'react';
import { BackIcon, PlusIcon, TrashIcon } from '../../dashboard/DashboardIcons';

// FIX: Add explicit React.FC type for props
const FormRow: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>;

const FormField: React.FC<{
    label: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    type?: string;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    placeholder?: string;
    title?: string;
}> = ({ label, name, value, onChange, required = false, type = "text", maxLength, minLength, pattern, placeholder, title }) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            placeholder={placeholder}
            title={title}
            dir={["accountNumber", "nationalId", "landline", "discount", "mobile"].includes(name) ? "ltr" : "rtl"}
            className={`w-full bg-slate-50 border-2 border-slate-300 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all ${["accountNumber", "nationalId", "landline", "discount", "mobile"].includes(name) ? 'text-left' : ''}`}
        />
    </div>
);

const SelectField: React.FC<{
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;
    required?: boolean;
}> = ({ label, name, value, onChange, children, required = false }) => (
     <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full bg-slate-50 border-2 border-slate-300 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all"
        >
            {children}
        </select>
    </div>
);

const TextAreaField: React.FC<{
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
}> = ({ label, name, value, onChange, required=false }) => (
     <div className="md:col-span-2 lg:col-span-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            rows={3}
            className="w-full bg-slate-50 border-2 border-slate-300 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all"
        ></textarea>
    </div>
);

interface AddCustomerPageProps {
    onBack: () => void;
    onAdd: (customerData: any) => void;
}

const AddCustomerPage: React.FC<AddCustomerPageProps> = ({ onBack, onAdd }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        storeName: '',
        nationalId: '',
        fatherName: '',
        landline: '',
        province: 'تهران',
        city: 'تهران',
        ownership: 'تملیکی',
        accountNumber: '',
        storeAddress: '',
        warehouseAddress: '',
        discount: 0,
    });
    const [mobileNumbers, setMobileNumbers] = useState(['']);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const numericFields = ['mobile', 'landline', 'accountNumber', 'nationalId', 'discount'];
        if (numericFields.includes(name)) {
            setFormData(prev => ({ ...prev, [name]: value.replace(/[^0-9]/g, '') }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleMobileChange = (index: number, value: string) => {
        const newMobileNumbers = [...mobileNumbers];
        newMobileNumbers[index] = value.replace(/[^0-9]/g, '');
        setMobileNumbers(newMobileNumbers);
    };

    const addMobileField = () => {
        setMobileNumbers([...mobileNumbers, '']);
    };

    const removeMobileField = (index: number) => {
        if (mobileNumbers.length > 1) {
            setMobileNumbers(mobileNumbers.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newCustomerData = {
            name: formData.fullName,
            company: formData.storeName,
            discount: parseInt(String(formData.discount), 10) || 0,
            phone: mobileNumbers[0], // Use first mobile as primary
            status: 'فعال',
            statusColor: 'green',
            details: { ...formData, mobileNumbers }
        };
        onAdd(newCustomerData);
    };

    // Dummy data for provinces
    const provinces = ['تهران', 'اصفهان', 'فارس', 'خراسان رضوی', 'آذربایجان شرقی', 'مازندران', 'خوزستان', 'کرمان'];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">فرم تعریف مشتری جدید</h1>
                    <p className="mt-1 text-gray-500">اطلاعات مشتری جدید را با دقت وارد کنید.</p>
                </div>
                <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black">
                    <BackIcon />
                    بازگشت به لیست
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="bg-white p-6 rounded-lg shadow-sm space-y-8">
                    <FormRow>
                        <FormField label="نام و نام خانوادگی" name="fullName" value={formData.fullName} onChange={handleChange} required />
                        <FormField label="نام فروشگاه" name="storeName" value={formData.storeName} onChange={handleChange} required />
                        <FormField label="کد ملی" name="nationalId" value={formData.nationalId} onChange={handleChange} maxLength={10} minLength={10} pattern="[0-9]{10}" title="کد ملی باید ۱۰ رقم باشد" required placeholder="مثال: 0123456789" />
                    </FormRow>
                    <FormRow>
                        <FormField label="نام پدر" name="fatherName" value={formData.fatherName} onChange={handleChange} />
                        <FormField label="تلفن ثابت" name="landline" value={formData.landline} onChange={handleChange} maxLength={11} minLength={11} pattern="0[0-9]{10}" title="شماره ثابت باید با ۰ شروع شود و ۱۱ رقم باشد" required placeholder="مثال: 02112345678" />
                        <FormField label="درصد تخفیف" name="discount" value={formData.discount} onChange={handleChange} type="number" />
                    </FormRow>
                    <FormRow>
                        <SelectField label="استان" name="province" value={formData.province} onChange={handleChange}>
                            {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                        </SelectField>
                        <FormField label="شهرستان" name="city" value={formData.city} onChange={handleChange} required />
                         <SelectField label="نوع مالکیت" name="ownership" value={formData.ownership} onChange={handleChange}>
                            <option value="تملیکی">تملیکی</option>
                            <option value="استیجاری">استیجاری</option>
                            <option value="سایر">سایر</option>
                        </SelectField>
                    </FormRow>
                    <FormRow>
                        <FormField label="شماره حساب" name="accountNumber" value={formData.accountNumber} onChange={handleChange} maxLength={26} minLength={10} pattern="[0-9]{10,26}" title="شماره حساب باید بین ۱۰ تا ۲۶ رقم باشد" required placeholder="فقط عدد وارد کنید" />
                    </FormRow>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">شماره موبایل <span className="text-red-500">*</span></label>
                        {mobileNumbers.map((number, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                <input
                                    type="tel"
                                    value={number}
                                    onChange={(e) => handleMobileChange(index, e.target.value)}
                                    maxLength={11}
                                    minLength={11}
                                    pattern="09[0-9]{9}"
                                    title="شماره موبایل باید با ۰۹ شروع شود و ۱۱ رقم باشد"
                                    placeholder="مثال: 09121234567"
                                    required
                                    dir="ltr"
                                    className="flex-grow bg-slate-50 border-2 border-slate-300 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all text-left"
                                />
                                {mobileNumbers.length > 1 && (
                                    <button type="button" onClick={() => removeMobileField(index)} className="p-2 text-red-500 hover:bg-red-100 rounded-full">
                                        <TrashIcon />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={addMobileField} className="text-sm font-semibold text-blue-600 flex items-center gap-1 mt-2">
                            <PlusIcon/> افزودن شماره دیگر
                        </button>
                    </div>

                    <FormRow>
                        <TextAreaField label="آدرس فروشگاه" name="storeAddress" value={formData.storeAddress} onChange={handleChange} />
                    </FormRow>
                     <FormRow>
                        <TextAreaField label="آدرس انبار" name="warehouseAddress" value={formData.warehouseAddress} onChange={handleChange} />
                    </FormRow>
                </div>
                <div className="mt-6 flex justify-end gap-4">
                     <button type="button" onClick={onBack} className="bg-gray-100 text-gray-700 font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-200">
                        انصراف
                    </button>
                    <button type="submit" className="bg-green-500 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-green-600">
                        ذخیره مشتری
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCustomerPage;