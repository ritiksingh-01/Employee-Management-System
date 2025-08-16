import React, { useContext, useEffect, useState } from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import { AuthContext } from "../../context/AuthProvider";

const TaskList = ({ employeeId }) => {
  const [userData, setUserData, adminData, setAdminData] = useContext(AuthContext);
  const [employeeData, setEmployeeData] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (userData && employeeId) {
      const currentEmployee = userData.find(emp => emp.id === employeeId);
      setEmployeeData(currentEmployee);
    }
  }, [userData, employeeId]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleTaskUpdate = (updatedTask, newStatus) => {
    if (!userData || !employeeId) return;

    const updatedUserData = userData.map(emp => {
      if (emp.id === employeeId) {
        const updatedTasks = emp.tasks.map(task =>
          task.title === updatedTask.title && task.date === updatedTask.date
            ? updatedTask
            : task
        );

        const taskNumbers = {
          newTask: updatedTasks.filter(t => t.newTask).length,
          active: updatedTasks.filter(t => t.active).length,
          completed: updatedTasks.filter(t => t.completed).length,
          failed: updatedTasks.filter(t => t.failed).length
        };

        return {
          ...emp,
          tasks: updatedTasks,
          taskNumber: taskNumbers
        };
      }
      return emp;
    });
    setUserData(updatedUserData);
    localStorage.setItem('employees', JSON.stringify(updatedUserData));
    const statusMessages = {
      'accepted': 'Task accepted successfully!',
      'completed': 'Task marked as completed!',
      'failed': 'Task marked as failed!'
    };

    setNotification({
      type: 'success',
      message: statusMessages[newStatus] || 'Task updated successfully!'
    });
  };

  const handleTaskDelete = (taskToDelete) => {
    if (!userData || !employeeId) return;

    const updatedUserData = userData.map(emp => {
      if (emp.id === employeeId) {
        const updatedTasks = emp.tasks.filter(task =>
          !(task.title === taskToDelete.title && task.date === taskToDelete.date)
        );
        const taskNumbers = {
          newTask: updatedTasks.filter(t => t.newTask).length,
          active: updatedTasks.filter(t => t.active).length,
          completed: updatedTasks.filter(t => t.completed).length,
          failed: updatedTasks.filter(t => t.failed).length
        };

        return {
          ...emp,
          tasks: updatedTasks,
          taskNumber: taskNumbers
        };
      }
      return emp;
    });

    setUserData(updatedUserData);
    localStorage.setItem('employees', JSON.stringify(updatedUserData));

    setNotification({
      type: 'success',
      message: 'Task deleted successfully!'
    });
  };

  if (!employeeData || !employeeData.tasks) {
    return (
      <div className="h-[50%] w-full flex items-center justify-center">
        <p className="text-gray-400">No tasks available</p>
      </div>
    );
  }

  return (
    <>
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {notification.message}
          </div>
        </div>
      )}

      <div
        id="tasklist"
        className="h-[50%] overflow-x-auto w-full flex flex-nowrap items-center justify-start gap-5 py-5 mt-10"
      >
        {employeeData.tasks.map((task, idx) => {
          if (task.active) {
            return (
              <AcceptTask
                key={`${task.title}-${task.date}-${idx}`}
                data={task}
                employeeId={employeeId}
                onTaskUpdate={handleTaskUpdate}
              />
            );
          } else if (task.newTask) {
            return (
              <NewTask
                key={`${task.title}-${task.date}-${idx}`}
                data={task}
                employeeId={employeeId}
                onTaskUpdate={handleTaskUpdate}
              />
            );
          } else if (task.failed) {
            return (
              <FailedTask
                key={`${task.title}-${task.date}-${idx}`}
                data={task}
                employeeId={employeeId}
                onTaskDelete={handleTaskDelete}
              />
            );
          } else if (task.completed) {
            return (
              <CompleteTask
                key={`${task.title}-${task.date}-${idx}`}
                data={task}
                employeeId={employeeId}
                onTaskDelete={handleTaskDelete}
              />
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export default TaskList;