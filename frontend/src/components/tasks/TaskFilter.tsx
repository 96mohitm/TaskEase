import React from 'react';

type Props = {
    onFilterChange: (status: string) => void;
};

const TaskFilter: React.FC<Props> = ({ onFilterChange }) => {
    return (
        <select onChange={(e) => onFilterChange(e.target.value)}>
            <option value="">All</option>
            <option value="TO_DO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="IN_REVIEW">In Review</option>
            <option value="DONE">Done</option>
        </select>
    );
};

export default TaskFilter;
