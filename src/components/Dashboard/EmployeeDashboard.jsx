import React from 'react'
import Header from '../Header/Header'
import TaskListNumber from '../TaskListNumber/TaskListNumber'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = (props) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6'>
      <div className='max-w-7xl mx-auto'>
        <Header changeUser={props.changeUser} data={props.data}/>
        <TaskListNumber employeeId={props.data?.id} />
        <TaskList employeeId={props.data?.id} />
      </div>
    </div>
  )
}

export default EmployeeDashboard