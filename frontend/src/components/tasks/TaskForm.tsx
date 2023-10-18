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
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">Task created successfully!</div>}
      <input 
        type="text" 
        placeholder="Task Title" 
        value={formData.title} 
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="p-2 border rounded"
      />
      <textarea 
        placeholder="Task Description" 
        value={formData.description || ''}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="p-2 border rounded"
      />
      <button 
          type="submit" 
          className="px-4 py-2 bg-blue-500 text-white rounded"
          disabled={isSubmitting}
      >
        {isSubmitting ? "Creating..." : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
