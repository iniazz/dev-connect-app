import React, { useState, useEffect } from 'react';
import { User } from '../user';
import { Table, Button, Card, Modal } from 'react-bootstrap';
import UserDeleteConfirmation from './UserDeleteConfirmation';
import { apiService } from '../services/apiService';
import ToastNotification from '../utils/ToastNotification';
import UserCreate from './UserCreate';
import UserEdit from './UserEdit';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
  const [showCreateUserModal, setShowCreateUserModal] = useState<boolean>(false);
  const [showUserEditModal, setShowUserEditModal] = useState<boolean>(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
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

  const handleCreateUser = (newUser: User) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setShowToast(true);
    setToastVariant('success');
    setToastMessage('User created successfully');
  };

  const handleEditClick = (user: User) => {
    setUserToEdit(user);
    setShowUserEditModal(true);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setShowToast(true);
    setToastVariant('success');
    setToastMessage('User updated successfully');
    setShowUserEditModal(false);
  };

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
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h2>Developer Networking Platform</h2>
          <Button variant="primary" size="sm" onClick={() => setShowCreateUserModal(true)}>
            Add New User
          </Button>
        </Card.Header>
        <Card.Body>
          <Card.Title>Connecting Talent to Opportunities</Card.Title>
          <br />
          <Card.Text>
          Welcome to the Freelancer Directory by CDN - Complete Developer Network. Connect with skilled freelancers, update your profile, and explore opportunities. <br />Collaborate effortlessly to make a brighter future together!
          </Card.Text>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Skillsets</th>
                <th>Hobby</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.skillsets}</td>
                  <td>{user.hobby}</td>
                  <td>
                    <Button variant="secondary" size="sm" onClick={() => handleEditClick(user)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteClick(user.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* CREATE USER MODAL */}
      <Modal show={showCreateUserModal} onHide={() => setShowCreateUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserCreate
            onCreateUser={handleCreateUser}
            onClose={() => setShowCreateUserModal(false)}
          />
        </Modal.Body>
      </Modal>

      {/* EDIT USER MODAL */}
      <Modal show={showUserEditModal} onHide={() => setShowUserEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {userToEdit && (
            <UserEdit
              initialUser={userToEdit}
              onUpdateUser={(updatedUser) => {
                handleUpdateUser(updatedUser);
                setShowUserEditModal(false);
              }}
              onClose={() => setShowUserEditModal(false)}
            />
          )}
        </Modal.Body>
      </Modal>


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
