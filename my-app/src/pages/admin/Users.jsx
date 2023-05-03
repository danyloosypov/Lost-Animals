import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Service from '../../API/Service';
import { Table, Button } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await Service.getUsers();
      console.log("asda", response)
      setUsers(response);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId, e) => {
    e.preventDefault();
    const response = await Service.deleteUserFromAdmin(userId);  
    setUsers(users.filter((user) => user.user_id !== userId));  
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_id}</td>
              <td>{user.user_firstname}</td>
              <td>{user.user_lastname}</td>
              <td>{user.user_email}</td>
              <td>{user.user_phone}</td>
              <td>
                <Button variant="danger" onClick={(e) => handleDelete(user.user_id, e)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
