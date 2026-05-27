import React, { useState, useEffect } from 'react';

const PartnershipRequestsView = ({ requests }: { requests: any[] }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [printingId, setPrintingId] = useState<number | null>(null);

    useEffect(() => {
        if (printingId !== null) {
            setTimeout(() => {
                window.print();
                setPrintingId(null);
            }, 100);
        }
    }, [printingId]);

    const handleDownload = (imgSrc: string) => {
        const link = document.createElement('a');
        link.href = imgSrc;
        link.download = 'partnership_image';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-6">
            <style>
                {`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #print-section, #print-section * {
                        visibility: visible;
                    }
                    #print-section {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                    .no-print {
                        display: none !important;
                    }
                }
                `}
            </style>

            <h2 className="text-2xl font-bold mb-6 no-print">درخواست‌های نمایندگی</h2>
            
            {requests.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500 no-print">
                    هیچ درخواست نمایندگی تاکنون ثبت نشده است.
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {requests.map((req, idx) => (
                        <div 
                            key={idx} 
                            id={printingId === idx ? 'print-section' : undefined}
                            className={`bg-white rounded-xl shadow p-6 border-r-4 border-blue-500 ${printingId !== null && printingId !== idx ? 'no-print' : ''}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{req.fullName}</h3>
                                    <p className="text-gray-500 text-sm mt-1">{req.storeName}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                                        {req.status}
                                    </span>
                                    <button 
                                        onClick={() => setPrintingId(idx)}
                                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg transition-colors no-print text-sm flex items-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                        </svg>
                                        چاپ فرم
                                    </button>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">تاریخ درخواست</p>
                                    <p className="font-semibold text-gray-800">{req.date}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">تلفن همراه</p>
                                    <p className="font-semibold text-gray-800">{req.mobile}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">استان / شهر</p>
                                    <p className="font-semibold text-gray-800">{req.province} / {req.city}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">نام پدر</p>
                                    <p className="font-semibold text-gray-800">{req.fatherName}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">تاریخ تولد</p>
                                    <p className="font-semibold text-gray-800">{req.birthDate}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">تلفن ثابت</p>
                                    <p className="font-semibold text-gray-800">{req.landline || '-'}</p>
                                </div>
                                
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">شماره حساب</p>
                                    <p className="font-semibold text-gray-800">{req.accountNumber || '-'}</p>
                                </div>
                                <div className="lg:col-span-3">
                                    <p className="text-xs text-gray-500 mb-1">آدرس فروشگاه</p>
                                    <p className="font-semibold text-gray-800">{req.storeAddress}</p>
                                </div>
                                
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">نوع مالکیت</p>
                                    <p className="font-semibold text-gray-800">{req.ownership}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">سابقه فعالیت</p>
                                    <p className="font-semibold text-gray-800">{req.experience ? `${req.experience} سال` : '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">حجم خرید سالانه</p>
                                    <p className="font-semibold text-gray-800">{req.annualPurchase ? `${req.annualPurchase} ریال` : '-'}</p>
                                </div>
                                
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">ساعات کاری</p>
                                    <p className="font-semibold text-gray-800">{req.workingHours || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">آیدی اینستاگرام</p>
                                    <p className="font-semibold text-gray-800">{req.instagram || '-'}</p>
                                </div>

                                <div className="lg:col-span-3">
                                    <p className="text-xs text-gray-500 mb-1">برندهای موجود</p>
                                    <p className="font-semibold text-gray-800">{req.brands || '-'}</p>
                                </div>
                            </div>
                            
                            {(req.storefrontImage || req.interiorImage) && (
                                <div className="mt-8 border-t pt-6 border-gray-100 no-print">
                                    <h4 className="text-md font-bold text-gray-800 mb-4">تصاویر ارسالی</h4>
                                    <div className="flex gap-4 overflow-x-auto pb-4">
                                        {req.storefrontImage && (
                                            <div className="flex-shrink-0">
                                                <p className="text-xs text-gray-500 mb-2">عکس سردر فروشگاه</p>
                                                <img 
                                                    src={req.storefrontImage} 
                                                    alt="Storefront" 
                                                    className="h-48 w-48 object-cover rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity" 
                                                    onClick={() => setSelectedImage(req.storefrontImage)} 
                                                />
                                            </div>
                                        )}
                                        {req.interiorImage && (
                                            <div className="flex-shrink-0">
                                                <p className="text-xs text-gray-500 mb-2">عکس داخل فروشگاه</p>
                                                <img 
                                                    src={req.interiorImage} 
                                                    alt="Interior" 
                                                    className="h-48 w-48 object-cover rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity" 
                                                    onClick={() => setSelectedImage(req.interiorImage)} 
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 no-print" onClick={() => setSelectedImage(null)}>
                    <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="absolute -top-12 right-0 text-white hover:text-gray-300"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img 
                            src={selectedImage} 
                            alt="Preview" 
                            className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl" 
                        />
                        <div className="mt-4 text-center">
                            <button 
                                onClick={() => handleDownload(selectedImage)}
                                className="bg-brand text-white px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-brand-dark transition-colors inline-flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                دانلود تصویر
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PartnershipRequestsView;
