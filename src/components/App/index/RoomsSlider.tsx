'use client'

import Link from 'next/link'
import Image from 'next/image'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import '%%/stylesheets/medicine_slider.css'

import Heading from '#/UI/Heading'

interface SliderProps {
  sliderData: {
    name: string
    description: string
    imageUrl: string
    slug: string
  }[]
  classes: string
}

const RoomsSlider: React.FC<SliderProps> = ({sliderData, classes}) => {
  const slides = sliderData.map((slide, index) => (
    <SwiperSlide key={index}>
      <Link className="relative grid w-full h-full overflow-hidden place-items-center group" href={`/rooms/${slide.slug}`}>
        <Image quality={100} priority={true} className="object-cover s-full group-hover:scale-[103%] duration-500" src={slide.imageUrl} fill={true} sizes="25vw" alt={`акция ${index + 1}`} />

        <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-45">
          <div className="p-5 w-[92%] space-y-2 sm:space-y-1 text-white">
            <Heading type="subtitle" text={slide.name} />
            <Heading type="caption" classes="line-clamp-2 sm:hidden" text={slide.description} />
          </div>
        </div>
      </Link>
    </SwiperSlide>
  ))

  return (
    <Swiper data-section="medicine-index" className={classes} slidesPerView={2} spaceBetween={10} loop={true} speed={1000} navigation={true} modules={[Navigation]}>
      {slides}
    </Swiper>
  )
}

export default RoomsSlider