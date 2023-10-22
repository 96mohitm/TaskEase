interface SortProps {
  onSortChange: (sortOption: string) => void;
}

const TaskSort: React.FC<SortProps> = ({ onSortChange }) => {
  return (
      <div>
          <select
              onChange={(e) => onSortChange(e.target.value)}
              className="border rounded-md text-black"
          >
              <option value="-created_at">Sort by Created At</option>
              <option value="-updated_at">Sort by Updated At</option>
          </select>
      </div>
  );
};

export default TaskSort;
