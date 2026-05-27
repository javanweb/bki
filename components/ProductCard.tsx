import React from 'react';
import PlaceholderIcon from './icons/PlaceholderIcon';

interface ProductCardProps {
  title: string;
  imageUrl?: string;
  onProductSelect: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, imageUrl, onProductSelect }) => {
  return (
    <div onClick={onProductSelect} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1 block text-center cursor-pointer">
      <div className="relative w-full h-40 bg-white flex items-center justify-center p-4 overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl || undefined} alt={title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <PlaceholderIcon />
        )}
      </div>
      <div className="p-5">
        <h3 className="text-base font-semibold text-gray-800 h-12 flex items-center justify-center leading-tight">{title}</h3>
      </div>
    </div>
  );
};

export default ProductCard;