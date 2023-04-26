// Layout.js
import React from 'react';
import Header from '../partials/Header';
import Footer from '../partials/Footer';

import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBBtn,
  MDBCollapse
} from 'mdb-react-ui-kit';

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div style={{ minHeight: '100vh' }}> {/* Add margin top to make space for the header */}
        {children} {/* Content of the page */}
      </div>
      <Footer /> {/* Footer component */}
    </div>
  );
};

export default Layout;
