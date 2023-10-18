import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center py-4 bg-blue-500 text-white">
      <div className="px-6">
        <Link to="/">TaskEase</Link>
      </div>
      <div className="px-6">
        <Link to="/create" className="mr-5">Create Task</Link>
        {/* TODO: add login/register links here */}
      </div>
    </nav>
  );
}

export default NavBar;
