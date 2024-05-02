import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	toggleCart,
	removeItem,
	incrementItem,
	decrementItem,
} from "../store/slices/cartSlice";

import { Link } from "react-router-dom";
import { IoMdRemove } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { VscTrash } from "react-icons/vsc";
const Cart = () => {
	const [totalPrice, setTotalPrice] = useState("");
	const [totalOrginalPrice, setTotalOrginalPrice] = useState("");
	const { isCartOpen } = useSelector((state) => state.cart);
	const cartItems = JSON.parse(localStorage.getItem("Product"));
	useEffect(() => {}, []);
	const dispatch = useDispatch();

	const handleCloseCart = (close) => {
		dispatch(toggleCart(close));
	};

	const handleRemove = (itemId) => {
		dispatch(removeItem(itemId));
	};

	const handleIncrement = (itemId) => {
		dispatch(incrementItem(itemId));
	};

	const handleDecrement = (itemId) => {
		dispatch(decrementItem(itemId));
	};

	// disable the body-scroll when the Cart is open
	useEffect(() => {
		const docBody = document.body;
		isCartOpen
			? docBody.classList.add("overflow_hide")
			: docBody.classList.remove("overflow_hide");
	}, [isCartOpen]);

	// closing the Cart on clicking outside of it

	useEffect(() => {
		const outsideClose = (e) => {
			if (e.target.id === "cart") {
				handleCloseCart(false);
			}
		};

		window.addEventListener("click", outsideClose);

		return () => {
			window.removeEventListener("click", outsideClose);
		};
	}, [handleCloseCart]);

	useEffect(() => {
		if (cartItems !== null) {
			const totalPrice = cartItems
				.map((item) => item.chegirma * item.quantity)
				.reduce((prevValue, currValue) => prevValue + currValue, 0);
			setTotalPrice(totalPrice);
		}
		if (cartItems !== null) {
			const totalOrginalPrice = cartItems
				.map((item) => item.price * item.quantity)
				.reduce((prevValue, currValue) => prevValue + currValue, 0);
			setTotalOrginalPrice(totalOrginalPrice);
		}
	}, [cartItems]);
	return (
		<>
			{isCartOpen && (
				<div className="anim " id="cart">
					<div className="cart_content ">
						<div className="cart_head">
							<div className=" text-black text-lg leading-4">
								Savatda {cartItems?.length} mahsulot bor
							</div>
							<div
								title="Close"
								className="close_btn ml-1 mt-1"
								onClick={() => handleCloseCart(false)}>
								<span>&times;</span>
							</div>
						</div>

						<div className=" md:ml-2 max-h-[80%] overflow-y-auto overflow-x-hidden">
							{cartItems?.length === 0 ? (
								<h2>Savatda mahsulotingiz mavjud emas!</h2>
							) : (
								cartItems?.map((item) => {
									const { id, images, name, price, chegirma, quantity } = item;
									const itemTotal = chegirma * quantity;
									const priceOrg = price * quantity;

									return (
										<div className=" px-2 my-2" key={id}>
											<div className="grid shadow-xl rounded-xl  md:grid-cols-[100px_minmax(200px,_0fr)_330px] items-center sm:grid-cols-[90px_minmax(9px,_4fr)_4px] gap-4  p-2">
												<div>
													<img
														className="h-28 rounded-lg	 w-20"
														src={images[0]?.imageUrl}
														alt="product-img"
													/>
												</div>

												<div className=" break-words sm:hidden  md:block text-[18px] text-black">
													{name}
												</div>
												<div className="md:flex my-2 justify-between items-center ">
													<div className="break-words md:hidden  text-[17px] text-black">
														{name}
													</div>
													<div className="flex md:px-4 my-2 items-center">
														<div className="flex flex-col py-1 ">
															<del className=" text-[14px]">
																{priceOrg.toLocaleString()} so'm
															</del>

															<span className="text-[18px] text-black font-medium">
																{itemTotal.toLocaleString()} so'm
															</span>
														</div>
													</div>
													<div className="flex items-center">
														<div className="border flex items-center rounded-md">
															<span
																className="mx-4 text-2xl bg"
																onClick={() => handleDecrement(id)}>
																<IoMdRemove className=" cursor-pointer hover:text-black" />
															</span>
															<div className="mx-2 text-xl">{quantity}</div>
															<span
																className="mx-4 text-2xl bg"
																onClick={() => handleIncrement(id)}>
																<AiOutlinePlus className=" cursor-pointer hover:text-black" />
															</span>
														</div>
														<div
															title="Remove Item"
															className="mx-3 cursor-pointer hover:text-black  text-2xl"
															onClick={() => handleRemove(id)}>
															<span>
																<VscTrash />
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									);
								})
							)}
						</div>

						<div className="cart_foot flex justify-between items-center">
							<div>
								<div>
									<del className="md:ml-16 md:text-[16px]">
										{totalOrginalPrice?.toLocaleString()} so'm
									</del>
								</div>
								<div>
									<span className=" text-black font-medium md:text-2xl sm:text-lg">
										Jami:
									</span>
									<span className="  text-black font-medium md:text-2xl   sm:text-lg ml-1">
										{totalPrice?.toLocaleString()} so'm
									</span>
								</div>
							</div>
							<Link to="checkout">
								<button
									type="button"
									className="checkout_btn md:px-4 sm:py-1 md:py-3 leading-2 sm:px-1"
									onClick={() => handleCloseCart(false)}
									disabled={cartItems?.length === 0}>
									Buyurtmani rasmiylashtirish
								</button>
							</Link>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Cart;
