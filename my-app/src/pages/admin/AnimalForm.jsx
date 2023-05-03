import React, { useState, useEffect } from 'react';
import Service from '../../API/Service';

const AnimalForm = () => {
  const [species, setSpecies] = useState('');


  const handleSubmit = async (e) => {
    const response = await Service.addAnimal({animal_species: species})
    alert("Added successfully")
    setSpecies("")
  };

  return (
    <div>
      <div className="form-control">
        <label htmlFor="species-name">Species</label>
        <input type="text" name="species-name" id="species-name" value={species} onChange={(e) => setSpecies(e.target.value)} />
      </div>
      <br />
      <button onClick={(e) => handleSubmit(e)}>Submit</button>
    </div>
  )
}


export default AnimalForm
