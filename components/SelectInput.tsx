
import React from 'react';
import ChevronDownIcon from './icons/ChevronDownIcon';

const SelectInput: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="relative">
        <select 
            className="appearance-none w-full bg-white/10 border border-white/30 rounded-lg py-3 pr-4 pl-10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors cursor-pointer"
            aria-label="انتخاب گزینه"
        >
            {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-4 text-gray-300">
            <ChevronDownIcon />
        </div>
    </div>
);

export default SelectInput;
