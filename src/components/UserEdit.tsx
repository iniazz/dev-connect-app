import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { apiService } from '../services/apiService';
import ToastNotification from '../utils/ToastNotification';

function UserEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', email: '', phoneNumber: '', skillsets: '', hobby: ''});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastSuccess, setToastSuccess] = useState(true);

  useEffect(() => {
    apiService.getUsersById(Number(id))
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        setToastMessage('Error fetching user');
        setToastSuccess(false);
        setShowToast(true);
      });
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    apiService.updateUser(Number(id), user)
      .then((response) => {
        if (response.status === 204) {
          setToastMessage('User updated successfully');
          setToastSuccess(true);
          setShowToast(true);
          setTimeout(() => {
            navigate('/');
          }, 1000)
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
      <h2>Edit User</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={user.username}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={user.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="skillsets">
          <Form.Label>Skillsets:</Form.Label>
          <Form.Control
            type="text"
            name="skillsets"
            value={user.skillsets}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="hobby">
          <Form.Label>Hobby:</Form.Label>
          <Form.Control
            type="text"
            name="hobby"
            value={user.hobby}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
      <Button variant="secondary" onClick={() => navigate('/')}>
        Back to User List
      </Button>

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
