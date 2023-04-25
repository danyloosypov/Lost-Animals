import React, { useState } from 'react';
import Axios from 'axios';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';

function Registration() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const headers = {
        'Content-Type': 'application/json', // Example header
      };
    
  
    const handleRegister = () => {
        console.log("email", email);
        console.log("password", password);
      // Perform login action using Axios
      Axios.post('/auth/register', { user_email: email,
        user_password: password }, { headers })
        .then(response => {
          // Handle successful login
          console.log('Login successful', response.data.token);
        })
        .catch(error => {
          // Handle login error
          console.error('Login failed', error);
        });
    };


  return (
    <MDBContainer fluid className='p-4'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            The best Service<br />
            <span className="text-primary">4 Paws</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
            quibusdam tempora at cupiditate quis eum maiores libero
            veritatis? Dicta facilis sint aliquid ipsum atque?
          </p>

        </MDBCol>

        <MDBCol md='6'>

          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>

              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text'/>
                </MDBCol>

                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Last name' id='form1' type='text'/>
                </MDBCol>
              </MDBRow>

              <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/>
              <MDBInput wrapperClass='mb-4' label='phone' id='form1' type='phone'/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'/>

              <MDBBtn className='w-100 mb-4' size='md'>sign up</MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">Already have an account? <a href="/login" className="link-danger">Log In</a></p>


            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Registration;