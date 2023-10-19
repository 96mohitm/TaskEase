import React, { useState } from 'react';
import { updateTask, deleteTask } from '../../api/tasks';
import { FaEdit, FaTrash } from 'react-icons/fa';

type TaskItemProps = {
  task: {
      id: number;
      title: string;
      description?: string;
      status: string;
  };
  onDelete: (id: number) => void;
  onUpdate: () => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(task);

  const handleDelete = async () => {
    try {
      onDelete(task.id);
    } catch (error) {
        console.error("Error deleting task:", error);
    }
  };

  const handleSave = async () => {
    try {
        await updateTask(task.id, formData);
        setIsEditing(false);
        onUpdate();  // Notify parent component to re-fetch or filter out the updated task
    } catch (error) {
        console.error("Error updating task:", error);
    }
  };

  return isEditing ? (
        <div className="bg-white p-4 shadow rounded-lg">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.description || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                ></textarea>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Status:</label>
                <select
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                >
                    <option value="TO_DO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="IN_REVIEW">In Review</option>
                    <option value="DONE">Done</option>
                </select>
            </div>

            <div className="flex justify-end space-x-4">
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSave}
                >
                    Save
                </button>
                <button 
                    className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setIsEditing(false)}
                >
                    Cancel
                </button>
            </div>
        </div>
    ) : (
        <div className="bg-white p-4 shadow rounded-lg flex justify-between items-center">
            <div>
                <h3 className="text-xl font-bold">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
                <span className="block bg-blue-100 text-blue-800 py-1 px-2 rounded">{task.status}</span>
            </div>
            <div className="space-x-2">
                <button className="text-blue-500" onClick={() => setIsEditing(true)}>
                    <FaEdit />
                </button>
                <button className="text-red-500" onClick={handleDelete}>
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;
