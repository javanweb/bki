

import React from 'react';
import { PlusIcon } from '../../dashboard/DashboardIcons';
import SearchIcon from '../../icons/SearchIcon';

const getStatusClass = (statusColor) => {
    switch (statusColor) {
        case 'green': return 'bg-green-100 text-green-700';
        case 'red': return 'bg-red-100 text-red-700';
        case 'amber': return 'bg-amber-100 text-amber-700';
        default: return 'bg-gray-100 text-gray-700';
    }
};

const CustomerManagement = ({ customers, onManageCustomer, onAddCustomerClick }) => {
    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">مدیریت مشتریان</h1>
                    <p className="mt-1 text-gray-500">لیست مشتریان را مشاهده، ویرایش و مدیریت کنید.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <button onClick={onAddCustomerClick} className="bg-[#5d87ff] text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                        <PlusIcon />
                        <span>افزودن مشتری جدید</span>
                    </button>
                </div>
            </div>

            <div className="mt-6 bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 items-center">
                 <div className="relative w-full sm:flex-grow">
                    <input 
                        type="text" 
                        placeholder="جستجو بر اساس نام، شرکت یا ایمیل..." 
                        className="w-full bg-slate-50 border-2 border-slate-300 rounded-lg py-2.5 pr-10 pl-4 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all text-gray-700"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                        <SearchIcon />
                    </div>
                </div>
                <select className="w-full sm:w-auto bg-slate-50 border-2 border-slate-300 rounded-lg py-2.5 px-3 focus:outline-none focus:ring-4 focus:ring-brand/20 focus:border-brand transition-all text-gray-700">
                    <option>همه وضعیت‌ها</option>
                    <option>فعال</option>
                    <option>غیرفعال</option>
                    <option>در انتظار تایید</option>
                </select>
            </div>

            <div className="mt-4 bg-white rounded-lg shadow-sm overflow-x-auto">
                <table className="w-full text-sm text-right text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">نام مشتری</th>
                            <th scope="col" className="px-6 py-3">شرکت</th>
                            <th scope="col" className="px-6 py-3">شماره موبایل</th>
                            <th scope="col" className="px-6 py-3">درصد تخفیف</th>
                            <th scope="col" className="px-6 py-3">وضعیت</th>
                            <th scope="col" className="px-6 py-3 text-center">عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id} className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {customer.name}
                                </th>
                                <td className="px-6 py-4">{customer.company}</td>
                                <td className="px-6 py-4">{customer.phone}</td>
                                <td className="px-6 py-4 font-semibold">{customer.discount || 0}%</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusClass(customer.statusColor)}`}>
                                        {customer.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center">
                                        <button
                                            onClick={() => onManageCustomer(customer)}
                                            className="bg-blue-100 text-blue-700 font-semibold px-4 py-1.5 rounded-md hover:bg-blue-200 text-xs"
                                        >
                                            مدیریت
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
                <span>نمایش ۱ تا {customers.length} از {customers.length} نتیجه</span>
                <div className="flex gap-1">
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-100">قبلی</button>
                    <button className="px-3 py-1 border rounded-md bg-[#5d87ff] text-white">۱</button>
                    <button className="px-3 py-1 border rounded-md hover:bg-gray-100">بعدی</button>
                </div>
            </div>
        </div>
    );
};

export default CustomerManagement;