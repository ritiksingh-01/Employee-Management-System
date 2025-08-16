import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const CreateEmployee = () => {
    const [userData, setUserData, adminData, setAdminData] = useContext(AuthContext);
    const [employeeId, setEmployeeId] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    const generateEmployeeId = () => {
        if (userData && userData.length > 0) {
            const lastEmployee = userData[userData.length - 1];
            const lastId = lastEmployee.id;
            const lastNumber = parseInt(lastId.substring(1));
            const newNumber = lastNumber + 1;
            return `E${newNumber.toString().padStart(3, '0')}`;
        }
        return 'E001';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!employeeId || !firstname || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        const emailExists = userData.some(emp => emp.email === email);
        if (emailExists) {
            alert('An employee with this email already exists');
            return;
        }
        const idExists = userData.some(emp => emp.id === employeeId);
        if (idExists) {
            alert('An employee with this ID already exists');
            return;
        }

        const newEmployee = {
            id: employeeId,
            firstname: firstname,
            email: email,
            password: password,
            taskNumber: { active: 0, newTask: 0, completed: 0, failed: 0 },
            tasks: []
        };

        const updatedUserData = [...userData, newEmployee];
        setUserData(updatedUserData);
        localStorage.setItem('employees', JSON.stringify(updatedUserData));
        setEmployeeId('');
        setFirstname('');
        setEmail('');
        setPassword('');
        setShowForm(false);

        alert('Employee created successfully!');
    };

    const handleAutoGenerateId = () => {
        setEmployeeId(generateEmployeeId());
    };

    const handleDeleteEmployee = (employeeToDelete) => {
        if (!userData) return;

        const updatedUserData = userData.filter(emp => emp.id !== employeeToDelete.id);
        setUserData(updatedUserData);
        localStorage.setItem('employees', JSON.stringify(updatedUserData));
        setShowDeleteConfirm(null);
        
        alert('Employee removed successfully!');
    };

    const confirmDelete = (employee) => {
        setShowDeleteConfirm(employee);
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(null);
    };

    return (
        <div className="glass-effect rounded-2xl p-6 border border-slate-600 shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                    <div className='w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg'>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Employee Management</h2>
                        <p className="text-slate-400 text-sm">Manage your team members</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                >
                    {showForm ? 'Cancel' : 'Add Employee'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-300">Employee ID</label>
                            <div className="flex gap-3">
                                <input
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                    className="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-slate-500"
                                    type="text"
                                    placeholder="E001"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={handleAutoGenerateId}
                                    className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                                >
                                    Auto
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-300">First Name</label>
                            <input
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-slate-500"
                                type="text"
                                placeholder="Enter first name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-300">Email Address</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-slate-500"
                                type="email"
                                placeholder="employee@company.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-slate-300">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:border-slate-500"
                                type="password"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                        >
                            Create Employee
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="px-8 py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Employee List */}
            <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-white">Team Members</h3>
                    <span className="text-sm text-slate-400 bg-slate-700 px-3 py-1 rounded-full">
                        {userData ? userData.length : 0} employees
                    </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userData && userData.map((employee, idx) => (
                        <div key={idx} className="glass-effect rounded-xl p-4 border border-slate-600 hover:border-slate-500 transition-all duration-200 group hover:scale-[1.02] shadow-lg hover:shadow-xl">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                                        {employee.firstname.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{employee.firstname}</h4>
                                        <span className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded-full font-medium">
                                            {employee.id}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => confirmDelete(employee)}
                                    className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                                    title="Remove Employee"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-sm text-slate-400 mb-3 truncate">{employee.email}</p>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <div className="bg-slate-700/50 p-2 rounded-lg text-center">
                                    <div className="text-white font-bold">{employee.tasks.length}</div>
                                    <div className="text-slate-400">Total Tasks</div>
                                </div>
                                <div className="bg-slate-700/50 p-2 rounded-lg text-center">
                                    <div className="text-amber-400 font-bold">{employee.taskNumber.active}</div>
                                    <div className="text-slate-400">Active</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="glass-effect rounded-2xl p-6 max-w-md w-full border border-slate-600 shadow-2xl animate-fade-in">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-white">Confirm Removal</h3>
                        </div>
                        <p className="text-slate-300 mb-6 leading-relaxed">
                            Are you sure you want to remove <span className="font-semibold text-white">{showDeleteConfirm.firstname}</span> ({showDeleteConfirm.id})?
                            <br />
                            <span className="text-red-400 text-sm font-medium">This action cannot be undone and will remove all their tasks.</span>
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleDeleteEmployee(showDeleteConfirm)}
                                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                            >
                                Remove Employee
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateEmployee;