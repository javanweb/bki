import React, { useState } from 'react';
import { PlusIcon, CubeIcon, TrashIcon } from '../../dashboard/DashboardIcons';

interface VariantRow {
    id: number;
    size: string;
    code: string;
    price: string;
    packageQuantity: string;
    cartonQuantity: string;
    stock: string;
}

const ProductManagement = ({ products, setProducts, customers }) => {
    // Base Product Info
    const [baseName, setBaseName] = useState('');
    const [category, setCategory] = useState('تک لایه');
    const [imageUrl, setImageUrl] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    
    // Visibility
    const [type, setType] = useState('public');
    const [selectedCustomerIds, setSelectedCustomerIds] = useState<number[]>([]);
    const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);

    // Variants (Sizes)
    const [variants, setVariants] = useState<VariantRow[]>([
        { id: Date.now(), size: '', code: '', price: '', packageQuantity: '', cartonQuantity: '', stock: 'موجود' }
    ]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImageUrl(result);
                setImagePreview(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCustomerSelection = (customerId) => {
        setSelectedCustomerIds(prev =>
            prev.includes(customerId)
                ? prev.filter(id => id !== customerId)
                : [...prev, customerId]
        );
    };

    // Variant Management
    const addVariantRow = () => {
        setVariants(prev => [
            ...prev,
            { id: Date.now(), size: '', code: '', price: '', packageQuantity: '', cartonQuantity: '', stock: 'موجود' }
        ]);
    };

    const removeVariantRow = (id: number) => {
        if (variants.length > 1) {
            setVariants(prev => prev.filter(v => v.id !== id));
        }
    };

    const handleVariantChange = (id: number, field: keyof VariantRow, value: string) => {
        setVariants(prev => prev.map(v => v.id === id ? { ...v, [field]: value } : v));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!baseName) {
            alert('لطفا نام اصلی کالا را وارد کنید.');
            return;
        }
        
        if (type === 'specific' && selectedCustomerIds.length === 0) {
            alert('لطفاً حداقل یک مشتری را انتخاب کنید.');
            return;
        }

        const validVariants = variants.filter(v => v.size && v.code && v.price);
        if (validVariants.length === 0) {
            alert('لطفا حداقل یک سایز با اطلاعات کامل (سایز، کد، قیمت) وارد کنید.');
            return;
        }

        const newProducts = validVariants.map(variant => ({
            name: `${baseName} سایز ${variant.size}`,
            code: variant.code,
            category,
            price: parseInt(variant.price).toLocaleString('fa-IR'),
            stock: variant.stock,
            imageUrl: imageUrl || 'https://via.placeholder.com/150',
            packageQuantity: parseInt(variant.packageQuantity) || 1,
            cartonQuantity: parseInt(variant.cartonQuantity) || 1,
            type,
            customerIds: type === 'specific' ? selectedCustomerIds : [],
        }));

        setProducts(prev => [...prev, ...newProducts]);

        // Reset form
        setBaseName('');
        setVariants([{ id: Date.now(), size: '', code: '', price: '', packageQuantity: '', cartonQuantity: '', stock: 'موجود' }]);
        setImageUrl('');
        setImagePreview(null);
        setType('public');
        setSelectedCustomerIds([]);
        alert(`${newProducts.length} محصول با موفقیت اضافه شد.`);
    };

    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                    <CubeIcon />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">تعریف کالا و سایزبندی</h1>
                    <p className="mt-1 text-gray-500">محصولات جدید را با سایزهای مختلف تعریف کنید.</p>
                </div>
            </div>

            {/* Product Definition Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Step 1: Base Information */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 border-b pb-4 mb-6 flex items-center gap-2">
                        <span className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">۱</span>
                        اطلاعات پایه محصول
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">نام اصلی کالا</label>
                            <input 
                                type="text" 
                                value={baseName} 
                                onChange={e => setBaseName(e.target.value)} 
                                required
                                placeholder="مثال: لوله تک لایه PPR"
                                className="w-full bg-slate-50 border-2 border-slate-300 rounded-lg py-2.5 px-3 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/20 transition-all font-medium text-gray-700" 
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">تصویر محصول</label>
                            <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer" />
                            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-16 w-16 object-contain border rounded-lg" />}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">قابلیت مشاهده</label>
                            <div className="flex flex-wrap items-center gap-6 mt-2">
                                <label className="flex items-center cursor-pointer">
                                    <input type="radio" name="visibility-type" value="public" checked={type === 'public'} onChange={() => setType('public')} className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                                    <span className="ml-2 text-sm text-gray-700">همه مشتریان</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input type="radio" name="visibility-type" value="specific" checked={type === 'specific'} onChange={() => setType('specific')} className="h-4 w-4 text-blue-600 focus:ring-blue-500" />
                                    <span className="ml-2 text-sm text-gray-700">مشتریان خاص</span>
                                </label>
                            </div>
                            
                            {type === 'specific' && (
                                <div className="relative mt-3">
                                    <button type="button" onClick={() => setIsCustomerDropdownOpen(!isCustomerDropdownOpen)} className="w-full text-right bg-gray-50 border border-gray-300 rounded-lg py-2 px-3 flex justify-between items-center text-sm">
                                        <span>{selectedCustomerIds.length > 0 ? `${selectedCustomerIds.length} مشتری انتخاب شده` : 'انتخاب مشتریان...'}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isCustomerDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                    </button>
                                    {isCustomerDropdownOpen && (
                                        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg border rounded-lg max-h-60 overflow-auto p-1">
                                            {customers.map(customer => (
                                                <div key={customer.id} className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer" onClick={() => handleCustomerSelection(customer.id)}>
                                                    <input type="checkbox" checked={selectedCustomerIds.includes(customer.id)} onChange={() => {}} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                    <label className="ml-3 flex-1 text-sm text-gray-700 cursor-pointer">{customer.name} <span className="text-gray-400 text-xs">({customer.company})</span></label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Step 2: Variants Table */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center border-b pb-4 mb-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <span className="bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">۲</span>
                            جدول سایز و قیمت‌ها
                        </h2>
                        <button type="button" onClick={addVariantRow} className="text-blue-600 hover:text-blue-700 text-sm font-semibold flex items-center gap-1">
                            <PlusIcon /> افزودن ردیف جدید
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-right">
                            <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 min-w-[120px]">سایز <span className="text-red-500">*</span></th>
                                    <th className="px-4 py-3 min-w-[120px]">کد کالا <span className="text-red-500">*</span></th>
                                    <th className="px-4 py-3 min-w-[120px]">قیمت (ریال) <span className="text-red-500">*</span></th>
                                    <th className="px-4 py-3 min-w-[100px]">تعداد در بسته <span className="text-red-500">*</span></th>
                                    <th className="px-4 py-3 min-w-[100px]">تعداد در کارتن <span className="text-red-500">*</span></th>
                                    <th className="px-4 py-3 min-w-[120px]">وضعیت</th>
                                    <th className="px-4 py-3 w-10"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {variants.map((variant, index) => (
                                    <tr key={variant.id} className="group hover:bg-gray-50">
                                        <td className="px-2 py-2">
                                            <input 
                                                type="text" 
                                                required
                                                placeholder="مثال: ۲۰" 
                                                value={variant.size}
                                                onChange={(e) => handleVariantChange(variant.id, 'size', e.target.value)}
                                                className="w-full bg-slate-50 border-2 border-slate-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/20 transition-all text-gray-700"
                                            />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input 
                                                type="text" 
                                                required
                                                placeholder="کد یکتا" 
                                                value={variant.code}
                                                onChange={(e) => handleVariantChange(variant.id, 'code', e.target.value)}
                                                dir="ltr"
                                                className="w-full bg-slate-50 border-2 border-slate-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/20 transition-all text-left text-gray-700"
                                            />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input
                                                type="number" 
                                                required
                                                placeholder="0" 
                                                value={variant.price}
                                                onChange={(e) => handleVariantChange(variant.id, 'price', e.target.value)}
                                                dir="ltr"
                                                className="w-full bg-slate-50 border-2 border-slate-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/20 transition-all text-left text-gray-700"
                                            />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input dir="ltr" 
                                                type="number" 
                                                required
                                                placeholder="0" 
                                                value={variant.packageQuantity}
                                                onChange={(e) => handleVariantChange(variant.id, 'packageQuantity', e.target.value)}
                                                className="w-full bg-slate-50 border-2 border-slate-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/20 transition-all text-center text-gray-700"
                                            />
                                        </td>
                                        <td className="px-2 py-2">
                                            <input dir="ltr" 
                                                type="number" 
                                                required
                                                placeholder="0" 
                                                value={variant.cartonQuantity}
                                                onChange={(e) => handleVariantChange(variant.id, 'cartonQuantity', e.target.value)}
                                                className="w-full bg-slate-50 border-2 border-slate-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/20 transition-all text-center text-gray-700"
                                            />
                                        </td>
                                        <td className="px-2 py-2">
                                            <select 
                                                value={variant.stock}
                                                onChange={(e) => handleVariantChange(variant.id, 'stock', e.target.value)}
                                                className="w-full bg-slate-50 border-2 border-slate-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/20 transition-all text-gray-700"
                                            >
                                                <option>موجود</option>
                                                <option>ناموجود</option>
                                                <option>تعداد محدود</option>
                                            </select>
                                        </td>
                                        <td className="px-2 py-2 text-center">
                                            {variants.length > 1 && (
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeVariantRow(variant.id)}
                                                    className="text-gray-400 hover:text-red-500 p-1"
                                                >
                                                    <TrashIcon />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="bg-green-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-700 shadow-md transition-colors flex items-center gap-2 text-lg">
                        <PlusIcon />
                        ثبت نهایی کالاها
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductManagement;