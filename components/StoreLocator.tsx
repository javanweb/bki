import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Header from './Header';
import Footer from './Footer';

// Fix for default Leaflet markers in React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Active cities ordered as specified by user: تهران، کرمان، شیراز، مشهد، کرج و یزد
const citiesContext: Record<string, [number, number]> = {
    'تهران': [35.6892, 51.3890],
    'کرمان': [30.2839, 57.0834],
    'شیراز': [29.5918, 52.5836],
    'مشهد': [36.2972, 59.6067],
    'کرج': [35.8327, 50.9915],
    'یزد': [31.8974, 54.3569],
};

const allRepresentatives = [
    { 
        id: 1, 
        name: 'دفتر مرکزی و فروشگاه شماره ۱ تهران', 
        city: 'تهران', 
        phone: '۰۲۱-۸۸۲۲۴۴۶۶', 
        mobile: '۰۹۱۲-۳۴۵۶۷۸۹', 
        address: 'تهران، خیابان ولیعصر، بالاتر از میدان ونک، برج نگین، طبقه همکف، واحد ۱۲', 
        lat: 35.7692, 
        lng: 51.4090, 
        manager: 'مهندس علی احمدی',
        hours: '۸:۰۰ الی ۱۸:۰۰ (پنجشنبه‌ها تا ۱۳:۰۰)',
        status: 'فعال - شعبه رسمی'
    },
    { 
        id: 2, 
        name: 'نمایندگی توزیع شبستر - غرب تهران', 
        city: 'تهران', 
        phone: '۰۲۱-۴۴۵۵۶۶۷۷', 
        mobile: '۰۹۱۲-۹۸۷۶۵۴۳', 
        address: 'تهران، بزرگراه آیت‌الله کاشانی، بعد از شهرداری منطقه ۵، پلاک ۲۴', 
        lat: 35.7234, 
        lng: 51.3211, 
        manager: 'حاج رضا صمدی',
        hours: '۸:۳۰ الی ۱۹:۰۰',
        status: 'فعال'
    },
    { 
        id: 3, 
        name: 'بازرگانی کرمانیان و پسران', 
        city: 'کرمان', 
        phone: '۰۳۴-۳۲۲۴۴۵۵', 
        mobile: '۰۹۱۳-۱۲۳۴۵۶۷', 
        address: 'کرمان، بلوار جمهوری اسلامی، بعد از چهارراه شفا، روبروی بانک ملی', 
        lat: 30.2939, 
        lng: 57.0934, 
        manager: 'مهندس حسین کرمانیان',
        hours: '۹:۰۰ الی ۲۰:۰۰ (پنجشنبه‌ها تا ۱۴:۰۰)',
        status: 'فعال - دفتر استانی'
    },
    { 
        id: 4, 
        name: 'صنایع لوله و اتصالات پارس (شیراز)', 
        city: 'شیراز', 
        phone: '۰۷۱-۳۲۳۳۴۴۵۵', 
        mobile: '۰۹۱۷-۲۲۲۳۳۴۴', 
        address: 'شیراز، خیابان لطفعلی خان زند، نرسیده به سه راه نمازی، پلاک نوین', 
        lat: 29.6100, 
        lng: 52.5400, 
        manager: 'دکتر سعید محمدی پور',
        hours: '۸:۰۰ الی ۱۷:۳۰',
        status: 'فعال'
    },
    { 
        id: 5, 
        name: 'بازرگانی سپاهان توس خراسان', 
        city: 'مشهد', 
        phone: '۰۵۱-۳۷۶۶۸۸۹۹', 
        mobile: '۰۹۱۵-۳۳۳۴۴۵۵', 
        address: 'مشهد، بلوار قرنی، چهارراه ابوطالب، پاساژ برج صنعت، واحد ۱۵', 
        lat: 36.3150, 
        lng: 59.5850, 
        manager: 'مهندس مجید رضایی طوس',
        hours: '۸:۰۰ الی ۱۸:۳۰',
        status: 'فعال'
    },
    { 
        id: 6, 
        name: 'کالای آب البرز (کرج)', 
        city: 'کرج', 
        phone: '۰۲۶-۳۲۵۵۶۶۷۷', 
        mobile: '۰۹۱۲-۷۷۷۸۸۹۹', 
        address: 'کرج، میدان آزادگان، ابتدای بلوار طالقانی شمالی، پلاک ۵۸', 
        lat: 35.8360, 
        lng: 50.9930, 
        manager: 'حاج حمید کریمی غفاری',
        hours: '۸:۳۰ الی ۲۰:۰۰',
        status: 'فعال'
    },
    { 
        id: 7, 
        name: 'یزد لوله و اتصالات ایساتیس', 
        city: 'یزد', 
        phone: '۰۳۵-۳۶۲۲۴۴۵۵', 
        mobile: '۰۹۱۳-۱۱۱۱۲۲۲', 
        address: 'یزد، بلوار پاکنژاد، بعد از چهارراه فرهنگیان، جنب مجتمع مسکونی مهر', 
        lat: 31.8950, 
        lng: 54.3520, 
        manager: 'مهندس امید علیزاده یزدی',
        hours: '۸:۰۰ الی ۱۳:۰۰ و ۱۶:۳۰ الی ۲۰:۳۰',
        status: 'فعال - نماینده انحصاری'
    },
];

// Helper Component to instantly control view focus and zoom
function MapController({ center, zoom, activeRepId }: { center: [number, number], zoom: number, activeRepId: number | null }) {
  const map = useMap();
  
  useEffect(() => {
    if (activeRepId) {
        const found = allRepresentatives.find(r => r.id === activeRepId);
        if (found) {
            map.setView([found.lat, found.lng], 15, {
                animate: true,
                duration: 1.2
            });
            return;
        }
    }
    
    map.setView(center, zoom, {
        animate: true,
        duration: 1.2
    });
  }, [center, zoom, activeRepId, map]);

  return null;
}

interface StoreLocatorProps {
    initialSelection: { country?: string; city?: string } | null;
    onNavigateHome: () => void;
    onNavigateToLogin: () => void;
    onNavigateToPartnership: () => void;
    onNavigateToAbout: () => void;
    onNavigateToGoals: () => void;
    onNavigateToArticles: () => void;
    onNavigateToContact: () => void;
    onNavigateToFAQ: () => void;
    onNavigateToFeedback: () => void;
    onProductSelect: (product: any) => void;
    onNavigateToAdminDashboard: () => void;
}

const StoreLocator: React.FC<StoreLocatorProps> = (props) => {
    const [selectedCity, setSelectedCity] = useState<string>(props.initialSelection?.city || '');
    const [activeRepId, setActiveRepId] = useState<number | null>(null);
    const mapRef = useRef<any>(null);

    // Filtered representatives based on selected city
    const filteredReps = useMemo(() => {
        if (!selectedCity) return allRepresentatives;
        return allRepresentatives.filter(rep => rep.city === selectedCity);
    }, [selectedCity]);

    const activeRep = useMemo(() => {
        if (!activeRepId) return null;
        return allRepresentatives.find(rep => rep.id === activeRepId);
    }, [activeRepId]);

    // Handle smooth search trigger from context sync
    useEffect(() => {
        if (props.initialSelection?.city) {
            setSelectedCity(props.initialSelection.city);
            // Default select the first one of the city if available
            const matching = allRepresentatives.find(rep => rep.city === props.initialSelection?.city);
            if (matching) {
                setActiveRepId(matching.id);
            }
        }
    }, [props.initialSelection]);

    // Map Coordinates & Zoom Settings
    const mapCenter: [number, number] = useMemo(() => {
        if (activeRep) {
            return [activeRep.lat, activeRep.lng];
        }
        if (selectedCity && citiesContext[selectedCity]) {
            return citiesContext[selectedCity];
        }
        return [32.4279, 53.6880]; // Center of Iran
    }, [selectedCity, activeRep]);
    
    const mapZoom = useMemo(() => {
        if (activeRep) return 15;
        if (selectedCity) return 12;
        return 5; // Nationwide overview
    }, [selectedCity, activeRep]);

    const handleRepSelect = (repId: number) => {
        setActiveRepId(repId);
    };

    return (
        <div className="bg-slate-50 font-sans min-h-screen flex flex-col antialiased">
            <Header 
                variant="light"
                onNavigateToLogin={props.onNavigateToLogin}
                onNavigateHome={props.onNavigateHome}
                onNavigateToPartnership={props.onNavigateToPartnership}
                onNavigateToAbout={props.onNavigateToAbout}
                onNavigateToGoals={props.onNavigateToGoals}
                onNavigateToArticles={props.onNavigateToArticles}
                onNavigateToContact={props.onNavigateToContact}
                onNavigateToFAQ={props.onNavigateToFAQ}
                onNavigateToFeedback={props.onNavigateToFeedback}
                onProductSelect={props.onProductSelect}
            />

            {/* PHASE 1: BRAND NEW HERO SECTION (بخش هرو با اطلاعات باکیفیت) */}
            <section className="relative pt-28 pb-14 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(16,185,129,0.08),transparent_45%)]"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4 animate-pulse">
                        <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                        شعبه‌ها و نمایندگی‌های معتبر ایران
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
                        مراکز رسمی فروش و پشتیبانی
                    </h1>
                    <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        محصولات ما را از طریق شبکه گسترده توزیع‌کنندگان مجاز و فروشگاه‌های زنجیره‌ای همکار در ۶ استان کشور تهیه فرمایید تا از گارانتی طلایی، اصالت کالا و تضمین قیمت بهره‌مند شوید.
                    </p>
                    
                    {/* Dynamic Badges / Key Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-700/50 pt-8 mt-4 text-right">
                        <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/30">
                            <p className="text-xs text-slate-400 mb-1">تعداد نمایندگان فعال</p>
                            <p className="text-xl font-bold text-emerald-400">۷ مرکز رسمی فروش</p>
                        </div>
                        <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/30">
                            <p className="text-xs text-slate-400 mb-1">پوشش جغرافیایی فعلی</p>
                            <p className="text-xl font-bold text-white">۶ کلان‌شهر ایران</p>
                        </div>
                        <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/30">
                            <p className="text-xs text-slate-400 mb-1">ارایه مستقیم خدمات</p>
                            <p className="text-xl font-bold text-white">بدون واسطه و مستقیم</p>
                        </div>
                        <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/30">
                            <p className="text-xs text-slate-400 mb-1">تضمین کالا</p>
                            <p className="text-xl font-bold text-emerald-400">۱۰۰٪ اصالت فیزیکی</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Interactive Map & Search Dashboard - PHASE 2: COMPACT & BALANCED LAYOUT */}
            <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex-grow">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Controls & Representatives List Sidebar */}
                    <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-xl p-6 flex flex-col gap-6">
                        <div>
                            <h2 className="text-xl font-extrabold text-slate-800 mb-1">فیلتر جغرافیایی</h2>
                            <p className="text-xs text-slate-500">موقعیت دلخواه را برای فیلتر کردن نمایندگان فعال روی لیست و نقشه برگزینید.</p>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">کشور</label>
                                <select 
                                    className="w-full bg-slate-100 border border-slate-200 text-slate-500 rounded-xl py-2.5 px-3 text-sm cursor-not-allowed focus:outline-none"
                                    disabled
                                >
                                    <option>ایران (فعال)</option>
                                    <option>آلمان (بزودی)</option>
                                    <option>کانادا (بزودی)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">انتخاب شهر هدف</label>
                                <select 
                                    value={selectedCity} 
                                    onChange={(e) => {
                                        setSelectedCity(e.target.value);
                                        setActiveRepId(null);
                                    }}
                                    className="w-full bg-white border-2 border-slate-200 hover:border-brand/40 rounded-xl py-2.5 px-3 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all text-sm font-semibold text-slate-800"
                                >
                                    <option value="">همه شهرها</option>
                                    {Object.keys(citiesContext).map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* List of Representatives */}
                        <div className="border-t border-slate-100 pt-4">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs font-bold text-slate-400">لیست نمایندگی‌های همکار</span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{filteredReps.length} مورد</span>
                            </div>

                            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                                {filteredReps.map(rep => {
                                    const isSelected = activeRepId === rep.id;
                                    return (
                                        <div 
                                            key={rep.id} 
                                            onClick={() => handleRepSelect(rep.id)}
                                            className={`p-4 rounded-2xl cursor-pointer text-right transition-all border ${
                                                isSelected 
                                                ? 'bg-gradient-to-br from-emerald-50 to-teal-50/20 border-emerald-500 shadow-md ring-2 ring-emerald-500/10' 
                                                : 'bg-white border-slate-100 hover:border-slate-300 shadow-sm'
                                            }`}
                                        >
                                            <div className="flex justify-between items-start gap-2 mb-1">
                                                <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-tight">
                                                    {rep.name}
                                                </h3>
                                                <span className={`text-[9px] shrink-0 font-bold px-2 py-0.5 rounded-full ${
                                                    isSelected ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-600'
                                                }`}>
                                                    {rep.city}
                                                </span>
                                            </div>
                                            
                                            <p className="text-slate-500 text-[11px] leading-relaxed mb-2 line-clamp-1">
                                                {rep.address}
                                            </p>

                                            <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-2 border-t border-slate-100/30">
                                                <div className="flex items-center gap-1">
                                                    <span className="font-semibold text-slate-700">تلفن:</span>
                                                    <span dir="ltr">{rep.phone}</span>
                                                </div>
                                                <div className="h-2 w-px bg-slate-200"></div>
                                                <div className="flex items-center gap-1">
                                                    <span className="font-semibold text-slate-700">مدیریت:</span>
                                                    <span>{rep.manager}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {filteredReps.length === 0 && (
                                    <div className="text-center py-6">
                                        <p className="text-slate-500 text-xs">نماینده‌ای در شهر منتخب یافت نشد.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    {/* Integrated Compact Live Map View & Quick Details Sheet - PHASE 2 & 3 */}
                    <div className="lg:col-span-8 flex flex-col gap-6">
                        
                        {/* Map Widget: Balanced Compact Frame with fast CartoDB Tiles */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
                            {/* Fast-load Map Indicator Badge */}
                            <div className="absolute top-3 left-3 z-[999] bg-white/95 backdrop-blur shadow-sm border border-slate-100 px-3 py-1.5 rounded-full flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-[10px] font-black text-slate-700">نقشه زنده ماهواره‌ای و شهری</span>
                            </div>

                            <div className="h-[430px] w-full z-0 relative">
                                <MapContainer 
                                    center={mapCenter} 
                                    zoom={mapZoom} 
                                    style={{ height: '100%', width: '100%', zIndex: 0 }}
                                    ref={mapRef}
                                >
                                    <MapController center={mapCenter} zoom={mapZoom} activeRepId={activeRepId} />
                                    
                                    {/* High performance tile server - Voyager maps load significantly faster */}
                                    <TileLayer
                                        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                    />
                                    
                                    {filteredReps.map(rep => (
                                        <Marker 
                                            key={rep.id} 
                                            position={[rep.lat, rep.lng]}
                                            eventHandlers={{
                                                click: () => handleRepSelect(rep.id),
                                            }}
                                        >
                                            <Popup>
                                                <div className="text-right font-sans p-1 max-w-[240px]" dir="rtl">
                                                    <h4 className="font-bold text-slate-800 text-sm mb-1">{rep.name}</h4>
                                                    <p className="text-[10px] text-emerald-600 font-extrabold mb-1">{rep.city} - {rep.status}</p>
                                                    <p className="text-[11px] text-slate-500 leading-normal mb-2">{rep.address}</p>
                                                    <div className="text-[11px] space-y-0.5 border-t border-slate-100 pt-1 text-slate-700">
                                                        <p><span className="font-bold">تلفن ثابت:</span> <span dir="ltr">{rep.phone}</span></p>
                                                        <p><span className="font-bold">همراه:</span> <span dir="ltr">{rep.mobile}</span></p>
                                                    </div>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    ))}
                                </MapContainer>
                            </div>
                        </div>

                        {/* PHASE 3: DYNAMIC LIVE REPRESENTATIVE DETAILS CARD */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 transition-all duration-300">
                            {activeRep ? (
                                <div className="text-right">
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                                        <div>
                                            <span className="inline-block text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-lg mb-1.5 border border-emerald-100">
                                                {activeRep.status}
                                            </span>
                                            <h3 className="text-xl font-bold text-slate-800">{activeRep.name}</h3>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xs text-slate-400">شهر:</span>
                                            <span className="text-sm font-extrabold text-brand bg-slate-100 px-3 py-1 rounded-xl">
                                                {activeRep.city}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Contact Numbers and Manager */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                                                <div className="bg-emerald-100 p-2.5 rounded-xl text-emerald-600 shrink-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] text-slate-400 font-bold">شماره تماس ثابت</p>
                                                    <a href={`tel:${activeRep.phone}`} className="text-base font-black text-slate-700 hover:text-emerald-600 transition-colors" dir="ltr">
                                                        {activeRep.phone}
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                                                <div className="bg-cyan-100 p-2.5 rounded-xl text-cyan-600 shrink-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] text-slate-400 font-bold">تلفن همراه و پشتیبانی</p>
                                                    <a href={`tel:${activeRep.mobile}`} className="text-base font-black text-slate-700 hover:text-cyan-600 transition-colors" dir="ltr">
                                                        {activeRep.mobile}
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                                                <div className="bg-indigo-100 p-2.5 rounded-xl text-indigo-600 shrink-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] text-slate-400 font-bold">نام مدیریت بخش</p>
                                                    <p className="text-sm font-bold text-slate-700">{activeRep.manager}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Address and Working Hours */}
                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 h-full">
                                                <div className="bg-amber-100 p-2.5 rounded-xl text-amber-600 shrink-0 mt-0.5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                                <div className="text-right flex-grow">
                                                    <p className="text-[10px] text-slate-400 font-bold">نشانی دقیق پستی</p>
                                                    <p className="text-sm font-bold text-slate-700 leading-relaxed mb-3">{activeRep.address}</p>
                                                    
                                                    <div className="border-t border-slate-100 pt-2 flex flex-col gap-1">
                                                        <span className="text-[10px] text-slate-400 font-bold">ساعات پذیرش کاری</span>
                                                        <span className="text-xs font-semibold text-slate-600">{activeRep.hours}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-emerald-50 text-emerald-800 text-xs font-semibold p-3 rounded-xl border border-emerald-100 mt-4 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>خریدار گرامی، برای ارایه بهترین قیمت لطفا در هنگام تماس ذکر فرمایید که از وب‌سایت نمایندگی مرکزی ما با آن‌ها آشنا شدید.</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <div className="inline-block p-4 bg-slate-50 rounded-full text-slate-400 mb-3 border border-slate-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-extrabold text-slate-700 mb-1">مکانی برای مشاهده انتخاب نشده است</h4>
                                    <p className="text-slate-400 text-xs">برای مشاهده اطلاعات تماس کامل و لوکیشن دقیق، یک نماینده یا شهر را از بخش سمت راست انتخاب فرمایید.</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </main>

            <Footer onNavigateToAdminDashboard={props.onNavigateToAdminDashboard} />
        </div>
    );
};

export default StoreLocator;
