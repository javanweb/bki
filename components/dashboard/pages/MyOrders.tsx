import React, { useState } from 'react';
import { 
    Eye, 
    Truck, 
    Download, 
    ChevronRight, 
    Edit, 
    Search,
    Filter,
    Calendar,
    Printer,
    ArrowRight,
    Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PersianDatePicker from '../PersianDatePicker';

const getStatusStyles = (statusColor) => {
    switch (statusColor) {
        case 'green':
        case 'emerald': 
            return 'text-emerald-700 bg-emerald-50 border-emerald-100';
        case 'blue': 
            return 'text-blue-700 bg-blue-50 border-blue-100';
        case 'amber': 
            return 'text-amber-700 bg-amber-50 border-amber-100';
        case 'red': 
            return 'text-red-700 bg-red-50 border-red-100';
        default: 
            return 'text-slate-700 bg-slate-50 border-slate-100';
    }
};

const getStatusProps = (status) => {
    switch (status) {
        case 'در انتظار تایید': return { text: 'در انتظار تایید', color: 'amber' };
        case 'تایید شده': return { text: 'در حال پردازش', color: 'blue' };
        case 'ارسال شده': return { text: 'در حال ارسال', color: 'blue' };
        case 'تحویل شده': return { text: 'تحویل شده', color: 'emerald' };
        case 'لغو شده': return { text: 'لغو شده', color: 'red' };
        default: return { text: status, color: 'slate' };
    }
};

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

const handlePrintInvoice = (order) => {
    const discountPercentage = order.discountApplied || 0;
    const subtotal = discountPercentage > 0 ? (order.totalAmount / (1 - (discountPercentage / 100))) : order.totalAmount;
    const discountAmount = subtotal - order.totalAmount;

    const invoiceHTML = `
      <!DOCTYPE html>
      <html lang="fa" dir="rtl">
        <head>
          <meta charset="UTF-8">
          <title>فاکتور شماره ${order.id}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600;700&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Vazirmatn', sans-serif; }
            @media print {
              body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body class="bg-gray-100">
          <div class="max-w-4xl mx-auto my-8 p-12 bg-white rounded-lg shadow-lg">
            <header class="flex justify-between items-center border-b pb-6">
              <div>
                <div class="flex items-center gap-3">
                    <div class="h-12 w-12 bg-[#5D87FF] rounded-md flex items-center justify-center font-bold text-white text-2xl">ک‌ب</div>
                    <span class="font-bold text-2xl text-gray-800">فاکتور فروش کویر بسپار</span>
                </div>
              </div>
              <div class="text-left">
                <h2 class="text-xl font-bold text-gray-700">فاکتور شماره: ${order.id}</h2>
                <p class="text-sm text-gray-500">تاریخ صدور: ${order.date}</p>
              </div>
            </header>
            <main class="grid grid-cols-2 gap-12 mt-8">
              <div>
                <h3 class="font-semibold text-gray-500 text-sm uppercase tracking-wider">فاکتور برای:</h3>
                <p class="font-bold text-gray-800 mt-2">${order.customerName}</p>
                <p class="text-sm text-gray-600">${order.company}</p>
                <p class="text-sm text-gray-600">${order.address}</p>
              </div>
              <div class="text-left">
                <h3 class="font-semibold text-gray-500 text-sm uppercase tracking-wider">پرداخت به:</h3>
                <p class="font-bold text-gray-800 mt-2">شرکت کویر بسپار</p>
                <p class="text-sm text-gray-600">تهران، ایران</p>
                <p class="text-sm text-gray-600">info@kavirbaspar.com</p>
              </div>
            </main>
            <div class="mt-10">
              <table class="w-full text-right">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="px-6 py-3 text-sm font-semibold text-gray-600 uppercase">محصول</th>
                    <th class="px-6 py-3 text-sm font-semibold text-gray-600 uppercase text-center">بسته</th>
                    <th class="px-6 py-3 text-sm font-semibold text-gray-600 uppercase text-center">کارتن</th>
                    <th class="px-6 py-3 text-sm font-semibold text-gray-600 uppercase text-center">قیمت واحد</th>
                    <th class="px-6 py-3 text-sm font-semibold text-gray-600 uppercase text-left">مبلغ کل</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  ${order.products.map(p => `
                    <tr>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <p class="font-medium text-gray-800">${p.name}</p>
                        <p class="text-xs text-gray-500">${p.code}</p>
                      </td>
                      <td class="px-6 py-4 text-center">${(p.packages || 0).toLocaleString('fa-IR')}</td>
                      <td class="px-6 py-4 text-center">${(p.cartons || 0).toLocaleString('fa-IR')}</td>
                      <td class="px-6 py-4 text-center">${p.unitPrice.toLocaleString('fa-IR')}</td>
                      <td class="px-6 py-4 text-left font-semibold text-gray-700">${p.lineTotal.toLocaleString('fa-IR')} ریال</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <footer class="mt-10 pt-6 border-t flex justify-end">
                <div class="w-full max-w-sm space-y-3">
                    <div class="flex justify-between items-center text-md text-gray-700">
                        <span>جمع کل:</span>
                        <span>${Math.round(subtotal).toLocaleString('fa-IR')} ریال</span>
                    </div>
                    ${discountPercentage > 0 ? `
                    <div class="flex justify-between items-center text-md text-green-600">
                        <span>تخفیف (${discountPercentage}%):</span>
                        <span>- ${Math.round(discountAmount).toLocaleString('fa-IR')} ریال</span>
                    </div>
                    ` : ''}
                    <div class="flex justify-between items-center text-lg font-bold text-gray-800 bg-gray-100 p-4 rounded-lg mt-2">
                        <span>مبلغ نهایی:</span>
                        <span>${order.total}</span>
                    </div>
                </div>
            </footer>
            <div class="mt-12 text-center text-xs text-gray-500 no-print">
              <p>از خرید شما سپاسگزاریم!</p>
              <button onclick="window.print()" class="mt-4 bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600">چاپ فاکتور</button>
            </div>
          </div>
        </body>
      </html>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();
    setTimeout(() => {
        printWindow.print();
    }, 500);
};

const OrderDetailView = ({ order, onBack, onOrderUpdate }) => {
    const discountPercentage = order.discountApplied || 0;
    const subtotal = discountPercentage > 0 ? (order.totalAmount / (1 - (discountPercentage / 100))) : order.totalAmount;
    const discountAmount = subtotal - order.totalAmount;
    
    const [isEditing, setIsEditing] = useState(false);
    const [suggestedDate, setSuggestedDate] = useState(order.suggestedDate || '');
    
    const parseTime = (timeStr: string | undefined) => {
        if (!timeStr || typeof timeStr !== 'string') return { hour: '', period: 'ق.ظ' };
        
        const parts = timeStr.trim().split(' ');
        if (parts.length === 2 && (parts[1] === 'ق.ظ' || parts[1] === 'ب.ظ')) {
            return { hour: parts[0], period: parts[1] };
        }
        
        const timeParts = timeStr.split(':');
        if (timeParts.length > 0 && timeParts[0]) {
            let hour = parseInt(timeParts[0], 10);
            if (!isNaN(hour)) {
                if (hour >= 12) {
                    if (hour > 12) hour -= 12;
                    return { hour: String(hour), period: 'ب.ظ' };
                } else {
                    if (hour === 0) hour = 12;
                    return { hour: String(hour), period: 'ق.ظ' };
                }
            }
        }
        
        return { hour: '', period: 'ق.ظ' };
    };

    const [fromTime, setFromTime] = useState(() => parseTime(order.suggestedTime?.from));
    const [toTime, setToTime] = useState(() => parseTime(order.suggestedTime?.to));

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

    const handleSave = () => {
        const formatTimeForSave = (time: {hour: string, period: string}) => {
            const numericHour = parsePersianNumber(time.hour);
            if (isNaN(numericHour)) return ` ${time.period}`;
            
            if (numericHour === 0 || numericHour === 24) return `12 ${time.period}`;
            if (numericHour > 12) return `${numericHour - 12} ${time.period}`;
            return `${numericHour} ${time.period}`;
        };

        onOrderUpdate(order.id, {
            suggestedDate,
            suggestedTime: { 
                from: formatTimeForSave(fromTime), 
                to: formatTimeForSave(toTime) 
            }
        });
        setIsEditing(false);
    };

    return (
        <div>
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black mb-6">
                <ArrowRight size={20} />
                بازگشت به لیست سفارشات
            </button>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start border-b pb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">جزئیات سفارش {order.id}</h2>
                        <p className="text-sm text-gray-500">ثبت شده در {order.date}</p>
                    </div>
                    <span className={`px-3 py-1.5 text-sm font-semibold rounded-full border ${getStatusStyles(getStatusProps(order.status).color)}`}>{getStatusProps(order.status).text}</span>
                </div>
                <div className="grid md:grid-cols-3 gap-8 mt-6">
                    <div>
                        <h3 className="font-semibold text-gray-700">آدرس تحویل</h3>
                        <p className="text-sm text-gray-600 mt-2">{order.address}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-700">اطلاعات پرداخت</h3>
                        <p className="text-sm text-gray-600 mt-2">پرداخت از طریق اعتبار حساب</p>
                    </div>
                     <div>
                        <h3 className="font-semibold text-gray-700">تاریخ و ساعت پیشنهادی ارسال</h3>
                        {!isEditing ? (
                            <div className="flex items-center gap-4 mt-2">
                                <p className="text-sm text-gray-600">
                                    {order.suggestedDate || 'ثبت نشده'} | {order.suggestedTime?.from ? `${order.suggestedTime.from} الی ${order.suggestedTime.to}` : 'ثبت نشده'}
                                </p>
                                {order.status === 'در انتظار تایید' && (
                                    <button onClick={() => setIsEditing(true)} className="p-1 text-blue-600 hover:bg-blue-100 rounded-full" title="ویرایش">
                                        <Edit size={16} />
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-2 mt-2">
                                <div>
                                    <label className="text-xs">تاریخ</label>
                                    <PersianDatePicker value={suggestedDate} onChange={setSuggestedDate} inputClassName="text-sm" />
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                      <label className="text-xs">از ساعت</label>
                                      <div className="flex items-center gap-1 mt-1">
                                          <input 
                                              type="text" 
                                              placeholder="ساعت" 
                                              maxLength={2} 
                                              value={fromTime.hour} 
                                              onChange={e => handleTimeChange(e, setFromTime)} 
                                              className="w-full text-sm border-gray-300 rounded-md shadow-sm" 
                                          />
                                          <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-xs w-14 text-center">
                                              {fromTime.period}
                                          </div>
                                      </div>
                                    </div>
                                    <div className="flex-1">
                                       <label className="text-xs">تا ساعت</label>
                                       <div className="flex items-center gap-1 mt-1">
                                          <input 
                                              type="text" 
                                              placeholder="ساعت" 
                                              maxLength={2} 
                                              value={toTime.hour} 
                                              onChange={e => handleTimeChange(e, setToTime)} 
                                              className="w-full text-sm border-gray-300 rounded-md shadow-sm" 
                                          />
                                          <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 text-xs w-14 text-center">
                                              {toTime.period}
                                          </div>
                                      </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-1">
                                    <button onClick={handleSave} className="bg-green-500 text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-green-600">ذخیره</button>
                                    <button onClick={() => setIsEditing(false)} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-xs hover:bg-gray-300">لغو</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="font-semibold text-gray-700 mb-4">محصولات سفارش</h3>
                    <div className="space-y-4">
                        {order.products.map(p => (
                            <div key={p.code} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                                <div>
                                    <p className="font-medium text-gray-800">{p.name}</p>
                                    <p className="text-sm text-gray-500">
                                        بسته: {(p.packages || 0).toLocaleString('fa-IR')} | کارتن: {(p.cartons || 0).toLocaleString('fa-IR')}
                                    </p>
                                    {p.specialOffer && (
                                        <div className="mt-1 bg-amber-50 border border-amber-100 text-amber-800 text-[10px] py-1 px-2 rounded-md flex items-center gap-1 w-max">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>پیشنهاد: {p.specialOffer}</span> 
                                        </div>
                                    )}
                                </div>
                                <p className="font-semibold text-gray-700">{p.lineTotal.toLocaleString('fa-IR')} ریال</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-6 pt-6 border-t flex justify-end">
                    <div className="w-full max-w-sm space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>جمع کل</span>
                            <span>{Math.round(subtotal).toLocaleString('fa-IR')} ریال</span>
                        </div>
                        {discountPercentage > 0 && (
                            <div className="flex justify-between text-green-600">
                                <span>تخفیف ({discountPercentage}%)</span>
                                <span>- {Math.round(discountAmount).toLocaleString('fa-IR')} ریال</span>
                            </div>
                        )}
                        <div className="flex justify-between font-bold text-lg text-gray-800 pt-2 border-t mt-2">
                            <span>مبلغ نهایی:</span><span>{order.total}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrderTable = ({ orders, onSelectOrder, isPendingTable }) => (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-right">
            <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th scope="col" className="px-6 py-4 font-bold text-slate-500 text-[11px] uppercase tracking-widest">شماره سفارش</th>
                    <th scope="col" className="px-6 py-4 font-bold text-slate-500 text-[11px] uppercase tracking-widest">تاریخ</th>
                    <th scope="col" className="px-6 py-4 font-bold text-slate-500 text-[11px] uppercase tracking-widest">مبلغ کل</th>
                    <th scope="col" className="px-6 py-4 font-bold text-slate-500 text-[11px] uppercase tracking-widest">وضعیت</th>
                    <th scope="col" className="px-6 py-4 font-bold text-slate-500 text-[11px] uppercase tracking-widest text-center">عملیات</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {orders.map((order, i) => {
                    const statusProps = getStatusProps(order.status);
                    return (
                    <motion.tr 
                        key={order.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group hover:bg-slate-50/30 transition-colors"
                    >
                        <th scope="row" className="px-6 py-5 font-bold text-slate-900 whitespace-nowrap">
                            {order.id}
                        </th>
                        <td className="px-6 py-5 text-slate-500 font-medium">{order.date}</td>
                        <td className="px-6 py-5">
                            <span className="font-black text-slate-900 tracking-tight">{order.total}</span>
                            {order.discountApplied > 0 && (
                                <span className="block text-[10px] text-emerald-600 font-bold mt-0.5">
                                    {order.discountApplied}٪ تخفیف اختصاصی
                                </span>
                            )}
                        </td>
                        <td className="px-6 py-5">
                            <span className={`px-3 py-1 text-[10px] font-bold rounded-full border ${getStatusStyles(statusProps.color)}`}>
                                {statusProps.text}
                            </span>
                        </td>
                        <td className="px-6 py-5">
                            <div className="flex items-center justify-center gap-2">
                                <button onClick={() => onSelectOrder(order)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="مشاهده جزئیات">
                                    <Eye size={18} />
                                </button>
                                {!isPendingTable && (
                                    <>
                                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="پیگیری ارسال">
                                            <Truck size={18} />
                                        </button>
                                        <button onClick={() => handlePrintInvoice(order)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="دانلود فاکتور">
                                            <Download size={18} />
                                        </button>
                                    </>
                                )}
                            </div>
                        </td>
                    </motion.tr>
                )})}
            </tbody>
        </table>
    </div>
);

const MyOrders = ({ orders, onOrderUpdate }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    
    const filteredOrders = orders.filter(order => 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.date.includes(searchQuery)
    );

    const pendingOrders = filteredOrders.filter(order => order.status === 'در انتظار تایید');
    const approvedOrders = filteredOrders.filter(order => order.status !== 'در انتظار تایید');

    if (selectedOrder) {
        return <OrderDetailView order={selectedOrder} onBack={() => setSelectedOrder(null)} onOrderUpdate={onOrderUpdate} />;
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500" dir="rtl">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">سفارشات من</h1>
                    <p className="text-slate-500 font-medium mt-1">تاریخچه و وضعیت سفارشات خود را بصورت لحظه‌ای دنبال کنید.</p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64 group">
                        <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input 
                            type="text" 
                            placeholder="شماره سفارش یا تاریخ..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pr-11 pl-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all font-medium"
                        />
                    </div>
                    <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm">
                        <Filter size={20} />
                    </button>
                </div>
            </header>

            {/* Unapproved Orders Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    <h2 className="text-lg font-bold text-slate-800 tracking-tight">سفارشات تایید نشده</h2>
                    <span className="bg-amber-50 text-amber-600 text-[10px] font-black px-2 py-0.5 rounded-full">{pendingOrders.length} مورد</span>
                </div>
                {pendingOrders.length > 0 ? (
                    <OrderTable orders={pendingOrders} onSelectOrder={setSelectedOrder} isPendingTable={true} />
                ) : (
                    <div className="bg-white rounded-[32px] border border-dashed border-slate-200 p-12 text-center">
                        <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                            <Clock size={32} />
                        </div>
                        <p className="text-slate-400 font-bold">هیچ سفارش در انتظار تاییدی وجود ندارد.</p>
                    </div>
                )}
            </div>

            {/* Approved Orders Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <h2 className="text-lg font-bold text-slate-800 tracking-tight">تاریخچه سفارشات</h2>
                </div>
                {approvedOrders.length > 0 ? (
                    <div className="space-y-6">
                        <OrderTable orders={approvedOrders} onSelectOrder={setSelectedOrder} isPendingTable={false} />
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                            <span className="text-xs font-bold text-slate-400">نمایش {approvedOrders.length} نتیجه</span>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 border border-slate-100 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-50 transition-colors">قبلی</button>
                                <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg shadow-slate-200">۱</button>
                                <button className="px-4 py-2 border border-slate-100 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-50 transition-colors">بعدی</button>
                            </div>
                        </div>
                    </div>
                ) : (
                     <div className="bg-white rounded-[32px] border border-dashed border-slate-200 p-12 text-center">
                        <div className="h-16 w-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                            <Calendar size={32} />
                        </div>
                        <p className="text-slate-400 font-bold">هنوز هیچ سفارش تایید شده‌ای ندارید.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;