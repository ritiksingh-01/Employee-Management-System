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
        <div className="p-5 bg-[#1C1C1C] mt-7 rounded">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-300">Employee Management</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-4 py-2 rounded text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                >
                    {showForm ? 'Cancel' : 'Add New Employee'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-300">Employee ID</label>
                            <div className="flex gap-2">
                                <input
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                    className="flex-1 text-sm rounded px-3 py-2 outline-none bg-transparent border border-gray-400 text-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                                    type="text"
                                    placeholder="E001"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={handleAutoGenerateId}
                                    className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors"
                                >
                                    Auto
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-300">First Name</label>
                            <input
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                className="text-sm rounded px-3 py-2 outline-none bg-transparent border border-gray-400 text-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                                type="text"
                                placeholder="Enter first name"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-300">Email</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="text-sm rounded px-3 py-2 outline-none bg-transparent border border-gray-400 text-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                                type="email"
                                placeholder="employee@company.com"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-300">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="text-sm rounded px-3 py-2 outline-none bg-transparent border border-gray-400 text-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-200"
                                type="password"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 px-6 py-2 rounded text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                        >
                            Create Employee
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowForm(false)}
                            className="bg-gray-600 hover:bg-gray-700 active:bg-gray-800 px-6 py-2 rounded text-white font-medium transition-all duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Employee List */}
            <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-300 mb-3">Current Employees</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userData && userData.map((employee, idx) => (
                        <div key={idx} className="bg-gray-800 p-4 rounded border border-gray-700 relative group">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-gray-200">{employee.firstname}</h4>
                                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">{employee.id}</span>
                            </div>
                            <p className="text-sm text-gray-400 mb-2">{employee.email}</p>
                            <div className="flex justify-between text-xs text-gray-500 mb-3">
                                <span>Tasks: {employee.tasks.length}</span>
                                <span>Active: {employee.taskNumber.active}</span>
                            </div>
                            <button
                                onClick={() => confirmDelete(employee)}
                                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                title="Remove Employee"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-200 mb-4">Confirm Employee Removal</h3>
                        <p className="text-gray-300 mb-6">
                            Are you sure you want to remove <strong>{showDeleteConfirm.firstname}</strong> ({showDeleteConfirm.id})?
                            <br />
                            <span className="text-red-400 text-sm">This action cannot be undone and will remove all their tasks.</span>
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handleDeleteEmployee(showDeleteConfirm)}
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white font-medium transition-colors"
                            >
                                Remove Employee
                            </button>
                            <button
                                onClick={cancelDelete}
                                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white font-medium transition-colors"
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