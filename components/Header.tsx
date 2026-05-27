
import React, { useState } from 'react';
import ChevronDownIcon from './icons/ChevronDownIcon';
import SearchIcon from './icons/SearchIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';
import MenuIcon from './icons/MenuIcon';
import GlobeIcon from './icons/GlobeIcon';
import CloseIcon from './icons/CloseIcon';

// --- Desktop Navigation Components ---

const DesktopNavItem: React.FC<{ children: React.ReactNode; href?: string; onClick?: () => void; className?: string }> = ({ children, href = '#', onClick, className }) => {
    const finalClass = className || "flex items-center gap-1 text-white hover:text-gray-300 transition-colors text-sm font-medium";
    if (onClick) {
        return (
            <button onClick={onClick} className={`${finalClass} bg-transparent border-none cursor-pointer`}>
                {children}
            </button>
        );
    }
    return (
        <a href={href} className={finalClass}>
            {children}
        </a>
    );
};

const DesktopDropdown: React.FC<{ title: string, children: React.ReactNode, className?: string, dropdownBgClass?: string, itemClass?: string }> = ({ title, children, className, dropdownBgClass, itemClass }) => (
    <div className="relative group">
        <button className={className || "flex items-center gap-1 text-white hover:text-gray-300 transition-colors text-sm font-medium"}>
            <span>{title}</span>
            <ChevronDownIcon />
        </button>
        <div className={`absolute top-full right-0 mt-4 w-60 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-2 ${dropdownBgClass || "bg-white/10 backdrop-blur-xl"}`}>
            {React.Children.map(children, child => 
                React.isValidElement(child) 
                    ? React.cloneElement(child as React.ReactElement<any>, { className: itemClass }) 
                    : child
            )}
        </div>
    </div>
);

const DesktopDropdownItem: React.FC<{ children: React.ReactNode, href?: string, onClick?: (e: React.MouseEvent) => void, className?: string }> = ({ children, href = '#', onClick, className }) => (
    <a href={href} onClick={onClick} className={className || "block w-full text-right px-4 py-2.5 text-sm text-white rounded-lg hover:bg-white/20 transition-colors"}>
        {children}
    </a>
);

// --- Mobile Navigation Components ---

const MobileNavItem: React.FC<{ title: string; children?: React.ReactNode; href?: string; onClick?: () => void }> = ({ title, children, href="#", onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!children) {
    if (onClick) {
        return (
            <button onClick={onClick} className="block w-full text-right py-3 text-lg text-white font-semibold border-b border-white/10">
                {title}
            </button>
        );
    }
    return (
      <a href={href} className="block py-3 text-lg text-white font-semibold border-b border-white/10">
        {title}
      </a>
    );
  }

  return (
    <div className="border-b border-white/10">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center py-3 text-lg text-white font-semibold">
        <span>{title}</span>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            <ChevronDownIcon />
        </div>
      </button>
      {isOpen && (
        <div className="pr-4 py-2 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
}

const MobileDropdownItem: React.FC<{ children: React.ReactNode; href?: string; onClick?: (e: React.MouseEvent) => void }> = ({ children, href="#", onClick }) => (
    <a href={href} onClick={onClick} className="block py-2 text-base text-gray-300 hover:text-white transition-colors">
        {children}
    </a>
)

// --- Main Header Component ---

interface HeaderProps {
    onNavigateToLogin: () => void;
    onNavigateHome?: () => void;
    onNavigateToPartnership?: () => void;
    onNavigateToAbout?: () => void;
    onNavigateToGoals?: () => void;
    onNavigateToArticles?: () => void;
    onProductSelect?: (product: any) => void;
    onNavigateToContact?: () => void;
    onNavigateToFAQ?: () => void;
    onNavigateToFeedback?: () => void;
    variant?: 'dark' | 'light';
}

const Header: React.FC<HeaderProps> = ({ onNavigateToLogin, onNavigateHome, onNavigateToPartnership, onNavigateToAbout, onNavigateToGoals, onNavigateToArticles, onProductSelect, onNavigateToContact, onNavigateToFAQ, onNavigateToFeedback, variant = 'dark' }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const isLight = variant === 'light';

    // Dynamic Styles
    const containerClass = isLight 
        ? "bg-white/90 backdrop-blur-lg shadow-md border border-gray-100 rounded-full px-6 py-2 flex items-center justify-between"
        : "bg-white/10 backdrop-blur-lg rounded-full px-6 py-2 flex items-center justify-between";

    const textClass = isLight ? "flex items-center gap-1 text-gray-700 hover:text-brand transition-colors text-sm font-medium" : undefined;
    const dropdownBgClass = isLight ? "bg-white shadow-xl border border-gray-100" : undefined;
    const dropdownItemClass = isLight ? "block w-full text-right px-4 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" : undefined;
    
    const logoTextClass = isLight ? "text-gray-900" : "text-white";
    const logoSubTextClass = isLight ? "text-gray-500" : "text-white opacity-80";

    const iconColorClass = isLight ? "text-gray-600" : "text-white";
    const iconButtonClass = isLight ? "p-2.5 rounded-full hover:bg-gray-100 transition-colors" : "p-2.5 rounded-full hover:bg-white/20 transition-colors";

    const dashboardBtnClass = isLight 
        ? "hidden sm:flex items-center gap-2 bg-transparent text-gray-700 border border-gray-300 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-50 transition-colors"
        : "hidden sm:flex items-center gap-2 bg-transparent text-white border border-white/50 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-white/10 transition-colors";

    const agencyBtnClass = isLight
        ? "hidden sm:flex items-center gap-2 bg-brand text-white px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-brand-dark transition-colors shadow-sm"
        : "hidden sm:flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-200 transition-colors";

    const openMobileMenu = () => {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(true);
    };

    const closeMobileMenu = () => {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
    };

    const handleHomeClick = () => {
        if (onNavigateHome) {
            onNavigateHome();
            closeMobileMenu();
        }
    };

    const handlePartnershipClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onNavigateToPartnership) {
            onNavigateToPartnership();
            closeMobileMenu();
        }
    };

    const handleAboutClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onNavigateToAbout) {
            onNavigateToAbout();
            closeMobileMenu();
        }
    };

    const handleGoalsClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onNavigateToGoals) {
            onNavigateToGoals();
            closeMobileMenu();
        }
    };

    const handleArticlesClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onNavigateToArticles) {
            onNavigateToArticles();
            closeMobileMenu();
        }
    };

    const handleContactClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onNavigateToContact) {
            onNavigateToContact();
            closeMobileMenu();
        }
    };

    const handleFAQClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onNavigateToFAQ) {
            onNavigateToFAQ();
            closeMobileMenu();
        }
    };

    const handleFeedbackClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onNavigateToFeedback) {
            onNavigateToFeedback();
            closeMobileMenu();
        }
    };

    const handleProductSelectClick = (e: React.MouseEvent, title: string) => {
        e.preventDefault();
        if (onProductSelect) {
            onProductSelect({ title });
            closeMobileMenu();
        }
    };

    const companyLinks = [
        { title: 'درباره ما', href: '#', onClick: handleAboutClick },
        { title: 'اهداف ما', href: '#', onClick: handleGoalsClick },
        { title: 'مقالات', href: '#', onClick: handleArticlesClick },
    ];
    const productLinks = [
        { title: 'لوله تک لایه', href: '#', onClick: (e: React.MouseEvent) => handleProductSelectClick(e, 'لوله تک لایه پلیمری') },
        { title: 'لوله رولی تک لایه', href: '#', onClick: (e: React.MouseEvent) => handleProductSelectClick(e, 'لوله تک لایه حلقه ای') },
        { title: 'لوله سه لایه فایبر گلاس', href: '#', onClick: (e: React.MouseEvent) => handleProductSelectClick(e, 'لوله سه لایه فایبرگلاس') },
        { title: 'لوله رولی سه لایه فایبر گلاس', href: '#', onClick: (e: React.MouseEvent) => handleProductSelectClick(e, 'لوله سه لایه فایبرگلاس حلقه ای') },
        { title: 'اتصالات پلیمری', href: '#', onClick: (e: React.MouseEvent) => handleProductSelectClick(e, 'اتصالات پلیمری') },
    ];
    const contactLinks = [
        { title: 'تماس با ما', href: '#', onClick: handleContactClick },
        { title: 'سوالات متداول', href: '#', onClick: handleFAQClick },
        { title: 'نظرسنجی', href: '#' },
        { title: 'درخواست نمایندگی', href: '#', onClick: handlePartnershipClick },
        { title: 'انتقاد و پیشنهادات', href: '#', onClick: handleFeedbackClick },
    ];
    const languages = [
        { code: 'ar', name: 'العربية' },
        { code: 'tr', name: 'Türkçe' },
    ];

  return (
    <>
    <header className="absolute top-5 left-1/2 -translate-x-1/2 w-[95%] max-w-screen-xl z-50">
      <div className={containerClass}>
        
        {/* Left side: Logo & Desktop Nav */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <div className={logoTextClass}>
              <span className="font-bold text-lg tracking-wider">FPI</span>
              <p className={`text-xs tracking-widest ${logoSubTextClass}`}>صنایع لوله آینده</p>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-6">
            <DesktopNavItem onClick={handleHomeClick} className={textClass}>صفحه اصلی</DesktopNavItem>
            <DesktopDropdown title="شرکت" className={textClass} dropdownBgClass={dropdownBgClass} itemClass={dropdownItemClass}>
                {companyLinks.map(link => <DesktopDropdownItem key={link.title} href={link.href} onClick={link.onClick}>{link.title}</DesktopDropdownItem>)}
            </DesktopDropdown>
            <DesktopDropdown title="محصولات" className={textClass} dropdownBgClass={dropdownBgClass} itemClass={dropdownItemClass}>
                {productLinks.map(link => <DesktopDropdownItem key={link.title} href={link.href} onClick={link.onClick}>{link.title}</DesktopDropdownItem>)}
            </DesktopDropdown>
            <DesktopDropdown title="ارتباط با ما" className={textClass} dropdownBgClass={dropdownBgClass} itemClass={dropdownItemClass}>
                {contactLinks.map(link => (
                    <DesktopDropdownItem 
                        key={link.title} 
                        href={link.href} 
                        onClick={link.onClick ? (e) => link.onClick?.(e) : undefined}
                    >
                        {link.title}
                    </DesktopDropdownItem>
                ))}
            </DesktopDropdown>
            <DesktopNavItem className={textClass}>فرم استخدام</DesktopNavItem>
            <a href="#" className={textClass || "flex items-center gap-1 text-white hover:text-gray-300 transition-colors text-base font-semibold"}>پنل مجریان</a>
          </nav>
        </div>

        {/* Right side: Actions */}
        <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-2">
                <DesktopDropdown title="FA" className={textClass} dropdownBgClass={dropdownBgClass} itemClass={dropdownItemClass}>
                    {languages.map(lang => <DesktopDropdownItem key={lang.code}>{lang.name}</DesktopDropdownItem>)}
                </DesktopDropdown>
                <div className="relative">
                    <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={iconButtonClass}>
                        <SearchIcon className={`h-5 w-5 ${iconColorClass}`} />
                    </button>
                    {isSearchOpen && (
                        <div className="absolute top-full right-0 mt-3 w-64 p-2 z-50">
                            <form>
                                <input
                                    type="search"
                                    placeholder="جستجو..."
                                    className={`w-full backdrop-blur-xl rounded-full px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 transition ${isLight ? 'bg-white shadow-lg border border-gray-200 text-gray-800 focus:ring-brand/20' : 'bg-white/10 text-white focus:ring-white/50'}`}
                                    autoFocus
                                />
                            </form>
                        </div>
                    )}
                </div>
            </div>
             <button onClick={onNavigateToLogin} className={dashboardBtnClass}>
                داشبورد مشتریان
            </button>
            <button onClick={onNavigateToPartnership} className={agencyBtnClass}>
                درخواست نمایندگی
                <ArrowRightIcon />
            </button>
            <button className={`lg:hidden ${iconButtonClass}`} onClick={openMobileMenu}>
                <MenuIcon className={`h-6 w-6 ${iconColorClass}`} />
            </button>
        </div>
      </div>
    </header>

    {/* Mobile Menu */}
    {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-[100] p-6 flex flex-col">
            <div className="flex items-center justify-end">
                <button onClick={closeMobileMenu} className="text-white">
                    <CloseIcon />
                </button>
            </div>
            <nav className="mt-8 flex-grow overflow-y-auto">
                <MobileNavItem title="صفحه اصلی" onClick={handleHomeClick} />
                <MobileNavItem title="شرکت">
                    {companyLinks.map(link => <MobileDropdownItem key={link.title} href={link.href} onClick={link.onClick}>{link.title}</MobileDropdownItem>)}
                </MobileNavItem>
                <MobileNavItem title="محصولات">
                    {productLinks.map(link => <MobileDropdownItem key={link.title} href={link.href} onClick={link.onClick}>{link.title}</MobileDropdownItem>)}
                </MobileNavItem>
                <MobileNavItem title="ارتباط با ما">
                    {contactLinks.map(link => (
                        <MobileDropdownItem 
                            key={link.title} 
                            href={link.href}
                            onClick={link.onClick ? (e) => link.onClick?.(e) : undefined}
                        >
                            {link.title}
                        </MobileDropdownItem>
                    ))}
                </MobileNavItem>
                <MobileNavItem title="فرم استخدام" />
                <MobileNavItem title="پنل مجریان" />
            </nav>

             {isSearchOpen && (
                <div className="px-1 py-4">
                     <form>
                         <input
                            type="search"
                            placeholder="جستجو..."
                            className="w-full bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 text-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 transition"
                            autoFocus
                        />
                    </form>
                </div>
            )}
            
            {isMobileLangOpen && (
                <div className="py-2">
                    {languages.map(lang => (
                        <a href="#" key={lang.code} className="block w-full text-right px-4 py-2.5 text-sm text-white rounded-lg hover:bg-white/20 transition-colors">
                           {lang.name}
                        </a>
                    ))}
                </div>
            )}

            <div className='flex items-center justify-between py-4 border-t border-white/10'>
                <button className='flex items-center gap-2 text-white' onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}>
                    <GlobeIcon />
                    <span>فارسی</span>
                    <div className={`transition-transform duration-300 ${isMobileLangOpen ? 'rotate-180' : ''}`}>
                      <ChevronDownIcon />
                    </div>
                </button>
                <button className="p-2.5 rounded-full bg-white/10" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                    <SearchIcon className="h-5 w-5 text-white" />
                </button>
            </div>
        </div>
    )}
    </>
  );
};

export default Header;
