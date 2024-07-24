import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [stats, setStats] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(response.data);
      setTitle('');
      setDescription('');
      setFile(null);
      setErrorMessage('');
      fetchStats(); 
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('Failed to upload file. Please try again.');
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/stats');
      setStats(response.data);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching stats:', error);
      setErrorMessage('Failed to fetch stats. Please try again.');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl mb-8 font-bold text-center text-blue-600">Admin Panel</h2>
        {errorMessage && <div className="mb-4 text-red-500 text-center">{errorMessage}</div>}
        <form onSubmit={handleUpload} className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200">Upload</button>
        </form>

        <h3 className="text-2xl mb-4 font-semibold text-gray-700">File Status</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <h3 className="text-xl mb-2 font-semibold text-gray-800">{stat.title}</h3>
              <p className="mb-4 text-gray-600">Downloads: {stat.downloads}</p>
              <p className="text-gray-600">Emails Sent: {stat.emailsSent}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
