import React, { useState, useEffect } from "react";
import Service from '../API/Service'

const PostForm = () => {
  const [postMode, setPostMode] = useState(1);
  const [speciesList, setSpeciesList] = useState([]);
  const [animalSpecies, setAnimalSpecies] = useState('');
  const [animalBreed, setAnimalBreed] = useState('');
  const [animalColor, setAnimalColor] = useState('');
  const [animalGender, setAnimalGender] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Service.getAnimals();
      setSpeciesList(response);
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('post_mode', postMode);
    formData.append('animal_id', animalSpecies);
    formData.append('user_id', getUserId());
    formData.append('animal_breed', animalBreed);
    formData.append('animal_color', animalColor);
    formData.append('animal_gender', animalGender);
    formData.append('location', location);
    formData.append('post_image', imageFile);
    formData.append('description', description);
    console.log(postMode, animalSpecies, animalBreed, animalColor, animalGender, location, description, imageFile)
    const addPost = async () => {
      const response = Service.addPost(formData);
      console.log(response);
    };
    addPost();
    if(postMode == 1) {
      window.location.href = '/lost-animals';
    } else {
      window.location.href = '/found-animals';
    }
    
  }

  function getUserId() {
    const cookieValue = document.cookie
    .split(';')
    .map(cookie => cookie.split('='))
    .find(([key, value]) => key.trim() === 'user_id');
    const storedUser = cookieValue ? cookieValue[1] : null;
    return storedUser;
  }

  if (!getUserId()) {
    return (
      <div style={{marginTop: '64px', marginLeft: '64px'}}>
        <h1>Please register</h1>
        <a href="/register">You may register here</a>
      </div>
    );
  } else {
  return (
    <div className="container mt-5">
      <h1>Post Form</h1>
      <form>
      <br />
        <div className="form-group">
          <label htmlFor="post+mode">Post</label>
          <select className="form-select" id="post_mode" value={postMode} onChange={(event) => setPostMode(event.target.value)}>
            <option value="1">Lost</option>
            <option value="2">Found</option>
          </select>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="animal_species">Animal Species</label>
          <select className="form-control" id="animal_species" value={animalSpecies} onChange={(event) => setAnimalSpecies(event.target.value)}>
            <option value="" disabled>Select species</option>
            {speciesList && speciesList.map(species => (
              <option key={species.animal_id} value={species.animal_species}>
                {species.animal_species}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="animal_breed">Animal Breed</label>
          <input type="text" className="form-control" id="animal_breed" value={animalBreed} onChange={(event) => setAnimalBreed(event.target.value)} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="animal_color">Animal Color</label>
          <select className="form-select" id="color" value={animalColor} onChange={(event) => setAnimalColor(event.target.value)}>
            <option value="" disabled>Select color</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="brown">Brown</option>
            <option value="gray">Gray</option>
            <option value="orange">Orange</option>
            <option value="yellow">Yellow</option>
          </select>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="animal_gender">Animal Gender</label>
          <select className="form-select" id="gender" value={animalGender} onChange={(event) => setAnimalGender(event.target.value)}>
            <option value="" disabled>Select gender</option>
            <option value="male">Masculine</option>
            <option value="female">Feminine</option>
          </select>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input type="text" className="form-control" id="location" value={location} onChange={(event) => setLocation(event.target.value)} />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea className="form-control" id="description" rows="3" value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="post_image">Post Image</label>
          <input 
            type="file" 
            className="form-control-file" 
            id="post_image" 
            onChange={(event) => setImageFile(event.target.files[0])}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
  }
}

export default PostForm
