import React, {useEffect, useState} from 'react'
import { Container, Form, Button, Tab, Tabs } from 'react-bootstrap';
import PostCard from '../components/PostCard';
import Service from '../API/Service'
import axios from 'axios';


const AccountPage = () => {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [myPosts, setMyPosts] = useState([]);
  const [myFavourites, setMyFavourites] = useState([]);
  const [userPhone, setUserPhone] = useState('');
  const [activeTab, setActiveTab] = useState('likedPosts'); // State to keep track of active tab

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
  }

  function getUserId() {
    const cookieValue = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .find(([key, value]) => key.trim() === 'user_id');
    const storedUser = cookieValue ? cookieValue[1] : null;
    return storedUser;
  }



  const handleTabSelect = (tabKey) => {
    setActiveTab(tabKey);
  }

  const handleDeleteUser = (e) => {
    const storedUser = getUserId();
        if(storedUser !== null) {
          const response = Service.deleteUser(storedUser);
          console.log(response);
        }
  }

  useEffect(() => {
    const user_id = getUserId();
   
    const fetchData = async () => {
      const response = await Service.getPersonalData(user_id);
      setUserFirstName(response.user_firstname);
      setUserLastName(response.user_lastname);
      setUserEmail(response.user_email);
      setUserPhone(response.user_phone);
      const result = await axios.get('/my-favourites/' + user_id);
      setMyFavourites(result.data);
      const posts = await axios.get('/my-posts/' + user_id);
      setMyPosts(posts.data);
    };
    fetchData();
  }, []);


  return (
    <div>

      <Container style={{marginTop: '64px'}}>
        <h1>Personal Account</h1>
        <Tabs activeKey={activeTab} onSelect={handleTabSelect} style={{marginTop:'32px'}}>

        <Tab eventKey="likedPosts" title="Liked Posts">
        <div style={{marginTop:'64px'}}>
          <h3>Liked posts</h3>
          <div className="post-grid">
            {myFavourites.map(post => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </div>
        </div>
        </Tab>

        <Tab eventKey="myPosts" title="My Posts">
        <div style={{marginTop:'64px'}}>
          <h3>My posts</h3>
          <div className="post-grid">
            {myPosts.map(post => (
              <PostCard key={post.post_id} post={post} />
            ))}
          </div>
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
            Update
          </Button>
        </Form>
        </Tab>
        <Tab eventKey="deleteAccount" title="Delete Account">
        <div style={{marginTop:'64px'}}>
          <h3>Are you sure?</h3>
          <button className="btn btn-danger" onClick={handleDeleteUser}>Confirm</button>
        </div>
        </Tab>
        </Tabs>
      </Container>
      
    </div>
    
  );
}


export default AccountPage;
