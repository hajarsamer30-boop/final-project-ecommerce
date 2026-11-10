'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import img from '../assets/slider.png'
import Image from 'next/image';

export default function Slider() {
  return (
   <div className="relative">

     <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={true}
        loop={true}
        className=" overflow-hidden shadow-lg"
      >
        <SwiperSlide className="bg-blue-500 text-white  text-center text-xl font-bold">
          <Image alt='' src={img} className='w-full h-100 object-cover' />
        </SwiperSlide>
        <SwiperSlide className="bg-blue-500 text-white  text-center text-xl font-bold">
          <Image alt='' src={img} className='w-full h-100 object-cover' />
        </SwiperSlide>
        
      </Swiper>
    </div>
    <div className="bg-green-400/35 absolute inset-0 z-50 pointer-events-none "></div>
   </div>
  );
}