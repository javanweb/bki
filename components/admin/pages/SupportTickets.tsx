
import React from 'react';

const getStatusClass = (status) => {
    if (status === 'بسته شده') return 'bg-gray-100 text-gray-700';
    if (status === 'پاسخ داده شده') return 'bg-green-100 text-green-700';
    return 'bg-amber-100 text-amber-700';
};

const SupportTickets = ({ tickets, onSelectTicket }) => {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">پشتیبانی فنی</h1>
            <p className="mt-1 text-gray-500">تیکت‌های ارسال شده توسط مشتریان را مدیریت کنید.</p>

            <div className="mt-8 bg-white rounded-lg shadow-sm overflow-x-auto">
                <table className="w-full text-sm text-right text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">شماره تیکت</th>
                            <th scope="col" className="px-6 py-3">نام مشتری</th>
                            <th scope="col" className="px-6 py-3">موضوع</th>
                            <th scope="col" className="px-6 py-3">آخرین بروزرسانی</th>
                            <th scope="col" className="px-6 py-3">وضعیت</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => (
                            <tr key={ticket.id} onClick={() => onSelectTicket(ticket)} className="bg-white border-b hover:bg-gray-50 cursor-pointer">
                                <th scope="row" className="px-6 py-4 font-medium text-blue-600 whitespace-nowrap">
                                    {ticket.id}
                                </th>
                                <td className="px-6 py-4">{ticket.customerName}</td>
                                <td className="px-6 py-4 text-gray-800 font-semibold">{ticket.subject}</td>
                                <td className="px-6 py-4">{ticket.date}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusClass(ticket.status)}`}>
                                        {ticket.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SupportTickets;
