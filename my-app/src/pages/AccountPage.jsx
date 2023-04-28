import React, { useState } from 'react';
import { Container, Form, Button, Tab, Tabs } from 'react-bootstrap';
import PostCard from '../components/PostCard';



const AccountPage = () => {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [activeTab, setActiveTab] = useState('likedPosts'); // State to keep track of active tab

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
  }



  const handleTabSelect = (tabKey) => {
    setActiveTab(tabKey);
  }


  return (
    <div>

      <Container style={{marginTop: '64px'}}>
        <h1>Personal Account</h1>
        <Tabs activeKey={activeTab} onSelect={handleTabSelect} style={{marginTop:'32px'}}>

        <Tab eventKey="likedPosts" title="Liked Posts">
        <div style={{marginTop:'64px'}}>
          <h3>Liked posts</h3>
          
        </div>
        </Tab>

        <Tab eventKey="myPosts" title="My Posts">
        <div style={{marginTop:'64px'}}>
          <h3>My posts</h3>
          
        </div>
        </Tab>
        
        <Tab eventKey="myData" title="My Data">
        <Form onSubmit={handleFormSubmit} style={{width:'50%', margin: 'auto', marginTop:'60px'}}>
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
        </Tab>
        <Tab eventKey="deleteAccount" title="Delete Account">
        <div style={{marginTop:'64px'}}>
          <h3>Are you sure?</h3>
          <button className="btn btn-danger">Confirm</button>
        </div>
        </Tab>
        </Tabs>
      </Container>
      
    </div>
    
  );
}


export default AccountPage;
