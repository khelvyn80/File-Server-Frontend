import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Greetings() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await axios.get('/api/file/greetings');
        setGreeting(response.data);
      } catch (error) {
        console.error("Error fetching the greeting:", error);
      }
    };
cd
    fetchGreeting();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{greeting}</h1>
      </header>
    </div>
  );
}

export default App;
