


import React from 'react';
import { DownloadIcon } from '../../dashboard/DashboardIcons';

const getStatusClass = (status) => {
    if (status === 'تایید شده') return 'bg-green-100 text-green-700';
    return 'bg-amber-100 text-amber-700';
};

const handlePrintInvoice = (order) => {
    const subtotalValue = order.products.reduce((acc, p) => acc + (p.unitPrice * p.totalUnits), 0);
    const discountAmount = subtotalValue * ((order.discountApplied || 0) / 100);
    const finalAmount = order.totalAmount || (subtotalValue - discountAmount);

    const invoiceHTML = `
      <!DOCTYPE html>
      <html lang="fa" dir="rtl">
        <head>
          <meta charset="UTF-8">
          <title>حواله رسمی فروش - شماره ${order.id}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
          <style>
            body { 
              font-family: 'Vazirmatn', sans-serif; 
              background-color: #f8fafc;
            }
            @media print {
              body { 
                background-color: #ffffff;
                -webkit-print-color-adjust: exact; 
                print-color-adjust: exact; 
              }
              .no-print { display: none !important; }
              .print-border-none { border: none !important; }
              .shadow-print-none { box-shadow: none !important; }
            }
          </style>
        </head>
        <body class="text-slate-800 antialiased p-4 sm:p-8">
          <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 sm:p-12 relative overflow-hidden shadow-print-none">
            
            <!-- Structural Top Background Light Accent -->
            <div class="absolute top-0 right-0 w-full h-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500"></div>

            <!-- Header -->
            <header class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-dashed border-slate-200 pb-8 mt-4">
              <div class="flex items-center gap-4">
                <div class="h-16 w-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center font-black text-white text-3xl shadow-lg shadow-blue-200/50">ک‌ب</div>
                <div>
                  <h1 class="font-black text-2xl text-slate-900 tracking-tight">شرکت تولیدی کویر بسپار</h1>
                  <p class="text-xs text-slate-400 font-medium mt-1">تولیدکننده لوله و اتصالات نوین پلیمری ساختمان</p>
                </div>
              </div>
              <div class="space-y-1.5 text-right sm:text-left">
                <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-black">
                  <span>وضعیت فاکتور:</span>
                  <span>${order.status}</span>
                </div>
                <h2 class="text-lg font-black text-slate-800">حواله فروش شماره: <span class="font-mono text-indigo-600">${order.id}</span></h2>
                <div class="text-xs text-slate-500 space-y-0.5">
                  <p><strong>تاریخ صدور:</strong> ${order.date}</p>
                  ${order.dispatchDate ? `<p><strong>تاریخ ارسال:</strong> ${order.dispatchDate}</p>` : ''}
                </div>
              </div>
            </header>

            <!-- Sender & Receiver details in Grid -->
            <main class="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 pb-4">
              <!-- Recipient Card -->
              <div class="bg-indigo-50/40 p-5 rounded-2xl border border-indigo-100/50">
                <span class="text-[10px] uppercase font-black text-indigo-600 tracking-wider bg-indigo-100/60 px-2 py-0.5 rounded-md">اطلاعات مشتری (تحویل گیرنده)</span>
                <div class="mt-3 space-y-2">
                  <p class="font-black text-slate-900 text-base">${order.customerName}</p>
                  ${order.company ? `<p class="text-sm font-semibold text-slate-600">${order.company}</p>` : ''}
                  <p class="text-xs text-slate-500 leading-relaxed"><strong class="text-slate-600">نشانی تحویل:</strong> ${order.address || 'نشانی ثبت نشده'}</p>
                </div>
              </div>

              <!-- Sender Card -->
              <div class="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/45">
                <span class="text-[10px] uppercase font-black text-slate-500 tracking-wider bg-slate-200/60 px-2 py-0.5 rounded-md font-sans">اطلاعات فرستنده</span>
                <div class="mt-3 space-y-2 text-sm leading-relaxed text-slate-600">
                  <p class="font-black text-slate-900 text-base">دفتر مرکزی کویر بسپار</p>
                  <p class="text-xs">تلفن پشتیبانی: ۰۲۱-۸۸۸۸۸۸۸۸</p>
                  <p class="text-xs">پست الکترونیکی: support@kavirbaspar.com</p>
                  <p class="text-xs">کارخانه: شهرک صنعتی، تلاش ۳، پلاک ۴</p>
                </div>
              </div>
            </main>

            <!-- Dispatch Scheduling Indicator (If specified) -->
            ${order.suggestedDate ? `
              <div class="mb-8 p-4 bg-amber-50/70 border border-amber-100 rounded-2xl">
                <div class="flex flex-col sm:flex-row justify-between text-xs text-amber-900 font-semibold gap-2">
                  <p class="flex items-center gap-1">
                    <svg class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>زمان‌بندی پیشنهادی مشتری برای تخلیه:</span>
                    <strong class="font-bold underline text-amber-950">${order.suggestedDate}</strong>
                  </p>
                  ${order.suggestedTime ? `
                    <p>
                      <span>در بازه زمانی ساعتی:</span>
                      <strong class="font-bold bg-amber-200/55 px-2 py-1 rounded">${order.suggestedTime.from} الی ${order.suggestedTime.to}</strong>
                    </p>
                  ` : ''}
                </div>
              </div>
            ` : ''}

            <!-- Products List Table -->
            <div class="mt-4 overflow-hidden border border-slate-100 rounded-2xl shadow-sm">
              <table class="w-full text-right text-xs">
                <thead class="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th class="px-5 py-4 font-black text-slate-700">شرح کالا و کد فنی</th>
                    <th class="px-4 py-4 font-black text-slate-700 text-center">بسته</th>
                    <th class="px-4 py-4 font-black text-slate-700 text-center">کارتن</th>
                    <th class="px-4 py-4 font-black text-slate-700 text-center">تعداد کل</th>
                    <th class="px-4 py-4 font-black text-slate-700 text-center">قیمت واحد (ریال)</th>
                    <th class="px-5 py-4 font-black text-slate-700 text-left">مبلغ کل (ریال)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  ${order.products.map((p, index) => {
                    const discountText = p.specialOffer ? p.specialOffer : '';
                    return `
                    <tr class="hover:bg-slate-50/50 transition-colors">
                      <td class="px-5 py-4">
                        <p class="font-bold text-slate-900 text-sm">${p.name}</p>
                        <div class="flex items-center gap-2 mt-1">
                          <span class="font-mono text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-black">${p.code}</span>
                          ${discountText ? `<span class="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.5 rounded font-black">طلایی: ${discountText}</span>` : ''}
                        </div>
                      </td>
                      <td class="px-4 py-4 text-center text-slate-600 font-semibold">${(p.packages || 0).toLocaleString('fa-IR')}</td>
                      <td class="px-4 py-4 text-center text-slate-600 font-semibold">${(p.cartons || 0).toLocaleString('fa-IR')}</td>
                      <td class="px-4 py-4 text-center text-slate-950 font-extrabold bg-slate-50/30">${p.totalUnits.toLocaleString('fa-IR')}</td>
                      <td class="px-4 py-4 text-center text-slate-600 font-semibold">${p.unitPrice.toLocaleString('fa-IR')}</td>
                      <td class="px-5 py-4 text-left font-black text-slate-900 text-sm">${p.lineTotal.toLocaleString('fa-IR')}</td>
                    </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>

            <!-- Totals & Summary Breakdown -->
            <div class="mt-8 flex flex-col md:flex-row justify-between items-start gap-8 border-t border-slate-100 pt-8">
              <!-- Remarks -->
              <div class="text-xs text-slate-400 max-w-md space-y-1">
                <p class="font-semibold text-slate-500">شرایط عمومی و تذکرات:</p>
                <p>۱. تحویل بار منوط به تایید نهایی و امضای برگ ترخیص کالا توسط انباردار کارخانه مبدا می‌باشد.</p>
                <p>۲. مسئولیت صدمات یا آسیب خودروی حمل بر عهده مجری بارگیری و آیین نامه‌های حمل و نقل است.</p>
              </div>

              <!-- Amounts and calculations -->
              <div class="w-full md:w-80 bg-slate-50/80 rounded-2xl p-5 border border-slate-200/50 space-y-3 font-medium text-xs text-slate-600">
                <div class="flex justify-between">
                  <span>جمع فرعی اقلام:</span>
                  <span class="font-bold text-slate-800">${Math.round(subtotalValue).toLocaleString('fa-IR')} ریال</span>
                </div>
                ${order.discountApplied > 0 ? `
                  <div class="flex justify-between text-rose-600">
                    <span>کاهش تخفیف مشتری (${order.discountApplied}%):</span>
                    <span class="font-bold">- ${Math.round(discountAmount).toLocaleString('fa-IR')} ریال</span>
                  </div>
                ` : ''}
                <div class="flex justify-between font-black text-sm text-indigo-900 border-t border-dashed border-slate-200 pt-3 mt-1">
                  <span>مبلغ قابل پرداخت نهایی:</span>
                  <span class="text-base font-black">${Math.round(finalAmount).toLocaleString('fa-IR')} ریال</span>
                </div>
              </div>
            </div>

            <!-- Signatures Section -->
            <footer class="mt-16 pt-8 border-t border-dashed border-slate-200 grid grid-cols-2 gap-12 text-center text-xs text-slate-500">
              <div class="space-y-12">
                <p class="font-bold text-slate-700">مهر و امضای شرکت کویر بسپار <br><span class="text-[10px] text-slate-400 font-normal">(صادرکننده / امور مالی)</span></p>
                <div class="w-32 border-b border-slate-200 mx-auto"></div>
              </div>
              <div class="space-y-12">
                <p class="font-bold text-slate-700">مهر و امضای نماینده خریدار <br><span class="text-[10px] text-slate-400 font-normal">(تحویل گیرنده نهایی مرسوله)</span></p>
                <div class="w-32 border-b border-slate-200 mx-auto"></div>
              </div>
            </footer>

            <!-- Print Actions Section (Will be hidden on paper) -->
            <div class="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 no-print bg-slate-50 -mx-8 -mb-8 p-8 max-w-none">
              <span class="text-xs text-slate-400 font-medium">برای خروجی بهتر، پیشنهاد می‌شود در تنظیمات پرینتر حاشیه (Margins) را روی None قرار دهید.</span>
              <div class="flex items-center gap-3">
                <button onclick="window.close()" class="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-white text-slate-600 font-bold text-xs transition-colors">بستن صفحه</button>
                <button onclick="window.print()" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-blue-200 hover:from-blue-700 hover:to-indigo-700 transition-all">چاپ نسخه چاپی (PDF / پرینت)</button>
              </div>
            </div>

          </div>
        </body>
      </html>
    `;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
        printWindow.document.write(invoiceHTML);
        printWindow.document.close();
        setTimeout(() => {
            printWindow.print();
        }, 500);
    }
};

const OrderRequests = ({ requests, setRequests, onApprove, products }) => {

    const handleQuantityChange = (requestId, productCode, field, value) => {
        const numericValue = parseInt(value, 10);
        if (isNaN(numericValue) || numericValue < 0) return;

        setRequests(prevRequests => {
            return prevRequests.map(req => {
                if (req.id === requestId) {
                    const updatedProducts = req.products.map(prod => {
                        if (prod.code === productCode) {
                            const originalProduct = products.find(p => p.code === productCode);
                            if (!originalProduct) return prod; // Should not happen if product exists

                            const updatedProd = { ...prod };
                            if (field === 'packages') {
                                updatedProd.packages = numericValue;
                            } else if (field === 'cartons') {
                                updatedProd.cartons = numericValue;
                            }
                            
                            updatedProd.totalUnits = (updatedProd.packages * originalProduct.packageQuantity) + (updatedProd.cartons * originalProduct.cartonQuantity);
                            updatedProd.lineTotal = updatedProd.totalUnits * updatedProd.unitPrice;
                            return updatedProd;
                        }
                        return prod;
                    });

                    const newSubtotal = updatedProducts.reduce((sum, p) => sum + p.lineTotal, 0);
                    const discountPercentage = req.discountApplied || 0;
                    const newTotalAmount = newSubtotal * (1 - (discountPercentage / 100));


                    const updatedRequest = {
                        ...req,
                        products: updatedProducts,
                        totalAmount: newTotalAmount,
                        total: `${Math.round(newTotalAmount).toLocaleString('fa-IR')} ریال`,
                    };
                    
                    if (req.status === 'تایید شده') {
                        updatedRequest.isModified = true;
                    }
                    
                    return updatedRequest;
                }
                return req;
            });
        });
    };
    
    const handleUpdateRequest = (requestId) => {
        setRequests(prevRequests =>
            prevRequests.map(req =>
                req.id === requestId ? { ...req, isModified: false } : req
            )
        );
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">درخواست‌های سفارش</h1>
            <p className="mt-1 text-gray-500">سفارشات ارسال شده توسط مشتریان را بررسی و تایید کنید.</p>

            {requests.length === 0 ? (
                <div className="mt-8 bg-white p-8 rounded-lg shadow-sm text-center">
                    <h2 className="text-xl font-bold text-gray-800">درخواست سفارش جدیدی وجود ندارد</h2>
                    <p className="mt-2 text-gray-600">در حال حاضر هیچ درخواست سفارشی برای بررسی موجود نیست.</p>
                </div>
            ) : (
                <div className="mt-8 space-y-6">
                    {requests.map((request) => (
                        <div key={request.id} className="bg-white p-6 rounded-lg shadow-sm transition-shadow hover:shadow-md">
                            {/* Card Header */}
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-4 mb-4 gap-3">
                                <div className="flex-1">
                                    <h2 className="font-bold text-lg text-gray-800">درخواست شماره: <span className="font-mono">{request.id}</span></h2>
                                </div>
                                <div className="flex items-center gap-4 self-end sm:self-center">
                                    <button
                                        onClick={() => handlePrintInvoice(request)}
                                        className="bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-200 text-sm flex items-center gap-2"
                                    >
                                        <DownloadIcon />
                                        چاپ/دانلود
                                    </button>
                                    {request.status === 'در انتظار تایید' ? (
                                        <button
                                            onClick={() => onApprove(request.id)}
                                            className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-600 text-sm"
                                        >
                                            تایید درخواست
                                        </button>
                                    ) : request.isModified ? (
                                        <button
                                            onClick={() => handleUpdateRequest(request.id)}
                                            className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 text-sm"
                                        >
                                            بروزرسانی
                                        </button>
                                    ) : (
                                        <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${getStatusClass(request.status)}`}>
                                            {request.status}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Customer and Date Info */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm mb-6">
                                <div className="lg:col-span-1">
                                    <h3 className="font-semibold text-gray-500 uppercase tracking-wider text-xs mb-2">اطلاعات مشتری</h3>
                                    <p className="font-semibold text-gray-800">{request.customerName}</p>
                                    <p className="text-gray-600">{request.company}</p>
                                    <p className="text-gray-600 mt-1">{request.address}</p>
                                </div>
                                <div className="lg:col-span-1">
                                    <h3 className="font-semibold text-gray-500 uppercase tracking-wider text-xs mb-2">تاریخ‌ها و زمان‌بندی</h3>
                                    <p className="text-gray-700"><strong>تاریخ درخواست:</strong> {request.date}</p>
                                    <p className="text-gray-700"><strong>تاریخ ارسال:</strong> {request.dispatchDate || 'هنوز ارسال نشده'}</p>
                                    <div className="mt-2 p-2 bg-blue-50 border-r-4 border-blue-400">
                                        <p className="font-semibold text-blue-800 flex items-center gap-2">
                                            تاریخ پیشنهادی مشتری:
                                            {request.dateModified && <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">ویرایش شده</span>}
                                        </p>
                                        <p className="text-gray-700">{request.suggestedDate || 'ثبت نشده'} | {request.suggestedTime ? `ساعت ${request.suggestedTime.from} الی ${request.suggestedTime.to}` : 'ثبت نشده'}</p>
                                    </div>
                                </div>
                                <div className="lg:col-span-1">
                                    <h3 className="font-semibold text-gray-500 uppercase tracking-wider text-xs mb-2">اطلاعات مالی</h3>
                                    <p className="font-semibold text-gray-700">مبلغ کل: {request.total}</p>
                                    {request.discountApplied > 0 && (
                                        <p className="text-sm text-green-600 mt-1">
                                            تخفیف اعمال شده: {request.discountApplied}%
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Products Table */}
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-3">محصولات سفارش داده شده</h3>
                                <div className="overflow-x-auto border rounded-lg">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50 text-right">
                                            <tr>
                                                <th className="px-4 py-2 font-semibold text-gray-600">محصول</th>
                                                <th className="px-4 py-2 font-semibold text-gray-600 text-center">قیمت واحد</th>
                                                <th className="px-4 py-2 font-semibold text-gray-600 text-center">تعداد بسته</th>
                                                <th className="px-4 py-2 font-semibold text-gray-600 text-center">تعداد کارتن</th>
                                                <th className="px-4 py-2 font-semibold text-gray-600 text-center">جمع واحد</th>
                                                <th className="px-4 py-2 font-semibold text-gray-600 text-left">جمع کل</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {request.products.map((product, index) => {
                                                const isEditable = request.status === 'در انتظار تایید' || request.status === 'تایید شده';
                                                return (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center gap-3">
                                                            <img src={product.imageUrl || undefined} alt={product.name} className="h-10 w-10 object-contain rounded bg-gray-100 p-1" />
                                                            <div>
                                                                <p className="font-medium text-gray-800">{product.name}</p>
                                                                <p className="text-xs text-gray-500">{product.code}</p>
                                                                {product.specialOffer && (
                                                                    <div className="mt-1 bg-amber-50 border border-amber-100 text-amber-800 text-[10px] py-1 px-2 rounded-md flex items-center gap-1 w-max">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                        </svg>
                                                                        <span>پیشنهاد طلایی: {product.specialOffer}</span> 
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-center">{product.unitPrice.toLocaleString('fa-IR')}</td>
                                                    <td className="px-4 py-3 text-center font-medium">
                                                        {isEditable ? (
                                                            <input dir="ltr"
                                                                type="number"
                                                                value={product.packages}
                                                                onChange={(e) => handleQuantityChange(request.id, product.code, 'packages', e.target.value)}
                                                                className="w-16 text-center border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                                min="0"
                                                            />
                                                        ) : (
                                                            product.packages
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-center font-medium">
                                                        {isEditable ? (
                                                            <input dir="ltr"
                                                                type="number"
                                                                value={product.cartons}
                                                                onChange={(e) => handleQuantityChange(request.id, product.code, 'cartons', e.target.value)}
                                                                className="w-16 text-center border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                                                min="0"
                                                            />
                                                        ) : (
                                                            product.cartons
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-center">{product.totalUnits.toLocaleString('fa-IR')}</td>
                                                    <td className="px-4 py-3 text-left font-semibold text-gray-800">{product.lineTotal.toLocaleString('fa-IR')}</td>
                                                </tr>
                                            )})}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderRequests;