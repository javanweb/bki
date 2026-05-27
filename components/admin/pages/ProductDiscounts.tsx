



import React, { useState, useMemo } from 'react';
import { TrashIcon } from '../../dashboard/DashboardIcons';

const ProductDiscounts = ({ discounts, onAdd, onDelete, customers, products }) => {
    const [selectedProductCode, setSelectedProductCode] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [type, setType] = useState('public'); // 'public' or 'specific'
    const [selectedCustomerIds, setSelectedCustomerIds] = useState<number[]>([]);
    const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleCustomerSelection = (customerId) => {
        setSelectedCustomerIds(prev =>
            prev.includes(customerId)
                ? prev.filter(id => id !== customerId)
                : [...prev, customerId]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedProductCode || !discountPercentage) return;
        if (type === 'specific' && selectedCustomerIds.length === 0) {
            alert('لطفاً حداقل یک مشتری را انتخاب کنید.');
            return;
        }
        
        const product = products.find(p => p.code === selectedProductCode);
        if (!product) return;

        onAdd({
            productId: selectedProductCode,
            productName: product.name,
            percentage: parseInt(discountPercentage, 10),
            type,
            customerIds: type === 'specific' ? selectedCustomerIds : null
        });

        setSelectedProductCode('');
        setDiscountPercentage('');
        setSelectedCustomerIds([]);
        setIsCustomerDropdownOpen(false);
        setType('public');
        setIsSent(true);
        setTimeout(() => setIsSent(false), 3000);
    };

    const getRecipientText = (discount) => {
        if (discount.type === 'public') {
            return 'همه مشتریان';
        }
        
        if (!discount.customerIds) return '-';

        const customerNames = discount.customerIds.map(cId => {
            const customer = customers.find(c => c.id === cId);
            return customer ? customer.name : null;
        }).filter(Boolean);

        if (customerNames.length === 0) return 'مشتری حذف شده';
        if (customerNames.length > 2) {
            return `${customerNames.slice(0, 2).join('، ')} و ${customerNames.length - 2} نفر دیگر`;
        }
        return customerNames.join('، ');
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">مدیریت تخفیف محصولات</h1>
            <p className="mt-1 text-gray-500">تعریف درصد تخفیف برای محصولات خاص به صورت عمومی یا اختصاصی.</p>

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
                                <span className="ml-2 text-sm text-gray-700">انتخاب مشتریان خاص</span>
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
                                            <input
                                                type="checkbox"
                                                id={`customer-${customer.id}`}
                                                checked={selectedCustomerIds.includes(customer.id)}
                                                onChange={() => handleCustomerSelection(customer.id)}
                                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <label htmlFor={`customer-${customer.id}`} className="ml-3 flex-1 text-sm text-gray-700 cursor-pointer">{customer.name} ({customer.company})</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">انتخاب محصول <span className="text-red-500">*</span></label>
                            <select 
                                value={selectedProductCode} 
                                onChange={(e) => setSelectedProductCode(e.target.value)} 
                                required 
                                className="mt-1 block w-full bg-slate-50 border-2 border-slate-300 rounded-lg shadow-sm focus:border-brand focus:ring-4 focus:ring-brand/20 outline-none transition-all py-2.5 px-3 text-gray-700"
                            >
                                <option value="">انتخاب کنید...</option>
                                {products.map(product => (
                                    <option key={product.code} value={product.code}>{product.name} ({product.code})</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">درصد تخفیف <span className="text-red-500">*</span></label>
                            <input
                                type="number" 
                                value={discountPercentage} 
                                onChange={(e) => setDiscountPercentage(e.target.value)} 
                                required 
                                min="1"
                                max="100"
                                dir="ltr"
                                placeholder="10"
                                className="mt-1 block text-left w-full bg-slate-50 border-2 border-slate-300 rounded-lg shadow-sm focus:border-brand focus:ring-4 focus:ring-brand/20 outline-none transition-all py-2.5 px-3 text-gray-700" 
                            />
                        </div>
                    </div>

                    <button type="submit" className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600">ثبت تخفیف</button>
                    {isSent && <p className="text-sm text-green-600 inline-block mr-4">تخفیف با موفقیت ثبت شد!</p>}
                </form>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-4 mb-4">لیست تخفیف‌های فعال</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {discounts.length > 0 ? discounts.map(discount => (
                        <div key={discount.id} className="p-4 border rounded-md">
                            <div className="flex justify-between items-center">
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800">{discount.productName}</h3>
                                    <p className="mt-1 text-sm font-semibold text-green-600">تخفیف: {discount.percentage}٪</p>
                                    <p className="mt-1 text-sm text-blue-600">برای: {getRecipientText(discount)}</p>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    <button
                                        onClick={() => onDelete(discount.id)}
                                        className="text-red-500 hover:text-red-700 p-1"
                                        title="حذف"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : <p className="text-center text-gray-500 py-4">هیچ تخفیف فعالی ثبت نشده است.</p>}
                </div>
            </div>
        </div>
    );
};

export default ProductDiscounts;