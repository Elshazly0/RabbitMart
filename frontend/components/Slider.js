import React from "react";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import styles from "../styles/Home.module.css";

export default function slider() {

  const slideImages = [
    'https://www.woolworthsmuseum.co.uk/PostWarPix/Food1958.jpg',
    'https://cdn.cheapism.com/images/GettyImages-3308178.2e16d0ba.fill-1440x605.jpg',
    'https://www.woolworthsmuseum.co.uk/PostWarPix/Food1959.jpg'
  ];



  return <div className={styles.Banner}>
    <Slide easing="ease" >
      <div className={styles.eachslide}>
        <div style={{ 'backgroundImage': `url(${slideImages[0]})` }}>
        </div>
      </div>
      <div className={styles.eachslide}>
        <div style={{ 'backgroundImage': `url(${slideImages[1]})` }}>
        </div>
      </div>
      <div className={styles.eachslide}>
        <div style={{ 'backgroundImage': `url(${slideImages[2]})` }}>
        </div>
      </div>
    </Slide>

  </div>;
}
