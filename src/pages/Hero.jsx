import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import "slick-carousel/slick/slick.css";
import "../styles/slick-theme.css";

function Hero() {
  const [slides, setSlides] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      const q = query(collection(db, 'heroImages'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const images = snapshot.docs.map(doc => doc.data().imageUrl);
      setSlides(images);
    };

    fetchImages();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true
  };

  return (
    <div className='bg-black'>
      <section className='relative'>
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index}>
              <img src={slide} alt={`Slide ${index + 1}`} className='w-full h-[400px] sm:h[500px] lg:h[700px] xl:h-screen object-cover' />
            </div>
          ))}
        </Slider>

        <div className='absolute bottom-6 left-1/2 transform -translate-x-1/2'>
          <button className='bg-orange-500 hover:bg-orange-700 text-white px-6 py-2 rounded-full' onClick={() => setShowOptions(true)}>Contact Me!</button>
        </div>

        {showOptions && (
          <div className='absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full p-4 flex flex-col items-center gap-2'>
            <a href="tel:+4531858062" className='text-blue-600 hover:underline'>Call via number!</a>
            <a href="mailto:sherabnamgyal71@gmail.com" className='text-blue-600 hover:underline'>Send me an email!</a>
            <button className='mt-2 text-sm text-gray-500 hover:underline' onClick={() => setShowOptions(false)}>Close</button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Hero;
