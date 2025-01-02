import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProjectPage from './pages/ProjectPage';
import { createRoot } from 'react-dom/client';
import ProjectListPage from './pages/ProjectListPage'
import './styles/global.css'

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Router basename='/ExpertConnect'>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/project-list" />} /> */}
        <Route path="/" Component={ProjectListPage} />
        <Route path="/project-list" Component={ProjectListPage} />
        <Route path="/project/1" element={<ProjectPage />} />        
      </Routes>
    </Router>
  </React.StrictMode>
);