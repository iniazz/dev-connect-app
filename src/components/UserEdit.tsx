// UserEdit.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UserEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', email: '', /* other fields */ });

  useEffect(() => {
    // Fetch user details based on the 'id' parameter
    // Example: axios.get(`/api/users/${id}`).then((response) => setUser(response.data));
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Send a PUT request to your API to update user details
    // Example: axios.put(`/api/users/${id}`, user).then(() => history.push('/'));
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={user.username} onChange={handleInputChange} />
        </div>
        {/* Add input fields for other user attributes */}
        <button type="submit">Save Changes</button>
      </form>
      <button onClick={() => navigate('/')}>Back to User List</button>
    </div>
  );
}

export default UserEdit;
