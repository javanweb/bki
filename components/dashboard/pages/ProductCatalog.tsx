
import React, { useState, useMemo } from 'react';
import SearchIcon from '../../icons/SearchIcon';
import { FilterIcon, EyeIcon } from '../DashboardIcons';
import PlaceholderIcon from '../../icons/PlaceholderIcon';

// Helper to parse price string to number
const parsePrice = (priceStr: string | number) => {
    if (typeof priceStr === 'number') return priceStr;
    const englishPrice = String(priceStr)
        .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString())
        .replace(/[^\d]/g, '');
    return parseInt(englishPrice, 10) || 0;
};

const getPercentFromDiscountString = (discountStr: string) => {
    if (!discountStr) return 0;
    // convert persian digits to english digits
    let clean = String(discountStr)
        .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
    
    // Check if it contains percentage indicator (% or ٪ or درصد)
    if (clean.includes('%') || clean.includes('٪') || clean.includes('درصد')) {
        const match = clean.match(/(\d+(?:\.\d+)?)/);
        if (match) {
            return parseFloat(match[1]);
        }
    }
    return 0;
};

const ProductCard: React.FC<{ product: any, onSelect: () => void, discount?: number, specialOffer?: any }> = ({ product, onSelect, discount, specialOffer }) => {
    const originalPrice = product.price;
    const numericOriginalPrice = parsePrice(product.price);
    
    // Parse golden offer percentage discount if any
    const specialOfferPercent = specialOffer ? getPercentFromDiscountString(specialOffer.discount) : 0;
    const totalDiscount = (discount || 0) + specialOfferPercent;
    
    const hasDiscount = totalDiscount > 0;
    const discountedPrice = hasDiscount ? numericOriginalPrice * (1 - totalDiscount / 100) : numericOriginalPrice;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col cursor-pointer" onClick={onSelect}>
            <div className="relative w-full h-52 bg-slate-50 flex items-center justify-center p-6 border-b border-slate-100 overflow-hidden">
                {product.imageUrl ? (
                    <img src={product.imageUrl || undefined} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out drop-shadow-sm" />
                ) : (
                    <PlaceholderIcon />
                )}
                
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm shadow-sm ${
                        product.stock === 'موجود' ? 'bg-green-100/90 text-green-700 border border-green-200' : product.stock === 'تعداد محدود' ? 'bg-amber-100/90 text-amber-700 border border-amber-200' : 'bg-red-100/90 text-red-700 border border-red-200'
                    }`}>{product.stock}</span>
                </div>
                
                {(hasDiscount || specialOffer) && (
                     <div className="absolute top-3 right-3 flex flex-col gap-1 items-end">
                        {hasDiscount && (
                            <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-rose-500 text-white shadow-sm shadow-rose-200 animate-pulse">
                                {totalDiscount}٪ تخفیف
                            </span>
                        )}
                        {specialOffer && (
                            <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-amber-400 text-amber-900 shadow-sm shadow-amber-200">
                                پیشنهاد طلایی
                            </span>
                        )}
                     </div>
                )}
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <p className="text-[10px] uppercase font-bold tracking-widest text-brand mb-1">کد کالا: {product.code}</p>
                <h3 className="font-bold text-slate-800 flex-grow text-sm leading-relaxed mb-3 line-clamp-2">{product.name}</h3>
                
                {specialOffer && (
                    <div className="bg-amber-50 text-amber-800 text-[10px] p-2 rounded-lg mb-3 border border-amber-100 flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="line-clamp-1">{specialOffer.discount}</span>
                    </div>
                )}

                <div className="mt-auto pt-4 border-t border-slate-100/60">
                     {hasDiscount ? (
                        <div className="flex flex-col items-end">
                            <span className="text-[11px] font-medium text-slate-400 line-through decoration-rose-400 decoration-2">{originalPrice} ریال</span>
                            <div className="flex items-center gap-1 mt-0.5">
                                <span className="text-lg font-black text-rose-600 tracking-tight">{Math.round(discountedPrice).toLocaleString('fa-IR')}</span>
                                <span className="text-[10px] font-bold text-slate-500 mt-1">ریال</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-end">
                            <span className="text-[11px] h-4"></span>
                            <div className="flex items-center gap-1 mt-0.5">
                                <span className="text-lg font-black text-slate-800 tracking-tight">{originalPrice}</span>
                                <span className="text-[10px] font-bold text-slate-500 mt-1">ریال</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


const ProductCatalog = ({ onProductSelect, customer, productDiscounts = [], products, specialOffers = [] }: { onProductSelect: (product: any) => void; customer?: any; productDiscounts?: any[]; products: any[]; specialOffers?: any[] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('همه');
    
    // Calculate categories dynamically based on products prop
    const categories = useMemo(() => ['همه', ...Array.from(new Set(products.map(p => p.category)))], [products]);

    // Group products by base name (removing " سایز ...")
    const groupedProducts = useMemo(() => {
        const groups: { [key: string]: any } = {};
        
        products.forEach(product => {
            // Visibility check
            const isVisible = !product.type || product.type === 'public' || (product.type === 'specific' && customer && product.customerIds?.includes(customer.id));
            if (!isVisible) return;

            let baseName = product.name;
            // Robustly remove " سایز " and anything after it to get the base name
            const separator = ' سایز ';
            const sizeIndex = product.name.lastIndexOf(separator);
            
            if (sizeIndex !== -1) {
                baseName = product.name.substring(0, sizeIndex);
            }

            // Create grouping. If group doesn't exist, create it. 
            // If it exists but current product is 'In Stock' while stored one isn't, replace it (so card shows Available)
            if (!groups[baseName]) {
                groups[baseName] = { ...product, name: baseName, originalName: product.name };
            } else if (groups[baseName].stock !== 'موجود' && product.stock === 'موجود') {
                groups[baseName] = { ...product, name: baseName, originalName: product.name };
            }
        });

        return Object.values(groups);
    }, [products, customer]);

    const getProductDiscount = (productCode: string) => {
        if (!customer || !productDiscounts) return 0;
        
        // Check for specific discount for this customer
        const specificDiscount = productDiscounts.find(d => 
            d.productId === productCode && 
            d.type === 'specific' && 
            d.customerIds?.includes(customer.id)
        );
        if (specificDiscount) return specificDiscount.percentage;

        // Check for public discount
        const publicDiscount = productDiscounts.find(d => 
            d.productId === productCode && 
            d.type === 'public'
        );
        if (publicDiscount) return publicDiscount.percentage;

        return 0;
    };

    const getSpecialOffer = (baseName: string) => {
        if (!specialOffers) return null;
        // Check if there is an offer for any product matching this baseName or clean name
        const matchingProducts = products.filter(p => p.name.includes(baseName) || baseName.includes(p.name));
        for (const p of matchingProducts) {
             const offer = specialOffers.find(o => {
                 const nameMatches = o.productName === p.name || 
                                     p.name.includes(o.productName) || 
                                     o.productName.includes(p.name);
                 const isForCustomer = o.type === 'public' || 
                                       (o.type === 'specific' && customer && Number(o.customerId) === Number(customer.id));
                 return nameMatches && isForCustomer;
             });
             if (offer) return offer;
        }
        return null;
    };

    const filteredProducts = useMemo(() => {
        return groupedProducts.filter(product => {
            const matchesCategory = activeCategory === 'همه' || product.category === activeCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.code.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, activeCategory, groupedProducts]);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800">کاتالوگ محصولات</h1>
            <p className="mt-1 text-gray-500">محصولات مورد نظر خود را جستجو و مشاهده کنید.</p>
            
            <div className="mt-6 bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative w-full sm:flex-grow">
                    <input 
                        type="text" 
                        placeholder="جستجو بر اساس نام یا کد محصول..." 
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                        <SearchIcon />
                    </div>
                </div>
                <div className="relative w-full sm:w-auto">
                    <select 
                        className="appearance-none w-full sm:w-48 bg-gray-50 border border-gray-200 rounded-lg py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                        value={activeCategory}
                        onChange={(e) => setActiveCategory(e.target.value)}
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                     <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                        <FilterIcon />
                    </div>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredProducts.map((product, index) => (
                    <ProductCard 
                        key={index} 
                        product={product}
                        onSelect={() => onProductSelect(product)}
                        discount={getProductDiscount(product.code)}
                        specialOffer={getSpecialOffer(product.name)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductCatalog;
