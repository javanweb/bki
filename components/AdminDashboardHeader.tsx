


import React from 'react';
import { BellIcon, MoonIcon } from './dashboard/DashboardIcons';
import MenuIcon from './icons/MenuIcon';
import SearchIcon from './icons/SearchIcon';

const AdminDashboardHeader: React.FC<{ 
    onToggleMobileSidebar: () => void; 
    onNavigateHome: () => void;
    notificationCount: number;
}> = ({ onToggleMobileSidebar, onNavigateHome, notificationCount }) => {
    return (
        <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 p-4 lg:px-8 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
                 <button className="lg:hidden p-2 -mr-2 text-gray-600" onClick={onToggleMobileSidebar}>
                    <MenuIcon />
                </button>
                 <button className="hidden lg:block p-2 rounded-full hover:bg-gray-100">
                    <SearchIcon />
                </button>
                 <button onClick={onNavigateHome} className="hidden md:block text-sm font-medium text-gray-600 hover:text-blue-600">بازگشت به سایت</button>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <button className="p-2 rounded-full hover:bg-gray-100 relative">
                    <BellIcon />
                    {notificationCount > 0 && (
                         <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">{notificationCount}</span>
                    )}
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                    <MoonIcon />
                </button>
                <button>
                    <img src="https://i.pravatar.cc/40?u=admin" alt="Admin Avatar" className="h-9 w-9 rounded-full" />
                </button>
            </div>
        </header>
    );
};

export default AdminDashboardHeader;