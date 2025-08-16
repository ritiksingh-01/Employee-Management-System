import React from 'react'
import Header from '../Header/Header'
import TaskListNumber from '../TaskListNumber/TaskListNumber'
import TaskList from '../TaskList/TaskList'

const EmployeeDashboard = (props) => {
  return (
    <div className='p-10 h-screen bg-gray-50'>
        <Header changeUser={props.changeUser} data={props.data}/>
        <TaskListNumber employeeId={props.data?.id} />
        <TaskList employeeId={props.data?.id} />
    </div>
  )
}

export default EmployeeDashboard