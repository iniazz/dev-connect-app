import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  username: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch the list of users from your API here and update the users state.
    // For this example, we'll use a dummy array.
    const dummyUsers: User[] = [
      { id: 1, username: 'User1' },
      { id: 2, username: 'User2' },
    ];
    setUsers(dummyUsers);
  }, []);

  const handleDeleteClick = (userId: number) => {
    // Remove the user from the users array.
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

    // You can also send a delete request to your API here.
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}{' '}
            <Link to={`/edit/${user.id}`}>Edit</Link>{' '}
            <button onClick={() => handleDeleteClick(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
