
import React, { useState } from 'react';

const Login: React.FC<{ onLogin: (user: string, pass: string) => boolean; onNavigateHome: () => void; }> = ({ onLogin, onNavigateHome }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const success = onLogin(username, password);
        if (!success) {
            setError('نام کاربری یا رمز عبور اشتباه است.');
        }
    };

    return (
        <div className="relative w-full h-screen text-white bg-gray-900 font-sans">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2400&auto=format&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            <div className="relative z-10 h-full flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
                    <h2 className="text-3xl font-bold text-center text-white mb-2">ورود به پنل مشتریان</h2>
                    <p className="text-center text-gray-300 mb-8">خوش آمدید! لطفاً اطلاعات خود را وارد کنید.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-200 mb-2">نام کاربری</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                dir="ltr"
                                className="w-full bg-white/10 border-2 border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-white transition-all text-left"
                                placeholder="نام کاربری خود را وارد کنید"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">رمز عبور</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                dir="ltr"
                                className="w-full bg-white/10 border-2 border-white/20 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-white transition-all text-left"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {error && <p className="text-sm text-red-400 text-center">{error}</p>}

                        <div>
                            <button type="submit" className="w-full bg-white text-black font-bold px-5 py-3 rounded-lg hover:bg-gray-200 transition-colors mt-4">
                                ورود
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-sm text-gray-400 mt-8">
                        <button onClick={onNavigateHome} className="font-medium hover:text-white">
                            &larr; بازگشت به سایت اصلی
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;