import React from "react";
import Header from "../Header/Header";
import CreateTask from "../Other/CreateTask";
import CreateEmployee from "../Other/CreateEmployee";
import AllTask from "../Other/AllTask";

const AdminDashboard = (props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <Header changeUser={props.changeUser} />
        <CreateEmployee />
        <CreateTask />
        <AllTask />
      </div>
    </div>
  );
};

export default AdminDashboard;