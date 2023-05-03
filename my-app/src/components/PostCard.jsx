import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Service from '../API/Service';

const PostCard = ({ post }) => {
  const limitedText = post.description.slice(0, 100) + (post.description.length > 100 ? '...' : '');
  const navigate = useNavigate();
  const [myFavourites, setMyFavourites] = useState();
  const [isFavorite, setIsFavorite] = useState(false);

  function getUserId() {
    const cookieValue = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .find(([key, value]) => key.trim() === 'user_id');
    const storedUser = cookieValue ? cookieValue[1] : null;
    return storedUser;
  }

  useEffect(() => {
    const user_id = getUserId();
  
    if (user_id) {
      const fetchData = async () => {
        const result = await Service.getMyFavourites(user_id);
        console.log("result", result);
        setMyFavourites(result);
        const isPostInFavourites = result.some((favourite) => favourite.post_id == post.post_id);
        setIsFavorite(isPostInFavourites);
      };
  
      fetchData();
    }
  }, [getUserId(), post]);



  const handleLike = () => {
    if(getUserId()) {
      setIsFavorite(!isFavorite);
      if(isFavorite) {
        Service.deleteFromFavourites(post.post_id, getUserId())
      } else {
        Service.addToFavourites(post.post_id, getUserId())
      }
    } else {
      alert("Authorize");
    }
    
  }

  return (
    <div className="card">
      <img src={post.post_image} className="card-img-top" style={{maxHeight: '200px'}} alt="Fissure in Sandstone" />
      <div className="card-body">
        <h5 className="card-title">{post.animal_breed}</h5>
        <p className="card-text">{limitedText}</p>
      </div>
      <button className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-danger'}`} onClick={handleLike} style={{ borderRadius: '50%', position: 'absolute', top: '10px', right: '10px', padding: '8px' }}>
          <i className="fas fa-heart"></i>
      </button>
      <button className='btn btn-outline-primary' onClick={()=>navigate(`/post/${post.post_id}`)}>GET INFO</button>
    </div>
  );
};

export default PostCard;
