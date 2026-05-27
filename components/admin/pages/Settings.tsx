import React from 'react';

// FIX: Add explicit types to SettingsSection to resolve TypeScript error about missing 'children' prop.
const SettingsSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-4 mb-6">{title}</h2>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

// FIX: Add explicit types to SettingRow to resolve TypeScript error about missing 'children' prop.
const SettingRow: React.FC<{ label: string; description: string; children: React.ReactNode }> = ({ label, description, children }) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2">
        <div>
            <h3 className="font-medium text-gray-800">{label}</h3>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
        <div className="mt-2 sm:mt-0">
            {children}
        </div>
    </div>
);

const ToggleSwitch = () => (
    <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
);

const Settings = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">تنظیمات</h1>
            <p className="mt-1 text-gray-500">تنظیمات عمومی و سیستمی پنل مدیریت را انجام دهید.</p>

            <div className="mt-8 space-y-8">
                <SettingsSection title="تنظیمات عمومی">
                    <SettingRow label="عنوان وب‌سایت" description="عنوانی که در نوار عنوان مرورگر نمایش داده می‌شود.">
                        <input type="text" defaultValue="کویر بسپار" className="w-full sm:w-64 bg-slate-50 border-2 border-slate-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all" />
                    </SettingRow>
                    <SettingRow label="حالت تعمیر و نگهداری" description="در صورت فعال بودن، وب‌سایت برای کاربران عادی از دسترس خارج می‌شود.">
                        <ToggleSwitch />
                    </SettingRow>
                </SettingsSection>

                <SettingsSection title="تنظیمات اطلاع‌رسانی">
                     <SettingRow label="اطلاع‌رسانی ایمیلی" description="ارسال ایمیل به مدیران هنگام ثبت سفارش جدید.">
                        <ToggleSwitch />
                    </SettingRow>
                     <SettingRow label="اطلاع‌رسانی پیامکی" description="ارسال پیامک به مشتری هنگام تایید سفارش.">
                        <ToggleSwitch />
                    </SettingRow>
                </SettingsSection>
                
                <div className="flex justify-end">
                    <button className="bg-blue-600 text-white font-semibold px-8 py-2.5 rounded-lg hover:bg-blue-700 transition-colors">
                        ذخیره تغییرات
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
