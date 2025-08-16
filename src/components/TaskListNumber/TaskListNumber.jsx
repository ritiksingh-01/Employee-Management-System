import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

function TaskListNumber({ employeeId }) {
  const [userData, setUserData, adminData, setAdminData] = useContext(AuthContext);
  const [employeeData, setEmployeeData] = useState(null);

  // Get the current employee data from context
  useEffect(() => {
    if (userData && employeeId) {
      const currentEmployee = userData.find(emp => emp.id === employeeId);
      setEmployeeData(currentEmployee);
    }
  }, [userData, employeeId]);

  if (!employeeData) {
    return (
      <div className='flex mt-10 justify-between gap-5'>
        <div className='rounded-xl w-[45%] py-6 px-9 bg-white border border-gray-200 shadow-lg'>
          <h2 className='text-2xl font-semibold text-gray-800'>0</h2>
          <h3 className='text-xl font-medium text-gray-600'>Loading...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className='flex mt-10 justify-between gap-5'>
      <div className='rounded-xl w-[45%] py-6 px-9 bg-white border border-gray-200 shadow-lg'>
        <h2 className='text-2xl font-semibold text-emerald-600'>{employeeData.taskNumber?.newTask || 0}</h2>
        <h3 className='text-xl font-medium text-gray-700'>New Task</h3>
      </div>
      <div className='rounded-xl w-[45%] py-6 px-9 bg-white border border-gray-200 shadow-lg'>
        <h2 className='text-2xl font-semibold text-emerald-600'>{employeeData.taskNumber?.completed || 0}</h2>
        <h3 className='text-xl font-medium text-gray-700'>Completed Task</h3>
      </div>
      <div className='rounded-xl w-[45%] py-6 px-9 bg-white border border-gray-200 shadow-lg'>
        <h2 className='text-2xl font-semibold text-emerald-600'>{employeeData.taskNumber?.active || 0}</h2>
        <h3 className='text-xl font-medium text-gray-700'>Accepted Task</h3>
      </div>
      <div className='rounded-xl w-[45%] py-6 px-9 bg-white border border-gray-200 shadow-lg'>
        <h2 className='text-2xl font-semibold text-emerald-600'>{employeeData.taskNumber?.failed || 0}</h2>
        <h3 className='text-xl font-medium text-gray-700'>Failed Task</h3>
      </div>
    </div>
  )
}

export default TaskListNumber
