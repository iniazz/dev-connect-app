import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { apiService } from '../services/apiService';
import ToastNotification from '../utils/ToastNotification';

function UserCreate() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ id: null, username: '', email: '', phoneNumber: '', skillsets: '', hobby: '' });
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const { id, ...userWithoutId } = user;
    apiService.createUser(userWithoutId)
      .then((response) => {
        setShowSuccessToast(true);
        setShowErrorToast(false);
        setTimeout( () => {
          navigate('/');
        }, 1000)
      })
      .catch((error) => {
        setShowSuccessToast(false);
        setShowErrorToast(true);
      });
  };
  
  

  return (
    <div>
      <h2>Create User</h2>
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
          Create
        </Button>
      </Form>
      <Button variant="secondary" onClick={() => navigate('/')}>
        Back to User List
      </Button>

      {showSuccessToast && (
        <ToastNotification
          show={showSuccessToast}
          onClose={() => setShowSuccessToast(false)}
          message="User created successfully"
          success
        />
      )}
      {showErrorToast && (
        <ToastNotification
          show={showErrorToast}
          onClose={() => setShowErrorToast(false)}
          message="Error creating user"
          success={false}
        />
      )}
    </div>
  );
}

export default UserCreate;
