import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const location = useLocation();
  const { email } = location.state || {}; 

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [er, setEr] = useState('');

  const handelclickdelete = async () => {
    try {
      const req = await axios.delete('http://localhost:5000/user/delete', {data: { email }});
      if (req.status === 200) {
        setEr('User deleted successfully');
      }
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        if (status === 400) {
          setEr('User does not exist');
        } else {
          setEr('Server error');
        }
      }
    }
  };

  const handelupdate = async () => {
    try {
      const req = await axios.put('http://localhost:5000/user/update', {
        email,
        name,
        password
      });
      if (req.status === 200) {
        setEr('User updated successfully');
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          setEr('User not found');
        } else {
          setEr('Server error');
        }
      }
    }
  };

  return (
    <div>
      {er && <p>{er}</p>}
      <h1>Welcome, {email}</h1>

      <label>Name</label>
      <input 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /><br />

      <label>Password</label>
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />

      <button onClick={handelupdate}>Update</button>
      <button onClick={handelclickdelete}>Delete</button>
    </div>
  );
};

export default Dashboard;
