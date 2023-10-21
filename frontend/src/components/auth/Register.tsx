import React, { useState } from 'react';
import { registerUser } from '../../api/auth';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await registerUser({ username, email, password });
            if (response.status === 201) {
                // Registration successful, redirect to login or home page.
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-1/3 mx-auto p-4 shadow-md rounded-md bg-white">
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
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Register
                </button>
            </div>
        </form>
    );
};

export default Register;
