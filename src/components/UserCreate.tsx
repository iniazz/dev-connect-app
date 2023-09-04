import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { apiService } from '../services/apiService';
import ToastNotification from '../utils/ToastNotification';

interface UserCreateProps {
  onCreateUser: (newUser: any) => void;
  onClose: () => void;
}

function UserCreate({ onCreateUser, onClose }: UserCreateProps) {
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
        onCreateUser(response.data);
        onClose();
      })
      .catch((error) => {
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
            placeholder="johndoe"
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={user.email}
            placeholder="johndoe@gmail.com"
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            name="phoneNumber"
            value={user.phoneNumber}
            placeholder="60123456789"
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="skillsets">
          <Form.Label>Skillsets</Form.Label>
          <Form.Control
            type="text"
            name="skillsets"
            value={user.skillsets}
            placeholder="Javascripts, Phyton, etc"
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="hobby">
          <Form.Label>Hobby</Form.Label>
          <Form.Control
            type="text"
            name="hobby"
            value={user.hobby}
            placeholder="Coding, read books, etc"
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <br />
        <div className="d-flex justify-content-end">
          <Button variant="warning" type="submit">
            Register
          </Button>
        </div>
      </Form>

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
