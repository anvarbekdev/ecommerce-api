import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import CustomInput from "./CustomInput";
import Input from "react-phone-number-input/input";
import { useSelector } from "react-redux";

const city = [
	{ id: 1, name: "Buxoro" },
	{ id: 2, name: "Jizzax" },
	{ id: 3, name: "Toshkent" },
];
const district = [
	{
		id: 1,
		name: "tonic",
		tonic: [
			{
				id: 1,
				cityId: 3,
				address:
					"Toshkent sh., Mirobod tumani, Farg'ona Yo'li ko'chasi (Risoviy)",
				time: "10:00 – 20:00, dam olish kunisiz",
				starttime: "Mustaqil M04 28 (Bugun) olib ketsa boʻladi.",
			},
			{
				id: 2,
				cityId: 3,
				address: "Toshkent viloyati, Angren sh., 5/1A dahasi, 14-chi uy",
				time: "10:00 – 20:00, dam olish kunisiz",
				starttime: "Mustaqil M04 28 (Bugun) olib ketsa boʻladi.",
			},
			{
				id: 4,
				cityId: 1,
				address: "Buxoro sh, Mustaqillik ko'cahasi, 12-chi uy (Qoplangan)",
				time: "10:00 – 20:00, dam olish kunisiz",
				starttime: "Mustaqil M04 28 (Bugun) olib ketsa boʻladi.",
			},
			{
				id: 5,
				cityId: 2,
				address:
					"Jizzax sh., Zilol maxallasi, Mustaqillik ko'chasi, 26-chi uy (Orom bo'zori)",
				time: "10:00 – 20:00, dam olish kunisiz",
				starttime: "Mustaqil M04 28 (Bugun) olib ketsa boʻladi.",
			},
			{
				id: 6,
				cityId: 2,
				address: "Jizzax sh., Zargarlik MFY, Zargarlik ko'chasi, 14-chi uy",
				time: "10:00 – 20:00, dam olish kunisiz",
				starttime: "Mustaqil M04 28 (Bugun) olib ketsa boʻladi.",
			},
		],
	},
	{
		id: 2,
		name: "courier",
		courier: [
			{
				id: 1,
				cityId: 3,
				district: [
					{ id: 1, name: "Olmazor" },
					{ id: 2, name: "Bektemir" },
					{ id: 3, name: "Mirobot" },
					{ id: 4, name: "Mirzo Ulug'bek" },
					{ id: 5, name: "Sergeli" },
				],
			},
			{
				id: 2,
				cityId: 2,
				district: [{ id: 1, name: "Jizzax" }],
			},
			{
				id: 3,
				cityId: 1,
				district: [{ id: 1, name: "Buxoro" }],
			},
		],
	},
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const Checkout = () => {
	const [isCity, setIsSity] = useState(2);
	const [isDistrict, setIsDistrict] = useState("tonic");
	const [totalPrice, setTotalPrice] = useState("");

	const [districtL, setIsDistrictL] = useState("");
	const [street, setStreet] = useState("");
	const [home, setHome] = useState("");
	const [corridor, setCorridor] = useState("");
	const [apartment, setApartment] = useState("");
	const [floor, setFloor] = useState("");
	const [homeCode, setHomeCode] = useState("");
	const [courierInfo, setCourierCode] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");

	const { cartItems } = useSelector((state) => state.cart);

	const filterDistrict = district.filter((i) => i.name === isDistrict);

	const filterIsPoint = filterDistrict[0]?.tonic?.filter(
		(i) => i.cityId === isCity
	);

	const filterIsPointCur = filterDistrict[0]?.courier?.filter(
		(i) => i.cityId === isCity
	);

	const handleChange = (e) => {
		setIsDistrict(e.target.value);
	};

	const cartItemsTot = JSON.parse(localStorage.getItem("Product"));

	useEffect(() => {
		if (cartItemsTot !== null) {
			const totalPrice = cartItemsTot
				.map((item) => item.chegirma * item.quantity)
				.reduce((prevValue, currValue) => prevValue + currValue, 0);
			setTotalPrice(totalPrice);
		}
	}, [cartItemsTot]);

	const footerRef = useRef(null);
	const headerRef = useRef(null);
	useEffect(() => {
		const handleScroll = () => {
			if (
				document.body.scrollTop > 0 ||
				document.documentElement.scrollTop > 0
			) {
				if (headerRef.current) {
					headerRef.current.classList?.add("lg:fixed");
				}
			} else {
				if (headerRef.current) {
					headerRef.current.classList?.remove("lg:fixed");
				}
			}

			if (
				footerRef.current &&
				window.innerHeight + window.scrollY >=
					document.body.offsetHeight - footerRef.current.offsetHeight - 400
			) {
				headerRef.current.classList?.remove("lg:fixed");
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className="lg:pt-20 sm:pt-32 px-6">
			<h2 className=" lg:text-2xl sm:text-lg font-[700] text-black">
				Buyurtmani rasmiylashtirish
			</h2>
			<div className="lg:flex">
				<div className="lg:w-8/12">
					<div className="border  rounded-sm p-4 my-4">
						<h2 className=" text text-lg my-2">Yetkazib berish shahri:</h2>
						<div className=" lg:p-4">
							<FormControl fullWidth size="small">
								<Select
									labelId="demo-select-small-label"
									id="demo-select-small"
									value={isCity}
									MenuProps={MenuProps}
									onChange={(e) => setIsSity(e.target.value)}>
									{city.map((i) => (
										<MenuItem key={i.id} value={i.id}>
											{i.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
					</div>
					<div className="border  rounded-sm p-4 my-4">
						<h2 className=" text text-lg my-2">Qabul qilish usuli:</h2>
						<div className=" bg-slate-50 my-4  p-4">
							<label htmlFor="tonic2">
								<div className="flex">
									<input
										name="tonicId"
										type="radio"
										value="tonic"
										id="tonic2"
										className="mr-2  h-5 w-5"
										checked={isDistrict === "tonic"}
										onChange={handleChange}
									/>
									<div className="text text-[15px] font-[700]">
										Tonic topshirish punkti
									</div>
								</div>
								<div className="my-4">
									<div className="flex text2 my-1  items-center">
										<span className="mr-2  text-green-400 text-2xl">
											<IoMdCheckmarkCircleOutline />
										</span>
										Buyurtmani saqlash muddati – 5 kun
									</div>
									<div className="flex text2 my-1 items-center">
										<span className="mr-2  text-green-400 text-2xl">
											<IoMdCheckmarkCircleOutline />
										</span>
										Mahsulotni tekshirish va kiyib koʻrish mumkin
									</div>
									<div className="flex text2 my-1 items-center">
										<span className="mr-2  text-green-400 text-2xl">
											<IoMdCheckmarkCircleOutline />
										</span>
										Mahsulotlarning tez va muammosiz qaytarib olinishi
									</div>
								</div>
							</label>
						</div>
						<div className=" bg-slate-50 my-4  p-4">
							<label htmlFor="tonic">
								<div className="flex">
									<input
										name="tonicId"
										type="radio"
										value="courier"
										id="tonic"
										checked={isDistrict === "courier"}
										onChange={handleChange}
										className="mr-2  h-5 w-5"
									/>
									<div className="text text-[15px] font-[700]">
										Kuryer orqali eshikkacha
									</div>
								</div>
								<div className="my-4">
									<div className="flex text2 my-1  items-center">
										<span className="mr-2  text-green-400 text-2xl">
											<IoMdCheckmarkCircleOutline />
										</span>
										Yetkazib berish bepul
									</div>
								</div>
							</label>
						</div>
						<div className=" my-4  lg:p-4">
							{isDistrict === "tonic" ? (
								<>
									<div className="text text-[15px] font-[700]">
										Topshirish punkti tanlang
									</div>
									{filterIsPoint.map((i) => (
										<label key={i.id} htmlFor={i.id}>
											<div className="my-2 flex p-2">
												<input
													name="punkit"
													type="radio"
													value={i.id}
													id={i.id}
													className="mr-1  h-4 w-4"
												/>
												<div className="pl-2">
													<div className="text mb-2 text-[15px]">
														{i.address}
													</div>
													<div className="text2 font-normal mb-1">{i.time}</div>
													<div className="text2 font-normal mb-1">
														{i.starttime}
													</div>
												</div>
											</div>
										</label>
									))}
								</>
							) : (
								<>
									<div className="">
										<div className="my-4 text font-normal">Tuman</div>
										<FormControl fullWidth size="small">
											<InputLabel id="demo-multiple-name-label">
												Tanlash
											</InputLabel>
											<Select
												labelId="demo-multiple-name-label"
												id="demo-select-small"
												label="Tanlash"
												value={districtL}
												MenuProps={MenuProps}
												onChange={(e) => setIsDistrictL(e.target.value)}>
												{filterIsPointCur[0].district.map((i) => (
													<MenuItem key={i.id} value={i.name}>
														{i.name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</div>
									<div className="lg:flex my-2">
										<div className="lg:mr-2">
											<div className="my-2 text font-normal">Ko'cha</div>
											<CustomInput onChangeVal={setStreet} type="text" />
										</div>
										<div>
											<div className="my-2 text font-normal">Uy</div>
											<CustomInput onChangeVal={setHome} type="text" />
										</div>
									</div>
									<div className="lg:flex lg:my-2">
										<div className="lg:mr-2">
											<div className="my-2 text font-normal">Xonadon/ofis</div>
											<CustomInput onChangeVal={setApartment} type="text" />
										</div>
										<div>
											<div className="my-2 text font-normal">Yoʻlak</div>
											<CustomInput onChangeVal={setCorridor} type="text" />
										</div>
									</div>
									<div className="lg:flex lg:my-2">
										<div className="lg:mr-2">
											<div className="my-2 text font-normal">Qavat</div>
											<CustomInput onChangeVal={setFloor} type="text" />
										</div>
										<div>
											<div className="my-2 text font-normal">Domofon kodi</div>
											<CustomInput onChangeVal={setHomeCode} type="text" />
										</div>
									</div>
									<div className="my-4">
										<div>
											<div className="my-2 text font-normal">
												Kuryer uchun izoh
											</div>
											<CustomInput onChangeVal={setCourierCode} type="text" />
											<div>
												Masalan yetkazishning aniq manzili, eng yaqin manzil
												yoki moʻljal
											</div>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
					<div className="border  rounded-sm p-4 my-4">
						<h2 className=" text text-lg">Buyurtma qabul qiluvchi:</h2>
						<div className="lg:flex w-full ">
							<div className="lg:mr-2">
								<div className="my-2 text font-normal">Ism</div>
								<CustomInput onChangeVal={setFirstName} type="text" />
							</div>
							<div>
								<div className="my-2 text font-normal">Familya</div>
								<CustomInput onChangeVal={setLastName} type="text" />
							</div>
						</div>
						<div className=" max-w-xl my-4">
							Siz koʻrsatgan telefon raqamiga buyurtma holati haqida
							bildirishnoma yuboramiz. Yetkazib berish vaqtini aniqlashtirish
							uchun kuryer siz bilan telefon orqali bogʻlanadi.
						</div>
						<div className="max-w-[210px]">
							<div className="my-2  text font-normal">Telefon raqami</div>
							<Input
								country="UZ"
								className="border py-1 rounded-md border-slate-300 px-2 text text-[16px]"
								international
								withCountryCallingCode
								value={phone}
								onChange={setPhone}
							/>
						</div>
					</div>
				</div>
				<div
					ref={headerRef}
					className="lg:w-[320px] lg:ml-5 rounded-sm border my-4  top-20 p-4 right-5">
					<div className="text text-2xl ">Buyurtmangiz</div>
					<div className="my-3">
						<div className=" flex  items-center justify-between">
							<div className="text2">Mahsulotlar ({cartItems?.length}):</div>
							<div className="text2">{totalPrice.toLocaleString()} so'm</div>
						</div>
						<div className=" flex  items-center justify-between">
							<div className="text2 my-1">Yetkazib berish:</div>
							<div className="text2 my-1">bepul</div>
						</div>
						<div className="flex my-4 justify-between items-center">
							<div className="text2 text-lg text-black">Jami:</div>
							<div className="text2 text-black text-xl">
								{totalPrice.toLocaleString()} so'm
							</div>
						</div>

						<div className="text-center my-5">
							<button className="py-3 border rounded-xl px-6 text-lg">
								Tasdiqlash va to'lov qilish
							</button>
						</div>
						<div className="text-sm ">
							Buyurtma berish orqali shaxsiy maʼlumotlarning Uzum
							platformasining Maxfiylik kelishuvi va Foydalanuvchi kelishuvi
							qoidalariga muvofiq qayta ishlanishiga rozilik bildirasiz.
						</div>
					</div>
				</div>
			</div>
			<footer ref={footerRef}></footer>
		</div>
	);
};

export default Checkout;
