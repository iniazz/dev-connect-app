import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../user';
import { Table, Button } from 'react-bootstrap';
import UserDeleteConfirmation from './UserDeleteConfirmation';
import { apiService } from '../services/apiService';
import ToastNotification from '../utils/ToastNotification';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastVariant, setToastVariant] = useState<'success' | 'danger'>('success');
  const [toastMessage, setToastMessage] = useState<string>('');

  useEffect(() => {
    apiService.getUsers()
      .then((response) => {
        setUsers(response.data);
        setShowToast(true);
        setToastVariant('success');
        setToastMessage('Users fetched successfully');
      })
      .catch((error) => {
        setShowToast(true);
        setToastVariant('danger');
        setToastMessage('Error fetching users: ' + error);
      });
  }, []);

  const handleDeleteClick = (userId: number) => {
    setUserIdToDelete(userId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (userIdToDelete !== null) {
      apiService.deleteUser(userIdToDelete)
        .then(() => {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userIdToDelete));
          setToastVariant('success');
          setToastMessage('User deleted successfully');
        })
        .catch((error) => {
          setToastVariant('danger');
          setToastMessage('Error deleting user');
        })
        .finally(() => {
          setUserIdToDelete(null);
          setShowDeleteConfirmation(false);
          setShowToast(true);
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

      <ToastNotification
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        success={toastVariant === 'success'}
      />
    </div>
  );
};

export default UserList;
