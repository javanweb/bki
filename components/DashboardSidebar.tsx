
import React from 'react';
import { 
    LayoutDashboard, 
    BookOpen, 
    ShoppingCart, 
    Package, 
    BarChart3, 
    User, 
    Headphones, 
    LogOut,
    Menu,
    X,
    ChevronLeft,
    ClipboardList
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DashboardPage } from './Dashboard';

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    page: DashboardPage;
    activePage: DashboardPage;
    onNavigate: (page: DashboardPage) => void;
    notification?: number;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, page, activePage, onNavigate, notification }) => {
    const isActive = activePage === page;
    
    return (
        <button 
            id={`nav-item-${page}`}
            onClick={() => onNavigate(page)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative ${
                isActive 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200/50' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
        >
            <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {icon}
            </div>
            <span className="flex-1 text-right">{label}</span>
            {notification && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-white text-blue-600' : 'bg-blue-100 text-blue-600'
                }`}>
                    {notification}
                </span>
            )}
            {isActive && (
                <motion.div 
                    layoutId="active-pill"
                    className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-white rounded-l-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
        </button>
    );
};

interface DashboardSidebarProps {
    activePage: DashboardPage;
    onNavigate: (page: DashboardPage) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    customer: any;
}

const SidebarContent: React.FC<{activePage: DashboardPage; onNavigate: (page: DashboardPage) => void; customer: any;}> = ({ activePage, onNavigate, customer}) => (
     <div className="flex flex-col h-full bg-white">
        <div className="px-8 py-8 flex items-center gap-3 border-b border-slate-50">
            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg shadow-blue-200">
                ک‌ب
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-lg text-slate-900 tracking-tight">کویر بسپار</span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest leading-none">صنایع لوله آینده</span>
            </div>
        </div>

        <div className="flex-1 px-4 py-6 space-y-8 overflow-y-auto custom-scrollbar">
            <div>
                <h3 className="px-4 mb-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">اصلی</h3>
                <div className="space-y-1">
                    <NavItem icon={<LayoutDashboard size={20} />} label="پیشخوان" page="dashboard" activePage={activePage} onNavigate={onNavigate} />
                    <NavItem icon={<BookOpen size={20} />} label="کاتالوگ محصولات" page="catalog" activePage={activePage} onNavigate={onNavigate} />
                    <NavItem icon={<ShoppingCart size={20} />} label="سبد خرید" page="cart" activePage={activePage} onNavigate={onNavigate} />
                </div>
            </div>

            <div>
                <h3 className="px-4 mb-4 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">مدیریت حساب</h3>
                <div className="space-y-1">
                    <NavItem icon={<Package size={20} />} label="سفارشات من" notification={2} page="my-orders" activePage={activePage} onNavigate={onNavigate} />
                    <NavItem icon={<ClipboardList size={20} />} label="نظرسنجی و تخفیف" page="surveys" activePage={activePage} onNavigate={onNavigate} />
                    <NavItem icon={<BarChart3 size={20} />} label="گزارشات" page="reports" activePage={activePage} onNavigate={onNavigate} />
                    <NavItem icon={<User size={20} />} label="پروفایل کاربری" page="profile" activePage={activePage} onNavigate={onNavigate} />
                    <NavItem icon={<Headphones size={20} />} label="پشتیبانی" page="support" activePage={activePage} onNavigate={onNavigate} />
                </div>
            </div>
        </div>

        <div className="p-4 border-t border-slate-50">
            <div className="bg-slate-50 p-4 rounded-2xl flex items-center gap-3">
                <div className="relative">
                    <img 
                        src={`https://i.pravatar.cc/100?u=${customer?.id || 'customer'}`} 
                        alt="Avatar" 
                        className="h-10 w-10 rounded-xl object-cover ring-2 ring-white shadow-sm" 
                    />
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-slate-900 truncate">{customer?.name || 'مشتری عزیز'}</p>
                    <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">پنل مشتریان</p>
                </div>
                <button 
                    id="logout-button"
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                    title="خروج"
                >
                    <LogOut size={18} />
                </button>
            </div>
        </div>
    </div>
);

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ activePage, onNavigate, isOpen, setIsOpen, customer }) => {
    return (
        <>
            {/* Desktop Sidebar */}
            <aside id="desktop-sidebar" className="w-72 bg-white border-l border-slate-100 flex-col flex-shrink-0 h-screen sticky top-0 hidden lg:flex shadow-sm z-40" dir="rtl">
                <SidebarContent activePage={activePage} onNavigate={onNavigate} customer={customer} />
            </aside>
            
            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isOpen && (
                    <div className="lg:hidden fixed inset-0 z-50 overflow-hidden" dir="rtl">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" 
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.aside 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute inset-y-0 right-0 w-72 max-w-xs shadow-2xl flex flex-col h-full bg-white"
                        >
                            <button 
                                onClick={() => setIsOpen(false)} 
                                className="absolute top-8 left-4 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg z-50 transition-colors"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <SidebarContent activePage={activePage} onNavigate={page => { onNavigate(page); setIsOpen(false); }} customer={customer} />
                        </motion.aside>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default DashboardSidebar;
