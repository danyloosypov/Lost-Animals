import React from 'react';
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';

export default function Slider() {
  return (
<MDBCarousel showIndicators showControls fade>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={1}
        src='https://cdn.shopify.com/s/files/1/0560/2829/9472/files/HappyPet_-_Logo-_400_x_100-removebg-preview.png?height=628&pad_color=e5b5aa&v=1620804372&width=1200'
        alt='...'
        style={{ height: '100%', maxHeight: '400px' }}
      >
        <h5>First slide label</h5>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </MDBCarouselItem>

      <MDBCarouselItem
        className='w-100 d-block'
        itemId={2}
        src='https://www.telegraph.co.uk/content/dam/news/2022/04/29/0422_DOGS_LEAD_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.jpg?impolicy=logo-overlay'
        alt='...'
        style={{ height: '100%', maxHeight: '400px' }}
      >
        <h5>Second slide label</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </MDBCarouselItem>

      <MDBCarouselItem
        className='w-100 d-block'
        itemId={3}
        src='https://www.flytap.com/-/media/Flytap/new-tap-pages/travelling-with-animals/pets/flying-with-pets-og-image-1200x630.jpg'
        alt='...'
        style={{ height: '100%', maxHeight: '400px' }}
      >
        <h5>Third slide label</h5>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </MDBCarouselItem>
    </MDBCarousel>
    
  );
}