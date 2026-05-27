

import React from 'react';
import { DownloadIcon } from '../DashboardIcons';

const invoices = [
    { id: 'F-1403-101', date: '۱۴۰۳/۰۴/۲۵', amount: '۱۲۵,۰۰۰,۰۰۰ ریال', status: 'پرداخت شده', statusColor: 'green' },
    { id: 'F-1403-100', date: '۱۴۰۳/۰۴/۲۲', amount: '۸۲,۰۰۰,۰۰۰ ریال', status: 'پرداخت شده', statusColor: 'green' },
    { id: 'F-1403-099', date: '۱۴۰۳/۰۴/۲۰', amount: '۳۱۰,۰۰۰,۰۰۰ ریال', status: 'در انتظار پرداخت', statusColor: 'amber' },
    { id: 'F-1403-098', date: '۱۴۰۳/۰۴/۱۲', amount: '۱۶۳,۰۰۰,۰۰۰ ریال', status: 'پرداخت شده', statusColor: 'green' },
    { id: 'F-1403-097', date: '۱۴۰۳/۰۳/۲۸', amount: '۲۲۰,۰۰۰,۰۰۰ ریال', status: 'پرداخت شده', statusColor: 'green' },
];

const getStatusClass = (statusColor) => {
    if (statusColor === 'green') return 'bg-green-100 text-green-700';
    if (statusColor === 'amber') return 'bg-amber-100 text-amber-700';
    return 'bg-gray-100 text-gray-700';
};

const Invoices = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">تراکنش‌ها و فاکتورها</h1>
            <p className="mt-1 text-gray-500">تاریخچه مالی و فاکتورهای خود را مشاهده کنید.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-rose-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-rose-800">مجموع بدهی</h3>
                    <p className="text-3xl font-bold text-rose-900 mt-2">۳۱۰,۰۰۰,۰۰۰ ریال</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-green-800">اعتبار حساب</h3>
                    <p className="text-3xl font-bold text-green-900 mt-2">۲۵۰,۰۰۰,۰۰۰ ریال</p>
                </div>
                 <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-gray-800">آخرین پرداخت</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">۸۲,۰۰۰,۰۰۰ ریال</p>
                    <p className="text-sm text-gray-500 mt-1">۱۴۰۳/۰۴/۲۲</p>
                </div>
            </div>
            
            <div className="mt-8 bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 items-center">
                <select className="w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>همه وضعیت‌ها</option>
                    <option>پرداخت شده</option>
                    <option>در انتظار پرداخت</option>
                </select>
                <input dir="ltr" type="month" defaultValue="2024-07" className="w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="mt-4 bg-white rounded-lg shadow-sm overflow-x-auto">
                <table className="w-full text-sm text-right text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">شماره فاکتور</th>
                            <th scope="col" className="px-6 py-3">تاریخ صدور</th>
                            <th scope="col" className="px-6 py-3">مبلغ</th>
                            <th scope="col" className="px-6 py-3">وضعیت</th>
                            <th scope="col" className="px-6 py-3 text-center">عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((invoice) => (
                            <tr key={invoice.id} className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {invoice.id}
                                </th>
                                <td className="px-6 py-4">{invoice.date}</td>
                                <td className="px-6 py-4 font-semibold">{invoice.amount}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusClass(invoice.statusColor)}`}>
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {invoice.statusColor === 'amber' && (
                                        <button className="text-sm font-semibold text-green-600 hover:text-green-800 mr-2">پرداخت آنلاین</button>
                                    )}
                                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full inline-flex" title="دانلود فاکتور">
                                        <DownloadIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Invoices;
