
import React from 'react';

interface IndustryCardProps {
  title: string;
  imageUrl: string;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ title, imageUrl }) => {
  return (
    <div className="group relative h-64 rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <img 
        src={imageUrl || undefined} 
        alt={title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-6">
        <h3 className="text-white text-xl font-bold">{title}</h3>
      </div>
    </div>
  );
};

export default IndustryCard;
