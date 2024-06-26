import React, { useEffect, useState } from 'react';
import { loginUser } from '../../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Auth';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      // if already logged in then redirect to todo list.
      if (isAuthenticated) {
        navigate('/');
      }
    }, [isAuthenticated, navigate]);
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await loginUser({username, password});
    };

    return (
        <div className="w-full max-w-md mx-auto mt-4 p-6 border rounded shadow-md">
            <h2 className="text-2xl mb-4 font-semibold">Login to TaskEase</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="username" className="mb-1 text-sm font-medium">Username</label>
                    <input 
                        id="username"
                        type="text" 
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="p-2 border rounded"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="mb-1 text-sm font-medium">Password</label>
                    <input 
                        id="password"
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="p-2 border rounded"
                    />
                </div>
                <div>
                    <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Login
                    </button>
                </div>
            </form>
            <div className="mt-4 text-center">
                <span className="text-gray-600">Don't have an account?</span>
                <Link to="/register" className="ml-2 text-blue-500 hover:text-blue-600">Register here</Link>
            </div>
        </div>
    );
};

export default Login;
