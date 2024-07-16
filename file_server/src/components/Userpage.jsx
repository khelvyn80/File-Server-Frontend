import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Userpage() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get('/api/files');
        setFiles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl mb-8">Available Files</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {files.map((file) => (
          <div key={file.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl mb-2">{file.title}</h3>
            <p className="mb-4">{file.description}</p>
            <a href={file.downloadUrl} className="text-blue-500">Download</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Userpage;
