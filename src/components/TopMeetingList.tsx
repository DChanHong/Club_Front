import React from 'react'
import { useRef } from 'react'
import Slider from 'react-slick'
import bulter from "../../public/butler.png"
import Image from 'next/image'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {AiFillCaretRight ,AiFillCaretLeft } from "react-icons/ai";

const TopMeetingList = () => {

    const sliderRef = useRef<Slider>(null);
    const handlePrevClick = () => {        
          sliderRef.current?.slickPrev();
      };
      const handleNextClick = () => {
          sliderRef.current?.slickNext();
      };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
      };
    const images = [
        { id: 1, src: '/public/butler.jpg', alt: 'Image 1' },
        { id: 2, src: '/public/butler.jpg', alt: 'Image 2' },
        { id: 3, src: '/public/butler.jpg', alt: 'Image 3' },
        { id: 4, src: '/public/butler.jpg', alt: 'Image 4' },
        { id: 5, src: '/public/butler.jpg', alt: 'Image 5' },
        { id: 6, src: '/public/butler.jpg', alt: 'Image 6' },
        { id: 7, src: '/public/butler.jpg', alt: 'Image 7' },
        { id: 8, src: '/public/butler.jpg', alt: 'Image 8' },
        { id: 9, src: '/public/butler.jpg', alt: 'Image 9' },
        { id: 10, src: '/public/butler.jpg', alt: 'Image 10' },
        { id: 11, src: '/public/butler.jpg', alt: 'Image 11' },
        { id: 12, src: '/public/butler.jpg', alt: 'Image 12' },
      ];

  return (
    <div className='mb-10'>
        <div className='border-2 w-[62rem] my-2 mx-auto text-[20px]'> 인기 동아리 리스트 </div>

        <div className='flex justify-start w-[62rem] mx-auto '>
            <button onClick={handlePrevClick}><AiFillCaretLeft/></button>
            <Slider className=' w-[62rem]'  ref={sliderRef} {...settings}>
                {images.map((image) => (
                    <div key={image.id}>
                        <Image src={bulter} 
                            alt={image.alt} 
                            width={200}
                            height={200}
                            
                        />
                    </div>
                ))}
            </Slider>
            <button onClick={handleNextClick}><AiFillCaretRight/></button>
        </div>
    </div>
  )
}

export default TopMeetingList