import React from 'react';

type SpinnerProps = {
  size?: 'small' | 'medium' | 'large',
  color?:
    | 'gray-800'
    | 'gray-400'
    | 'red-600'
    | 'yellow-600'
    | 'green-600'
    | 'blue-600'
    | 'indigo-600'
    | 'purple-600'
    | 'pink-600'
    | 'orange-600'
};

const sizeMapping = {
  small: 'w-4 h-4',
  medium: 'w-6 h-6',
  large: 'w-8 h-8',
};

const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', color = 'blue-600' }) => {
  return (
    <div
      className={`animate-spin inline-block border-[3px] border-current border-t-transparent text-${color} rounded-full ${sizeMapping[size]}`}
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;