import React from 'react'

const Header = (props) => {
  const userName = props.data ? props.data.firstname : 'Admin';
  const userRole = props.data ? 'Employee' : 'Administrator';

  const logOutUser = () => {
    props.changeUser();
  }

  return (
    <div className='flex items-center justify-between p-6 bg-gradient-to-r from-slate-800 to-slate-700 rounded-2xl shadow-lg border border-slate-600 mb-8'>
      <div className='flex items-center space-x-4'>
        <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg'>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h1 className='text-2xl font-bold text-white'>
            Welcome back, {userName}
          </h1>
          <p className='text-slate-400 text-sm font-medium'>{userRole} Dashboard</p>
        </div>
      </div>
      
      <div className='flex items-center space-x-4'>
        <div className='hidden md:flex items-center space-x-2 text-slate-300'>
          <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
          <span className='text-sm'>Online</span>
        </div>
        <button
          onClick={logOutUser}
          className='bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800'
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Header