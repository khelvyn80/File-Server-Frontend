import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState('USER'); // Default role is 'user'

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', { email, password, confirm, role }, {
        headers : {
        'Contet-Type' : 'application/json',
      },
    });
      
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-4">Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />

            <input
              type="password"
              placeholder='Confirm Password'
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
