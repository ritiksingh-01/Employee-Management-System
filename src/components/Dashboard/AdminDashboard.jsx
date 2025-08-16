import React from "react";
import Header from "../Header/Header";
import CreateTask from "../Other/CreateTask";
import CreateEmployee from "../Other/CreateEmployee";
import AllTask from "../Other/AllTask";

const AdminDashboard = (props) => {
  return (
    <div className="p-10 h-screen w-full overflow-y-auto bg-gray-50">
      <Header changeUser={props.changeUser} />
      <CreateEmployee />
      <CreateTask />
      <AllTask />
    </div>
  );
};

export default AdminDashboard;