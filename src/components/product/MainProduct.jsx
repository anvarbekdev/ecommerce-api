import { useEffect, useCallback, useRef, useState, Fragment } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineArrowRight, AiOutlineArrowDown } from "react-icons/ai";
import axios from "~/api/axios";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { debounce } from "lodash";
import { Link as Scroll } from "react-scroll";
import { Paginator } from "primereact/paginator";
import {
	ChevronDownIcon,
	FunnelIcon,
	Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Slider } from "primereact/slider";

const MainProduct = () => {
	const id = useParams();
	const [categoriy, setCategoriy] = useState("");
	const [section, setSection] = useState("");
	const [option, setOption] = useState("");
	const [sort, setSort] = useState("");
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	const [value, setValue] = useState([2000, 50000000]);
	const [checkedBrands, setCheckedBrands] = useState([]);
	const checkboxesRef = useRef([]);

	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(30);

	const footerRef = useRef(null);
	const headerRef = useRef(null);
	useEffect(() => {
		const handleScroll = () => {
			if (
				document.body.scrollTop > 100 ||
				document.documentElement.scrollTop > 100
			) {
				if (headerRef.current) {
					headerRef.current.classList?.add("fixedFilter");
				}
			} else {
				if (headerRef.current) {
					headerRef.current.classList?.remove("fixedFilter");
				}
			}

			if (
				footerRef.current &&
				window.innerHeight + window.scrollY >=
					document.body.offsetHeight - footerRef.current.offsetHeight - 100
			) {
				headerRef.current.classList?.remove("fixedFilter");
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	function handleValueChange(newValue) {
		setValue(newValue);
		debouncedRefetch();
	}

	const handleBrandChange = (e) => {
		const brand = e.target.value;
		if (e.target.checked) {
			setCheckedBrands([...checkedBrands, brand]);
		} else {
			setCheckedBrands(checkedBrands.filter((b) => b !== brand));
		}
	};

	async function fetchProduct() {
		try {
			const url = `/api/products`;
			const { data } = await axios.get(url, {
				params: {
					categoriy: categoriy?.categoriy,
					section: section?.section,
					option: option?.option,
					price_min: value[0],
					price_max: value[1],
					brand: checkedBrands.join(","),
					sortOption: sort,
					offset: first,
				},
			});
			return data;
		} catch (err) {
			console.log(err);
		}
	}

	const { data, error, isError, isFetching, isLoading, refetch } = useQuery(
		"mainPproducts",
		fetchProduct
	);

	const onPageChange = (event) => {
		setFirst(event.first);
		setRows(event.rows);
		setTimeout(() => {
			refetch();
		}, 500);
	};
	// console.log(first);
	// console.log(data?.total);
	const debouncedRefetch = useCallback(debounce(refetch, 500), [refetch]);

	const categories = [];
	const sections = [];
	const options = [];

	useEffect(() => {
		if (id.id !== "Barcha-turkimlar") {
			setCategoriy({ categoriy: id.id });
			setSection("");
		} else {
			setSection("");
			setCategoriy("");
			setOption("");
		}
		setTimeout(() => {
			refetch();
		}, 1350);
	}, [id]);

	useEffect(() => {
		if (categoriy.length === undefined) {
			setSection("");
			setOption("");
			setFirst(0);
		} else {
		}
		setTimeout(() => {
			refetch();
		}, 500);
	}, [categoriy]);

	useEffect(() => {
		if (section.length === undefined) {
			setCategoriy("");
			setOption("");
			setFirst(0);
		}
		setTimeout(() => {
			refetch();
		}, 500);
	}, [section]);

	useEffect(() => {
		if (option.length === undefined) {
			setCategoriy("");
			setSection("");
			setFirst(0);
		}
		setTimeout(() => {
			refetch();
		}, 500);
	}, [option]);

	data?.results?.reduce((accumulator, row) => {
		const existingCatg = accumulator.find(
			(r) => r.categoriyName === row.categoriyName
		);
		if (!existingCatg && row.categoriyName) {
			categories.push({
				id: categories.length,
				categoriy: row.categoriyName,
			});
			accumulator.push({
				categoriyName: row.categoriyName,
				images: [],
			});
		}

		const existingSection = accumulator.find(
			(r) => r.sectionName === row.sectionName
		);
		if (!existingSection && row.sectionName) {
			sections.push({
				id: sections.length,
				section: row.sectionName,
			});
			accumulator.push({
				sectionName: row.sectionName,
				categoriyes: [],
			});
		}

		const existingOption = accumulator.find(
			(r) => r.optionName === row.optionName
		);
		if (!existingOption && row.optionName) {
			options.push({
				id: options.length,
				option: row.optionName,
			});
			accumulator.push({
				optionName: row.optionName,
				categoriyes: [],
			});
		}

		return accumulator;
	}, []);

	const handleClear = (e) => {
		e.preventDefault();
		setValue([2000, 50000000]);
		setCheckedBrands([]);
		setTimeout(() => {
			refetch();
		}, 500);
		checkboxesRef.current.forEach((checkbox) => (checkbox.checked = false));
	};

	return (
		<div className="" id="toppcursor">
			<section className="lg:px-8 sm:px-4 lg:pt-0 sm:pt-10">
				<div className="bg-white">
					<div>
						{/* Mobile filter dialog */}
						<Transition.Root show={mobileFiltersOpen} as={Fragment}>
							<Dialog
								as="div"
								className="relative z-40 lg:hidden"
								onClose={setMobileFiltersOpen}>
								<Transition.Child
									as={Fragment}
									enter="transition-opacity ease-linear duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="transition-opacity ease-linear duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0">
									<div className="fixed inset-0 bg-black bg-opacity-25" />
								</Transition.Child>

								<div className="fixed inset-0 z-40 flex">
									<Transition.Child
										as={Fragment}
										enter="transition ease-in-out duration-300 transform"
										enterFrom="translate-x-full"
										enterTo="translate-x-0"
										leave="transition ease-in-out duration-300 transform"
										leaveFrom="translate-x-0"
										leaveTo="translate-x-full">
										<Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
											<div className="flex items-center justify-between px-4">
												<h2 className="text-lg font-medium text-gray-900">
													Kategoriyalar
												</h2>
												<button
													type="button"
													className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
													onClick={() => setMobileFiltersOpen(false)}>
													<span className="sr-only">Close menu</span>
													<XMarkIcon className="h-6 w-6" aria-hidden="true" />
												</button>
											</div>
											{/* Filters */}
											<form className="hidden px-3 sm:block">
												{id.id !== "Barcha-turkimlar" ||
												section.length === undefined ||
												categoriy.length === undefined ||
												option.length === undefined ? (
													<div className="flex my-1  hover:bg-slate-100 p-1 rounded-sm cursor-pointer">
														<AiOutlineArrowDown />
														<Link to="/products/Barcha-turkimlar">
															Barcha Turkimlar
														</Link>
													</div>
												) : (
													<></>
												)}

												{categories?.map((i) => (
													<div
														className={
															section.length !== undefined &&
															option.length !== undefined
																? " flex parentctg cursor-pointer text-black font-medium text-md my-1  hover:bg-slate-100 p-1 rounded-sm"
																: " flex parentctg cursor-pointer  text-md my-1  hover:bg-slate-100 p-1 rounded-sm"
														}
														onClick={() =>
															setCategoriy({ categoriy: i.categoriy })
														}
														key={i.id}>
														{categoriy.length !== undefined &&
														section.length !== undefined &&
														option.length !== undefined ? (
															<div className="childhover">
																<AiOutlineArrowRight />
															</div>
														) : (
															<AiOutlineArrowDown />
														)}

														<span className="">{i.categoriy}</span>
													</div>
												))}

												{categoriy.length === undefined &&
													sections?.map((i) => (
														<div
															className="flex parentctg items-center cursor-pointer   hover:bg-slate-100 p-1 rounded-sm"
															onClick={() => setSection({ section: i.section })}
															key={i.id}>
															{categoriy.length === undefined ? (
																<AiOutlineArrowRight className="childhover " />
															) : (
																<AiOutlineArrowDown />
															)}
															{i.section}
														</div>
													))}
												{section.length === undefined &&
													sections?.map((i) => (
														<div
															className="flex  parentctg cursor-pointer text-black font-medium my-1  hover:bg-slate-100 p-1 rounded-sm"
															onClick={() => setSection({ section: i.section })}
															key={i.id}>
															{categoriy.length == undefined ? (
																<AiOutlineArrowRight className="childhover" />
															) : (
																<AiOutlineArrowDown />
															)}
															{i.section}
														</div>
													))}
												{option.length === undefined &&
													sections?.map((i) => (
														<div
															className="flex cursor-pointer hover:bg-slate-100 p-1 rounded-sm"
															onClick={() => setSection({ section: i.section })}
															key={i.id}>
															{option.length !== undefined ? (
																<AiOutlineArrowRight />
															) : (
																<AiOutlineArrowDown />
															)}
															{i.section}
														</div>
													))}
												{section.length === undefined &&
													options?.map((i) => (
														<div
															className=" cursor-pointer  hover:bg-slate-100 p-1 rounded-sm"
															onClick={() => setOption({ option: i.option })}
															key={i.id}>
															{i.option}
														</div>
													))}
												{option.length === undefined &&
													options?.map((i) => (
														<div
															className=" cursor-pointer text-black font-medium my-1 hover:bg-slate-100 p-1 rounded-sm "
															onClick={() => setOption({ option: i.option })}
															key={i.id}>
															{i.option}
														</div>
													))}

												<div className="py-4 ">
													<div className="text-xl  text-black py-2">
														Narxlar
													</div>
													<button
														onClick={(e) => {
															e.preventDefault();
															setValue([2000, 50000000]);
															setTimeout(() => {
																refetch();
															}, 500);
														}}
														className="my-2 text-black">
														Tozalsh
													</button>
													<div className="flex mb-4">
														<input
															className="border w-32 mr-2 py-2 px-1 rounded-md text-black"
															type="number"
															value={value[0]}
															min={2000}
															max={50000000}
															onChange={(e) =>
																handleValueChange([e.target.value, value[1]])
															}
															onBlur={debouncedRefetch}
														/>
														<input
															min={2000}
															className="border w-32 py-2 px-1 rounded-md text-black"
															type="number"
															max={50000000}
															value={value[1]}
															onChange={(e) =>
																handleValueChange([value[0], e.target.value])
															}
															onBlur={debouncedRefetch}
														/>
													</div>

													<Slider
														min={2000}
														value={value}
														max={50000000}
														onChange={(e) => handleValueChange(e.value)}
														onBlur={debouncedRefetch}
														className="w-14rem"
														range
													/>
												</div>

												<div className="text-xl  text-black pt-2">Brendlar</div>
												<button
													onClick={(e) => {
														e.preventDefault();
														setCheckedBrands([]);
														setTimeout(() => {
															refetch();
														}, 500);
														checkboxesRef.current.forEach(
															(checkbox) => (checkbox.checked = false)
														);
													}}
													className="my-2 text-black">
													Tozalsh
												</button>
												<div className=" mb-2 max-h-40 overflow-auto">
													{data?.results?.map((i, index) => (
														<div key={i.id}>
															<label className="flex my-1">
																<input
																	id="check"
																	type="checkbox"
																	value={i.brand}
																	className="mr-2 "
																	ref={(el) =>
																		(checkboxesRef.current[index] = el)
																	}
																	onChange={handleBrandChange}
																/>
																<div className=" cursor-pointer w-full">
																	{i.brand}
																</div>
															</label>
														</div>
													))}
												</div>
												<button
													className="text-black p-1 border hover:border-black rounded-md"
													onClick={(e) => e.preventDefault(refetch())}>
													Saqlash
												</button>
												<div className=" text-center">
													<button
														onClick={handleClear}
														className="my-2 text-black border p-2 rounded-md hover:border-black">
														Barchasini Tozalsh
													</button>
												</div>
											</form>
										</Dialog.Panel>
									</Transition.Child>
								</div>
							</Dialog>
						</Transition.Root>
						<main className=" max-w-7xl">
							<div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
								<h1 className="lg:text-2xl sm:text-xl font-bold tracking-tight text-gray-900">
									Kategoriyalar
								</h1>

								<div className="flex items-center">
									<Menu as="div" className="relative inline-block text-left">
										<div>
											<Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
												Saralash
												<ChevronDownIcon
													className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
													aria-hidden="true"
												/>
											</Menu.Button>
										</div>

										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95">
											<Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
												<div className="py-1">
													<Menu.Item>
														<div
															className=" text-center cursor-pointer text-black  hover:bg-slate-50 py-1"
															onClick={() => {
																setSort("asc");
																setTimeout(() => {
																	refetch();
																}, 500);
															}}>
															Arzon
														</div>
													</Menu.Item>
													<Menu.Item>
														<div
															className=" text-center cursor-pointer text-black  hover:bg-slate-50 py-1"
															onClick={() => {
																setSort("desc");
																setTimeout(() => {
																	refetch();
																}, 500);
															}}>
															Qimmat
														</div>
													</Menu.Item>
												</div>
											</Menu.Items>
										</Transition>
									</Menu>

									<button
										type="button"
										className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
										<span className="sr-only">View grid</span>
										<Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
									</button>
									<button
										type="button"
										className=" ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
										onClick={() => setMobileFiltersOpen(true)}>
										<span className="sr-only">Filters</span>
										<FunnelIcon className="h-5 w-5" aria-hidden="true" />
									</button>
								</div>
							</div>

							<section
								aria-labelledby="products-heading"
								className="pb-24 pt-6 min-h-screen">
								<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4   ">
									{/* Filters */}
									<div>
										<form
											ref={headerRef}
											className="hidden  top-20  lg:block overflow-y-auto overflow-x-hidden max-h-[80%]">
											{id.id !== "Barcha-turkimlar" ||
											section.length === undefined ||
											categoriy.length === undefined ||
											option.length === undefined ? (
												<div className="flex my-1  hover:bg-slate-100 p-1 rounded-sm cursor-pointer">
													<AiOutlineArrowDown />
													<Link to="/products/Barcha-turkimlar">
														Barcha Turkimlar
													</Link>
												</div>
											) : (
												<></>
											)}
											{categories?.map((i) => (
												<div
													className={
														section.length !== undefined &&
														option.length !== undefined
															? " flex parentctg cursor-pointer text-black font-medium text-md my-1  hover:bg-slate-100 p-1 rounded-sm"
															: " flex parentctg cursor-pointer  text-md my-1  hover:bg-slate-100 p-1 rounded-sm"
													}
													onClick={() =>
														setCategoriy({ categoriy: i.categoriy })
													}
													key={i.id}>
													{categoriy.length !== undefined &&
													section.length !== undefined &&
													option.length !== undefined ? (
														<div className="childhover">
															<AiOutlineArrowRight />
														</div>
													) : (
														<AiOutlineArrowDown />
													)}

													<span className="">{i.categoriy}</span>
												</div>
											))}
											{categoriy.length === undefined &&
												sections?.map((i) => (
													<div
														className="flex parentctg items-center cursor-pointer   hover:bg-slate-100 p-1 rounded-sm"
														onClick={() => setSection({ section: i.section })}
														key={i.id}>
														{categoriy.length === undefined ? (
															<AiOutlineArrowRight className="childhover " />
														) : (
															<AiOutlineArrowDown />
														)}
														{i.section}
													</div>
												))}
											{section.length === undefined &&
												sections?.map((i) => (
													<div
														className="flex  parentctg cursor-pointer text-black font-medium my-1  hover:bg-slate-100 p-1 rounded-sm"
														onClick={() => setSection({ section: i.section })}
														key={i.id}>
														{categoriy.length == undefined ? (
															<AiOutlineArrowRight className="childhover" />
														) : (
															<AiOutlineArrowDown />
														)}
														{i.section}
													</div>
												))}
											{option.length === undefined &&
												sections?.map((i) => (
													<div
														className="flex cursor-pointer hover:bg-slate-100 p-1 rounded-sm"
														onClick={() => setSection({ section: i.section })}
														key={i.id}>
														{option.length !== undefined ? (
															<AiOutlineArrowRight />
														) : (
															<AiOutlineArrowDown />
														)}
														{i.section}
													</div>
												))}
											{section.length === undefined &&
												options?.map((i) => (
													<div
														className=" cursor-pointer  hover:bg-slate-100 p-1 rounded-sm"
														onClick={() => setOption({ option: i.option })}
														key={i.id}>
														{i.option}
													</div>
												))}
											{option.length === undefined &&
												options?.map((i) => (
													<div
														className=" cursor-pointer text-black font-medium my-1 hover:bg-slate-100 p-1 rounded-sm "
														onClick={() => setOption({ option: i.option })}
														key={i.id}>
														{i.option}
													</div>
												))}
											<div className="py-4 ">
												<div className="text-xl  text-black py-2">Narxlar</div>
												<button
													onClick={(e) => {
														e.preventDefault();
														setValue([2000, 50000000]);
														setTimeout(() => {
															refetch();
														}, 500);
													}}
													className="my-2 text-black">
													Tozalsh
												</button>
												<div className="flex mb-4">
													<input
														className="border w-32 mr-2 py-2 px-1 rounded-md text-black"
														type="number"
														value={value[0]}
														min={2000}
														max={50000000}
														onChange={(e) =>
															handleValueChange([e.target.value, value[1]])
														}
														onBlur={debouncedRefetch}
													/>
													<input
														min={2000}
														className="border w-32 py-2 px-1 rounded-md text-black"
														type="number"
														max={50000000}
														value={value[1]}
														onChange={(e) =>
															handleValueChange([value[0], e.target.value])
														}
														onBlur={debouncedRefetch}
													/>
												</div>

												<div className="mx-4">
													<Slider
														min={2000}
														value={value}
														max={50000000}
														onChange={(e) => handleValueChange(e.value)}
														onBlur={debouncedRefetch}
														className="w-14rem"
														range
													/>
												</div>
											</div>
											<div className="text-xl  text-black pt-2">Brendlar</div>
											<button
												onClick={(e) => {
													e.preventDefault();
													setCheckedBrands([]);
													setTimeout(() => {
														refetch();
													}, 500);
													checkboxesRef.current.forEach(
														(checkbox) => (checkbox.checked = false)
													);
												}}
												className="my-2 text-black">
												Tozalsh
											</button>
											<div className=" mb-2 max-h-40 overflow-auto">
												{data?.results?.map((i, index) => (
													<div key={i.id}>
														<label className="flex my-1">
															<input
																id="check"
																type="checkbox"
																value={i.brand}
																className="mr-2 "
																ref={(el) =>
																	(checkboxesRef.current[index] = el)
																}
																onChange={handleBrandChange}
															/>
															<div className=" cursor-pointer w-full">
																{i.brand}
															</div>
														</label>
													</div>
												))}
											</div>
											<button
												className="text-black p-1 border hover:border-black rounded-md"
												onClick={(e) => e.preventDefault(refetch())}>
												Saqlash
											</button>
											<div className=" text-center">
												<button
													onClick={handleClear}
													className="my-2 text-black border p-2 rounded-md hover:border-black">
													Barchasini Tozalsh
												</button>
											</div>
										</form>
									</div>

									{/* Product grid */}
									<div className="lg:col-span-3">
										<div className=" grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-2 gap-4">
											{isLoading || isFetching ? (
												<>
													<div
														role="status"
														className=" h-[350px] rounded-xl shadow animate-pulse  ">
														<div className="flex items-center justify-center h-[75%] mb-4 bg-gray-300 rounded-xl dark:bg-gray-300">
															<svg
																className="w-12 h-12  text-gray-200 dark:text-gray-400"
																aria-hidden="true"
																fill="currentColor"
																viewBox="0 0 640 512">
																<path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
															</svg>
														</div>
														<div className="mx-2">
															<div className="h-2 .5 bg-gray-200 rounded-full dark:bg-gray-300  mb-5"></div>
															<div className="flex items-center justify-between">
																<div className="w-36">
																	<div className="h-2 w-[50%] bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
																	<div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-300"></div>
																</div>
																<div className="h-8 w-8 bg-gray-200 rounded-[50%] dark:bg-gray-300"></div>
															</div>
														</div>

														<span className="sr-only">Loading...</span>
													</div>
													<div
														role="status"
														className=" h-[350px] rounded-xl shadow animate-pulse  ">
														<div className="flex items-center justify-center h-[75%] mb-4 bg-gray-300 rounded-xl dark:bg-gray-300">
															<svg
																className="w-12 h-12  text-gray-200 dark:text-gray-400"
																aria-hidden="true"
																fill="currentColor"
																viewBox="0 0 640 512">
																<path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
															</svg>
														</div>
														<div className="mx-2">
															<div className="h-2 .5 bg-gray-200 rounded-full dark:bg-gray-300  mb-5"></div>
															<div className="flex items-center justify-between">
																<div className="w-36">
																	<div className="h-2 w-[50%] bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
																	<div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-300"></div>
																</div>
																<div className="h-8 w-8 bg-gray-200 rounded-[50%] dark:bg-gray-300"></div>
															</div>
														</div>

														<span className="sr-only">Loading...</span>
													</div>
													<div
														role="status"
														className=" h-[350px] rounded-xl shadow animate-pulse  ">
														<div className="flex items-center justify-center h-[75%] mb-4 bg-gray-300 rounded-xl dark:bg-gray-300">
															<svg
																className="w-12 h-12  text-gray-200 dark:text-gray-400"
																aria-hidden="true"
																fill="currentColor"
																viewBox="0 0 640 512">
																<path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
															</svg>
														</div>
														<div className="mx-2">
															<div className="h-2 .5 bg-gray-200 rounded-full dark:bg-gray-300  mb-5"></div>
															<div className="flex items-center justify-between">
																<div className="w-36">
																	<div className="h-2 w-[50%] bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
																	<div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-300"></div>
																</div>
																<div className="h-8 w-8 bg-gray-200 rounded-[50%] dark:bg-gray-300"></div>
															</div>
														</div>

														<span className="sr-only">Loading...</span>
													</div>
													<div
														role="status"
														className=" h-[350px] rounded-xl shadow animate-pulse  ">
														<div className="flex items-center justify-center h-[75%] mb-4 bg-gray-300 rounded-xl dark:bg-gray-300">
															<svg
																className="w-12 h-12  text-gray-200 dark:text-gray-400"
																aria-hidden="true"
																fill="currentColor"
																viewBox="0 0 640 512">
																<path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
															</svg>
														</div>
														<div className="mx-2 ">
															<div className="h-2  bg-gray-200 rounded-full dark:bg-gray-300  mb-5"></div>
															<div className="flex items-center justify-between">
																<div className="w-36">
																	<div className="h-2 w-[50%] bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
																	<div className="h-2 w-full bg-gray-200 rounded-full dark:bg-gray-300"></div>
																</div>
																<div className="h-8 w-8 bg-gray-200 rounded-[50%] dark:bg-gray-300"></div>
															</div>
														</div>

														<span className="sr-only">Loading...</span>
													</div>
												</>
											) : (
												data &&
												data?.product?.map((i) => (
													<Scroll
														to="toppcursor"
														smooth={true}
														duration={100}
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
																		<AiFillStar className=" text-yellow-400" />
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
													</Scroll>
												))
											)}
										</div>
									</div>
								</div>
							</section>
						</main>
						<Paginator
							first={first}
							rows={rows}
							totalRecords={data?.total}
							// rowsPerPageOptions={[5, 10, 15]}
							onPageChange={onPageChange}
						/>
					</div>
				</div>
			</section>
			<footer ref={footerRef}></footer>
		</div>
	);
};

export default MainProduct;
