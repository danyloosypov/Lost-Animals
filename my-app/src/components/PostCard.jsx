import React from 'react';

const PostCard = ({ post }) => {
  const limitedText = post.description.slice(0, 100) + (post.description.length > 100 ? '...' : '');

  return (
    <div className="card">
      <img src={post.post_image} className="card-img-top" alt="Fissure in Sandstone" />
      <div className="card-body">
        <h5 className="card-title">{post.animal_breed}</h5>
        <p className="card-text">{limitedText}</p>
      </div>
      <button className="btn btn-danger" style={{ borderRadius: '50%', position: 'absolute', top: '10px', right: '10px', padding: '8px' }}>
          <i className="fas fa-heart"></i>
        </button>
        <button className='btn btn-outline-primary'>respond</button>
    </div>
  );
};

export default PostCard;
