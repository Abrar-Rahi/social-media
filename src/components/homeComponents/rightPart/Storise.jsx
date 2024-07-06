import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

const Storise = () => {
    return (
        <>
            <div>
                <h3 className='font-gilroyBold text-xl mb-4'>Stories</h3>
            </div>
            <div className='w-[402px]'>
                <Swiper spaceBetween={15} slidesPerView={3.5}>

                    <SwiperSlide className='w-1/3 h-52 bg-red rounded-xl'>
                        <div className='w-8 h-8 rounded-full bg-black border-2 border-white mt-1.5 ml-1.5'>

                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='w-1/3 h-52 bg-red rounded-xl'>
                        <div className='w-8 h-8 rounded-full bg-black border-2 border-white mt-1.5 ml-1.5'>

                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='w-1/3 h-52 bg-red rounded-xl'>
                        <div className='w-8 h-8 rounded-full bg-black border-2 border-white mt-1.5 ml-1.5'>

                        </div>
                    </SwiperSlide>
                    <SwiperSlide className='w-1/3 h-52 bg-red rounded-xl'>
                        <div className='w-8 h-8 rounded-full bg-black border-2 border-white mt-1.5 ml-1.5'>

                        </div>
                    </SwiperSlide>


                </Swiper>
            </div>

        </>
    )
}

export default Storise