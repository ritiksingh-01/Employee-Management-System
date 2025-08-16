import React, { useState } from 'react'

const Login = ({handleLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function submitHandler(e) {
        e.preventDefault();
        handleLogin(email,password)
        setEmail("")
        setPassword("")
    }

    return (
        <div className='min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4'>
            <div className='w-full max-w-md'>
                {/* Logo/Brand Section */}
                <div className='text-center mb-8 animate-fade-in'>
                    <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg'>
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h1 className='text-3xl font-bold text-white mb-2'>Employee Portal</h1>
                    <p className='text-slate-400'>Sign in to access your dashboard</p>
                </div>

                {/* Login Form */}
                <div className='glass-effect rounded-2xl p-8 shadow-2xl animate-slide-in'>
                    <form onSubmit={submitHandler} className='space-y-6'>
                        <div className='space-y-2'>
                            <label htmlFor="email" className='block text-sm font-semibold text-slate-300 mb-2'>
                                Email Address
                            </label>
                            <input
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className='w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-500'
                                type="email"
                                placeholder='Enter your email address'
                            />
                        </div>

                        <div className='space-y-2'>
                            <label htmlFor="password" className='block text-sm font-semibold text-slate-300 mb-2'>
                                Password
                            </label>
                            <input
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className='w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-500'
                                type="password"
                                placeholder='Enter your password'
                            />
                        </div>

                        <div className='flex items-center justify-between text-sm pt-2'>
                            <label className='flex items-center space-x-3 cursor-pointer group'>
                                <input 
                                    type="checkbox" 
                                    className='w-4 h-4 text-blue-500 bg-slate-700 border-slate-500 rounded focus:ring-blue-500 focus:ring-2 transition-all duration-200' 
                                />
                                <span className='text-slate-300 group-hover:text-white transition-colors'>Remember me</span>
                            </label>
                            <a href="#" className='text-blue-400 hover:text-blue-300 transition-colors font-medium'>
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className='w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800'
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Demo Credentials */}
                    <div className='mt-6 p-4 bg-slate-800/30 rounded-xl border border-slate-700'>
                        <h4 className='text-sm font-semibold text-slate-300 mb-2'>Demo Credentials:</h4>
                        <div className='text-xs text-slate-400 space-y-1'>
                            <p><span className='font-medium'>Admin:</span> admin@company.com / 123</p>
                            <p><span className='font-medium'>Employee:</span> e001@company.com / 123</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login