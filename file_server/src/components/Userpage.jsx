import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Userpage() {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFiles = files.filter((file) =>
    file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendFile = async () => {
    if (!email || !selectedFileId) {
      setErrorMessage('Please select a file and enter an email address.');
      return;
    }

    try {
      await axios.post('/api/send-file', { fileId: selectedFileId, email });
      setSuccessMessage('File sent successfully!');
      setErrorMessage('');
      setEmail('');
      setSelectedFileId(null);
    } catch (error) {
      console.error('Error sending file:', error);
      setErrorMessage('Failed to send file. Please try again.');
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl mb-8">Available Files</h2>
      <input
        type="text"
        placeholder="Search files"
        value={searchQuery}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFiles.map((file) => (
          <div key={file.id} className="bg-white p-4 rounded shadow-md">
            <h3 className="text-xl mb-2">{file.title}</h3>
            <p className="mb-4">{file.description}</p>
            <a href={file.downloadUrl} className="text-blue-500">Download</a>
            <button
              className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
              onClick={() => setSelectedFileId(file.id)}
            >
              Send to Email
            </button>
          </div>
        ))}
      </div>
      {selectedFileId && (
        <div className="mt-8 bg-white p-4 rounded shadow-md">
          <h3 className="text-xl mb-2">Send File to Email</h3>
          {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}
          {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
          <input
            type="email"
            placeholder="Recipient Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendFile}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Send File
          </button>
        </div>
      )}
    </div>
  );
}

export default Userpage;
