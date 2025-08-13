import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { getLocalStorage, setLocalStorage } from './utils/localStorage'
import { AuthContext } from './context/AuthProvider'

function App() {


  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const authData = useContext(AuthContext)

  // useEffect(() => {

  //   if(authData){
  //     const loggedInUser = localStorage.getItem('loggedInUser')
  //     if(loggedInUser){
  //       setUser(loggedInUser.role)
  //     }
  //   }
  // }, [authData]);

  console.log(authData);
  const handleLogin = (email , password) => {
    if(authData && authData.admin.find((e) => e.email == email && e.password == password)){
      setUser('admin')
      localStorage.setItem('loggedInUser' , JSON.stringify({role: 'admin'}))
    }else if(authData && authData.employees.find((e) => e.email == email && e.password == password)){
      setUser('employee')
      localStorage.setItem('loggedInUser' , JSON.stringify({role: 'employee'}))
    }
    else{
      alert("Invalid credentials")
    }
  }

  return (
    <>
    {
      !user ? <Login handleLogin={handleLogin} /> : ''
    }
    {
      user == 'admin' ? <AdminDashboard/> : <EmployeeDashboard/>
    }
    </>
  )
}

export default App