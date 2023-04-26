import React from 'react'
import Slider from '../components/Slider'
import Stepper from '../components/Stepper'

const HomePage = () => {
  return (
    <div className='container' style={{marginTop: '64px',}}>
      <Slider/>
      <div style={{marginTop: 200}}></div>
      <Stepper/>
    </div>
  )
}

export default HomePage
