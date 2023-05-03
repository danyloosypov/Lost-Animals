import React, { useState } from 'react';
import Axios from 'axios';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';

function AdminLogin() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const headers = {
    'Content-Type': 'application/json', // Example header
  };

  
  const cookieValue = document.cookie
  .split(';')
  .map(cookie => cookie.split('='))
  .find(([key, value]) => key.trim() === 'user_id');
  const storedUser = cookieValue ? cookieValue[1] : null;
  if(storedUser !== null) {
    window.location.href = '/';
  }
  
  

  const handleLogin = () => {
      console.log("email", email);
      console.log("password", password);
    // Perform login action using Axios
    Axios.post('/auth/admin-login', { admin_email: email,
      admin_password: password }, { headers })
      .then(response => {
        const token = response.data.token;
        const admin_id = response.data.admin_id;
        document.cookie = `token=${token}`;
        document.cookie = `admin_id=${admin_id}`;


        const cookieValue = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .find(([key, value]) => key.trim() === 'token');
        const storedToken = cookieValue ? cookieValue[1] : null;
        console.log('Token', storedToken);

        window.location.href = '/admin-site';
      })
      .catch(error => {
        // Handle login error
        console.error('Login failed', error);
      });
  };


  return (
    <MDBContainer fluid>
      <MDBRow>

        <MDBCol sm='6'>

          <div className='d-flex flex-row ps-5 pt-5'>
            <MDBIcon fas icon="crow fa-3x me-3" style={{ color: '#709085' }}/>
            <span className="h1 fw-bold mb-0">Logo</span>
          </div>

          <div className='d-flex flex-column justify-content-center h-custom-2 w-75 pt-4'>

            <h3 className="fw-normal mb-3 ps-5 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={e => setEmail(e.target.value)}/>
            <MDBInput wrapperClass='mb-4 mx-5 w-100' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={e => setPassword(e.target.value)}/>

            <MDBBtn className="mb-4 px-5 mx-5 w-100" color='info' size='lg' onClick={handleLogin}>Login</MDBBtn>
          </div>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default AdminLogin;