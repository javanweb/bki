
import React, { useState } from 'react';
import { 
    Plus, 
    Search, 
    Filter, 
    MoreHorizontal, 
    Eye, 
    Edit2, 
    Trash2, 
    ChevronLeft, 
    Users, 
    BarChart3,
    CheckCircle2,
    Clock,
    ClipboardList,
    Shield,
    MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SurveyManagementProps {
    surveys: any[];
    responses: any[];
    setSurveys: React.Dispatch<React.SetStateAction<any[]>>;
}

const SurveyManagement: React.FC<SurveyManagementProps> = ({ surveys, responses, setSurveys }) => {
    const [activeTab, setActiveTab] = useState<'surveys' | 'responses'>('surveys');
    const [selectedResponse, setSelectedResponse] = useState<any | null>(null);
    const [selectedSurveyIdForFilter, setSelectedSurveyIdForFilter] = useState<string | null>(null);
    
    // New state for creating a survey
    const [isAdding, setIsAdding] = useState(false);
    const [newSurvey, setNewSurvey] = useState({ title: '', description: '', questions: [''] });

    const handleDeleteSurvey = (id: string) => {
        if(confirm('آیا از حذف این نظرسنجی اطمینان دارید؟')) {
            setSurveys(surveys.filter(s => s.id !== id));
        }
    };

    const handleViewResults = (surveyId: string) => {
        setSelectedSurveyIdForFilter(surveyId);
        setActiveTab('responses');
    };

    const handleAddSurvey = () => {
        // Archive existing surveys
        const updatedSurveys = surveys.map(s => ({ ...s, status: 'inactive' }));

        const survey = {
            id: `S-${Date.now()}`,
            title: newSurvey.title,
            description: newSurvey.description,
            status: 'active',
            questions: newSurvey.questions.map((q, idx) => ({ id: idx + 1, type: 'rating', text: q })),
            createdAt: new Date().toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })
        };
        setSurveys([...updatedSurveys, survey]);
        setIsAdding(false);
        setNewSurvey({ title: '', description: '', questions: [''] });
    };

    return (
        <div className="p-8 space-y-8" dir="rtl">
            
            {/* Detailed Response Modal */}
            <AnimatePresence>
                {selectedResponse && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedResponse(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                            animate={{ scale: 1, opacity: 1, y: 0 }} 
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white rounded-[2rem] p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-100"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">پاسخ‌های نظرسنجی</h3>
                                    <p className="text-slate-500 font-medium mt-1">مشتری: <span className="text-blue-600 font-bold">{selectedResponse.customerName}</span></p>
                                </div>
                                <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                    <MessageSquare size={24} />
                                </div>
                            </div>

                            <div className="space-y-6">
                                {Object.entries(selectedResponse.answers).map(([qId, answer]: [string, any], index: number) => {
                                    const survey = surveys.find(s => s.id === selectedResponse.surveyId);
                                    const question = survey?.questions.find((q: any) => q.id.toString() === qId);
                                    
                                    const isNumeric = typeof answer === 'number' || !isNaN(Number(answer));
                                    
                                    return (
                                        <div key={qId} className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100/60 transition-colors hover:bg-slate-50">
                                            <div className="flex gap-3 mb-3">
                                                <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                                    {index + 1}
                                                </div>
                                                <p className="font-bold text-slate-700 leading-relaxed">{question?.text}</p>
                                            </div>
                                            <div className="pr-9">
                                                {isNumeric ? (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">{answer} از 5</span>
                                                        <div className="flex gap-1 h-2 flex-1 max-w-[150px] bg-slate-100 rounded-full overflow-hidden">
                                                            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(Number(answer) / 5) * 100}%` }}></div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="text-slate-600 font-medium bg-white p-4 rounded-xl border border-slate-200 text-sm leading-relaxed shadow-sm">
                                                        {answer}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <button 
                                    onClick={() => setSelectedResponse(null)}
                                    className="w-full bg-slate-900 text-white p-4 rounded-2xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                                >
                                    بستن نمایش
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        مدیریت نظرسنجی‌ها
                    </h2>
                    <p className="text-slate-500 font-medium mt-1">ایجاد، ویرایش و تحلیل نتایج نظرسنجی مشتریان</p>
                </div>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="flex items-center gap-2 bg-[#5d87ff] text-white px-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-200/50 hover:bg-blue-700 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                    <Plus className="w-5 h-5 flex-shrink-0" />
                    <span>ایجاد نظرسنجی جدید</span>
                </button>
            </header>

            {isAdding && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-xl shadow-indigo-100/50 space-y-8 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-2 h-full bg-indigo-500 rounded-r-3xl"></div>
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                        <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                            <Plus size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-800">طراحی نظرسنجی جدید</h3>
                            <p className="text-sm text-slate-500 font-medium">سؤالات خود را وارد کنید تا مشتریان بازخورد دهند</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">عنوان نظرسنجی</label>
                            <input 
                                className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 rounded-2xl outline-none transition-all font-medium text-slate-800" 
                                placeholder="مثلاً: نظرسنجی کیفیت خدمات تابستان" 
                                value={newSurvey.title} 
                                onChange={e => setNewSurvey({...newSurvey, title: e.target.value})} 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 ml-1">توضیحات کوتاه</label>
                            <input 
                                className="w-full p-4 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 rounded-2xl outline-none transition-all font-medium text-slate-800" 
                                placeholder="دلیل برگزاری این نظرسنجی را بنویسید" 
                                value={newSurvey.description} 
                                onChange={e => setNewSurvey({...newSurvey, description: e.target.value})} 
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-5 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <label className="font-bold text-slate-800 flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                            سوالات نظرسنجی
                            <span className="text-xs font-medium bg-white px-2 py-1 rounded-lg border border-slate-200 text-slate-500 mr-2">پاسخ‌ها به صورت ۵ گزینه‌ای (طیف لیکرت) خواهد بود</span>
                        </label>
                        
                        <div className="space-y-3">
                            {newSurvey.questions.map((q, i) => (
                                <div key={i} className="flex items-center gap-3 relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-100 rounded-md flex items-center justify-center text-slate-400 text-xs font-bold pointer-events-none">
                                        {i + 1}
                                    </div>
                                    <input 
                                        className="flex-1 p-3.5 pr-4 pl-12 bg-white border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 rounded-xl outline-none transition-all font-medium text-slate-800" 
                                        placeholder="متن سوال را بنویسید..." 
                                        value={q} 
                                        onChange={e => {
                                            const qs = [...newSurvey.questions];
                                            qs[i] = e.target.value;
                                            setNewSurvey({...newSurvey, questions: qs});
                                        }} 
                                    />
                                    {newSurvey.questions.length > 1 && (
                                        <button 
                                            onClick={() => {
                                                const qs = newSurvey.questions.filter((_, idx) => idx !== i);
                                                setNewSurvey({...newSurvey, questions: qs});
                                            }}
                                            className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors shrink-0"
                                            title="حذف سوال"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        <button 
                            onClick={() => setNewSurvey({...newSurvey, questions: [...newSurvey.questions, '']})} 
                            className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-2"
                        >
                            <Plus size={16} />
                            افزودن سوال جدید
                        </button>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button 
                            onClick={handleAddSurvey} 
                            disabled={!newSurvey.title || newSurvey.questions.some(q => !q.trim())}
                            className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ایجاد و فعال‌سازی طرح
                        </button>
                        <button 
                            onClick={() => setIsAdding(false)} 
                            className="text-slate-600 font-bold px-6 py-3.5 hover:bg-slate-100 rounded-2xl transition-colors"
                        >
                            انصراف
                        </button>
                    </div>
                </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow group">
                    <div className="w-16 h-16 bg-blue-50/80 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                        <ClipboardList className="w-8 h-8 text-blue-600" strokeWidth={1.5} />
                    </div>
                    <div>
                        <div className="text-3xl font-black text-slate-800">{surveys.length}</div>
                        <div className="text-slate-500 text-sm font-bold mt-1">کل نظرسنجی‌ها</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow group">
                    <div className="w-16 h-16 bg-emerald-50/80 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Users className="w-8 h-8 text-emerald-600" strokeWidth={1.5} />
                    </div>
                    <div>
                        <div className="text-3xl font-black text-slate-800">{responses.length}</div>
                        <div className="text-slate-500 text-sm font-bold mt-1">مشارکت‌کنندگان</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow group">
                    <div className="w-16 h-16 bg-amber-50/80 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform relative overflow-hidden">
                        <div className="absolute inset-0 bg-amber-400 opacity-20 blur-xl"></div>
                        <BarChart3 className="w-8 h-8 text-amber-600 relative z-10" strokeWidth={1.5} />
                    </div>
                    <div>
                        <div className="text-3xl font-black text-slate-800">۸۵٪</div>
                        <div className="text-slate-500 text-sm font-bold mt-1">رضایت میانگین</div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="flex border-b border-slate-100">
                    <button 
                        onClick={() => setActiveTab('surveys')}
                        className={`px-8 py-5 text-sm font-bold transition-all relative ${
                            activeTab === 'surveys' ? 'text-indigo-600 bg-indigo-50/30' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                        لیست نظرسنجی‌ها
                        {activeTab === 'surveys' && <motion.div layoutId="adm-tab-survey" className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600" />}
                    </button>
                    <button 
                        onClick={() => setActiveTab('responses')}
                        className={`px-8 py-5 text-sm font-bold transition-all relative ${
                            activeTab === 'responses' ? 'text-indigo-600 bg-indigo-50/30' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                        پاسخ‌های دریافتی
                        {activeTab === 'responses' && <motion.div layoutId="adm-tab-survey" className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600" />}
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === 'surveys' ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-right border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100">
                                        <th className="px-5 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">عنوان نظرسنجی</th>
                                        <th className="px-5 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">تاریخ ایجاد</th>
                                        <th className="px-5 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">وضعیت</th>
                                        <th className="px-5 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">تعداد پاسخ</th>
                                        <th className="px-5 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {surveys.map(survey => (
                                        <tr key={survey.id} className="hover:bg-slate-50/80 transition-colors group">
                                            <td className="px-5 py-4">
                                                <div className="font-bold text-slate-800 text-base">{survey.title}</div>
                                                <div className="text-xs text-slate-400 mt-1 truncate max-w-[250px] font-medium">{survey.description}</div>
                                            </td>
                                            <td className="px-5 py-4 text-sm font-medium text-slate-500">{survey.createdAt}</td>
                                            <td className="px-5 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${
                                                    survey.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-sm' : 'bg-slate-50 text-slate-500 border-slate-200'
                                                }`}>
                                                    {survey.status === 'active' ? <Clock className="w-3.5 h-3.5" /> : null}
                                                    {survey.status === 'active' ? 'فعال' : 'بایگانی شده'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-sm font-black text-slate-800">
                                                <span className="bg-slate-100 px-3 py-1 rounded-lg text-slate-600 border border-slate-200">
                                                    {responses.filter(r => r.surveyId === survey.id).length} نفر
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => handleViewResults(survey.id)} className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all" title="مشاهده نتایج">
                                                        <BarChart3 className="w-5 h-5" />
                                                    </button>
                                                    <button onClick={() => handleDeleteSurvey(survey.id)} className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="حذف">
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {selectedSurveyIdForFilter && (
                                <div className="flex items-center justify-between bg-indigo-50 border border-indigo-100 p-4 rounded-2xl mb-6 shadow-sm">
                                    <div className="flex items-center gap-3 font-bold text-indigo-700">
                                        <div className="bg-white p-1.5 rounded-lg text-indigo-500 shadow-sm">
                                            <Filter className="w-4 h-4" />
                                        </div>
                                        نمایش پاسخ‌های نظرسنجی: {surveys.find(s => s.id === selectedSurveyIdForFilter)?.title}
                                    </div>
                                    <button 
                                        onClick={() => setSelectedSurveyIdForFilter(null)}
                                        className="text-sm font-bold text-indigo-600 hover:underline bg-white px-3 py-1.5 rounded-lg border border-indigo-100 shadow-sm"
                                    >
                                        نمایش همه
                                    </button>
                                </div>
                            )}
                            <div className="overflow-x-auto">
                                <table className="w-full text-right border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-100">
                                            <th className="px-5 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">مشتری</th>
                                            <th className="px-5 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">نظرسنجی</th>
                                            <th className="px-5 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">زمان ثبت</th>
                                            <th className="px-5 py-4 text-slate-400 text-xs font-bold uppercase tracking-wider">عملیات</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {responses.filter(r => selectedSurveyIdForFilter ? r.surveyId === selectedSurveyIdForFilter : true).map(response => (
                                            <tr key={response.id} className="hover:bg-slate-50/80 transition-colors group">
                                                <td className="px-5 py-4">
                                                    <div className="font-bold text-slate-800 text-base">{response.customerName}</div>
                                                    <div className="text-[11px] text-slate-400 mt-0.5 font-medium">شناسه: {response.customerId}</div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 inline-block">
                                                        {surveys.find(s => s.id === response.surveyId)?.title || 'نظرسنجی حذف شده'}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4 text-sm font-medium text-slate-500 tabular-nums">
                                                    <span className="flex items-center gap-1.5">
                                                        <Clock size={16} className="text-slate-400" />
                                                        {response.timestamp}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <button 
                                                        onClick={() => setSelectedResponse(response)}
                                                        className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors border border-indigo-100/50"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        <span>مشاهده پاسخ‌ها</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SurveyManagement;
