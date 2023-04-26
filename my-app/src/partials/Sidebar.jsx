import React from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar bg-light p-4" style={{ width: '20%', height: '100%', minHeight: '100vh'  }}>
      <h2>Filters</h2>
      <div className="form-group">
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" className="form-control" placeholder="Enter location" />
      </div>
      <div className="form-group">
        <label htmlFor="species">Animal Species:</label>
        <select id="species" name="species" className="form-control">
          <option value="">Select species</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="rabbit">Rabbit</option>
          {/* Add more species options as needed */}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="search">Search Text:</label>
        <input type="text" id="search" name="search" className="form-control" placeholder="Search text" />
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <div>
          <div className="form-check">
            <input type="radio" id="male" name="gender" value="male" className="form-check-input" />
            <label htmlFor="male" className="form-check-label">Male</label>
          </div>
          <div className="form-check">
            <input type="radio" id="female" name="gender" value="female" className="form-check-input" />
            <label htmlFor="female" className="form-check-label">Female</label>
          </div>
        </div>
      </div>
      <button type="button" className="btn btn-primary">Apply Filters</button>
      {/* Add event handlers for applying filters */}
    </div>
  );
};

export default Sidebar;
