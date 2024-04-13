import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import { useAuth } from '../../Auth';
import Spinner from '../common/Spinner';
// import LeftSection from './LeftSection';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, login, loading: authLoading } = useAuth();


  const navigate = useNavigate();

  useEffect(() => {
    // if already logged in then redirect to todo list page.
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/login/', {
        username: email,
        password: password,
      });

      // Handle the response according to your needs
      if (response.status === 200) {
        await login();
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response ? err.response.data : "An error occurred");
    }
  };

  return (
    <>
      {loading || authLoading ?
        <div className="flex items-center justify-center h-screen relative -mt-12">
          <Spinner size='large' />
        </div>
        :
        <div className="flex min-h-screen border-gray-300">
          <div className="flex-1 flex flex-col justify-normal items-center items-start p-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-8">
              {/* Company Name */}
              <h1 className="mb-8 text-center text-3xl font-semibold text-gray-900" style={{ textShadow: '0 1px 1px rgba(0, 0, 0, 0.3)' }}>
                TaskEase
              </h1>
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <div>
              
            </div>
            <br />
            <GoogleAuth setLoading={setLoading} />
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            </div>
          </div>
        </div>
      }
    </>
  );
}