import React, { useState, useMemo } from 'react';
import { TrashIcon } from '../../dashboard/DashboardIcons';

const SalesManagement = ({ closures, onSend, onDelete, customers }) => {
    const [message, setMessage] = useState('');
    const [type, setType] = useState('public');
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
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
        if (!message.trim()) return;
        if (type === 'specific' && selectedCustomerIds.length === 0) {
            alert('لطفاً حداقل یک مشتری را انتخاب کنید.');
            return;
        }

        onSend({
            message,
            type,
            customerIds: type === 'specific' ? selectedCustomerIds : null
        });

        setMessage('');
        setSelectedCustomerIds([]);
        setIsCustomerDropdownOpen(false);
        setType('public');
        setIsSent(true);
        setTimeout(() => setIsSent(false), 3000);
    };
    
    const getRecipientText = (closure) => {
        if (closure.type === 'public') {
            return 'همه مشتریان';
        }

        const batch = closures.filter(
            o => o.type === 'specific' &&
                 o.message === closure.message &&
                 o.timestamp === closure.timestamp
        );

        let customerNames = [];
        if (customers) {
            customerNames = batch.map(o => {
                const customer = customers.find(c => c.id === o.customerId);
                return customer ? customer.name : null;
            }).filter(Boolean);
        }

        if (customerNames.length === 0) return 'مشتری حذف شده';
        if (customerNames.length > 2) {
            return `${customerNames.slice(0, 2).join('، ')} و ${customerNames.length - 2} نفر دیگر`;
        }
        return customerNames.join('، ');
    };
    
    const processedClosures = useMemo(() => {
        const processed = [];
        const seen = new Set();
        
        const list = closures || [];
        // Make a copy so we can sort without mutating the original array
        [...list].sort((a, b) => b.id - a.id).forEach(closure => {
            const key = closure.type === 'public'
                ? closure.id
                : `${closure.message}-${closure.timestamp}`;
            
            if (!seen.has(key)) {
                processed.push(closure);
                seen.add(key);
            }
        });
        return processed;
    }, [closures]);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">مدیریت وضعیت فروش</h1>
            <p className="mt-1 text-gray-500">می‌توانید فروش را برای همه یا افراد خاص ببندید و پیامی به آن‌ها نمایش دهید.</p>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">گیرندگان</label>
                        <div className="mt-2 flex items-center gap-6">
                            <label className="flex items-center">
                                <input type="radio" name="recipient-type" value="public" checked={type === 'public'} onChange={() => setType('public')} className="h-4 w-4 text-brand border-slate-300 focus:ring-brand/20" />
                                <span className="ml-2 text-sm text-gray-700">همه مشتریان</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="recipient-type" value="specific" checked={type === 'specific'} onChange={() => setType('specific')} className="h-4 w-4 text-brand border-slate-300 focus:ring-brand/20" />
                                <span className="ml-2 text-sm text-gray-700">انتخاب مشتریان</span>
                            </label>
                        </div>
                    </div>

                    {type === 'specific' && (
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">مشتریان</label>
                            <button type="button" onClick={() => setIsCustomerDropdownOpen(!isCustomerDropdownOpen)} className="w-full text-right bg-slate-50 border-2 border-slate-300 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand flex justify-between items-center transition-all">
                                <span>{selectedCustomerIds.length > 0 ? `${selectedCustomerIds.length} مشتری انتخاب شده` : 'یک یا چند مشتری را انتخاب کنید'}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isCustomerDropdownOpen ? 'rotate-180' : ''} text-gray-400`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                            {isCustomerDropdownOpen && (
                                <div className="absolute z-10 mt-1 w-full bg-white shadow-xl border rounded-lg max-h-60 overflow-auto">
                                    {customers?.map(customer => (
                                        <div key={customer.id} className="flex items-center p-3 hover:bg-slate-50 cursor-pointer border-b last:border-b-0" onClick={() => handleCustomerSelection(customer.id)}>
                                            <input type="checkbox" id={`customer-${customer.id}`} checked={selectedCustomerIds.includes(customer.id)} onChange={() => {}} className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand" />
                                            <label htmlFor={`customer-${customer.id}`} className="ml-3 flex-1 text-sm text-gray-700 cursor-pointer">{customer.name} ({customer.company})</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">متن پیشنهادی / پیام توقف <span className="text-red-500">*</span></label>
                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="مثال: فروش تا اطلاع ثانوی به علت انبارگردانی بسته است" className="w-full bg-slate-50 border-2 border-slate-300 rounded-lg shadow-sm focus:border-brand focus:ring-4 focus:ring-brand/20 outline-none transition-all py-2.5 px-3 text-gray-700" />
                    </div>

                    <button type="submit" className="bg-brand text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-brand/90 transition-colors shadow-sm">اعمال محدودیت فروش</button>
                    {isSent && <span className="text-sm text-green-600 inline-block mr-4 font-medium">وضعیت جدید با موفقیت اعمال شد.</span>}
                </form>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-4 mb-4">تاریخچه محدودیت‌های فروش</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {processedClosures.length > 0 ? processedClosures.map(closure => (
                        <div key={`${closure.id}-${closure.timestamp}`} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800">{closure.message}</h3>
                                    <p className="mt-2 text-sm font-medium text-brand">اعمال شده برای: {getRecipientText(closure)}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs text-gray-500 font-medium px-2 py-1 bg-white rounded-md border border-slate-200 shadow-sm">{closure.timestamp}</span>
                                    <button onClick={() => onDelete(closure.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors" title="حذف محدودیت و باز کردن فروش"><TrashIcon /></button>
                                </div>
                            </div>
                        </div>
                    )) : <p className="text-center text-gray-500 py-8">هیچ محدودیت فروشی یافت نشد.</p>}
                </div>
            </div>
        </div>
    );
};
export default SalesManagement;
