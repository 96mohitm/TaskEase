import React from 'react';
import { Link } from 'react-router-dom';
import { logoutAPI } from '../api/auth';
import { useAuth } from '../Auth';

const NavBar: React.FC = () => {
  const { isAuthenticated } = useAuth();

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
      {isAuthenticated && <button onClick={handleLogout} className="mr-5">Log out</button>}
      </div>
    </nav>
  );
}

export default NavBar;
