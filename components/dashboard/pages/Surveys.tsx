
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
    ClipboardList, 
    Gift, 
    CheckCircle2, 
    Star, 
    MessageSquare, 
    ArrowRight,
    Send,
    CircleHelp,
    Clock
} from 'lucide-react';

interface SurveysProps {
    surveys: any[];
    surveyResponses: any[];
    setSurveyResponses: React.Dispatch<React.SetStateAction<any[]>>;
    customer: any;
    setCustomer: React.Dispatch<React.SetStateAction<any | null>>;
    selectedSurvey: any | null;
    setSelectedSurvey: React.Dispatch<React.SetStateAction<any | null>>;
    onSectionChange: (page: any) => void;
}

const Surveys: React.FC<SurveysProps> = ({ surveys, surveyResponses, setSurveyResponses, customer, setCustomer, selectedSurvey, setSelectedSurvey, onSectionChange }) => {
    const [answers, setAnswers] = useState<Record<number, any>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const hasSubmitted = selectedSurvey ? surveyResponses.some(r => r.surveyId === selectedSurvey.id && r.customerId === customer.id) : false;

    const handleStartSurvey = (survey: any) => {
        setSelectedSurvey(survey);
        setAnswers({});
        setIsSubmitted(false);
    };

    const handleAnswer = (questionId: number, value: any) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
    };

    const handleSubmit = () => {
        const newResponse = {
            id: `R-${Date.now()}`,
            surveyId: selectedSurvey.id,
            customerId: customer.id,
            customerName: customer.name,
            answers: answers,
            timestamp: new Date().toLocaleDateString('fa-IR', { hour: '2-digit', minute: '2-digit' })
        };
        setSurveyResponses(prev => [...prev, newResponse]);
        setCustomer((prev: any) => ({ ...prev, discount: 2 }));
        setIsSubmitted(true);
        setTimeout(() => {
            setSelectedSurvey(null);
            setIsSubmitted(false);
        }, 3000);
    };

    if (selectedSurvey) {
        return (
            <div className="max-w-4xl mx-auto space-y-8">
                <button 
                    onClick={() => setSelectedSurvey(null)}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100 w-fit"
                >
                    <ArrowRight size={20} />
                    <span>بازگشت به لیست نظرسنجی‌ها</span>
                </button>

                <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500 p-10 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-[80px] pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-900/20 rounded-full translate-y-1/3 -translate-x-1/3 blur-[60px] pointer-events-none"></div>
                        
                        <div className="relative z-10 space-y-6">
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-bold border border-white/20 shadow-inner float-left">
                                <Gift className="w-5 h-5 text-amber-300" />
                                <span>هدیه این نظرسنجی: ۲٪ تخفیف روی سفارش بعدی</span>
                            </div>
                            <div className="clear-both"></div>
                            
                            <div>
                                <h2 className="text-3xl font-black mb-3">{selectedSurvey.title}</h2>
                                <p className="text-blue-50 text-lg leading-relaxed max-w-2xl opacity-90">{selectedSurvey.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-10">
                        {hasSubmitted ? (
                            <div className="py-20 text-center space-y-4">
                                <div className="h-20 w-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800">شما قبلاً در این نظرسنجی شرکت کرده‌اید</h3>
                                <p className="text-slate-500">از اینکه وقت خود را در اختیار ما قرار دادید سپاسگزاریم.</p>
                            </div>
                        ) : (
                            <AnimatePresence mode="wait">
                                {!isSubmitted ? (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-12"
                                    >
                                        {selectedSurvey.questions.map((q: any, idx: number) => (
                                            <div key={q.id} className="space-y-6 bg-slate-50/50 p-8 rounded-3xl border border-slate-100 transition-all hover:bg-slate-50 hover:shadow-md hover:shadow-slate-100">
                                                <div className="flex items-start gap-4">
                                                    <div className="h-10 w-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-blue-600 font-bold flex-shrink-0 text-lg border border-slate-100">
                                                        {idx + 1}
                                                    </div>
                                                    <h3 className="text-xl font-bold text-slate-800 pt-1.5 leading-relaxed flex-1">{q.text}</h3>
                                                    <span className="text-red-500 bg-red-50 px-2 py-1 flex items-center justify-center rounded-lg text-xs font-bold mt-1">الزامی</span>
                                                </div>

                                                <div className="pr-14">
                                                    {q.type === 'rating' ? (
                                                        <div className="flex flex-col gap-2">
                                                            <div className="flex gap-2">
                                                                {[1, 2, 3, 4, 5].map((val) => {
                                                                    const labels: Record<number, string> = {
                                                                        1: 'خیلی بد',
                                                                        2: 'بد',
                                                                        3: 'متوسط',
                                                                        4: 'خوب',
                                                                        5: 'خیلی خوب'
                                                                    };
                                                                    return (
                                                                        <button
                                                                            key={val}
                                                                            onClick={() => handleAnswer(q.id, val)}
                                                                            className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl transition-all border-2 ${
                                                                                answers[q.id] === val 
                                                                                ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-200/50 transform -translate-y-1' 
                                                                                : 'bg-white text-slate-500 hover:bg-slate-50 hover:border-slate-300 border-slate-200 hover:-translate-y-0.5'
                                                                            }`}
                                                                        >
                                                                            <span className={`text-2xl font-black ${answers[q.id] === val ? 'text-white' : 'text-slate-300'}`}>{val}</span>
                                                                            <span className="text-xs font-bold">{labels[val]}</span>
                                                                        </button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <textarea
                                                            value={answers[q.id] || ''}
                                                            onChange={(e) => handleAnswer(q.id, e.target.value)}
                                                            className="w-full bg-white border-2 border-slate-200 rounded-2xl p-5 focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all outline-none resize-none h-40 text-slate-700 shadow-sm"
                                                            placeholder="دیدگاه خود را اینجا بنویسید..."
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        <div className="pt-8 border-t border-slate-100 flex justify-end">
                                            <button
                                                onClick={handleSubmit}
                                                disabled={Object.keys(answers).length < selectedSurvey.questions.length || 
                                                    selectedSurvey.questions.some((q:any) => !answers[q.id])}
                                                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-12 py-4 rounded-2xl font-bold flex items-center gap-3 hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed shadow-xl shadow-blue-200/50 text-lg transform hover:-translate-y-0.5 active:translate-y-0"
                                            >
                                                <span>ثبت و دریافت هدیه</span>
                                                <Send size={22} className="rotate-180" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-16 text-center space-y-8"
                                    >
                                        <div className="relative inline-block">
                                            <div className="absolute inset-0 bg-green-200 blur-2xl rounded-full scale-150 opacity-50"></div>
                                            <div className="h-28 w-28 bg-gradient-to-br from-green-400 to-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl relative z-10">
                                                <CheckCircle2 size={56} className="text-white" />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">سپاس از همراهی شما!</h3>
                                            <p className="text-slate-500 max-w-md mx-auto text-lg leading-relaxed">پاسخ‌های شما با موفقیت ثبت شد. <strong className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">تخفیف ۲ درصدی</strong> شما به صورت خودکار در فاکتور بعدی اعمال خواهد شد.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex items-center gap-5">
                    <div className="h-14 w-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                        <ClipboardList size={30} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 mb-1">نظرسنجی و هدایا</h1>
                        <p className="text-slate-500 font-medium">با شرکت در نظرسنجی‌ها، به ما در ارتقای کیفیت کمک کنید و هدیه بگیرید</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
                            <CircleHelp size={20} />
                        </div>
                        نظرسنجی‌های فعلی
                    </h2>
                    
                    <div className="grid grid-cols-1 gap-6">
                        {surveys.filter((s: any) => s.status === 'active').length > 0 ? (
                            surveys.filter((s: any) => s.status === 'active').map(survey => {
                                const didRespond = surveyResponses.some(r => r.surveyId === survey.id && r.customerId === customer.id);
                                return (
                                <motion.div 
                                    key={survey.id}
                                    whileHover={{ y: -4 }}
                                    className={`bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group transition-shadow hover:shadow-xl hover:shadow-slate-200/50 ${didRespond ? 'opacity-80' : ''}`}
                                >
                                    <div className={`absolute top-0 left-0 w-1.5 h-full transition-opacity ${didRespond ? 'bg-emerald-500 opacity-100' : 'bg-blue-600 opacity-0 group-hover:opacity-100'}`}></div>
                                    <div className={`h-24 w-24 rounded-2xl flex flex-col items-center justify-center transition-colors shadow-inner ${didRespond ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'}`}>
                                        <MessageSquare size={36} strokeWidth={1.5} />
                                    </div>
                                    <div className="flex-1 space-y-3 text-center md:text-right w-full">
                                        <h3 className="text-xl font-bold text-slate-800">{survey.title}</h3>
                                        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{survey.description}</p>
                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                                            <span className="text-xs bg-slate-50 border border-slate-100 text-slate-500 px-3 py-1.5 rounded-xl font-bold flex items-center gap-2">
                                                <Clock size={14} />
                                                {survey.createdAt}
                                            </span>
                                            <span className="text-xs bg-blue-50 border border-blue-100 text-blue-600 px-3 py-1.5 rounded-xl font-bold flex items-center gap-2">
                                                <ClipboardList size={14} />
                                                {survey.questions.length} سوال
                                            </span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleStartSurvey(survey)}
                                        className={`w-full md:w-auto px-8 py-3.5 rounded-2xl font-bold transition-all ${
                                            didRespond 
                                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                                            : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-300'
                                        }`}
                                    >
                                        {didRespond ? 'مشاهده مجدد' : 'شرکت در نظرسنجی'}
                                    </button>
                                </motion.div>
                                );
                            })
                        ) : (
                            <div className="bg-white py-24 rounded-3xl border border-dashed border-slate-200 text-center space-y-4">
                                <div className="h-20 w-20 bg-slate-50 border border-slate-100 text-slate-300 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                    <ClipboardList size={36} />
                                </div>
                                <h3 className="text-lg font-bold text-slate-700">درحال حاضر نظرسنجی جدیدی یافت نشد</h3>
                                <p className="text-sm text-slate-400 font-medium max-w-sm mx-auto">به محض انتشار نظرسنجی جدید، در این بخش قابل مشاهده خواهد بود.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                        <div className="bg-amber-100 p-2 rounded-xl text-amber-500">
                            <Gift size={20} />
                        </div>
                        هدایا و سوابق
                    </h2>

                    <div className="bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500 rounded-3xl p-8 text-white shadow-xl shadow-amber-200 space-y-6 relative overflow-hidden transform hover:-translate-y-1 transition-transform">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-600/30 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl"></div>
                        
                        <div className="relative z-10 flex flex-col items-center text-center space-y-4 border-b border-white/20 pb-6">
                            <div className="h-16 w-16 bg-white shadow-inner rounded-2xl flex items-center justify-center text-amber-500 mb-2">
                                <Gift size={32} />
                            </div>
                            <h3 className="font-black text-2xl">تخفیف ویژه وفاداری</h3>
                            <p className="text-amber-50 font-medium">با شرکت در هر نظرسنجی از ما هدیه بگیرید</p>
                        </div>
                        <ul className="relative z-10 space-y-3">
                            <li className="flex items-center gap-3 text-sm font-bold bg-white/10 p-3.5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <CheckCircle2 className="w-5 h-5 text-yellow-200" />
                                <span>۲٪ تخفیف روی سفارش بعدی</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm font-bold bg-white/10 p-3.5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <CheckCircle2 className="w-5 h-5 text-yellow-200" />
                                <span>اولویت در آماده‌سازی</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-5">
                        <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-emerald-500" />
                            تاریخچه مشارکت شما
                        </h3>
                        <div className="space-y-3">
                            {surveyResponses.filter(r => r.customerId === customer.id).length > 0 ? (
                                surveyResponses.filter(r => r.customerId === customer.id).map(r => {
                                    const survey = surveys.find(s => s.id === r.surveyId);
                                    return (
                                        <div key={r.id} className="flex items-center justify-between p-4 bg-slate-50/80 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors">
                                            <div>
                                                <p className="text-sm font-bold text-slate-700">{survey ? survey.title : 'نظرسنجی منقضی شده'}</p>
                                                <p className="text-xs text-slate-400 mt-1 font-medium">{r.timestamp}</p>
                                            </div>
                                            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1.5 shadow-sm border border-emerald-200">
                                                ثبت شده
                                            </span>
                                        </div>
                                    )
                                })
                            ) : (
                                <p className="text-sm text-slate-400 text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 font-medium">هیچ مشارکتی یافت نشد</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Past Surveys Section */}
            {surveys.filter((s: any) => s.status === 'inactive').length > 0 && (
                <div className="mt-12 space-y-6 pt-12 border-t border-slate-200/60">
                    <h2 className="text-xl font-black text-slate-400 flex items-center gap-3 opacity-80">
                        <Clock size={24} />
                        نظرسنجی‌های گذشته
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {surveys.filter((s: any) => s.status === 'inactive').map(survey => (
                            <div key={survey.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-200/60 opacity-60 hover:opacity-100 transition-opacity">
                                <h3 className="text-lg font-bold text-slate-700 mb-2">{survey.title}</h3>
                                <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{survey.description}</p>
                                <div className="mt-5 pt-4 border-t border-slate-200 flex justify-between items-center">
                                    <span className="text-xs font-bold text-slate-400 bg-white px-2 py-1 rounded border border-slate-100">شناسه: {survey.id}</span>
                                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                        <Clock size={12} />
                                        {survey.createdAt}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Surveys;
