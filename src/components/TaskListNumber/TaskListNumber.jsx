import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

function TaskListNumber({ employeeId }) {
  const [userData, setUserData, adminData, setAdminData] = useContext(AuthContext);
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    if (userData && employeeId) {
      const currentEmployee = userData.find(emp => emp.id === employeeId);
      setEmployeeData(currentEmployee);
    }
  }, [userData, employeeId]);

  if (!employeeData) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {[...Array(4)].map((_, i) => (
          <div key={i} className='glass-effect rounded-2xl p-6 animate-pulse'>
            <div className='h-8 bg-slate-700 rounded mb-2'></div>
            <div className='h-4 bg-slate-700 rounded w-3/4'></div>
          </div>
        ))}
      </div>
    );
  }

  const taskStats = [
    {
      title: 'New Tasks',
      count: employeeData.taskNumber?.newTask || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-500/10 to-blue-600/10',
      borderColor: 'border-blue-500/20'
    },
    {
      title: 'Active Tasks',
      count: employeeData.taskNumber?.active || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-500/10 to-orange-500/10',
      borderColor: 'border-amber-500/20'
    },
    {
      title: 'Completed',
      count: employeeData.taskNumber?.completed || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-emerald-500 to-green-500',
      bgGradient: 'from-emerald-500/10 to-green-500/10',
      borderColor: 'border-emerald-500/20'
    },
    {
      title: 'Failed Tasks',
      count: employeeData.taskNumber?.failed || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-red-500 to-red-600',
      bgGradient: 'from-red-500/10 to-red-600/10',
      borderColor: 'border-red-500/20'
    }
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
      {taskStats.map((stat, index) => (
        <div 
          key={index}
          className={`glass-effect rounded-2xl p-6 border ${stat.borderColor} bg-gradient-to-br ${stat.bgGradient} hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group`}
        >
          <div className='flex items-center justify-between mb-4'>
            <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {stat.icon}
            </div>
            <div className='text-right'>
              <div className='text-3xl font-bold text-white mb-1'>
                {stat.count}
              </div>
              <div className='text-slate-400 text-sm font-medium'>
                {stat.title}
              </div>
            </div>
          </div>
          <div className='h-1 bg-slate-700 rounded-full overflow-hidden'>
            <div 
              className={`h-full bg-gradient-to-r ${stat.gradient} transition-all duration-1000 ease-out`}
              style={{ width: `${Math.min((stat.count / 10) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskListNumber