import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserProfile, logoutAPI } from '../api/auth';
import { useAuth } from '../Auth';

const NavBar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [avatarURL, setAvatarURL] = useState<string | null>(null);

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

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await fetchUserProfile();  
        if (response.avatar) {
          console.log('response: ', response.avatar);
          setAvatarURL(response.avatar);
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    }
    fetchUserDetails();
}, []);


  return (
    <nav className="flex justify-between items-center py-4 bg-blue-500 text-white">
      <div className="px-6">
        <Link to="/">TaskEase</Link>
      </div>
      <div className="flex items-center px-6">
        {avatarURL && <img src={avatarURL} alt="User Avatar" className="w-8 h-8 rounded-full mr-4" />}
        {isAuthenticated && <button onClick={handleLogout} className="mr-5">Log out</button>}
      </div>
    </nav>
  );
}

export default NavBar;
