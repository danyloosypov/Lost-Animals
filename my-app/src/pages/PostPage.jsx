import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PostPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  console.log(params.id);

  useEffect(() => {
    fetch(`http://localhost:3001/posts/${params.id}`)
      .then((response) => response.json())
      .then((data) => setPost(data))
      .catch((error) => console.error(error));
    fetch(`http://localhost:3001/users/${post.user_id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, [params.id]);
  

  return (
    <div className="container mt-5">
  <div className="row">
    <div className="col-md-4">
      <img src={post.imageUrl} alt="post" className="img-fluid" />
      <div className="mt-2">
        <button className='btn btn-danger'>Delete</button>
        <button className='btn btn-primary'>Edit</button>
      </div>
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
