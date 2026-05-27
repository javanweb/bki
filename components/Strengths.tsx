import React from 'react';
import StrengthCard from './StrengthCard';
import SettingsIcon from './icons/SettingsIcon';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import BuildingIcon from './icons/BuildingIcon';
import MailIcon from './icons/MailIcon';

const strengthsData = [
    {
        icon: <SettingsIcon />,
        title: 'شفافیت',
        description: 'ما به نیازهای مصرف‌کنندگان توجه می‌کنیم. می‌توانید مطمئن باشید که آنچه را نیاز دارید بدون پرداخت هزینه اضافی برای ویژگی‌های غیرضروری دریافت می‌کنید.'
    },
    {
        icon: <ShieldCheckIcon />,
        title: 'مسئولیت‌پذیری',
        description: 'محصولات با دوام و بیمه در برابر شرایط غیرمنتظره.'
    },
    {
        icon: <BuildingIcon />,
        title: 'نوآوری',
        description: 'محصولاتی که از نظر فناوری مدرن بوده و با استانداردهای بین‌المللی مطابقت دارند.'
    },
    {
        icon: <MailIcon />,
        title: 'در دسترس بودن',
        description: 'شبکه فروش گسترده و تحویل سریع.'
    }
];

const Strengths: React.FC = () => {
    return (
        <section className="py-20 sm:py-28 bg-gray-50">
            <div className="max-w-screen-2xl mx-auto px-12 sm:px-16 lg:px-24">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        نقاط قوت ما
                    </h2>
                </div>

                <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {strengthsData.map((strength, index) => (
                        <StrengthCard 
                            key={index}
                            icon={strength.icon}
                            title={strength.title}
                            description={strength.description}
                        />
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="bg-brand text-white font-semibold px-8 py-3 rounded-lg hover:bg-brand-dark transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand focus:ring-opacity-50">
                        دانلود کاتالوگ
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Strengths;