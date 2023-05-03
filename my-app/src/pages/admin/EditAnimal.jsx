import React, { useState, useEffect } from 'react';
import Service from '../../API/Service';

const EditAnimal = ({ animalId, handleClose }) => {
  const [species, setSpecies] = useState('');

  useEffect(() => {
    const fetchAnimal = async () => {
      const response = await Service.getAnimal(animalId);
      setSpecies(response.animal_species);
    };

    fetchAnimal();
  }, [animalId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await Service.updateAnimal(animalId, {animal_species: species})
    alert("Updated successfully")
    handleClose();
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


export default EditAnimal
