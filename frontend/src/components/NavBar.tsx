import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUserProfile, logoutAPI } from '../api/auth';
import { useAuth } from '../Auth';

const DEFAULT_PROFILE_URL = './default_profile_pic.png';

const NavBar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [avatarURL, setAvatarURL] = useState<string>(DEFAULT_PROFILE_URL);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    <nav className="flex justify-between items-center py-4 bg-blue-500 text-white relative">
      <div className="px-6">
        <Link to="/">TaskEase</Link>
      </div>
      {isAuthenticated && (
        <div className="flex items-center px-6 relative">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={avatarURL} alt="User Avatar" className="w-full h-full object-cover" />
            </div>
          </button>
          {dropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-40 py-1 bg-white border border-gray-200 rounded shadow-xl">
              <button onClick={handleLogout} className="block w-full text-left px-3 py-1 text-m text-gray-600 hover:bg-gray-100">
                Log out
              </button>
            </div>
          )}

        </div>
      )}
    </nav>
  );
}

export default NavBar;
