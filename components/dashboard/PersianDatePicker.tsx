
import React, { useState, useEffect, useRef } from 'react';

// Helper functions for date conversion
const toJalaali = (gy, gm, gd) => {
    var g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var jy = (gy <= 1600) ? 0 : 979;
    gy -= (gy <= 1600) ? 621 : 1600;
    var gy2 = (gm > 2) ? (gy + 1) : gy;
    var days = (365 * gy) + (Math.floor((gy2 + 3) / 4)) - (Math.floor((gy2 + 99) / 100)) + (Math.floor((gy2 + 399) / 400)) - 80 + gd + g_d_m[gm - 1];
    jy += 33 * (Math.floor(days / 12053));
    days %= 12053;
    jy += 4 * (Math.floor(days / 1461));
    days %= 1461;
    jy += Math.floor((days - 1) / 365);
    if (days > 365) days = (days - 1) % 365;
    var jm = (days < 186) ? 1 + Math.floor(days / 31) : 7 + Math.floor((days - 186) / 30);
    var jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
    return [jy, jm, jd];
};

const toGregorian = (jy, jm, jd) => {
    var gy = (jy <= 979) ? 621 : 1600;
    jy -= (jy <= 979) ? 0 : 979;
    var days = (365 * jy) + (Math.floor(jy / 33) * 8) + Math.floor(((jy % 33) + 3) / 4) + 78 + jd + ((jm < 7) ? (jm - 1) * 31 : ((jm - 7) * 30) + 186);
    gy += 400 * Math.floor(days / 146097);
    days %= 146097;
    if (days > 36524) {
        gy += 100 * Math.floor(--days / 36524);
        days %= 36524;
        if (days >= 365) days++;
    }
    gy += 4 * Math.floor(days / 1461);
    days %= 1461;
    gy += Math.floor((days - 1) / 365);
    if (days > 365) days = (days - 1) % 365;
    var gd = days + 1;
    var sal_a = [0, 31, ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var gm;
    for (gm = 0; gm < 13; gm++) {
        if (gd <= sal_a[gm]) break;
        gd -= sal_a[gm];
    }
    return [gy, gm, gd];
};

const toPersianDigits = (n) => String(n).replace(/[0-9]/g, d => '۰۱۲۳۴۵۶۷۸۹'[d]);

const jalaaliMonthLength = (year, month) => {
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    const isLeap = (((((year - 474) % 2820) + 512) * 682) % 2816) < 682;
    return isLeap ? 30 : 29;
};

const PersianDatePicker = ({ value, onChange, wrapperClassName = '', inputClassName = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const todayGregorian = new Date();
    const [todayYear, todayMonth, todayDay] = toJalaali(todayGregorian.getFullYear(), todayGregorian.getMonth() + 1, todayGregorian.getDate());
    
    const [viewDate, setViewDate] = useState(() => ({ year: todayYear, month: todayMonth }));
    const [time, setTime] = useState(new Date());
    const pickerRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    useEffect(() => {
        if (isOpen && value) {
            const [y, m] = value.split('/').map(Number);
            if (y && m) {
                setViewDate({ year: y, month: m });
            }
        }
    }, [isOpen, value]);

    const jalaaliMonths = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
    const daysOfWeek = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
    
    const getFullDateString = (year, month, day) => {
        if (!year || !month || !day) return 'تاریخی انتخاب نشده است';
        const [gy, gm, gd] = toGregorian(year, month, day);
        const date = new Date(gy, gm - 1, gd);
        const dayOfWeekName = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'][date.getDay()];
        const monthName = jalaaliMonths[month - 1];
        return `${dayOfWeekName}، ${toPersianDigits(day)} ${monthName} ${toPersianDigits(year)}`;
    };

    const getMonthDays = () => {
        const { year, month } = viewDate;
        const monthLength = jalaaliMonthLength(year, month);
        const [gy, gm, gd] = toGregorian(year, month, 1);
        const firstDayOfWeek = new Date(gy, gm - 1, gd).getDay();
        const startOffset = (firstDayOfWeek + 1) % 7;

        const prevMonth = month === 1 ? 12 : month - 1;
        const prevMonthYear = month === 1 ? year - 1 : year;
        const prevMonthLength = jalaaliMonthLength(prevMonthYear, prevMonth);

        const days = [];
        for (let i = 0; i < startOffset; i++) {
            days.push({ day: prevMonthLength - startOffset + 1 + i, isCurrentMonth: false });
        }
        for (let i = 1; i <= monthLength; i++) {
            days.push({ day: i, isCurrentMonth: true });
        }
        const totalCells = days.length;
        const remainingCells = 42 - totalCells;
        for (let i = 1; i <= remainingCells; i++) {
            days.push({ day: i, isCurrentMonth: false });
        }
        return days;
    };

    const handlePrevMonth = () => setViewDate(d => d.month === 1 ? { year: d.year - 1, month: 12 } : { year: d.year, month: d.month - 1 });
    const handleNextMonth = () => setViewDate(d => d.month === 12 ? { year: d.year + 1, month: 1 } : { year: d.year, month: d.month + 1 });
    
    const handleDateSelect = (day) => {
        if (!day) return;
        const { year, month } = viewDate;
        const formattedDate = `${year}/${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
        onChange(formattedDate);
        setIsOpen(false);
    };
    
    const [selectedYear, selectedMonth, selectedDay] = (value || '').split('/').map(s => parseInt(s, 10));
    
    return (
        <div className={`relative ${wrapperClassName}`} ref={pickerRef}>
            <div className="relative">
                <input
                    type="text"
                    value={value ? toPersianDigits(value) : ''}
                    placeholder="مثال: ۱۴۰۳/۰۵/۱۰"
                    onClick={() => setIsOpen(p => !p)}
                    readOnly
                    className={`w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-pointer ${inputClassName}`}
                />
                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </span>
            </div>
            {isOpen && (
                <div className="absolute z-10 top-full mt-2 w-80 bg-[#343a40] text-white rounded-lg shadow-2xl p-4 font-sans border border-slate-700">
                    <div className="text-center mb-2">
                        <span className="text-5xl font-light tracking-widest">{toPersianDigits(time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }))}</span>
                        <span className="text-3xl ml-2 font-light">
                            • {time.getHours() < 12 ? 'ق.ظ' : 'ب.ظ'}
                        </span>
                    </div>
                    <div className="text-center text-slate-300 mb-4 h-6">
                        {getFullDateString(selectedYear, selectedMonth, selectedDay)}
                    </div>

                    <div className="flex justify-between items-center mb-4 px-1">
                        <div className="font-semibold text-lg">{jalaaliMonths[viewDate.month - 1]}، {toPersianDigits(viewDate.year)}</div>
                        <div className="flex gap-2">
                            <button type="button" onClick={handleNextMonth} className="p-1 rounded-full hover:bg-slate-700 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
                            </button>
                             <button type="button" onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-slate-700 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-400 mb-2">
                        {daysOfWeek.map(d => <div key={d} className="w-9 h-9 flex items-center justify-center">{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {getMonthDays().map(({ day, isCurrentMonth }, index) => {
                             const isSelected = isCurrentMonth && viewDate.year === selectedYear && viewDate.month === selectedMonth && day === selectedDay;
                             const isToday = isCurrentMonth && viewDate.year === todayYear && viewDate.month === todayMonth && day === todayDay;
                             const isDisabled = !isCurrentMonth;
                             
                             const buttonClasses = `
                                w-9 h-9 flex items-center justify-center rounded-sm text-sm transition-all duration-200
                                ${isDisabled ? 'text-slate-600 cursor-default' : 'text-slate-200 hover:bg-slate-700 cursor-pointer'}
                                ${isSelected ? 'border-2 border-blue-500 text-blue-400 font-bold !bg-transparent' : ''}
                                ${isToday && !isSelected ? 'border border-slate-400' : ''}
                             `;

                             return (
                                <button
                                    type="button"
                                    key={index}
                                    onClick={() => !isDisabled && handleDateSelect(day)}
                                    disabled={isDisabled}
                                    className={buttonClasses}
                                >
                                    {day ? toPersianDigits(day) : ''}
                                </button>
                             );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PersianDatePicker;
