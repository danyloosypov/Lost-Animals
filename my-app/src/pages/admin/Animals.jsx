import React, { useState, useEffect } from 'react';
import Service from '../../API/Service';
import { Table, Button, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import EditAnimal from './EditAnimal';



const Animals = () => {
  const [animals, setAnimals] = useState([]);
  const [editingAnimalId, setEditingAnimalId] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await Service.getAnimals();
      console.log("asda", response)
      setAnimals(response);
    };

    fetchPosts();
  }, []);

  const handleDelete = async (animalId, e) => {
    e.preventDefault();
    const response = await Service.deleteAnimal(animalId);  
    setAnimals(animals.filter((animal) => animal.animal_id !== animalId));  
  };

  const handleEdit = (animalId) => {
    setEditingAnimalId(animalId);
  };

  const handleClose = () => {
    setEditingAnimalId(null);
  };


  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Species</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {animals.map(animal => (
            <tr key={animal.animal_id}>
              <td>{animal.animal_id}</td>
              <td>{animal.animal_species}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(animal.animal_id)}>Edit</Button>
                <Button variant="danger" onClick={(e) => handleDelete(animal.animal_id, e)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={editingAnimalId !== null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Animal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditAnimal animalId={editingAnimalId} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
}


export default Animals
