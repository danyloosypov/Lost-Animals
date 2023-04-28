import React, {useEffect, useState} from 'react'

const Sidebar = () => 
{

  return (
    <div className="sidebar bg-light p-4" style={{ width: '20%', height: '100%', minHeight: '100vh'  }}>
      <h2>Filters</h2>
      <br />
      <div className="form-group">
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" className="form-control" placeholder="Enter location" />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="species">Animal Species:</label>
        <select id="species" name="species" className="form-control" >
          <option value="">Select species</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="rabbit">Rabbit</option>
          {/* Add more species options as needed */}
        </select>
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="colors">Animal Color:</label>
        <select id="colors" name="species" className="form-control" >
          <option value="">Select color</option>
          <option value="red">Red</option>
          <option value="black">Black</option>
          <option value="brown">Brown</option>
        </select>
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="search">Search Text:</label>
        <input type="text" id="search" name="search" className="form-control" placeholder="Search text" />
      </div>
      <br />
      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <div>
          <div className="form-check">
            <input type="radio" id="male" name="gender" value="Male" className="form-check-input" />
            <label htmlFor="male" className="form-check-label">Male</label>
          </div>
          <div className="form-check">
            <input type="radio" id="female" name="gender" value="Female" className="form-check-input"  />
            <label htmlFor="female" className="form-check-label">Female</label>
          </div>
        </div>
      </div>
      <br />
      <button type="button" className="btn btn-primary">Reset Filters</button>
      {/* Add event handlers for applying filters */}
    </div>
  );
};

export default Sidebar;
