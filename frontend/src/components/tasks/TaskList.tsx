import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import TaskFilter from './TaskFilter';
import { fetchTasks, deleteTask } from '../../api/tasks';
import { useAuth } from '../../Auth';
import { useNavigate } from 'react-router-dom';
import TaskModal from './TaskModal';
import debounce from "lodash.debounce";
import TaskSort from './TaskSort';
import { FaPlus, FaFilter, FaSortAmountDown } from 'react-icons/fa';

type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
};

const TaskList: React.FC = () => {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>('-created_at');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // if already logged in then redirect to todo list page.
    if (isAuthenticated) {
      navigate('/');
    } else {
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

  // Use an effect to fetch tasks whenever the debounced search query changes
  useEffect(() => {
    fetchTasks(searchQuery, statusFilter, sortOption)
      .then(data => {
        setFilteredTasks(data);
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });
}, [searchQuery, statusFilter, sortOption]);

  // Debounced version of the fetch tasks function
  const debouncedFetchTasks = debounce((query: string) => {
    setSearchQuery(query);
  }, 300);

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

  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleSortChange = (sortOption: string) => {
    setSortOption(sortOption);
  };

  return (
    <div className="space-y-4 px-4 sm:px-0">
      <div className="flex flex-wrap justify-between items-center space-x-4 p-2 bg-gray-100 rounded-md">

        {/* Search Bar */}
        <div className="relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-2 md:mb-0">
          <input
            className="block w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Search tasks..."
            onChange={(e) => debouncedFetchTasks(e.target.value)}
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </span>
        </div>

        {/* Status Filter */}
        <div className="flex items-center mb-2 md:mb-0 space-x-2">
          <FaFilter className="text-blue-500" />
          <TaskFilter onFilterChange={handleFilterChange} />
        </div>

        {/* Task Sort */}
        <div className="flex items-center mb-2 md:mb-0 space-x-2">
          <FaSortAmountDown className="text-blue-500" />
          <TaskSort onSortChange={handleSortChange} />
        </div>

        {/* Create Task Button */}
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setModalOpen(true)}
        >
          <FaPlus className="mr-2" />
          Add new task
        </button>
      </div>

      <div className="flex flex-wrap -mx-2">
        {filteredTasks.map(task => (
          <div className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          </div>
        ))}
      </div>
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onTaskCompleted={handleTaskCreated}
      />
    </div>
  );
};

export default TaskList;
