import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import TaskFilter from './TaskFilter';
import { fetchTasks, deleteTask } from '../../api/tasks';
import { useAuth } from '../../Auth';
import { useNavigate } from 'react-router-dom';
import TaskModal from './TaskModal';

type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
};

const TaskList: React.FC = () => {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // if already logged in then redirect to candidates page.
    if (isAuthenticated) {
      navigate('/');
    } else {
      console.log('isAuth: ', isAuthenticated);
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);


  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchTasks();
        setFilteredTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchData();
  }, []);

  const handleTaskCreated = async () => {
    // Refresh the tasks after a new one has been created
    const updatedTasks = await fetchTasks();
    setFilteredTasks(updatedTasks);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      const updatedTasks = await fetchTasks();
      setFilteredTasks(updatedTasks);  // Ensure filtered tasks are also updated
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const handleUpdate = async () => {
    try {
      const updatedTasks = await fetchTasks();
      setFilteredTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating tasks list:", error);
    }
  };

  const handleFilterChange = async (status: string) => {
    try {
        const data = status ? await fetchTasks(`?status=${status}`) : await fetchTasks();
        setFilteredTasks(data);
    } catch (error) {
        console.error("Error fetching filtered tasks:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <TaskFilter onFilterChange={handleFilterChange} />
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setModalOpen(true)}
        >
          Create Task
        </button>
      </div>
      
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onTaskCreated={handleTaskCreated}
      />
    </div>
  );
};

export default TaskList;
