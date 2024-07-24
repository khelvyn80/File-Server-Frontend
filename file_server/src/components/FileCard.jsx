// src/components/FileCard.js
import React from 'react';
import './FileCard.css'; // Import the CSS file for styling

const FileCard = ({ file }) => {
  return (
    <div className="file-card">
      <h2>{file.name}</h2>
      <p><strong>Type:</strong> {file.type}</p>
      <p><strong>Size:</strong> {file.size} MB</p>
      <p><strong>Date:</strong> {new Date(file.date).toLocaleDateString()}</p>
    </div>
  );
};

export default FileCard;
