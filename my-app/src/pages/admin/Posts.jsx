import React, { useState, useEffect } from 'react';
import Service from '../../API/Service';
import { Table, Button } from 'react-bootstrap';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await Service.getLostAnimals();
      console.log("asda", response)
      setPosts(response);
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId, e) => {
    e.preventDefault();
    const response = await Service.deletePost(postId);  
    setPosts(posts.filter((post) => post.post_id !== postId));  
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Post Mode</th>
            <th>Animal id</th>
            <th>user Id</th>
            <th>Animal Breed</th>
            <th>Animal Color</th>
            <th>Animal Gender</th>
            <th>Location</th>
            <th>Image</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.post_id}>
              <td>{post.post_id}</td>
              <td>{post.post_mode}</td>
              <td>{post.animal_id}</td>
              <td>{post.user_id}</td>
              <td>{post.animal_breed}</td>
              <td>{post.animal_color}</td>
              <td>{post.animal_gender}</td>
              <td>{post.location}</td>
              <td>
                <img
                  src={post.post_image}
                  style={{ maxHeight: '200px' }}
                />
              </td>
              <td>{post.description}</td>
              <td>
                <Button variant="danger" onClick={(e) => handleDelete(post.post_id, e)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}


export default Posts
