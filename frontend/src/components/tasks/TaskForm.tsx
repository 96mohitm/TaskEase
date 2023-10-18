import React, { useState } from 'react';
import { createTask } from '../../api/tasks';
import { AxiosError } from 'axios';

interface APIErrorResponse {
  error: string;
}

type TaskFormData = {
  title: string;
  description?: string;
};

const TaskForm: React.FC = () => {
  const [formData, setFormData] = useState<TaskFormData>({ title: '' });
  const [isSubmitting, setIsSubmitting] = useState(false); // for showing loading or disabling the submit button
  const [error, setError] = useState<string | null>(null); // for displaying API errors to the user
  const [success, setSuccess] = useState<boolean>(false); // for notifying the user of success

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); // Begin submission, can be used to show loading state
    setError(null); // Reset previous errors

    try {
      const newTask = await createTask(formData);

      if (newTask) {
        setFormData({ title: '' }); // Reset form
        setSuccess(true); // Notify user of success
      } else {
        setError("There was an unexpected error. Please try again.");
      }
    } catch (error) {
      // Assuming the API sends back errors in a predictable structure:
      const axiosError = error as AxiosError<APIErrorResponse>;
      setError(axiosError?.response?.data?.error || "An error occurred while creating the task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md shadow-md w-full max-w-lg space-y-4">

        {/* Error and Success messages */}
        {error && <div className="text-red-600 border-l-4 border-red-600 p-4 bg-red-100 rounded"> {error} </div>}
        {success && <div className="text-green-600 border-l-4 border-green-600 p-4 bg-green-100 rounded"> Task created successfully! </div>}

        {/* Task Title */}
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

        {/* Task Description */}
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

        {/* Add Task Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
