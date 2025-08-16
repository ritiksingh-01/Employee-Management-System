import React, { Children, createContext, useEffect, useState } from 'react'
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('employees') || !localStorage.getItem('admin')) {
      setLocalStorage();
    }

    const { employees, admin } = getLocalStorage();
    setUserData(employees);
    setAdminData(admin);
  }, [])

  return (
    <div>
      <AuthContext.Provider value={[userData, setUserData, adminData, setAdminData]}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthProvider