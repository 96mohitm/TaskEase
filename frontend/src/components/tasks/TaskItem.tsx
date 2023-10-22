import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCalendar } from 'react-icons/fa';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import TaskModal from './TaskModal';

type TaskItemProps = {
  task: {
      id: number;
      title: string;
      description?: string;
      status: string;
      due_date?: string;
  };
  onDelete: (id: number) => void;
  onUpdate: () => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onDelete, onUpdate }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenDeleteConfirmModal = () => {
    setDeleteConfirmModalOpen(true);
  };

  const handleCloseDeleteConfirmModal = () => {
    setDeleteConfirmModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    handleCloseDeleteConfirmModal();
    onDelete(task.id);
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">{task.title}</h3>
        <div className="space-x-2">
          <button className="text-blue-500 hover:text-blue-700" onClick={handleOpenModal}>
            <FaEdit />
          </button>
          <button className="text-red-500 hover:text-red-700" onClick={handleOpenDeleteConfirmModal}>
            <FaTrash />
          </button>
        </div>
      </div>
      <p className="text-gray-600">{task.description}</p>
      <div className="flex justify-between items-center">
        <span className="inline-flex items-center bg-blue-100 text-blue-800 py-1 px-2 rounded">
          {task.status}
        </span>
        {task.due_date && (
          <div className="text-sm flex items-center text-gray-700">
            <FaCalendar className="mr-1" /> Due on: {new Date(task.due_date).toLocaleDateString()}
          </div>
        )}
      </div>
      <TaskModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTaskCompleted={onUpdate}
        task={task}
      />
      <DeleteConfirmationModal
        isOpen={deleteConfirmModalOpen}
        onCancel={handleCloseDeleteConfirmModal}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default TaskItem;
