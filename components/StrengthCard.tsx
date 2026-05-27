import React from 'react';

interface StrengthCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StrengthCard: React.FC<StrengthCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="mx-auto h-16 w-16 rounded-full bg-brand flex items-center justify-center">
        {icon}
      </div>
      <h3 className="mt-6 text-lg font-bold text-gray-800">{title}</h3>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default StrengthCard;