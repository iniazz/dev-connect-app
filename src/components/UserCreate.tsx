import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserCreate() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', email: '', /* other fields */ });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Send a POST request to your API to create a new user
    // Example: axios.post('/api/users', user).then(() => history.push('/'));
    const newUser = {
      username: 'john',
      email: 'john@gmail.com',
      // other user properties...
    };
    
    axios.post('/api/users', newUser)
      .then((response) => {
        // Handle the response data here
        console.log(response.data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={user.username} onChange={handleInputChange} />
        </div>
        {/* Add input fields for other user attributes */}
        <button type="submit">Create</button>
      </form>
      <button onClick={() => navigate('/')}>Back to User List</button>
    </div>
  );
}

export default UserCreate;
