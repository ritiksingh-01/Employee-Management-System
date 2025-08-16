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
  const [userData, setUserData, adminData, setAdminData] = useContext(AuthContext)

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      try {
        const userData = JSON.parse(loggedInUser);
        setUser(userData.role);
        setLoggedInUserData(userData.data);
      } catch (error) {
        console.error('Error parsing logged in user data:', error);
        localStorage.removeItem('loggedInUser');
      }
    }
  }, [])

  const handleLogin = (email, password) => {
    if (email === 'admin@company.com' && password === '123') {
      const admin = adminData?.[0];
      if (admin) {
        setUser('admin');
        setLoggedInUserData(admin);
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin', data: admin }));
      } else {
        alert("Admin data not found");
      }
    }
    else if (userData) {
      const employee = userData.find((e) => e.email === email && e.password === password);
      if (employee) {
        setUser('employee');
        setLoggedInUserData(employee);
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }));
      } else {
        alert("Invalid credentials");
      }
    } else {
      alert("Invalid credentials");
    }
  }

  const handleLogout = () => {
    setUser(null);
    setLoggedInUserData(null);
    localStorage.removeItem('loggedInUser');
  }

  return (
    <>
      {!user ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <>
          {user === 'admin' ? (
            <AdminDashboard changeUser={handleLogout} />
          ) : (
            user === 'employee' ? (
              <EmployeeDashboard changeUser={handleLogout} data={loggedInUserData} />
            ) : null
          )}
        </>
      )}
    </>
  )
}

export default App