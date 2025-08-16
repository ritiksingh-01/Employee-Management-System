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
        <div className='rounded-xl w-[45%] py-6 px-9 bg-gray-400'>
          <h2 className='text-2xl font-semibold'>0</h2>
          <h3 className='text-xl font-medium'>Loading...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className='flex mt-10 justify-between gap-5'>
      <div className='rounded-xl w-[45%] py-6 px-9 bg-red-400'>
        <h2 className='text-2xl font-semibold'>{employeeData.taskNumber?.newTask || 0}</h2>
        <h3 className='text-xl font-medium'>New Task</h3>
      </div>
      <div className='rounded-xl w-[45%] py-6 px-9 bg-blue-400'>
        <h2 className='text-2xl font-semibold'>{employeeData.taskNumber?.completed || 0}</h2>
        <h3 className='text-xl font-medium'>Completed Task</h3>
      </div>
      <div className='rounded-xl w-[45%] py-6 px-9 bg-green-400'>
        <h2 className='text-2xl font-semibold'>{employeeData.taskNumber?.active || 0}</h2>
        <h3 className='text-xl font-medium'>Accepted Task</h3>
      </div>
      <div className='rounded-xl w-[45%] py-6 px-9 bg-yellow-400'>
        <h2 className='text-2xl font-semibold'>{employeeData.taskNumber?.failed || 0}</h2>
        <h3 className='text-xl font-medium'>Failed Task</h3>
      </div>
    </div>
  )
}

export default TaskListNumber
