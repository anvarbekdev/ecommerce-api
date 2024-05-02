import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Link as Scroll } from "react-scroll";
// import { AiFillStar } from "react-icons/ai";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { useMutation } from "react-query";
import axios from "../../api/axios.jsx";
import { useDispatch } from "react-redux";
import { addItem } from "~/store/slices/cartSlice.js";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { GiShoppingCart } from "react-icons/gi";
import DOMPurify from "dompurify";

import ProductImagesSlider from "../product-images-slider/index.jsx";

export const ProductDetail = () => {
	// ===========================
	const [isOpen, setIsOpen] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const dropdownRef = useRef(null);
	const [product, setProduct] = useState([]);
	const [image, setImage] = useState();
	const sizes = product?.sizes;
	const [wordSizes, setWordSizes] = useState(sizes);
	const [productSame, setProductSame] = useState([]);

	const handleBodyClick = (event) => {
		if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
			// Click inside dropdown, do nothing
			return;
		}

		// Click outside dropdown, close it
		setIsOpen(false);
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleBodyClick);
		return () => {
			document.removeEventListener("mousedown", handleBodyClick);
		};
	}, []);

	const handleDropdownClick = () => {
		setIsOpen(!isOpen);
	};

	// ===========================

	let { id } = useParams();
	// console.log(cartItems);
	const { isLoading: query1Loading, mutate: getProductId } = useMutation(
		async () => {
			return axios.get(`/api/user/${id}`);
		},
		{
			onSuccess: (res) => {
				if (res) {
					setProduct(res.data.data[0]);
					setImage(res.data.data[0].images);
				}
			},
			onError: (err) => {
				console.log(err.response.data);
			},
		}
	);
	const { isLoading: query2Loading, mutate: getProductSame } = useMutation(
		async () => {
			return axios.get(`/api/productsItem`, {
				params: { optionId: product?.optionId },
			});
		},
		{
			onSuccess: (res) => {
				if (res) {
					setProductSame(res.data);
					// setImage(res.data.data[0].images);
				}
			},
			onError: (err) => {
				console.log(err.response.data);
			},
		}
	);

	useEffect(() => {
		if (product.length !== 0) {
			getProductSame();
		}
	}, [product]);

	useEffect(() => {
		if (product?.size === null) {
			setDisabled(false);
		}
	}, [product]);
	useEffect(() => {
		if (product?.size === null) {
			setDisabled(false);
		}
		getProductId();
	}, [id]);

	useEffect(() => {
		if (wordSizes?.size.length === 2) {
			setDisabled(false);
		}
	}, [wordSizes]);

	const handleClick2 = (id) => {
		const wordSlider = sizes[id];
		setWordSizes(wordSlider);
	};

	const dispatch = useDispatch();

	const handleAddToCart = () => {
		let item = {
			id: product.id,
			name: product.name,
			price: product.price,
			chegirma: product.chegirma,
			brand: product.brand,
			size: wordSizes.size,
			color: product.color,
			delivery: product.delivery,
			images: product.images,
			optionId: product.optionId,
			rating: product.rating,
			quantity: 1,
			totalPrice: 0,
		};
		dispatch(addItem(item));
	};
	// console.log(product);
	return (
		<div className="mx-5">
			<div className="pt-40 ">
				<div className="flex  lg:flex-row sm:flex-col w-full justify-around items-center">
					<div className="flex  lg:max-h-[470px] sm:max-h-[410px] lg:w-[460px] sm:w-[300px]  ">
						<div className="customswip flex ">
							{image?.length !== undefined ? (
								<ProductImagesSlider images={image} />
							) : (
								<></>
							)}
						</div>
					</div>
					<div className="lg:w-[50%] sm:w-[100%]  clicked   ">
						<p className="flex items-center py-1 text-md">
							{/* <AiFillStar className=" text-yellow-400" /> */}
							&nbsp;
							{product?.rating}
						</p>
						<div className=" text-black text-2xl">{product?.name}</div>
						<div className=" text-black text-md my-4">
							<span className=" mr-36">Sotuvchi:</span>
							<span className="">{product?.brand}</span>
						</div>
						<div className=" text-black text-md my-4">
							<span className=" flex items-center">
								Yetkazib berish:
								<button
									className="text-[#8a8d93] text-lg"
									onClick={handleDropdownClick}>
									<HiOutlineInformationCircle />
								</button>
								<span className="ml-20">{product?.delivery}</span>&nbsp;kun
								{isOpen && (
									<p
										className=" absolute w-64 p-2 text-[12px]  rounded-md bg-slate-700 text-white"
										ref={dropdownRef}>
										Mahsulot buyurtirilgan kunning ertasiga mahsulotni rasmiy
										topshirish punktlarimizga yetkazamiz. Rasmiylashtirish
										bosqichida sizga eng qulay manzilni tanlang.
									</p>
								)}
							</span>
							<hr className="my-8" />
							{wordSizes?.size && (
								<div>
									<span>O'lchami:</span>
									<span className="ml-4 font-semibold">{wordSizes?.size}</span>
								</div>
							)}

							<div className=" flex my-4">
								{sizes?.map((size) => (
									<div className=" mr-3" key={size.id}>
										<button
											className={
												wordSizes?.id === size.id
													? "clicked border-2 py-2 px-3  border-black "
													: " py-2 px-3 border hover:border-black"
											}
											onClick={() => handleClick2(size.id)}>
											{size.size}
										</button>
									</div>
								))}
							</div>

							<div className="mt-8 mb-1">Narx:</div>
							<div className=" text-xl font-semibold">
								{product?.chegirma} ming so'm
							</div>
							<div className="mt-8 text-center">
								<button
									disabled={disabled}
									title={disabled ? "o'lcham tanlanmagan!" : ""}
									onClick={() => handleAddToCart()}
									className="add_savat my-4 px-12 rounded-lg font-semibold py-4 hover:bg-green-600 bg-green-500 text-white">
									Savatga qo'shish
								</button>
								<button
									title={disabled ? "o'lcham tanlanmagan!" : ""}
									disabled={disabled}
									className="lg:ml-9 mx-1 add_savat rounded-lg px-12 font-semibold hover:bg-slate-100 py-4 border border-black text-[#7000ff]">
									Hozir harid qilish
								</button>
							</div>
							<p
								className="mt-8"
								dangerouslySetInnerHTML={{
									__html: DOMPurify.sanitize(product?.shortdesc),
								}}></p>
						</div>
					</div>
				</div>
			</div>
			<div className="my-4">
				<hr className=" bg-black" />
				<div className="py-4 text-lg lg:pl-40 lg:pr-96 text-black">
					Mahsulot tavsifi
				</div>
				<p
					className="lg:mx-40 sm:max-w-sm"
					dangerouslySetInnerHTML={{
						__html: product?.descrip,
					}}></p>
				<hr />
			</div>
			<div className="mb-8">
				<div className="text-black my-4 text-2xl font-medium">
					O'xshash mahsulotlar
				</div>

				<Swiper
					spaceBetween={30}
					centeredSlides={true}
					pagination={{
						clickable: true,
					}}
					navigation={true}
					modules={[Pagination, Navigation]}
					className="mySwiper rounded-xl">
					{productSame
						.reduce((accumulator, current, index) => {
							if (index % 5 === 0) {
								accumulator.push([current]);
							} else {
								accumulator[accumulator.length - 1].push(current);
							}
							return accumulator;
						}, [])
						.map((group) => (
							<SwiperSlide>
								<div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
									{group.map((i) => (
										<div
											key={i.id}
											className="hover:shadow-sm rounded-xl overflow-hidden">
											<Link to={`/product/${i.id}`} title={i.name}>
												<img
													className="rounded-xl min-h-[200px] hover:scale-105 transition-all "
													src={i.imagePrew}
													alt={i.imagePrew}
												/>
												<div className="p-2  flex flex-col">
													<div>
														<div className=" text-black">{i.name}</div>
														<p className="flex items-center py-1">
															{/* <AiFillStar className=" text-yellow-400" /> */}
															&nbsp;
															{/* {i.rating} */}
														</p>
													</div>
													<div className="flex justify-between">
														<div className="flex flex-col py-1">
															<del className=" text-[12px]">
																{i.price.toLocaleString()} so'm
															</del>

															<span className=" text-black font-medium">
																{i.chegirma.toLocaleString()} so'm
															</span>
														</div>
														<div>
															<button className="border hover:bg-slate-100 text-black rounded-[50%] p-2 text-lg ">
																<GiShoppingCart />
															</button>
														</div>
													</div>
												</div>
											</Link>
										</div>
									))}
								</div>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</div>
	);
};
