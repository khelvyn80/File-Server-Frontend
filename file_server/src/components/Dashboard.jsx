// src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import FileCard from '../components/FileCard';
// import './Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios.get('/dashboard')
      .then(response => {
        setFiles(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the files!", error);
      });
  }, []);

  return (
    <div className="dashboard">
      {files.map(file => (
        <FileCard key={file.id} file={file} />
      ))}
    </div>
  );
};

export default Dashboard;
