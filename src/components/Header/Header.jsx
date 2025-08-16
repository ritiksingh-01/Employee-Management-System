import React from 'react'

const Header = (props) => {
  const userName = props.data ? props.data.firstname : 'Admin';
  const userRole = props.data ? 'Employee' : 'Administrator';

  const logOutUser = () => {
    props.changeUser();
  }

  return (
    <div className='flex items-center justify-between p-6 bg-white border border-gray-200 rounded-2xl shadow-lg mb-8'>
      <div className='flex items-center space-x-4'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800'>
            Welcome back, {userName}
          </h1>
          <p className='text-gray-600 text-sm font-medium'>{userRole} Dashboard</p>
        </div>
      </div>
      
      <div className='flex items-center space-x-4'>
        <div className='hidden md:flex items-center space-x-2 text-gray-600'>
          <div className='w-2 h-2 bg-emerald-400 rounded-full animate-pulse'></div>
          <span className='text-sm'>Online</span>
        </div>
        <button
          onClick={logOutUser}
          className='bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-6 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-white'
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default Header