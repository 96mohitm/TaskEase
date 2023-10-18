import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import TaskFilter from './TaskFilter';
import { fetchTasks, deleteTask } from '../../api/tasks';

type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
};

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchTasks();
        setTasks(data);
        setFilteredTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);  // Ensure filtered tasks are also updated
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const handleUpdate = async () => {
    try {
      const updatedTasks = await fetchTasks();
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating tasks list:", error);
    }
  };

  return (
    <div className="space-y-4">
      <TaskFilter tasks={tasks} onFilter={setFilteredTasks} />
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;
