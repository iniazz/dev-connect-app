import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { apiService } from '../services/apiService';
import ToastNotification from '../utils/ToastNotification';
import { User } from '../user';

function UserEdit({
  initialUser,
  onUpdateUser,
  onClose,
}: {
  initialUser: User;
  onUpdateUser: (updatedUser: User) => void;
  onClose: () => void;
}) {
  const [user, setUser] = useState({ username: '', email: '', phoneNumber: '', skillsets: '', hobby: ''});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSuccess, setToastSuccess] = useState(true);

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    apiService
      .updateUser(initialUser.id, user)
      .then((response) => {
        if (response.status === 204) {
          setToastMessage('User updated successfully');
          setToastSuccess(true);
          setShowToast(true);
          onUpdateUser({ ...user, id: initialUser.id });
          onClose();
        } else {
          setToastMessage('Update failed');
          setToastSuccess(false);
          setShowToast(true);
        }
      })
      .catch((error) => {
        setToastMessage('Error updating user');
        setToastSuccess(false);
        setShowToast(true);
      });
  };

  return (
    <div>
      <h2>User Informations</h2>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="skillsets">
          <Form.Label>Skillsets</Form.Label>
          <Form.Control
            type="text"
            name="skillsets"
            value={user.skillsets}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="hobby">
          <Form.Label>Hobby</Form.Label>
          <Form.Control
            type="text"
            name="hobby"
            value={user.hobby}
            onChange={handleInputChange}
          />
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Button variant="primary" size="sm" type="submit">
            Save Changes
          </Button>
        </div>
      </Form>

      <ToastNotification
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
        success={toastSuccess}
      />
    </div>
  );
}

export default UserEdit;
