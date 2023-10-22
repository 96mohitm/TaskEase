import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import TaskModal from './TaskModal';

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
    <div className="bg-white p-4 shadow rounded-lg flex justify-between items-center">
      <div>
          <h3 className="text-xl font-bold">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>
          <span className="block bg-blue-100 text-blue-800 py-1 px-2 rounded">{task.status}</span>
      </div>
      <div className="space-x-2">
        <button className="text-blue-500" onClick={handleOpenModal}>
          <FaEdit />
        </button>
        <button className="text-red-500" onClick={handleOpenDeleteConfirmModal}>
          <FaTrash />
        </button>
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
