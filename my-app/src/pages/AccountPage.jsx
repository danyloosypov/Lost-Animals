import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const AccountPage = () => {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
  }

  return (
    <Container style={{marginTop: '64px'}}>
      <h1>Personal Account</h1>
      <Form onSubmit={handleFormSubmit}>
      <br />
        <Form.Group controlId="userFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            value={userFirstName}
            onChange={(e) => setUserFirstName(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="userLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            value={userLastName}
            onChange={(e) => setUserLastName(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="userPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="userEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </Form.Group>
        <br />
        <Form.Group controlId="userPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your phone number"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
          />
        </Form.Group>
        <br />
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default AccountPage;
