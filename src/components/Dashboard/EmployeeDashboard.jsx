import React from 'react'
import Header from '../Header/Header'
import TaskListNumber from '../TaskListNumber/TaskListNumber'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = () => {
  return (
    <div className='p-10 bg-[#1C1C1C] h-screen'>
        <Header/>
        <TaskListNumber/>
        <TaskList/>
    </div>
  )
}

export default EmployeeDashboard