import { FaSort } from 'react-icons/fa';

interface SortProps {
  onSortChange: (sortOption: string) => void;
}

const TaskSort: React.FC<SortProps> = ({ onSortChange }) => {
  return (
    <div className="flex items-center bg-white border rounded-md">
      <FaSort className="text-gray-700 px-2" />
      <select
          onChange={(e) => onSortChange(e.target.value)}
          className="bg-transparent appearance-none outline-none py-1 pr-4"
      >
          <option value="" disabled selected>Sort</option>
          <option value="-created_at">Created: Newest</option>
          <option value="-updated_at">Updated: Newest</option>
      </select>
    </div>
  );
};

export default TaskSort;
