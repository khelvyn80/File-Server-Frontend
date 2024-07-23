import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from './components/Adminpage';
import ForgotPassword from './components/Forgotpassword';
import Signup from './components/Signup';
import Login from './components/Login';
import Userpage from './components/Userpage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Login />} />
          <Route path="userpage" element={<Userpage />} />
          <Route path="forgotpassword" element={<ForgotPassword />} />
          <Route path="admin" element={<Admin />} />
          <Route path="signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
