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

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const headers = {
      'Content-Type': 'application/json', // Example header
    };
  

  const handleLogin = () => {
      console.log("email", email);
      console.log("password", password);
    // Perform login action using Axios
    Axios.post('/auth/login', { user_email: email,
      user_password: password }, { headers })
      .then(response => {
        const token = response.data.token;
        const user_id = response.data.user_id;
        document.cookie = `token=${token}`;
        document.cookie = `user_id=${user_id}`;


        const cookieValue = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .find(([key, value]) => key.trim() === 'token');
        const storedToken = cookieValue ? cookieValue[1] : null;
        console.log('Token', storedToken);

        
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
            <p className='ms-5'>Don't have an account? <a href="/register">Register here</a></p>

          </div>

        </MDBCol>

        <MDBCol sm='6' className='d-none d-sm-block px-0'>
          <img src="https://img.freepik.com/free-photo/vertical-shot-cute-labrador-dog-sitting-mountain-during-sunset_181624-43911.jpg"
            alt="Login image" className="w-100" style={{objectFit: 'cover', objectPosition: 'left'}} />
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Login;