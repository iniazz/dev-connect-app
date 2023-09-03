import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function UserCreate() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', email: '', phoneNumber: '', skillsets: '', hobby: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post('https://localhost:7249/api/User', user)
      .then((response) => {
        console.log(response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error);
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
    </div>
  );
}

export default UserCreate;
