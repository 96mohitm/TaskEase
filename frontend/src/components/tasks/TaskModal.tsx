import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../../api/tasks';
import { AxiosError } from 'axios';

interface APIErrorResponse {
  error: string;
}

type TaskFormData = {
  id?: number;
  title: string;
  description?: string;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onTaskCompleted: () => void;
  task?: TaskFormData;
}

const TaskModal: React.FC<Props> = ({ isOpen, onClose, onTaskCompleted, task }) => {
  const [formData, setFormData] = useState<TaskFormData>(task || { title: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isUpdateMode = Boolean(task);

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (isUpdateMode && task) { // Checking if task is defined here
        await updateTask(task.id!, formData);
      } else {
        await createTask(formData);
      }
  
      setFormData({ title: '' });
      onTaskCompleted();
      onClose();
    } catch (error) {
      const axiosError = error as AxiosError<APIErrorResponse>;
      setError(axiosError?.response?.data?.error || "Error processing task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full z-10 inset-0 overflow-y-auto bg-opacity-50 bg-gray-700 mt-0" style={{ 'marginTop': '0' }}>
      {/* <div className="bg-black opacity-60 fixed inset-0 z-10"></div> */}
      <div className="flex items-center justify-center min-h-screen z-50"> {/* Modal content container with z-50 */}
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg space-y-4">
        <h2 className="text-xl font-bold">{isUpdateMode ? "Update Task" : "Create Task"}</h2>
          
          {error && <div className="text-red-600 border-l-4 border-red-600 p-4 bg-red-100 rounded"> {error} </div>}

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700">Task Title</label>
              <input
                id="taskTitle"
                type="text"
                placeholder="Enter task title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                id="taskDescription"
                placeholder="Enter task description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
              />
            </div>

            <div className="flex justify-end">
              <button
                className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2 ${isSubmitting ? "opacity-50" : ""}`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (isUpdateMode ? "Updating..." : "Creating...") : (isUpdateMode ? "Update Task" : "Add Task")}
              </button>

              <button
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <div className="fixed z-9 inset-0 bg-black opacity-60"></div> */}
    </div>
  );
};

export default TaskModal;