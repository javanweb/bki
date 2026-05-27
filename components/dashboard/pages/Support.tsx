
import React, { useState } from 'react';
import { PlusIcon, BackIcon, SendIcon } from '../DashboardIcons';

const getStatusClass = (status) => {
    if (status === 'بسته شده') return 'bg-gray-100 text-gray-700';
    if (status === 'پاسخ داده شده') return 'bg-green-100 text-green-700';
    return 'bg-amber-100 text-amber-700';
};

const NewTicketView = ({ onBack, setTickets, customer }) => {
    const [subject, setSubject] = useState('');
    const [department, setDepartment] = useState('فروش');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTicket = {
            id: `T-${Math.floor(Math.random() * 90000) + 10000}`,
            customerId: customer.id,
            customerName: customer.name,
            subject,
            department,
            date: new Date().toLocaleDateString('fa-IR'),
            status: 'در انتظار پاسخ',
            messages: [
                { sender: 'customer', text: message, timestamp: new Date().toLocaleString('fa-IR') }
            ]
        };
        setTickets(prev => [...prev, newTicket]);
        onBack();
    };

    return (
        <div>
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black mb-6">
                <BackIcon />
                بازگشت به لیست تیکت‌ها
            </button>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold text-gray-800">ایجاد تیکت جدید</h2>
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">موضوع</label>
                        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required className="mt-1 block w-full rounded-md border-2 border-slate-300 shadow-sm focus:border-brand focus:ring-brand px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">واحد مربوطه</label>
                        <select value={department} onChange={(e) => setDepartment(e.target.value)} className="mt-1 block w-full rounded-md border-2 border-slate-300 shadow-sm focus:border-brand focus:ring-brand px-3 py-2">
                            <option>فروش</option>
                            <option>فنی</option>
                            <option>مالی</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">پیام شما</label>
                        <textarea rows={5} value={message} onChange={(e) => setMessage(e.target.value)} required className="mt-1 block w-full rounded-md border-2 border-slate-300 shadow-sm focus:border-brand focus:ring-brand px-3 py-2"></textarea>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600">ارسال تیکت</button>
                </form>
            </div>
        </div>
    );
};

const TicketDetailView = ({ ticket, onBack, setTickets }) => {
    const [replyText, setReplyText] = useState('');

    const handleReply = (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;

        setTickets(prevTickets =>
            prevTickets.map(t =>
                t.id === ticket.id ? {
                    ...t,
                    status: 'در انتظار پاسخ',
                    date: new Date().toLocaleDateString('fa-IR'),
                    messages: [...t.messages, { sender: 'customer', text: replyText, timestamp: new Date().toLocaleString('fa-IR') }]
                } : t
            )
        );
        setReplyText('');
    };

    return (
        <div>
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black mb-6">
                <BackIcon />
                بازگشت به لیست تیکت‌ها
            </button>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-start border-b pb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">{ticket.subject}</h2>
                        <p className="text-sm text-gray-500">تیکت شماره {ticket.id} در واحد {ticket.department}</p>
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusClass(ticket.status)}`}>{ticket.status}</span>
                </div>
                <div className="mt-6 space-y-6 max-h-96 overflow-y-auto pr-2">
                    {ticket.messages.map((msg, index) => (
                        msg.sender === 'customer' ? (
                            <div key={index} className="flex gap-3">
                                <img src="https://i.pravatar.cc/40?u=customer" className="h-10 w-10 rounded-full" alt="Customer" />
                                <div>
                                    <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none">
                                        <p className="text-sm text-gray-700">{msg.text}</p>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1">شما - {msg.timestamp}</p>
                                </div>
                            </div>
                        ) : (
                            <div key={index} className="flex flex-row-reverse gap-3">
                                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">پ</div>
                                <div>
                                    <div className="bg-blue-50 p-3 rounded-lg rounded-tr-none">
                                        <p className="text-sm text-gray-700">{msg.text}</p>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1 text-left">پشتیبانی - {msg.timestamp}</p>
                                </div>
                            </div>
                        )
                    ))}
                </div>
                {ticket.status !== 'بسته شده' && (
                    <form onSubmit={handleReply} className="mt-6 pt-6 border-t">
                        <h3 className="font-semibold text-gray-700 mb-2">پاسخ جدید</h3>
                        <div className="relative">
                            <textarea rows={3} placeholder="پیام خود را بنویسید..." value={replyText} onChange={(e) => setReplyText(e.target.value)} className="w-full rounded-md border-2 border-slate-300 shadow-sm focus:border-brand focus:ring-brand pr-4 pl-12 py-2"></textarea>
                            <button type="submit" className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600">
                                <SendIcon />
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};


const Support = ({ tickets, setTickets, customer }) => {
    const [view, setView] = useState('list'); // 'list', 'new', 'detail'
    const [selectedTicketId, setSelectedTicketId] = useState(null);

    const selectedTicket = tickets.find(t => t.id === selectedTicketId);

    const handleSelectTicket = (ticket) => {
        setSelectedTicketId(ticket.id);
        setView('detail');
    };

    if (view === 'new') {
        return <NewTicketView onBack={() => setView('list')} setTickets={setTickets} customer={customer} />;
    }
    
    if (view === 'detail' && selectedTicket) {
        return <TicketDetailView ticket={selectedTicket} onBack={() => setView('list')} setTickets={setTickets} />;
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">پشتیبانی فنی</h1>
                    <p className="mt-1 text-gray-500">سوالات و مشکلات خود را با ما در میان بگذارید.</p>
                </div>
                <button onClick={() => setView('new')} className="bg-[#5d87ff] text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                    <PlusIcon />
                    <span>تیکت جدید</span>
                </button>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-sm overflow-x-auto">
                <table className="w-full text-sm text-right text-gray-600">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">شماره تیکت</th>
                            <th scope="col" className="px-6 py-3">موضوع</th>
                            <th scope="col" className="px-6 py-3">واحد مربوطه</th>
                            <th scope="col" className="px-6 py-3">آخرین بروزرسانی</th>
                            <th scope="col" className="px-6 py-3">وضعیت</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => (
                            <tr key={ticket.id} onClick={() => handleSelectTicket(ticket)} className="bg-white border-b hover:bg-gray-50 cursor-pointer">
                                <th scope="row" className="px-6 py-4 font-medium text-blue-600 whitespace-nowrap">
                                    {ticket.id}
                                </th>
                                <td className="px-6 py-4 text-gray-800 font-semibold">{ticket.subject}</td>
                                <td className="px-6 py-4">{ticket.department}</td>
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

export default Support;
