import React from 'react';

type Props = {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

const DeleteConfirmationModal: React.FC<Props> = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-700">
            <div className="bg-white p-4 rounded-lg shadow-xl w-96">
                <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                <p>Are you sure you want to delete this task?</p>
                <div className="flex justify-end mt-4">
                    <button className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded mr-2" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
