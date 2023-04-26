import React from 'react'
import Sidebar from '../partials/Sidebar';

const FoundPage = () => {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      {/* Sidebar component */}
      <Sidebar/>

      <div style={{ flex: '1', padding: '2rem' }}>
        {/* Page content */}
        <h1>Found</h1>
        {/* Add other page content here */}
      </div>
    </div>
  )
}

export default FoundPage
