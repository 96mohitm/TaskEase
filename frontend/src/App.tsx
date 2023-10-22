import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import TaskForm from './components/tasks/TaskForm';
import TaskList from './components/tasks/TaskList';
import NavBar from './components/NavBar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { AuthProvider } from "./Auth";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div className="container mx-auto mt-10">
          <Routes>
            <Route path="/create" element={<TaskForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<TaskList />} />            
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
