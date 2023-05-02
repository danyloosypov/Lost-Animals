import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Service from '../API/Service'

const PostPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3001/posts/${params.id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error(error));
  }, [params.id]);
  
  useEffect(() => {
    if (post.user_id) {
      console.log(post.user_id);
      fetch(`http://localhost:3001/users/post-user/${post.user_id}`)
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((error) => console.error(error));
    }
  }, [post.user_id]);

  function getUserId() {
    const cookieValue = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .find(([key, value]) => key.trim() === 'user_id');
    const storedUser = cookieValue ? cookieValue[1] : null;
    return storedUser;
  }

  const handleDeletePost = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      Service.deletePost(post.post_id);
      alert('Post deleted successfully.');
      window.location.href = '/';
    }
  }

  const isCurrentUserPost = getUserId() == user.user_id;
  console.log(getUserId(), user.user_id, isCurrentUserPost)
  console.log(user)
  
  

  return (
    <div className="container mt-5">
  <div className="row">
    <div className="col-md-4">
      <img src={`http://localhost:3001/${post.post_image}`} alt="post" className="img-fluid" />

      {isCurrentUserPost && (
        <div className="mt-2">
          <button className='btn btn-danger' onClick={handleDeletePost}>Delete</button>
          <button className='btn btn-primary'>Edit</button>
        </div>
      )}
    </div>
    <div className="col-md-8">
      <h1>Lost Animal</h1>
      <h3>{post.animal_breed}</h3>
      <ul>
        <li>Color: {post.animal_color}</li>
        <li>Gender: {post.animal_gender}</li>
        <li>Location: {post.location}</li>
      </ul>
      <p>{post.description}</p>
      <h3>Contacts</h3>
      <ul>
        <li>Name: {user.user_firstname} {user.user_lastname}</li>
        <li>Email: {user.user_email}</li>
        <li>Phone: {user.user_phone}</li>
      </ul>
    </div>
  </div>
</div>

  );
};

export default PostPage;
