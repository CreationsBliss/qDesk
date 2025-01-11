import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectFade, Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/effect-fade';
import Slide from '../Slide/Slide';
import slider1 from "../../assets/images/slider1.jpg"
import slider2 from "../../assets/images/slider2.jpg"
import slider3 from "../../assets/images/slider3.jpg"

const Carousel = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={'fade'}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={false}
        navigation={false}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide img={slider1} title={"Get Your Web Development Projects Done in Minutes"} btnText={"Post Job & Hire Expert"}></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide img={slider2} title={"Start Your Digital Marketing Campaigns up Running"} btnText={"Post Job & Hire Expert"}></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide img={slider3} title={"Get Your Graphics Design Projects Done in Minutes"} btnText={"Post Job & Hire Expert"}></Slide>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;