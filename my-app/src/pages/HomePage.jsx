import React from 'react'
import MySlider from '../components/Slider'
import Stepper from '../components/Stepper'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,

  };
  return (
    <div className='container' style={{marginTop: '64px',}}>
      <MySlider/>
      <div style={{marginTop: 200}}></div>
      <Stepper/>
      <Slider {...settings} style={{marginTop:'64px'}}>
            <div>
              <h3>Slide 1</h3>
            </div>
            <div>
              <h3>Slide 2</h3>
            </div>
            <div>
              <h3>Slide 3</h3>
            </div>
            <div>
              <h3>Slide 4</h3>
            </div>
            <div>
              <h3>Slide 5</h3>
            </div>
            <div>
              <h3>Slide 6</h3>
            </div>
          </Slider>
    </div>
  )
}

export default HomePage
