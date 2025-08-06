import React from "react";
import Header from "../Header/Header";
import CreateTask from "../Other/CreateTask";
import AllTask from "../Other/AllTask";

const AdminDashboard = () => {
  return (
    <div className="p-10 h-screen w-full">
      <Header />
      <CreateTask/>
      <AllTask/>
    </div>
  );
};

export default AdminDashboard;
