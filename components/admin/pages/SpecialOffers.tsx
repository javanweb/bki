
import React, { useState, useMemo } from 'react';
import { TrashIcon } from '../../dashboard/DashboardIcons';

const SpecialOffers = ({ offers, onSend, onDelete, customers, products }) => {
    const [productName, setProductName] = useState('');
    const [discount, setDiscount] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [type, setType] = useState('public'); // 'public' or 'specific'
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setDiscount(text);
        if (!productName && products) {
            const foundProduct = products.find(p => text.includes(p.name));
            if (foundProduct) {
                setProductName(foundProduct.name);
            }
        }
    };

    const handleCustomerSelection = (customerId) => {
        setSelectedCustomerIds(prev =>
            prev.includes(customerId)
                ? prev.filter(id => id !== customerId)
                : [...prev, customerId]
        );
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImageUrl(result);
                setImagePreview(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!productName.trim() || !discount.trim()) return;
        if (type === 'specific' && selectedCustomerIds.length === 0) {
            alert('لطفاً حداقل یک مشتری را انتخاب کنید.');
            return;
        }

        onSend({
            productName,
            discount,
            imageUrl,
            type,
            customerIds: type === 'specific' ? selectedCustomerIds : null
        });

        setProductName('');
        setDiscount('');
        setImageUrl('');
        setImagePreview(null);
        setSelectedCustomerIds([]);
        setIsCustomerDropdownOpen(false);
        setType('public');
        setIsSent(true);
        setTimeout(() => setIsSent(false), 3000);
        // Reset file input if possible
        const fileInput = document.getElementById('offer-image-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };
    
    const getRecipientText = (offer) => {
        if (offer.type === 'public') {
            return 'همه مشتریان';
        }

        const batch = offers.filter(
            o => o.type === 'specific' &&
                 o.productName === offer.productName &&
                 o.discount === offer.discount &&
                 o.timestamp === offer.timestamp
        );

        const customerNames = batch.map(o => {
            const customer = customers.find(c => c.id === o.customerId);
            return customer ? customer.name : null;
        }).filter(Boolean);

        if (customerNames.length === 0) return 'مشتری حذف شده';
        if (customerNames.length > 2) {
            return `${customerNames.slice(0, 2).join('، ')} و ${customerNames.length - 2} نفر دیگر`;
        }
        return customerNames.join('، ');
    };
    
    const processedOffers = useMemo(() => {
        const processed = [];
        const seen = new Set();
        
        offers.sort((a, b) => b.id - a.id).forEach(offer => {
            const key = offer.type === 'public'
                ? offer.id
                : `${offer.productName}-${offer.discount}-${offer.timestamp}`;
            
            if (!seen.has(key)) {
                processed.push(offer);
                seen.add(key);
            }
        });
        return processed;
    }, [offers]);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">مدیریت پیشنهادات ویژه</h1>
            <p className="mt-1 text-gray-500">پیشنهادات ویژه خود را برای مشتریان ارسال و مدیریت کنید.</p>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">گیرندگان</label>
                        <div className="mt-2 flex items-center gap-6">
                            <label className="flex items-center">
                                <input type="radio" name="recipient-type" value="public" checked={type === 'public'} onChange={() => setType('public')} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                <span className="ml-2 text-sm text-gray-700">همه مشتریان</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="recipient-type" value="specific" checked={type === 'specific'} onChange={() => setType('specific')} className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
                                <span className="ml-2 text-sm text-gray-700">انتخاب مشتریان</span>
                            </label>
                        </div>
                    </div>

                    {type === 'specific' && (
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700">مشتریان</label>
                            <button type="button" onClick={() => setIsCustomerDropdownOpen(!isCustomerDropdownOpen)} className="mt-1 w-full text-right bg-white border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center">
                                <span>{selectedCustomerIds.length > 0 ? `${selectedCustomerIds.length} مشتری انتخاب شده` : 'یک یا چند مشتری را انتخاب کنید'}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isCustomerDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            {isCustomerDropdownOpen && (
                                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border rounded-lg max-h-60 overflow-auto">
                                    {customers.map(customer => (
                                        <div key={customer.id} className="flex items-center p-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleCustomerSelection(customer.id)}>
                                            <input type="checkbox" id={`customer-${customer.id}`} checked={selectedCustomerIds.includes(customer.id)} onChange={() => {}} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                            <label htmlFor={`customer-${customer.id}`} className="ml-3 flex-1 text-sm text-gray-700 cursor-pointer">{customer.name} ({customer.company})</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">نام محصول <span className="text-red-500">*</span></label>
                            <select value={productName} onChange={(e) => setProductName(e.target.value)} required className="mt-1 block w-full bg-slate-50 border-2 border-slate-300 rounded-lg shadow-sm focus:border-brand focus:ring-4 focus:ring-brand/20 outline-none transition-all py-2.5 px-3 text-gray-700">
                                <option value="">انتخاب کنید...</option>
                                {products?.map(p => (
                                    <option key={p.code} value={p.name}>{p.name}</option>
                                ))}
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">متن پیشنهاد (مثال: ۱۵٪ تخفیف) <span className="text-red-500">*</span></label>
                            <input type="text" value={discount} onChange={handleDiscountChange} required className="mt-1 block w-full bg-slate-50 border-2 border-slate-300 rounded-lg shadow-sm focus:border-brand focus:ring-4 focus:ring-brand/20 outline-none transition-all py-2.5 px-3 text-gray-700" />
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">آپلود تصویر محصول (اختیاری)</label>
                        <input 
                            id="offer-image-upload"
                            type="file" 
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                        />
                         {imagePreview && (
                            <div className="mt-4">
                                <img src={imagePreview} alt="پیش‌نمایش" className="h-24 w-24 object-contain rounded-lg border p-1" />
                            </div>
                        )}
                    </div>

                    <button type="submit" className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600">ارسال پیشنهاد</button>
                    {isSent && <p className="text-sm text-green-600 inline-block mr-4">پیشنهاد با موفقیت ارسال شد!</p>}
                </form>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-4 mb-4">تاریخچه پیشنهادات</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {processedOffers.length > 0 ? processedOffers.map(offer => (
                        <div key={`${offer.id}-${offer.timestamp}`} className="p-4 border rounded-md">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4 flex-1">
                                    {offer.imageUrl && <img src={offer.imageUrl || undefined} alt={offer.productName} className="h-14 w-14 object-contain rounded-md bg-white p-1 border" />}
                                    <div className="flex-1">
                                        <h3 className="font-bold text-gray-800">{offer.productName}</h3>
                                        <p className="font-semibold text-green-600 text-sm mt-1">{offer.discount}</p>
                                        <p className="mt-2 text-sm font-medium text-blue-600">ارسال شده به: {getRecipientText(offer)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    <span className="text-xs text-gray-500 whitespace-nowrap">{offer.timestamp}</span>
                                    <button onClick={() => onDelete(offer.id)} className="text-red-500 hover:text-red-700 p-1" title="حذف"><TrashIcon /></button>
                                </div>
                            </div>
                        </div>
                    )) : <p className="text-center text-gray-500 py-4">هیچ پیشنهادی یافت نشد.</p>}
                </div>
            </div>
        </div>
    );
};
export default SpecialOffers;
