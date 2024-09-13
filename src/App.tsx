import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ProjectPage from './pages/ProjectPage';
import ProjectListPage from './pages/ProjectListPage'
import './styles/global.css'

// const App: React.FC = () => {
//   return (
//     <ProjectPage />
//   );
// };

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/project-list" />} /> */}
        <Route path="/" Component={ProjectListPage} />
        <Route path="/project-list" Component={ProjectListPage} />
        <Route path="/project/1" element={<ProjectPage />} />
      </Routes>
    </Router>
  );
}

export default App;