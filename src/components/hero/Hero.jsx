import { Swiper, SwiperSlide } from "swiper/react";

// Image

import Banner1 from "../../assets/banner_3.png";
import Banner2 from "../../assets/banner_4.png";
import Banner3 from "../../assets/banner_5.png";
import Banner4 from "../../assets/banner_6.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const Hero = () => {
	return (
		<div className="section z-0 lg:pt-0 sm:pt-28 text-center">
			<Swiper
				spaceBetween={30}
				centeredSlides={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				modules={[Autoplay, Pagination, Navigation]}
				className="mySwiper rounded-xl">
				<SwiperSlide>
					<img
						src={Banner1}
						className="md:h-full sm:h-[230px]"
						alt="bannerImage"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src={Banner2}
						className="md:h-full sm:h-[230px]"
						alt="bannerImage"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src={Banner3}
						className="md:h-full sm:h-[230px]"
						alt="bannerImage"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<img
						src={Banner4}
						className="md:h-full sm:h-[230px]"
						alt="bannerImage"
					/>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default Hero;
