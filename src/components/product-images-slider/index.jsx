import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Zoom } from "swiper";
import { useState } from "react";
import "swiper/css/zoom";

const ProductImagesSlider = (props) => {
	const [activeThumb, setActiveThumb] = useState();
	const [loop, setLoop] = useState(true);
	setTimeout(() => {
		setLoop(false);
	}, [1000]);
	return (
		<>
			<div className="thumb_section lg:block sm:hidden">
				<Swiper
					onSwiper={setActiveThumb}
					loop={loop}
					spaceBetween={10}
					slidesPerView={4}
					// navigation={true}
					direction="vertical"
					modules={[Navigation, Thumbs]}
					className=" mySwiper ">
					{props?.images.map((item, index) => (
						<SwiperSlide style={{ width: 90 }} key={index}>
							<img
								className=" h-full w-full"
								src={item.imageUrl}
								alt="product images thumb"
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<Swiper
				loop={true}
				spaceBetween={10}
				navigation={true}
				zoom={true}
				style={{
					"--swiper-navigation-color": "#fff",
					"--swiper-pagination-color": "#fff",
				}}
				pagination={{
					clickable: true,
				}}
				modules={[Navigation, Thumbs, Zoom]}
				grabCursor={true}
				thumbs={{
					swiper: activeThumb && !activeThumb.destroyed ? activeThumb : null,
				}}
				className="swiperss">
				{props?.images.map((item, index) => (
					<SwiperSlide key={index}>
						<div className="swiper-zoom-container">
							<img src={item.imageUrl} alt="product images" />
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
};

ProductImagesSlider.propTypes = {
	images: PropTypes.array.isRequired,
};

export default ProductImagesSlider;
