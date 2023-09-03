import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../user';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import UserDeleteConfirmation from './UserDeleteConfirmation';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get('https://localhost:7249/api/User')
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleDeleteClick = (userId: number) => {
    setUserIdToDelete(userId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (userIdToDelete !== null) {
      axios
        .delete(`https://localhost:7249/api/User/${userIdToDelete}`)
        .then(() => {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userIdToDelete));
          console.log('User deleted successfully.');
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
        })
        .finally(() => {
          setUserIdToDelete(null);
          setShowDeleteConfirmation(false);
        });
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <Link to="/create" className="btn btn-success">
        Create New User
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/edit/${user.id}`} className="btn btn-primary">
                  Edit
                </Link>
                <Button variant="danger" onClick={() => handleDeleteClick(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showDeleteConfirmation && (
        <UserDeleteConfirmation
          onDeleteConfirmed={handleConfirmDelete}
          onCancel={() => setShowDeleteConfirmation(false)}
          user={users.find((user) => user.id === userIdToDelete) || null}
        />
      )}
    </div>
  );
};

export default UserList;
