import React, {useEffect, useState} from 'react'
import { Container, Form, Button, Tab, Tabs } from 'react-bootstrap';
import PostCard from '../../components/PostCard';
import Service from '../../API/Service'
import axios from 'axios';
import AnimalForm from './AnimalForm'
import Animals from './Animals';
import Users from './Users';
import Posts from './Posts';



const AdminHomePage = () => {
  const [activeTab, setActiveTab] = useState('animals'); // State to keep track of active tab

  const handleTabSelect = (tabKey) => {
    setActiveTab(tabKey);
  }

  const cookieValue = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .find(([key, value]) => key.trim() === 'admin_id');
    const storedUser = cookieValue ? cookieValue[1] : null;
    if(storedUser === null) {
      window.location.href = '/admin-login';
    }

    return (
      <div>
        <Container style={{marginTop: '64px'}}>
          <h1>Dashboard</h1>
          <Tabs activeKey={activeTab} onSelect={handleTabSelect} style={{marginTop:'32px'}}>
  
          <Tab eventKey="animals" title="Animal Species">
          <div style={{marginTop:'64px'}}>
            <h3>Animals</h3>
            <Animals/>
          </div>
          </Tab>

          <Tab eventKey="addAnimal" title="Add Animal Species">
          <div style={{marginTop:'64px'}}>
            <h3>Add Animal Species</h3>
            <AnimalForm />
          </div>
          </Tab>
  
          <Tab eventKey="users" title="Users">
          <div style={{marginTop:'64px'}}>
          <h3>Users</h3>
            <Users/>
          </div>
          </Tab>
          
          <Tab eventKey="posts" title="Posts">
          <div style={{marginTop:'64px'}}>
          <h3>Posts</h3>
            <Posts/>
          </div>
          </Tab>
          </Tabs>
        </Container>
        
      </div>
      
    );
 
}


export default AdminHomePage;
