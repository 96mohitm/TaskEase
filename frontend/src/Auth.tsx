import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';


interface AuthContextType {
    isAuthenticated: boolean | null;
    login: () => void;
    logout: () => void;
    loading: boolean;
}

const defaultContext: AuthContextType = {
    isAuthenticated: null,
    login: () => {
        console.warn('login function was called without a AuthProvider.');
    },
    logout: () => {
        console.warn('logout function was called without a AuthProvider.');
    },
    loading: true,
};


const AuthContext = createContext<AuthContextType>(defaultContext);

export const useAuth = () => {
    return useContext(AuthContext);
};

type AuthProviderProps = {
    children: ReactNode;
};


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    // On initial load, check if the user is authenticated
    axios.get('/users/isAuthenticated/')
        .then(() => {
            setIsAuthenticated(true);
            setLoading(false);
        })
        .catch(() => {
            setIsAuthenticated(false);
            setLoading(false);
        });
  }, []);

    const contextValue = {
      isAuthenticated,
      login,
      logout,
      loading,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
