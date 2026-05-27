
import React, { useState } from 'react';
import { BackIcon, SendIcon } from '../../dashboard/DashboardIcons';

const getStatusClass = (status) => {
    if (status === 'بسته شده') return 'bg-gray-100 text-gray-700';
    if (status === 'پاسخ داده شده') return 'bg-green-100 text-green-700';
    return 'bg-amber-100 text-amber-700';
};

const TicketDetail = ({ ticket, onBack, onReply }) => {
    const [replyText, setReplyText] = useState('');

    const handleReply = (e) => {
        e.preventDefault();
        if (!replyText.trim()) return;
        onReply(ticket.id, replyText);
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
                        <p className="text-sm text-gray-500">
                            تیکت شماره {ticket.id} از طرف <span className="font-semibold">{ticket.customerName}</span> در واحد {ticket.department}
                        </p>
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
                                    <p className="text-xs text-gray-400 mt-1">{ticket.customerName} - {msg.timestamp}</p>
                                </div>
                            </div>
                        ) : (
                            <div key={index} className="flex flex-row-reverse gap-3">
                                <img src="https://i.pravatar.cc/40?u=admin" className="h-10 w-10 rounded-full" alt="Admin"/>
                                <div>
                                    <div className="bg-blue-500 text-white p-3 rounded-lg rounded-tr-none">
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1 text-left">پشتیبانی - {msg.timestamp}</p>
                                </div>
                            </div>
                        )
                    ))}
                </div>
                {ticket.status !== 'بسته شده' && (
                    <form onSubmit={handleReply} className="mt-6 pt-6 border-t">
                        <h3 className="font-semibold text-gray-700 mb-2">ارسال پاسخ</h3>
                        <div className="relative">
                            <textarea
                                rows={4}
                                placeholder="پاسخ خود را اینجا بنویسید..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-4 pl-12"
                            ></textarea>
                            <button
                                type="submit"
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                                title="ارسال"
                            >
                                <SendIcon />
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default TicketDetail;
