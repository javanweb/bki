import React, { useState, useEffect } from 'react';
import { TrashIcon, CatalogIcon, EditIcon } from '../../dashboard/DashboardIcons';
import CheckIcon from '../../icons/CheckIcon';
import CloseIcon from '../../icons/CloseIcon';
import SearchIcon from '../../icons/SearchIcon';
import ChevronDownIcon from '../../icons/ChevronDownIcon';

const RegisteredProductList = ({ products, setProducts, customers }) => {
    const [isBulkEditing, setIsBulkEditing] = useState(false);
    const [tempProducts, setTempProducts] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [openCustomerPicker, setOpenCustomerPicker] = useState<string | null>(null);

    // Helper to convert to Persian Digits
    const toPersianDigits = (n: any) => {
        if (n === null || n === undefined) return '';
        return n.toString().replace(/\d/g, (d: string) => '۰۱۲۳۴۵۶۷۸۹'[parseInt(d)]);
    };

    // Initialize tempProducts when entering edit mode
    const startBulkEditing = () => {
        setTempProducts(products.map(p => ({
            ...p,
            customerIds: p.customerIds || []
        })));
        setIsBulkEditing(true);
    };

    const cancelBulkEditing = () => {
        setIsBulkEditing(false);
        setTempProducts([]);
        setOpenCustomerPicker(null);
    };

    const saveBulkEditing = () => {
        setProducts(tempProducts);
        setIsBulkEditing(false);
        setTempProducts([]);
        setOpenCustomerPicker(null);
    };

    const handleTempProductChange = (code: string, field: string, value: any) => {
        setTempProducts(prev => prev.map(p => 
            p.code === code ? { ...p, [field]: value } : p
        ));
    };

    const toggleCustomerInProduct = (productCode: string, customerId: number) => {
        setTempProducts(prev => prev.map(p => {
            if (p.code === productCode) {
                const currentIds = p.customerIds || [];
                const newIds = currentIds.includes(customerId)
                    ? currentIds.filter(id => id !== customerId)
                    : [...currentIds, customerId];
                return { ...p, customerIds: newIds };
            }
            return p;
        }));
    };

    const handleDeleteProduct = (productCode) => {
        if (window.confirm('آیا از حذف این محصول اطمینان دارید؟')) {
            setProducts(prev => prev.filter(p => p.code !== productCode));
            if (isBulkEditing) {
                setTempProducts(prev => prev.filter(p => p.code !== productCode));
            }
        }
    };

    // Keyboard Navigation Handler
    const handleKeyDown = (e: React.KeyboardEvent, rowIndex: number, colIndex: number) => {
        // Prevent default behavior for arrows in number inputs (increment/decrement)
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
        }

        const totalCols = 5; // packageQty, cartonQty, price, stock, visibility
        const filteredLength = filteredProducts.length;

        let nextRow = rowIndex;
        let nextCol = colIndex;

        if (e.key === 'ArrowDown') {
            nextRow = Math.min(rowIndex + 1, filteredLength - 1);
        } else if (e.key === 'ArrowUp') {
            nextRow = Math.max(rowIndex - 1, 0);
        } else if (e.key === 'ArrowLeft') {
            if (colIndex < totalCols - 1) {
                nextCol = colIndex + 1;
            } else if (rowIndex < filteredLength - 1) {
                nextCol = 0;
                nextRow = rowIndex + 1;
            }
        } else if (e.key === 'ArrowRight') {
            if (colIndex > 0) {
                nextCol = colIndex - 1;
            } else if (rowIndex > 0) {
                nextCol = totalCols - 1;
                nextRow = rowIndex - 1;
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (colIndex < totalCols - 1) {
                nextCol = colIndex + 1;
            } else if (rowIndex < filteredLength - 1) {
                nextCol = 0;
                nextRow = rowIndex + 1;
            }
        } else {
            return; 
        }

        const nextEl = document.querySelector(`[data-row="${nextRow}"][data-col="${nextCol}"]`) as HTMLElement;
        if (nextEl) {
            nextEl.focus();
            if (nextEl instanceof HTMLInputElement) {
                nextEl.select();
            }
        }
    };

    const getVisibilityDisplay = (product) => {
        if (!product.type || product.type === 'public') return 'عمومی';
        const count = product.customerIds?.length || 0;
        return `مشتریان خاص (${toPersianDigits(count)})`;
    };

    const displayList = isBulkEditing ? tempProducts : products;

    const filteredProducts = displayList.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                        <CatalogIcon />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">لیست محصولات ثبت شده</h1>
                        <p className="mt-1 text-gray-500">مشاهده و ویرایش جزئیات تمامی محصولات سیستم.</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {!isBulkEditing ? (
                        <button 
                            onClick={startBulkEditing}
                            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm font-semibold"
                        >
                            <EditIcon />
                            ویرایش لیست محصولات
                        </button>
                    ) : (
                        <>
                            <button 
                                onClick={saveBulkEditing}
                                className="bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 shadow-sm font-semibold"
                            >
                                <CheckIcon />
                                ذخیره تغییرات
                            </button>
                            <button 
                                onClick={cancelBulkEditing}
                                className="bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2 shadow-sm font-semibold"
                            >
                                <CloseIcon />
                                انصراف
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4 border border-gray-100">
                <div className="relative flex-grow">
                    <input 
                        type="text" 
                        placeholder="جستجو در محصولات (نام یا کد)..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                        <SearchIcon />
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-right text-gray-600">
                        <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
                            <tr>
                                <th className="px-4 py-3">تصویر</th>
                                <th className="px-4 py-3">نام محصول</th>
                                <th className="px-4 py-3">کد محصول</th>
                                <th className="px-4 py-3">بسته</th>
                                <th className="px-4 py-3">کارتن</th>
                                <th className="px-4 py-3">قیمت (ریال)</th>
                                <th className="px-4 py-3">وضعیت</th>
                                <th className="px-4 py-3">نمایش</th>
                                <th className="px-4 py-3 text-center">عملیات</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredProducts.length > 0 ? filteredProducts.map((product, rowIndex) => (
                                <tr key={product.code + rowIndex} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-4">
                                        <img src={product.imageUrl || undefined} alt={product.name} className="h-10 w-10 object-contain bg-gray-100 rounded p-1" />
                                    </td>
                                    <td className="px-4 py-4 font-bold text-gray-800">
                                        {isBulkEditing ? (
                                            <input 
                                                type="text"
                                                value={product.name}
                                                onChange={e => handleTempProductChange(product.code, 'name', e.target.value)}
                                                className="bg-transparent border-b border-dashed border-gray-300 focus:border-blue-500 focus:outline-none w-full"
                                            />
                                        ) : product.name}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-mono">{toPersianDigits(product.code)}</td>
                                    <td className="px-4 py-4">
                                        {isBulkEditing ? (
                                            <input 
                                                type="text" 
                                                dir="ltr"
                                                data-row={rowIndex}
                                                data-col={0}
                                                value={toPersianDigits(product.packageQuantity)} 
                                                onChange={e => {
                                                    const val = e.target.value.replace(/[^۰-۹0-9]/g, '');
                                                    // Convert Persian to English before saving to state
                                                    const engVal = val.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
                                                    handleTempProductChange(product.code, 'packageQuantity', parseInt(engVal) || 0)
                                                }}
                                                onKeyDown={e => handleKeyDown(e, rowIndex, 0)}
                                                className="w-16 border-gray-300 rounded text-center text-sm p-1 focus:ring-1 focus:ring-blue-500 outline-none"
                                            />
                                        ) : toPersianDigits(product.packageQuantity)}
                                    </td>
                                    <td className="px-4 py-4">
                                        {isBulkEditing ? (
                                            <input 
                                                type="text" 
                                                dir="ltr"
                                                data-row={rowIndex}
                                                data-col={1}
                                                value={toPersianDigits(product.cartonQuantity)} 
                                                onChange={e => {
                                                    const val = e.target.value.replace(/[^۰-۹0-9]/g, '');
                                                    const engVal = val.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
                                                    handleTempProductChange(product.code, 'cartonQuantity', parseInt(engVal) || 0)
                                                }}
                                                onKeyDown={e => handleKeyDown(e, rowIndex, 1)}
                                                className="w-16 border-gray-300 rounded text-center text-sm p-1 focus:ring-1 focus:ring-blue-500 outline-none"
                                            />
                                        ) : toPersianDigits(product.cartonQuantity)}
                                    </td>
                                    <td className="px-4 py-4 font-semibold">
                                        {isBulkEditing ? (
                                            <input 
                                                type="text" 
                                                dir="ltr"
                                                data-row={rowIndex}
                                                data-col={2}
                                                value={toPersianDigits(product.price)} 
                                                onChange={e => {
                                                    const val = e.target.value.replace(/[^۰-۹0-9,]/g, '');
                                                    const engVal = val.replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString());
                                                    handleTempProductChange(product.code, 'price', engVal)
                                                }}
                                                onKeyDown={e => handleKeyDown(e, rowIndex, 2)}
                                                className="w-24 border-gray-300 rounded text-center text-sm font-semibold p-1 focus:ring-1 focus:ring-blue-500 outline-none"
                                            />
                                        ) : toPersianDigits(product.price)}
                                    </td>
                                    <td className="px-4 py-4">
                                        {isBulkEditing ? (
                                            <select 
                                                data-row={rowIndex}
                                                data-col={3}
                                                value={product.stock} 
                                                onChange={e => handleTempProductChange(product.code, 'stock', e.target.value)}
                                                onKeyDown={e => handleKeyDown(e, rowIndex, 3)}
                                                className={`border-gray-300 rounded text-xs p-1 focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer w-full ${
                                                    product.stock === 'موجود' ? 'text-green-600' : product.stock === 'ناموجود' ? 'text-red-600' : 'text-amber-600'
                                                }`}
                                            >
                                                <option value="موجود">موجود</option>
                                                <option value="ناموجود">ناموجود</option>
                                                <option value="تعداد محدود">تعداد محدود</option>
                                            </select>
                                        ) : (
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                                product.stock === 'موجود' ? 'bg-green-100 text-green-700' : product.stock === 'ناموجود' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                            }`}>{product.stock}</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 text-xs relative">
                                        {isBulkEditing ? (
                                            <div className="flex flex-col gap-1">
                                                <select 
                                                    data-row={rowIndex}
                                                    data-col={4}
                                                    value={product.type} 
                                                    onChange={e => handleTempProductChange(product.code, 'type', e.target.value)}
                                                    onKeyDown={e => handleKeyDown(e, rowIndex, 4)}
                                                    className="border-gray-300 rounded text-xs p-1 focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer"
                                                >
                                                    <option value="public">همه مشتریان</option>
                                                    <option value="specific">مشتریان خاص</option>
                                                </select>
                                                {product.type === 'specific' && (
                                                    <button 
                                                        onClick={() => setOpenCustomerPicker(openCustomerPicker === product.code ? null : product.code)}
                                                        className="text-[10px] text-blue-600 hover:underline flex items-center justify-between bg-blue-50 p-1 rounded"
                                                    >
                                                        <span>{toPersianDigits(product.customerIds?.length || 0)} مشتری</span>
                                                        <ChevronDownIcon />
                                                    </button>
                                                )}
                                                
                                                {/* Customer Selection Dropdown */}
                                                {openCustomerPicker === product.code && (
                                                    <div className="absolute top-full right-0 z-50 mt-1 w-56 bg-white shadow-xl border rounded-lg p-2 max-h-48 overflow-y-auto ring-1 ring-black ring-opacity-5">
                                                        <div className="text-[10px] font-bold text-gray-400 mb-2 px-1 border-b pb-1">انتخاب مشتریان</div>
                                                        {customers.map(customer => (
                                                            <label key={customer.id} className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded cursor-pointer transition-colors">
                                                                <input 
                                                                    type="checkbox" 
                                                                    checked={product.customerIds?.includes(customer.id)}
                                                                    onChange={() => toggleCustomerInProduct(product.code, customer.id)}
                                                                    className="h-3.5 w-3.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                                />
                                                                <span className="text-[11px] text-gray-700 truncate">{customer.name}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            getVisibilityDisplay(product)
                                        )}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <button onClick={() => handleDeleteProduct(product.code)} className="text-red-400 hover:text-red-600 transition-colors p-1" title="حذف">
                                            <TrashIcon />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={9} className="px-6 py-8 text-center text-gray-500 italic">هیچ محصولی با این مشخصات یافت نشد.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RegisteredProductList;