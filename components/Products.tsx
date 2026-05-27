
import React from 'react';
import ProductCard from './ProductCard';

const products = [
    {
        title: 'لوله تک لایه پلیمری',
        imageUrl: 'https://kavirbaspar.com/wp-content/uploads/2022/02/taklayeh.jpg'
    },
    {
        title: 'لوله سه لایه فایبرگلاس',
        imageUrl: 'https://kavirbaspar.com/wp-content/uploads/2022/02/3layeh.jpg'
    },
    {
        title: 'لوله تک لایه حلقه ای',
        imageUrl: 'https://images.unsplash.com/photo-1632766391910-3a363771b315?q=80&w=200&h=200&auto=format&fit=crop&crop=center'
    },
    {
        title: 'لوله سه لایه فایبرگلاس حلقه ای',
        imageUrl: 'https://images.unsplash.com/photo-1599494193939-556b2789445c?q=80&w=200&h=200&auto=format&fit=crop&crop=center'
    },
    {
        title: 'اتصالات پلیمری',
        imageUrl: 'https://kavirbaspar.com/wp-content/uploads/2022/03/%D8%B2%D8%A7%D9%86%D9%88-90-%D8%AF%D8%B1%D8%AC%D9%87-1-1.jpg'
    }
];

const Products: React.FC<{ onProductSelect: (product: any) => void }> = ({ onProductSelect }) => {
    return (
        <section id="products-section" className="py-20 sm:py-28 bg-white">
            <div className="max-w-screen-2xl mx-auto px-12 sm:px-16 lg:px-24">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                        محصولات
                    </h2>
                </div>

                <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
                    {products.map((product, index) => (
                        <ProductCard 
                            key={index}
                            title={product.title}
                            imageUrl={product.imageUrl}
                            onProductSelect={() => onProductSelect(product)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
