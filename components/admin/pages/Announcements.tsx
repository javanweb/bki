
import React, { useState, useMemo } from 'react';
import { TrashIcon } from '../../dashboard/DashboardIcons';

const Announcements = ({ announcements, onSend, onDelete, onArchive, customers }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('public'); // 'public' or 'specific'
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
        if (!title.trim() || !content.trim()) return;
        if (type === 'specific' && selectedCustomerIds.length === 0) {
            alert('لطفاً حداقل یک مشتری را انتخاب کنید.');
            return;
        }

        onSend({
            title,
            content,
            type,
            customerIds: type === 'specific' ? selectedCustomerIds : null
        });

        setTitle('');
        setContent('');
        setSelectedCustomerIds([]);
        setIsCustomerDropdownOpen(false);
        setType('public');
        setIsSent(true);
        setTimeout(() => setIsSent(false), 3000);
    };

    const getRecipientText = (ann) => {
        if (ann.type === 'public') {
            return 'همه مشتریان';
        }

        // Find all announcements sent in the same batch
        const batch = announcements.filter(
            a => a.type === 'specific' &&
                 a.title === ann.title &&
                 a.content === ann.content &&
                 a.timestamp === ann.timestamp
        );

        const customerNames = batch.map(a => {
            const customer = customers.find(c => c.id === a.customerId);
            return customer ? customer.name : null;
        }).filter(Boolean);

        if (customerNames.length === 0) return 'مشتری حذف شده';
        if (customerNames.length > 2) {
            return `${customerNames.slice(0, 2).join('، ')} و ${customerNames.length - 2} نفر دیگر`;
        }
        return customerNames.join('، ');
    };
    
    // Group specific announcements so they only appear once in the history list
    const processedAnnouncements = useMemo(() => {
        const processed = [];
        const seen = new Set();
        
        announcements.sort((a, b) => b.id - a.id).forEach(ann => {
            const key = ann.type === 'public'
                ? ann.id // Public announcements are unique by ID
                : `${ann.title}-${ann.content}-${ann.timestamp}`; // Group specific ones by content and time
            
            if (!seen.has(key)) {
                processed.push(ann);
                seen.add(key);
            }
        });
        return processed;
    }, [announcements]);


    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">ارسال اطلاعیه</h1>
            <p className="mt-1 text-gray-500">پیام خود را برای تمام مشتریان یا گروهی خاص ارسال کنید.</p>

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
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">عنوان اطلاعیه</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">متن اطلاعیه</label>
                        <textarea rows={5} value={content} onChange={(e) => setContent(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600">ارسال پیام</button>
                    {isSent && <p className="text-sm text-green-600 inline-block mr-4">اطلاعیه با موفقیت ارسال شد!</p>}
                </form>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-4 mb-4">تاریخچه اطلاعیه‌ها</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {processedAnnouncements.length > 0 ? processedAnnouncements.map(ann => (
                        <div key={`${ann.id}-${ann.timestamp}`} className="p-4 border rounded-md">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-800">{ann.title}</h3>
                                    <p className="mt-1 text-sm font-medium text-blue-600">ارسال شده به: {getRecipientText(ann)}</p>
                                    <p className="mt-2 text-sm text-gray-600">{ann.content}</p>
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    <span className="text-xs text-gray-500 whitespace-nowrap">{ann.timestamp}</span>
                                    <button
                                        onClick={() => onArchive(ann.id)}
                                        className={`p-1 rounded transition-colors ${ann.isArchived ? 'text-amber-600 bg-amber-50 hover:bg-amber-100' : 'text-gray-500 bg-gray-50 hover:bg-gray-100'}`}
                                        title={ann.isArchived ? "بایگانی شده (خارج کردن)" : "بایگانی کردن"}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => onDelete(ann.id)}
                                        className="text-red-500 hover:text-red-700 p-1"
                                        title="حذف"
                                    >
                                        <TrashIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : <p className="text-center text-gray-500 py-4">هیچ اطلاعیه‌ای یافت نشد.</p>}
                </div>
            </div>
        </div>
    );
};

export default Announcements;
