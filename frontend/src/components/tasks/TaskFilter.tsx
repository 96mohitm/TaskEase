import React from 'react';

type TaskFilterProps = {
  tasks: any[];
  onFilter: (filtered: any[]) => void;
};

const TaskFilter: React.FC<TaskFilterProps> = ({ tasks, onFilter }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'ALL') {
      onFilter(tasks);
    } else {
      onFilter(tasks.filter(task => task.status === value));
    }
  };

  return (
    <select onChange={handleFilterChange} className="p-2 border rounded">
      <option value="ALL">All</option>
      <option value="TO_DO">To Do</option>
      <option value="IN_PROGRESS">In Progress</option>
      <option value="IN_REVIEW">In Review</option>
      <option value="DONE">Done</option>
    </select>
  );
};

export default TaskFilter;
