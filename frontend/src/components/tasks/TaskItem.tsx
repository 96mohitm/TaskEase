import React, { useState } from 'react';
import { FaEdit, FaTrash, FaCalendar } from 'react-icons/fa';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import TaskModal from './TaskModal';
import { getStatusLabel } from './task_utils';

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
    <div className="bg-white p-4 shadow-md rounded-lg space-y-4 border border-gray-200">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-blue-800">{task.title}</h3>
        <div className="space-x-2">
          <button className="text-blue-500 focus:outline-none" onClick={handleOpenModal}>
            <FaEdit />
          </button>
          <button className="text-red-500 focus:outline-none" onClick={handleOpenDeleteConfirmModal}>
            <FaTrash />
          </button>
        </div>
      </div>
      <div className="text-gray-700 h-20 overflow-y-auto">
        <p>{task.description}</p>
      </div>
      <div className="flex justify-between items-center">
        <span className="inline-flex items-center bg-blue-200 text-blue-900 py-1 px-2 rounded-full">
          {getStatusLabel(task.status)}
        </span>
        {task.due_date && (
          <div className="text-sm flex items-center text-gray-800">
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
