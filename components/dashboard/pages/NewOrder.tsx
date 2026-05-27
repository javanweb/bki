

import React, { useState } from 'react';
import { TrashIcon } from '../DashboardIcons';
import PersianDatePicker from '../PersianDatePicker';

// Helper function to convert Persian numerals to English numbers
const parsePersianNumber = (str: string | number | undefined): number => {
    if (typeof str === 'number') return str;
    if (!str) return 0;
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    let englishStr = String(str).replace(/,/g, '');
    for (let i = 0; i < 10; i++) {
        englishStr = englishStr.replace(new RegExp(persianDigits[i], 'g'), String(i));
    }
    return parseInt(englishStr, 10) || 0;
};

const getPercentFromDiscountString = (discountStr: string | null | undefined) => {
    if (!discountStr) return 0;
    const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
    let clean = String(discountStr);
    for (let i = 0; i < 10; i++) {
        clean = clean.replace(new RegExp(persianDigits[i], 'g'), String(i));
    }
    
    // Check if it contains percentage indicator (% or ٪ or درصد)
    if (clean.includes('%') || clean.includes('٪') || clean.includes('درصد')) {
        const match = clean.match(/(\d+(?:\.\d+)?)/);
        if (match) {
            return parseFloat(match[1]);
        }
    }
    return 0;
};

const ShoppingCart = ({ customer, cartItems, setCartItems, onOrderSubmit, productDiscounts = [], salesClosures = [], specialOffers = [] }: { customer: any; cartItems: any[]; setCartItems: React.Dispatch<React.SetStateAction<any[]>>; onOrderSubmit: (submittedCart: any[], totalAmount: number, suggestedDate: string, suggestedTime: { from: string, to: string }, shippingAddress: string) => void; productDiscounts?: any[]; salesClosures?: any[]; specialOffers?: any[]; }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [suggestedDate, setSuggestedDate] = useState('');
    const [suggestedTimeFrom, setSuggestedTimeFrom] = useState({ hour: '', period: 'ق.ظ' });
    const [suggestedTimeTo, setSuggestedTimeTo] = useState({ hour: '', period: 'ب.ظ' });
    const [addressOption, setAddressOption] = useState<'default' | 'new'>('default');
    const [newAddress, setNewAddress] = useState('');

    const handleTimeChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setTime: React.Dispatch<React.SetStateAction<{ hour: string; period: string; }>>
    ) => {
        const rawValue = e.target.value.replace(/[^۰-۹0-9]/g, '');
        
        if (rawValue === '') {
            setTime({ hour: '', period: 'ق.ظ' });
            return;
        }
    
        const numericValue = parsePersianNumber(rawValue);
    
        if (isNaN(numericValue) || numericValue < 0 || numericValue > 24) {
            setTime(prev => ({ ...prev, hour: rawValue.slice(0, 2) }));
            return;
        }
    
        let newPeriod = 'ق.ظ';
    
        if (numericValue >= 1 && numericValue <= 11) {
            newPeriod = 'ق.ظ';
        } else if (numericValue === 12 || (numericValue > 12 && numericValue <= 23)) {
            newPeriod = 'ب.ظ';
        } else if (numericValue === 0 || numericValue === 24) {
            newPeriod = 'ق.ظ';
        }
        
        setTime({ hour: rawValue, period: newPeriod });
    };

    const updateItemQuantities = (itemCode: string, packages: number, cartons: number) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.code === itemCode) {
                    const totalQuantity = (packages * item.packageQuantity) + (cartons * item.cartonQuantity);
                    return { ...item, packages, cartons, quantity: totalQuantity };
                }
                return item;
            }).filter(item => item.quantity > 0)
        );
    };

    const handlePackageChange = (itemCode: string, newPackagesStr: string) => {
        let newPackages = parseInt(newPackagesStr, 10);
        if (isNaN(newPackages) || newPackages < 0) return;
        
        const item = cartItems.find(i => i.code === itemCode);
        if (item) {
            let addCartons = 0;
            if (item.cartonQuantity && item.packageQuantity && item.packageQuantity > 0) {
                const packagesPerCarton = Math.floor(item.cartonQuantity / item.packageQuantity);
                if (packagesPerCarton > 0 && newPackages >= packagesPerCarton) {
                    addCartons = Math.floor(newPackages / packagesPerCarton);
                    newPackages = newPackages % packagesPerCarton;
                }
            }
            updateItemQuantities(itemCode, newPackages, (item.cartons || 0) + addCartons);
        }
    };
    
    const handleCartonChange = (itemCode: string, newCartonsStr: string) => {
        const newCartons = parseInt(newCartonsStr, 10);
        if (isNaN(newCartons) || newCartons < 0) return;
        
        const item = cartItems.find(i => i.code === itemCode);
        if (item) {
            updateItemQuantities(itemCode, item.packages || 0, newCartons);
        }
    };

    const handleRemoveItem = (itemCode: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.code !== itemCode));
    };

    const getProductDiscountPercent = (productCode: string) => {
        if (!customer || !productDiscounts) return 0;
        
        // Specific
        const specificDiscount = productDiscounts.find(d => 
            d.productId === productCode && 
            d.type === 'specific' && 
            d.customerIds?.includes(customer.id)
        );
        if (specificDiscount) return specificDiscount.percentage;

        // Public
        const publicDiscount = productDiscounts.find(d => 
            d.productId === productCode && 
            d.type === 'public'
        );
        if (publicDiscount) return publicDiscount.percentage;

        return 0;
    };

    const getSpecialOffer = (productName: string) => {
        if (!specialOffers) return null;
        let baseName = productName;
        const separator = ' سایز ';
        const sizeIndex = productName.lastIndexOf(separator);
        if (sizeIndex !== -1) {
            baseName = productName.substring(0, sizeIndex);
        }

        const offer = specialOffers.find(o => {
             const nameMatches = o.productName === productName || 
                                 productName.includes(o.productName) || 
                                 o.productName.includes(productName) ||
                                 o.productName === baseName ||
                                 baseName.includes(o.productName) ||
                                 o.productName.includes(baseName);
             const isForCustomer = o.type === 'public' || 
                                   (o.type === 'specific' && customer && Number(o.customerId) === Number(customer.id));
             return nameMatches && isForCustomer;
        });
        return offer ? offer.discount : null;
    };

    const itemsToRender = cartItems.map(item => {
        const basePrice = parsePersianNumber(item.price);
        const discountPercent = getProductDiscountPercent(item.code);
        const specialOfferText = getSpecialOffer(item.name);
        const specialOfferPercent = getPercentFromDiscountString(specialOfferText);
        
        const totalDiscountPercent = discountPercent + specialOfferPercent;
        const effectivePrice = totalDiscountPercent > 0 ? basePrice * (1 - totalDiscountPercent / 100) : basePrice;
        
        const packages = item.packages || 0;
        const cartons = item.cartons || 0;
        const totalQuantity = (packages * item.packageQuantity) + (cartons * item.cartonQuantity);

        return {
            ...item,
            packages,
            cartons,
            quantity: totalQuantity,
            displayPrice: effectivePrice,
            basePrice: basePrice,
            productDiscount: totalDiscountPercent,
            specialOffer: specialOfferText
        };
    }).filter(item => item.quantity > 0);

    const subtotal = itemsToRender.reduce((acc, item) => acc + item.displayPrice * item.quantity, 0);
    const discountPercentage = customer.discount || 0;
    const discountAmount = subtotal * (discountPercentage / 100);
    const total = subtotal - discountAmount;


    const handleSubmit = () => {
        const formatTimeForSubmit = (time: { hour: string; period: string }) => {
            const numericHour = parsePersianNumber(time.hour);
            if (isNaN(numericHour)) return ` ${time.period}`;
            
            if (numericHour === 0 || numericHour === 24) return `12 ${time.period}`;
            if (numericHour > 12) return `${numericHour - 12} ${time.period}`;
            return `${numericHour} ${time.period}`;
        };

        const fromTime = formatTimeForSubmit(suggestedTimeFrom);
        const toTime = formatTimeForSubmit(suggestedTimeTo);
        
        const shippingAddress = addressOption === 'new'
            ? newAddress
            : customer.details?.storeAddress || 'آدرس ثبت نشده';

        onOrderSubmit(itemsToRender, total, suggestedDate, { from: fromTime, to: toTime }, shippingAddress);
        setIsSubmitted(true);
    };

    const isAddressInvalid = addressOption === 'new' && !newAddress.trim();
    const isFormInvalid = itemsToRender.length === 0 || !suggestedDate.trim() || !suggestedTimeFrom.hour.trim() || !suggestedTimeTo.hour.trim() || isAddressInvalid;

    if (isSubmitted) {
        return (
            <div>
                <h1 className="text-2xl font-bold text-gray-800">درخواست شما ثبت شد</h1>
                 <div className="mt-8 bg-white p-8 rounded-lg shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mt-6">درخواست شما با موفقیت ثبت شد</h2>
                    <p className="mt-2 text-gray-600 max-w-md">
                        پس از بررسی و تایید توسط کارشناسان ما، نتیجه از طریق پیامک به شما اطلاع‌رسانی خواهد شد. از شکیبایی شما سپاسگزاریم.
                    </p>
                    <button onClick={() => {
                        setIsSubmitted(false);
                    }} className="mt-8 bg-blue-500 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-blue-600 transition-colors">
                        ثبت سفارش جدید
                    </button>
                </div>
            </div>
        )
    }

    const activeClosure = salesClosures?.find(c => c.type === 'public' || (c.type === 'specific' && c.customerIds?.includes(customer.id)));

    if (activeClosure) {
        return (
             <div className="max-w-2xl mx-auto mt-12 bg-white p-8 rounded-2xl shadow-sm border-2 border-red-100 flex flex-col items-center justify-center text-center">
                <div className="h-20 w-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">فروش موقتاً متوقف شده است</h2>
                <p className="mt-4 text-slate-600 leading-relaxed max-w-md">
                    {activeClosure.message}
                </p>
                <div className="mt-8 pt-6 border-t border-slate-100 w-full">
                    <p className="text-sm font-medium text-slate-500">برای اطلاعات بیشتر می‌توانید با پشتیبانی تماس بگیرید.</p>
                </div>
            </div>
        )
    }

    if (itemsToRender.length === 0) {
         return (
             <div>
                <h1 className="text-2xl font-bold text-gray-800">سبد خرید</h1>
                 <div className="mt-8 bg-white p-8 rounded-lg shadow-sm flex flex-col items-center justify-center text-center">
                    <h2 className="text-xl font-bold text-gray-800 mt-6">سبد خرید شما خالی است</h2>
                    <p className="mt-2 text-gray-600 max-w-md">
                        برای افزودن محصولات، به کاتالوگ محصولات مراجعه کنید.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">سبد خرید</h1>
            <p className="mt-1 text-gray-500">سفارش خود را بازبینی و جهت تایید ارسال کنید.</p>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-4">محصولات ({itemsToRender.length})</h2>
                    <div className="mt-4 space-y-4">
                        {itemsToRender.map(item => (
                            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 border-b last:border-b-0">
                                <img src={item.imageUrl || undefined} alt={item.name} className="h-20 w-20 object-contain rounded-md bg-gray-100 p-1 self-start" />
                                <div className="flex-grow">
                                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                    <p className="text-sm text-gray-500">کد: {item.code}</p>
                                    <p className="text-xs text-gray-400 mt-1">تعداد در بسته: {item.packageQuantity} | تعداد در کارتن: {item.cartonQuantity}</p>
                                    {item.specialOffer && (
                                        <div className="mt-2 bg-amber-50 border border-amber-100 text-amber-800 text-xs py-1.5 px-3 rounded-lg flex items-center gap-2 max-w-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="font-bold whitespace-nowrap">پیشنهاد طلایی:</span> 
                                            <span>{item.specialOffer}</span>
                                        </div>
                                    )}
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className={`text-sm font-bold ${item.productDiscount > 0 ? 'text-green-600' : 'text-blue-600'}`}>
                                            {Math.round(item.displayPrice).toLocaleString('fa-IR')} ریال (هر عدد)
                                        </span>
                                        {item.productDiscount > 0 && (
                                            <span className="text-xs text-red-500 bg-red-100 px-1.5 py-0.5 rounded-full">
                                                {item.productDiscount}% تخفیف ویژه
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-600 mt-1 space-y-0.5">
                                        <p>قیمت هر بسته: <span className="font-semibold">{Math.round(item.displayPrice * item.packageQuantity).toLocaleString('fa-IR')} ریال</span></p>
                                        <p>قیمت هر کارتن: <span className="font-semibold">{Math.round(item.displayPrice * item.cartonQuantity).toLocaleString('fa-IR')} ریال</span></p>
                                    </div>
                                </div>
                                <div className="flex flex-col xl:flex-row items-start xl:items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm text-gray-600">بسته:</label>
                                        <input
                                            type="number" 
                                            value={item.packages} 
                                            onChange={(e) => handlePackageChange(item.code, e.target.value)}
                                            dir="ltr"
                                            className="w-16 text-center border-2 border-slate-300 rounded-md py-1" 
                                            min="0"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <label className="text-sm text-gray-600">کارتن:</label>
                                        <input
                                            type="number" 
                                            value={item.cartons} 
                                            onChange={(e) => handleCartonChange(item.code, e.target.value)}
                                            dir="ltr"
                                            className="w-16 text-center border-2 border-slate-300 rounded-md py-1" 
                                            min="0"
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0 self-end sm:self-center">
                                    <div className="flex-grow sm:flex-grow-0 sm:w-36 text-right sm:text-left">
                                        <p className="text-sm text-gray-500">مجموع: {item.quantity.toLocaleString('fa-IR')} عدد</p>
                                        <p className="font-semibold">{Math.round(item.displayPrice * item.quantity).toLocaleString('fa-IR')} ریال</p>
                                    </div>
                                    <button onClick={() => handleRemoveItem(item.code)} className="text-gray-400 hover:text-red-500 p-2">
                                        <TrashIcon />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                        <h2 className="text-lg font-semibold text-gray-800 border-b pb-4">خلاصه سفارش</h2>
                        <div className="mt-4 space-y-3 text-gray-600">
                            <div className="flex justify-between">
                                <span>جمع کل (با تخفیف کالا)</span>
                                <span>{Math.round(subtotal).toLocaleString('fa-IR')} ریال</span>
                            </div>
                            {discountPercentage > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>تخفیف مشتری ({discountPercentage}%)</span>
                                    <span>- {Math.round(discountAmount).toLocaleString('fa-IR')} ریال</span>
                                </div>
                            )}
                            <div className="flex justify-between font-bold text-gray-800 text-lg pt-4 border-t mt-4">
                                <span>مبلغ نهایی</span>
                                <span>{Math.round(total).toLocaleString('fa-IR')} ریال</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                            <h3 className="font-semibold text-gray-700 text-base mb-3">آدرس ارسال بار</h3>
                            <div className="space-y-3">
                                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="addressOption"
                                        value="default"
                                        checked={addressOption === 'default'}
                                        onChange={() => setAddressOption('default')}
                                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <div className="ml-3">
                                        <p className="font-semibold text-sm">آدرس فروشگاه (ثبت شده)</p>
                                        {addressOption === 'default' && (
                                            <p className="text-xs text-gray-600 mt-1">{customer.details?.storeAddress || 'آدرسی ثبت نشده است.'}</p>
                                        )}
                                    </div>
                                </label>
                                <label className="flex items-start p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="addressOption"
                                        value="new"
                                        checked={addressOption === 'new'}
                                        onChange={() => setAddressOption('new')}
                                        className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-1"
                                    />
                                    <div className="ml-3 w-full">
                                        <p className="font-semibold text-sm">ارسال به آدرس جدید</p>
                                        {addressOption === 'new' && (
                                            <textarea
                                                rows={3}
                                                placeholder="آدرس کامل خود را اینجا وارد کنید..."
                                                value={newAddress}
                                                onChange={(e) => setNewAddress(e.target.value)}
                                                className="mt-2 w-full border-2 border-slate-300 rounded-md shadow-sm focus:border-brand focus:ring-brand text-sm px-3 py-2"
                                            ></textarea>
                                        )}
                                    </div>
                                </label>
                            </div>
                        </div>

                         <div className="mt-4 pt-4 border-t">
                            <h3 className="font-semibold text-gray-700 text-base mb-3">تاریخ و زمان پیشنهادی ارسال</h3>
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm text-gray-600">تاریخ</label>
                                    <PersianDatePicker value={suggestedDate} onChange={setSuggestedDate} wrapperClassName="mt-1" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1">
                                        <label className="text-sm text-gray-600">از ساعت</label>
                                        <div className="flex items-center gap-1 mt-1">
                                            <input
                                                type="text"
                                                placeholder="مثال: ۱۳"
                                                maxLength={2}
                                                value={suggestedTimeFrom.hour}
                                                onChange={(e) => handleTimeChange(e, setSuggestedTimeFrom)}
                                                dir="ltr"
                                                className="w-full border-2 border-slate-300 rounded-md shadow-sm focus:border-brand focus:ring-brand text-center py-2 px-1"
                                            />
                                            <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm w-16 text-center">
                                                {suggestedTimeFrom.period}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-sm text-gray-600">تا ساعت</label>
                                         <div className="flex items-center gap-1 mt-1">
                                            <input
                                                type="text"
                                                placeholder="مثال: ۱۷"
                                                maxLength={2}
                                                value={suggestedTimeTo.hour}
                                                onChange={(e) => handleTimeChange(e, setSuggestedTimeTo)}
                                                dir="ltr"
                                                className="w-full border-2 border-slate-300 rounded-md shadow-sm focus:border-brand focus:ring-brand text-center py-2 px-1"
                                            />
                                            <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-sm w-16 text-center">
                                                {suggestedTimeTo.period}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button onClick={handleSubmit} disabled={isFormInvalid} className="w-full mt-6 bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                            ارسال درخواست جهت تایید
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;