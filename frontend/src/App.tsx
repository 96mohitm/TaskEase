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

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mx-auto mt-10">
        <Routes>
          <Route path="/create" element={<TaskForm />} />
          <Route path="/" element={<TaskList />} />            
        </Routes>
      </div>
    </Router>
  );
}

export default App;
