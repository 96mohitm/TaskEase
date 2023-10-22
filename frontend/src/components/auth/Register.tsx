import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/auth';
import { useAuth } from '../../Auth';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // if already logged in then redirect to candidates page.
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const response = await registerUser({
        username: username,
        email: email,
        password: password,
        avatar: avatar
      });
      
      if (response.status === 201) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4 p-6 border rounded shadow-md bg-white">
      <h2 className="text-2xl mb-4 font-semibold">Register to TaskEase</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">Profile Image</label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={e => {
              if (e.target.files && e.target.files.length > 0) {
                setAvatar(e.target.files[0]);
              }
            }}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <span className="text-gray-600">Already have an account?</span>
        <Link to="/login" className="ml-2 text-blue-500 hover:text-blue-600">Login here</Link>
      </div>
    </div>
  );
};

export default Register;
