
import React, { useState, useMemo, useEffect } from 'react';
import { 
    Bell, 
    Search, 
    ShoppingCart, 
    Menu, 
    Settings, 
    HelpCircle,
    ArrowRightLeft,
    Globe,
    ChevronDown,
    ExternalLink,
    Archive
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DashboardHeader: React.FC<{ 
    onToggleMobileSidebar: () => void; 
    customer: any; 
    announcements: any[]; 
    setAnnouncements: React.Dispatch<React.SetStateAction<any[]>>; 
    cartItems: any[];
    onNavigateHome: () => void;
}> = ({ onToggleMobileSidebar, customer, announcements, setAnnouncements, cartItems, onNavigateHome }) => {
    
    const [isAnnouncementsOpen, setAnnouncementsOpen] = useState(false);
    const [isProfileOpen, setProfileOpen] = useState(false);
    const [showArchived, setShowArchived] = useState(false);
    const [showPushPrompt, setShowPushPrompt] = useState(false);
    
    const cartItemCount = cartItems?.length || 0;

    const allMyAnnouncements = useMemo(() => {
        if (!announcements || !customer) return [];
        return announcements
            .filter(a => a.type === 'public' || (a.type === 'specific' && a.customerId === customer.id))
            .sort((a, b) => b.id - a.id); // Show newest first
    }, [announcements, customer]);

    const activeAnnouncements = useMemo(() => allMyAnnouncements.filter(a => !a.isArchived), [allMyAnnouncements]);
    const archivedAnnouncements = useMemo(() => allMyAnnouncements.filter(a => a.isArchived), [allMyAnnouncements]);

    const unreadCount = useMemo(() => {
        return activeAnnouncements.filter(a => !a.isRead).length;
    }, [activeAnnouncements]);

    useEffect(() => {
        if (isAnnouncementsOpen) {
            setAnnouncements((prevAnns: any[]) =>
                prevAnns.map((ann: any) =>
                    (ann.type === 'public' || (ann.type === 'specific' && ann.customerId === customer.id)) && !ann.isArchived
                        ? { ...ann, isRead: true } 
                        : ann
                )
            );
        }
    }, [isAnnouncementsOpen, customer.id, setAnnouncements]);

    const handleBellClick = () => {
        if (!localStorage.getItem('pushPrompted')) {
            setShowPushPrompt(true);
        }
        setAnnouncementsOpen(prev => !prev);
        setShowArchived(false);
    };

    const requestPushPermission = async () => {
        if ('Notification' in window) {
            try {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    console.log('Notification permission granted.');
                }
            } catch (err) {
                console.error('Notification API err:', err);
            }
        }
        localStorage.setItem('pushPrompted', 'true');
        localStorage.setItem('pushRegistered', 'true');
        setShowPushPrompt(false);
    };

    const declinePushPermission = () => {
        localStorage.setItem('pushPrompted', 'true');
        setShowPushPrompt(false);
    };

    return (
        <header id="dashboard-header" className="bg-white/70 backdrop-blur-md sticky top-0 z-30 px-4 md:px-8 h-20 flex items-center justify-between border-b border-slate-100" dir="rtl">
            {showPushPrompt && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center border border-slate-100">
                        <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                            <Bell size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">فعالسازی اطلاعیه‌ها</h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                            نماینده ی گرامی، آیا اجازه میدهید برای اطلاع از اخرین اطلاعیهها با خبر شوید؟
                        </p>
                        <div className="flex items-center gap-3">
                            <button onClick={requestPushPermission} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl transition-colors">
                                تایید
                            </button>
                            <button onClick={declinePushPermission} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2.5 rounded-xl transition-colors">
                                خیر
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex items-center gap-6">
                 <button 
                    id="mobile-sidebar-toggle"
                    className="lg:hidden p-2.5 rounded-xl text-slate-600 bg-slate-50 hover:bg-slate-100 transition-colors" 
                    onClick={onToggleMobileSidebar}
                >
                    <Menu size={20} />
                </button>
                
                <div className="hidden lg:flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2 w-80 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-200 transition-all duration-200 group">
                    <Search size={18} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="جستجو در پنل..." 
                        className="bg-transparent border-none focus:ring-0 text-sm p-1.5 w-full text-slate-700 placeholder:text-slate-400"
                    />
                </div>

                <div className="hidden xl:flex items-center gap-4">
                    <button 
                        onClick={onNavigateHome} 
                        className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors py-2"
                    >
                        <ExternalLink size={14} />
                        <span>مشاهده سایت</span>
                    </button>
                    <div className="h-4 w-[1px] bg-slate-200"></div>
                    <button className="text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors py-2">کاتالوگ</button>
                    <button className="text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors py-2">راهنما</button>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <div className="hidden sm:flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
                    <button className="px-3 py-1.5 text-[11px] font-bold text-blue-600 bg-white rounded-lg shadow-sm border border-slate-100/50">فارسی</button>
                    <button className="px-3 py-1.5 text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors">EN</button>
                </div>

                <div className="relative">
                    <button 
                        id="announcements-toggle"
                        onClick={handleBellClick} 
                        className={`p-2.5 rounded-xl transition-all duration-200 relative group ${
                            isAnnouncementsOpen ? 'bg-blue-50 text-blue-600 ring-1 ring-blue-100' : 'text-slate-500 hover:bg-slate-50'
                        }`}
                    >
                        <Bell size={20} className={unreadCount > 0 ? 'animate-pulse' : ''} />
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
                        )}
                    </button>
                    
                    <AnimatePresence>
                        {isAnnouncementsOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute left-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 z-50 overflow-hidden"
                            >
                                <div className="p-4 font-bold text-slate-900 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                                    <div className="flex items-center gap-2">
                                        <span>{showArchived ? 'بایگانی اطلاعیه‌ها' : 'اطلاعیه‌ها'}</span>
                                        {unreadCount > 0 && !showArchived && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full ring-1 ring-red-200 font-extrabold">{unreadCount} جدید</span>}
                                    </div>
                                    <button 
                                        onClick={() => setShowArchived(!showArchived)}
                                        className={`text-xs px-2 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 font-semibold ${showArchived ? 'bg-blue-100 text-blue-700' : 'text-slate-500 hover:bg-slate-100'}`}
                                    >
                                        <Archive size={14} />
                                        {showArchived ? 'بازگشت' : 'بایگانی'}
                                    </button>
                                </div>
                                <div className="max-h-[400px] overflow-y-auto">
                                    {showArchived ? (
                                        archivedAnnouncements.length > 0 ? archivedAnnouncements.map(ann => (
                                            <div key={ann.id} className="p-4 border-b border-slate-50 opacity-70 hover:opacity-100 transition-opacity group cursor-pointer bg-slate-50/50">
                                                <div className="flex items-start gap-3">
                                                    <div className="mt-1.5 h-2 w-2 rounded-full shrink-0 bg-slate-300"></div>
                                                    <div>
                                                        <p className="font-bold text-sm text-slate-600 group-hover:text-slate-800 transition-colors">{ann.title}</p>
                                                        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{ann.content}</p>
                                                        <p className="text-[10px] text-slate-400 mt-3 font-medium bg-slate-100 inline-block px-2 py-0.5 rounded-md">{ann.timestamp}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="p-12 text-center">
                                                <p className="text-xs font-medium text-slate-400">اطلاعیه بایگانی شده‌ای وجود ندارد</p>
                                            </div>
                                        )
                                    ) : (
                                        activeAnnouncements.length > 0 ? activeAnnouncements.map(ann => (
                                            <div key={ann.id} className={`p-4 border-b border-slate-50 transition-colors group cursor-pointer ${ann.isRead ? 'hover:bg-slate-50' : 'bg-red-50/30 hover:bg-red-50/50'}`}>
                                                <div className="flex items-start gap-3">
                                                    <div className={`mt-1.5 h-2.5 w-2.5 rounded-full shrink-0 shadow-sm ${!ann.isRead ? 'bg-red-500 ring-2 ring-red-200' : 'bg-slate-200 border border-slate-300'}`}></div>
                                                    <div>
                                                        <p className={`font-bold text-sm transition-colors ${!ann.isRead ? 'text-slate-800 group-hover:text-red-600' : 'text-slate-700 group-hover:text-blue-600'}`}>{ann.title}</p>
                                                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{ann.content}</p>
                                                        <div className="flex items-center justify-between mt-3">
                                                            <span className="text-[10px] text-slate-400 font-semibold bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">{ann.timestamp}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : (
                                            <div className="p-12 text-center">
                                                <div className="bg-slate-50 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3 border border-slate-100">
                                                    <Bell size={20} className="text-slate-300" />
                                                </div>
                                                <p className="text-xs font-medium text-slate-400">اطلاعیه جدیدی ندارید</p>
                                            </div>
                                        )
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="relative">
                    <button 
                        id="cart-toggle"
                        className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-50 transition-all duration-200 relative group"
                    >
                        <ShoppingCart size={20} />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 -left-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-bold border-2 border-white shadow-sm ring-1 ring-blue-100">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                </div>

                <div className="h-8 w-[1px] bg-slate-100 mx-1"></div>

                <div className="relative">
                    <button 
                        id="user-profile-toggle"
                        onClick={() => setProfileOpen(!isProfileOpen)}
                        className={`flex items-center gap-2 p-1.5 rounded-xl transition-all duration-200 ring-offset-2 ${
                            isProfileOpen ? 'bg-slate-100 ring-2 ring-blue-50' : 'hover:bg-slate-50'
                        }`}
                    >
                        <div className="relative h-9 w-9 rounded-lg overflow-hidden border border-slate-200">
                            <img src={`https://i.pravatar.cc/100?u=${customer?.id || 'customer'}`} alt="Avatar" className="h-full w-full object-cover" />
                        </div>
                        <div className="hidden md:flex flex-col items-start pr-1">
                            <span className="text-xs font-bold text-slate-900 leading-none">{customer?.name?.split(' ')[0] || 'کاربر'}</span>
                            <span className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-wider">مشتری</span>
                        </div>
                        <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute left-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 z-50 overflow-hidden"
                            >
                                <div className="p-4 border-b border-slate-50">
                                    <p className="text-sm font-bold text-slate-900">{customer?.name || 'مشتری عزیز'}</p>
                                    <p className="text-[10px] text-slate-500 mt-1">{customer?.email || 'user@example.com'}</p>
                                </div>
                                <div className="p-2">
                                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors group">
                                        <Settings size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <span>تنظیمات حساب</span>
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors group">
                                        <ArrowRightLeft size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <span>تعویض حساب</span>
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors group">
                                        <HelpCircle size={16} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <span>مرکز پشتیبانی</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
