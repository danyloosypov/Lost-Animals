import React, { useState } from 'react';
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

export default function Header() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085', marginLeft: 30 }} />
  <a className="navbar-brand" href="/">
    4Paws
  </a>
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarNav"
    aria-controls="navbarNav"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item active">
        <a className="nav-link" href="/">
          Home
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/lost-animals">
          Lost Animals
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/found-animals">
          Found Animals
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/my-account">
          My Account
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">
          Logout
        </a>
      </li>
    </ul>
  </div>
</nav>

    </header>
  );
}