import React from 'react';
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const limitedText = post.description.slice(0, 100) + (post.description.length > 100 ? '...' : '');
  const navigate = useNavigate()

  console.log(post.post_image)

  return (
    <div className="card">
      <img src={post.post_image} className="card-img-top" style={{maxHeight: '200px'}} alt="Fissure in Sandstone" />
      <div className="card-body">
        <h5 className="card-title">{post.animal_breed}</h5>
        <p className="card-text">{limitedText}</p>
      </div>
      <button className="btn btn-danger" style={{ borderRadius: '50%', position: 'absolute', top: '10px', right: '10px', padding: '8px' }}>
          <i className="fas fa-heart"></i>
        </button>
        <button className='btn btn-outline-primary' onClick={()=>navigate(`/post/${post.post_id}`)}>GET INFO</button>
    </div>
  );
};

export default PostCard;
