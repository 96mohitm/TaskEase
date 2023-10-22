import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAPI } from '../api/auth';

const NavBar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAPI();
      console.log('logout success.!!');
      // Optionally display a message or notification to the user here
      window.location.href = '/login';
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <nav className="flex justify-between items-center py-4 bg-blue-500 text-white">
      <div className="px-6">
        <Link to="/">TaskEase</Link>
      </div>
      <div className="px-6">
        <button onClick={handleLogout} className="mr-5">Log out</button>
        {/* TODO: add login/register links here */}
      </div>
    </nav>
  );
}

export default NavBar;
