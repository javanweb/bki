


import React, { useState, useMemo } from 'react';
import { 
    MyOrdersIcon, WalletIcon, ChartBarIcon, CatalogIcon, EyeIcon, BackIcon 
} from '../DashboardIcons';

// FIX: Define types for orders to ensure type safety.
interface OrderProduct {
    code: string;
    name: string;
    imageUrl: string;
    packages: number;
    cartons: number;
    totalUnits: number;
    unitPrice: number;
    lineTotal: number;
}
interface Order {
    id: string;
    customerName: string;
    company: string;
    address: string;
    date: string;
    dispatchDate: string | null;
    total: string;
    totalAmount: number;
    status: string;
    isModified?: boolean;
    products: OrderProduct[];
}

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; }> = ({ icon, title, value }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm flex items-center gap-5">
        <div className="p-4 bg-gray-100 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 font-medium">{title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
    </div>
);

const TimeStatRow: React.FC<{ label: string; amount: number; count: number }> = ({ label, amount, count }) => (
    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
        <div>
            <p className="font-medium text-gray-700">{label}</p>
            <p className="text-xs text-gray-500">{count.toLocaleString('fa-IR')} سفارش</p>
        </div>
        <p className="font-semibold text-lg text-gray-800">{amount.toLocaleString('fa-IR')} <span className="text-sm font-normal">ریال</span></p>
    </div>
);

const ProductStatRow: React.FC<{ label: string; product: { name: string; count: number } }> = ({ label, product }) => (
     <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
        <div>
            <p className="font-medium text-gray-700">{label}</p>
            <p className="text-sm text-gray-500 truncate max-w-xs">{product.name}</p>
        </div>
        <p className="font-semibold text-lg text-gray-800">{product.count.toLocaleString('fa-IR')} <span className="text-sm font-normal">عدد</span></p>
    </div>
);


const OrderDetailView = ({ order, onBack }: { order: Order; onBack: () => void; }) => {
    return (
        <div>
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black mb-6">
                <BackIcon />
                بازگشت به گزارشات
            </button>
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row justify-between items-start border-b pb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">جزئیات سفارش {order.id}</h2>
                        <p className="text-sm text-gray-500">تایید شده در {order.dispatchDate}</p>
                    </div>
                    <span className="bg-green-100 text-green-700 px-3 py-1.5 text-sm font-semibold rounded-full mt-3 md:mt-0">تایید شده</span>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mt-6">
                    <div>
                        <h3 className="font-semibold text-gray-700">آدرس تحویل</h3>
                        <p className="text-sm text-gray-600 mt-2">{order.address}</p>
                    </div>
                </div>
                <div className="mt-8">
                    <h3 className="font-semibold text-gray-700 mb-4">محصولات سفارش</h3>
                    <div className="space-y-4 max-h-80 overflow-y-auto">
                        {order.products.map(p => (
                            <div key={p.code} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                                <div>
                                    <p className="font-medium text-gray-800">{p.name}</p>
                                    <p className="text-sm text-gray-500">تعداد: {p.totalUnits.toLocaleString('fa-IR')}</p>
                                </div>
                                <p className="font-semibold text-gray-700">{p.lineTotal.toLocaleString('fa-IR')} ریال</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-6 pt-6 border-t flex justify-end">
                    <div className="w-full max-w-sm space-y-3">
                        <div className="flex justify-between font-bold text-lg text-gray-800"><span>مبلغ نهایی:</span><span>{order.total}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Reports = ({ orders }: { orders: Order[] }) => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const approvedOrders = useMemo(() => {
        if (!orders) return [];
        return orders.filter(order => order.status === 'تایید شده' && order.dispatchDate);
    }, [orders]);

    const stats = useMemo(() => {
        const defaultStats = {
            overall: { totalOrders: 0, totalAmount: 0, averageAmount: 0 },
            sales: {
                week: { amount: 0, count: 0 },
                month: { amount: 0, count: 0 },
                year: { amount: 0, count: 0 },
            },
            popularProduct: {
                week: { name: '-', count: 0 },
                month: { name: '-', count: 0 },
                year: { name: '-', count: 0 },
            }
        };

        if (approvedOrders.length === 0) return defaultStats;

        const parseDate = (str: string | null) => {
            if (!str) return null;
            const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
            let englishStr = String(str);
            for (let i = 0; i < 10; i++) {
                englishStr = englishStr.replace(new RegExp(persianDigits[i], 'g'), String(i));
            }
            const parts = englishStr.split('/');
            if (parts.length < 3) return null;
            const [y, m, d] = parts.map(Number);
            return { y, m, d };
        };

        const dateToDays = (date: {y: number, m: number, d: number} | null) => {
            if (!date) return 0;
            const daysInMonth = [0, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
            let dayOfYear = 0;
            for (let i = 1; i < date.m; i++) { dayOfYear += daysInMonth[i]; }
            dayOfYear += date.d;
            return (date.y * 365.25) + dayOfYear;
        };
        
        const sortedOrders = [...approvedOrders].sort((a, b) => {
            const dateA = dateToDays(parseDate(a.dispatchDate));
            const dateB = dateToDays(parseDate(b.dispatchDate));
            return dateB - dateA;
        });

        const today = parseDate(sortedOrders[0].dispatchDate);
        if (!today) return defaultStats;
        const todayInDays = dateToDays(today);

        const ordersThisYear = sortedOrders.filter(o => parseDate(o.dispatchDate)?.y === today.y);
        const ordersThisMonth = ordersThisYear.filter(o => parseDate(o.dispatchDate)?.m === today.m);
        const ordersThisWeek = sortedOrders.filter(o => {
            const orderDateInDays = dateToDays(parseDate(o.dispatchDate));
            return (todayInDays - orderDateInDays) < 7;
        });

        const calculateStatsForPeriod = (periodOrders: Order[]) => {
            if (periodOrders.length === 0) return { amount: 0, count: 0, popularProduct: { name: '-', count: 0 } };
            
            const amount = periodOrders.reduce((sum, o) => sum + o.totalAmount, 0);
            const count = periodOrders.length;

            // FIX: Explicitly type the accumulator's initial value to ensure `productCounts` values are numbers.
            const productCounts = periodOrders.flatMap(o => o.products).reduce((acc, p) => {
                acc[p.name] = (acc[p.name] || 0) + p.totalUnits;
                return acc;
            }, {} as Record<string, number>);

            const popularEntry = Object.entries(productCounts).sort(([, a], [, b]) => b - a)[0];
            const popularProduct = popularEntry ? { name: popularEntry[0], count: popularEntry[1] } : { name: '-', count: 0 };
            return { amount, count, popularProduct };
        };

        const weekStats = calculateStatsForPeriod(ordersThisWeek);
        const monthStats = calculateStatsForPeriod(ordersThisMonth);
        const yearStats = calculateStatsForPeriod(ordersThisYear);
        const overallStats = calculateStatsForPeriod(sortedOrders);
        const averageAmount = overallStats.count > 0 ? overallStats.amount / overallStats.count : 0;
        
        return {
            overall: { totalOrders: overallStats.count, totalAmount: overallStats.amount, averageAmount },
            sales: {
                week: { amount: weekStats.amount, count: weekStats.count },
                month: { amount: monthStats.amount, count: monthStats.count },
                year: { amount: yearStats.amount, count: yearStats.count },
            },
            popularProduct: {
                week: weekStats.popularProduct,
                month: monthStats.popularProduct,
                year: yearStats.popularProduct,
            }
        };
    }, [approvedOrders]);

    if (selectedOrder) {
        return <OrderDetailView order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">گزارش و تحلیل سفارشات</h1>
            <p className="mt-1 text-gray-500">نمای کلی از سفارشات تایید شده شما.</p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard icon={<MyOrdersIcon />} title="کل سفارشات تایید شده" value={stats.overall.totalOrders.toLocaleString('fa-IR')} />
                <StatCard icon={<WalletIcon />} title="مجموع کل فروش" value={`${stats.overall.totalAmount.toLocaleString('fa-IR')} ریال`} />
                <StatCard icon={<ChartBarIcon />} title="میانگین مبلغ خرید" value={`${Math.round(stats.overall.averageAmount).toLocaleString('fa-IR')} ریال`} />
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">آمار فروش</h2>
                    <div className="space-y-3">
                        <TimeStatRow label="فروش هفته جاری" amount={stats.sales.week.amount} count={stats.sales.week.count} />
                        <TimeStatRow label="فروش ماه جاری" amount={stats.sales.month.amount} count={stats.sales.month.count} />
                        <TimeStatRow label="فروش سال جاری" amount={stats.sales.year.amount} count={stats.sales.year.count} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                     <h2 className="text-lg font-semibold text-gray-800 border-b pb-3 mb-4">محصولات محبوب (بر اساس تعداد)</h2>
                    <div className="space-y-3">
                        <ProductStatRow label="محبوب هفته" product={stats.popularProduct.week} />
                        <ProductStatRow label="محبوب ماه" product={stats.popularProduct.month} />
                        <ProductStatRow label="محبوب سال" product={stats.popularProduct.year} />
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800">تاریخچه سفارشات تایید شده</h2>
                {approvedOrders.length > 0 ? (
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-sm text-right text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">شماره سفارش</th>
                                    <th scope="col" className="px-6 py-3">تاریخ تایید</th>
                                    <th scope="col" className="px-6 py-3">تعداد اقلام</th>
                                    <th scope="col" className="px-6 py-3">مبلغ کل</th>
                                    <th scope="col" className="px-6 py-3 text-center">عملیات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {approvedOrders.map((order) => (
                                    <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {order.id}
                                        </th>
                                        <td className="px-6 py-4">{order.dispatchDate}</td>
                                        <td className="px-6 py-4">{order.products.length.toLocaleString('fa-IR')}</td>
                                        <td className="px-6 py-4 font-semibold">{order.total}</td>
                                        <td className="px-6 py-4 text-center">
                                            <button onClick={() => setSelectedOrder(order)} className="text-blue-600 hover:text-blue-800 font-semibold flex items-center justify-center gap-1 mx-auto">
                                                <EyeIcon />
                                                <span>مشاهده</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        <p>هیچ سفارش تایید شده‌ای برای نمایش وجود ندارد.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reports;
