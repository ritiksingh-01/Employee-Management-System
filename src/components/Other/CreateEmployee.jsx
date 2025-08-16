import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const CreateEmployee = () => {
  const [userData, setUserData, adminData, setAdminData] =
    useContext(AuthContext);
  const [employeeId, setEmployeeId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const generateEmployeeId = () => {
    if (userData && userData.length > 0) {
      const lastEmployee = userData[userData.length - 1];
      const lastId = lastEmployee.id;
      const lastNumber = parseInt(lastId.substring(1));
      const newNumber = lastNumber + 1;
      return `E${newNumber.toString().padStart(3, "0")}`;
    }
    return "E001";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!employeeId || !firstname || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const emailExists = userData.some((emp) => emp.email === email);
    if (emailExists) {
      alert("An employee with this email already exists");
      return;
    }
    const idExists = userData.some((emp) => emp.id === employeeId);
    if (idExists) {
      alert("An employee with this ID already exists");
      return;
    }

    const newEmployee = {
      id: employeeId,
      firstname: firstname,
      email: email,
      password: password,
      taskNumber: { active: 0, newTask: 0, completed: 0, failed: 0 },
      tasks: [],
    };

    const updatedUserData = [...userData, newEmployee];
    setUserData(updatedUserData);
    localStorage.setItem("employees", JSON.stringify(updatedUserData));
    setEmployeeId("");
    setFirstname("");
    setEmail("");
    setPassword("");
    setShowForm(false);

    alert("Employee created successfully!");
  };

  const handleAutoGenerateId = () => {
    setEmployeeId(generateEmployeeId());
  };

  const handleDeleteEmployee = (employeeToDelete) => {
    if (!userData) return;

    const updatedUserData = userData.filter(
      (emp) => emp.id !== employeeToDelete.id
    );
    setUserData(updatedUserData);
    localStorage.setItem("employees", JSON.stringify(updatedUserData));
    setShowDeleteConfirm(null);

    alert("Employee removed successfully!");
  };

  const confirmDelete = (employee) => {
    setShowDeleteConfirm(employee);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  return (
    <div className="p-5 bg-white border border-gray-200 shadow-lg mt-7 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Employee Management
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 px-4 py-2 rounded text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
        >
          {showForm ? "Cancel" : "Add New Employee"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-700">Employee ID</label>
              <div className="flex gap-2">
                <input
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="flex-1 text-sm rounded px-3 py-2 outline-none bg-gray-50 border border-gray-300 text-gray-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200"
                  type="text"
                  placeholder="E001"
                  required
                />
                <button
                  type="button"
                  onClick={handleAutoGenerateId}
                  className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded transition-colors"
                >
                  Auto
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-700">First Name</label>
              <input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="text-sm rounded px-3 py-2 outline-none bg-gray-50 border border-gray-300 text-gray-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200"
                type="text"
                placeholder="Enter first name"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-700">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm rounded px-3 py-2 outline-none bg-gray-50 border border-gray-300 text-gray-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200"
                type="email"
                placeholder="employee@company.com"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-700">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-sm rounded px-3 py-2 outline-none bg-gray-50 border border-gray-300 text-gray-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200"
                type="password"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 px-6 py-2 rounded text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
            >
              Create Employee
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 px-6 py-2 rounded text-gray-700 font-medium transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Employee List */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Team Members</h3>
          <span className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
            {userData ? userData.length : 0} employees
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userData &&
            userData.map((employee, idx) => (
              <div
                key={idx}
                className="bg-gray-50 rounded-xl p-4 border border-gray-200 transition-all duration-200 group hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {employee.firstname}
                      </h4>
                      <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full font-medium">
                        {employee.id}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => confirmDelete(employee)}
                    className="opacity-0 group-hover:opacity-100 bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-sm font-medium"
                    title="Remove Employee"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-3 truncate">
                  {employee.email}
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-2 rounded-lg text-center border border-gray-200">
                    <div className="text-gray-800 font-bold">
                      {employee.tasks.length}
                    </div>
                    <div className="text-gray-600">Total Tasks</div>
                  </div>
                  <div className="bg-white p-2 rounded-lg text-center border border-gray-200">
                    <div className="text-gray-800 font-bold">
                      {employee.taskNumber.active}
                    </div>
                    <div className="text-gray-600">Active</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-gray-200 shadow-2xl animate-fade-in">
            <div className="flex items-center space-x-3 mb-4">
              <h3 className="text-lg font-bold text-gray-800">Confirm Removal</h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-gray-800">
                {showDeleteConfirm.firstname}
              </span>{" "}
              ({showDeleteConfirm.id})?
              <br />
              <span className="text-gray-500 text-sm font-medium">
                This action cannot be undone and will remove all their tasks.
              </span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteEmployee(showDeleteConfirm)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                Remove Employee
              </button>
              <button
                onClick={cancelDelete}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
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