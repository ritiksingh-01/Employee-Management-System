import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function submitHandler(e) {
        e.preventDefault();
        console.log("email is ", email);
        console.log("password is ", password);
        setEmail("")
        setPassword("")
    }

    return (
        <div className='flex h-screen w-screen items-center justify-center '>
            <div className='flex border border-emerald-600 rounded-xl px-16 py-12  shadow-2xl bg-transparent backdrop-blur-sm'>
                <form
                    onSubmit={(e) => {
                        submitHandler(e);
                    }}
                    className='flex flex-col items-center justify-center space-y-6 w-80'>

                    <h1 className='font-bold text-3xl text-emerald-600 mb-2'>Login</h1>

                    <div className='w-full space-y-2'>
                        <label htmlFor="email" className='block text-sm font-medium text-gray-700 ml-2'>Email</label>
                        <input
                            id="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            required
                            className='text-gray-800 outline-none bg-transparent border-2 font-medium text-lg border-emerald-600 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 px-4 py-3 w-full rounded-2xl placeholder-gray-500'
                            type="email"
                            placeholder='Enter your email'
                        />
                    </div>

                    <div className='w-full space-y-2'>
                        <label htmlFor="password" className='block text-sm font-medium text-gray-700 ml-2'>Password</label>
                        <input
                            id="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            required
                            className='text-gray-800 outline-none bg-transparent border-2 font-medium text-lg border-emerald-600 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-200 transition-all duration-200 px-4 py-3 w-full rounded-2xl placeholder-gray-500'
                            type="password"
                            placeholder='Enter your password'
                        />
                    </div>

                    <div className='w-full flex items-center justify-between text-sm pt-2'>
                        <label className='flex items-center space-x-2 cursor-pointer'>
                            <input type="checkbox" className='w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500' />
                            <span className='text-gray-600'>Remember me</span>
                        </label>
                        <a href="#" className='text-emerald-600 hover:text-emerald-700 transition-colors'>Forgot password?</a>
                    </div>

                    <button
                        onClick={submitHandler}
                        className='text-white outline-none border-none hover:bg-emerald-700 active:bg-emerald-800 bg-emerald-600 font-semibold text-lg px-8 py-3 w-full rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95'>
                        Log in
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login