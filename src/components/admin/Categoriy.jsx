import {
	Box,
	Button,
	CircularProgress,
	IconButton,
	Modal,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import { MdDelete } from "react-icons/md";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { GrAddCircle } from "react-icons/gr";
import { ToastContainer, toast } from "react-toastify";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};
const Categoriy = () => {
	// ===================== Categoriy ==========================
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [checked, setChecked] = useState(true);
	const [categoriy, setCategoriy] = useState("");
	const [categoriyData, setCategoriyData] = useState("");
	const [categoriyNewData, setCategoriyNewData] = useState([]);
	const [categoriyName, setCategoriyName] = useState("");
	const [ctg, setCtg] = useState("");
	const [sectionData, setSectionData] = useState("");

	// ===================== Section ==========================
	const [openSec, setOpenSec] = useState(false);
	const handleOpenSec = () => setOpenSec(true);
	const handleCloseSec = () => setOpenSec(false);
	const [section, setSection] = useState("");
	const [sectionNewData, setSectionNewData] = useState([]);
	const [sectionName, setSectionName] = useState("");
	const [stn, setStn] = useState("");
	const [optionData, setOptionData] = useState("");

	// ===================== Option ==========================
	const [openOpt, setOpenOpt] = useState(false);
	const handleOpenOpt = () => setOpenOpt(true);
	const handleCloseOpt = () => setOpenOpt(false);
	const [optionNewData, setOptionNewData] = useState([]);
	const [optionName, setOptionName] = useState("");
	const [opt, setOpt] = useState("");

	// ===================== Categoriy ==========================

	async function getCategoriy() {
		try {
			const { data } = await axios.post("/api/user/categoriy/get");
			return data;
		} catch (err) {
			console.log(err);
		}
	}
	const {
		data: data1,
		error: error1,
		isError: isError1,
		isLoading: loading1,
		refetch,
	} = useQuery("products", getCategoriy);
	console.log(data1);
	const filterCategoriy =
		categoriyData &&
		categoriyData.categoriyData &&
		categoriyData.categoriyData.filter((i) => i.id === categoriy);
	useEffect(() => {
		setCategoriyData(data1);
	}, [data1]);

	function handleCategoriyId(id) {
		setCategoriy(id);
	}

	const deleteHandler = async (row) => {
		const id = row;
		// console.log(id);
		if (window.confirm(`Ushbu o'chirilsinmi?`)) {
			try {
				const { data } = await axios({
					method: "DELETE",
					url: "/api/user/categoriy/del",
					data: { id },
				});
				toast.success(`${data.message}`);
				setTimeout(() => {
					refetch();
				}, 4000);
			} catch (err) {
				console.log(err);
			}
		}
	};

	const { isLoading: loading3, mutate: postNewCategoriy } = useMutation(
		async () => {
			return axios.post(`/api/user/categoriy/post`, {
				categoriyName,
			});
		},
		{
			onSuccess: (res) => {
				if (res) {
					toast.success(res.data.message);
				}
			},
			onError: (err) => {
				setCtg(err.response.data);
			},
		}
	);
	const handleNewCategoriy = () => {
		postNewCategoriy();
		setTimeout(() => {
			refetch();
			setCategoriyName("");
		}, 4000);
	};
	const { isLoading: loading4, mutate: putCategoriy } = useMutation(
		async () => {
			return axios.put(`/api/user/categoriy/put`, {
				categoriyNewData,
			});
		},
		{
			onSuccess: (res) => {
				if (res) {
					toast.success(res.data.message);
				}
			},
			onError: (err) => {
				toast.error(err.response.data);
			},
		}
	);

	const handleSaveCate = (e, id) => {
		if (e.key === "Enter") {
			setChecked(!checked);
			const ids = { id: id, name: e.target.value };
			setCategoriyNewData(ids);
		}
	};
	useEffect(() => {
		if (categoriyNewData.length !== 0) {
			putCategoriy();
		}
	}, [categoriyNewData]);

	const handleInputChange = (e, id) => {
		setCategoriyData((prevState) => {
			return {
				categoriyData: prevState.categoriyData.map((category) => {
					if (category.id === id) {
						return {
							...category,
							name: e.target.value,
						};
					}
					return category;
				}),
			};
		});
	};

	const handleDoubleClick = () => {
		setChecked(!checked);
	};

	// ====================== Section =======================
	const { isLoading: loading2, mutate: getSection } = useMutation(
		async () => {
			return axios.post(`/api/user/categoriy/postsectionadmin`, {
				categoriy,
			});
		},
		{
			onSuccess: (res) => {
				if (res) {
					setSectionData(res.data);
				}
			},
			onError: (err) => {
				console.log(err.response.data);
			},
		}
	);
	useEffect(() => {
		if (categoriy.length !== 0) {
			getSection();
		}
	}, [categoriy]);

	const { isLoading: loading5, mutate: getOption } = useMutation(
		async () => {
			return axios.post(`/api/user/categoriy/postoptionadmin`, {
				section,
			});
		},
		{
			onSuccess: (res) => {
				if (res) {
					setOptionData(res.data);
				}
			},
			onError: (err) => {
				console.log(err.response.data);
			},
		}
	);

	const filterSection =
		sectionData &&
		sectionData.data &&
		sectionData.data.filter((i) => i.id === section);

	function handleOptionId(id) {
		setSection(id);
	}

	useEffect(() => {
		if (section.length !== 0) {
			getOption();
		}
	}, [section]);

	const { isLoading: loading6, mutate: putSection } = useMutation(
		async () => {
			return axios.put(`/api/user/categoriy/putsection`, {
				sectionNewData,
			});
		},
		{
			onSuccess: (res) => {
				if (res) {
					toast.success(res.data.message);
				}
			},
			onError: (err) => {
				toast.error(err.response.data);
			},
		}
	);

	const handleSaveSect = (e, id) => {
		if (e.key === "Enter") {
			setChecked(!checked);
			const ids = { id: id, name: e.target.value };
			setSectionNewData(ids);
		}
	};
	useEffect(() => {
		if (sectionNewData.length !== 0) {
			putSection();
		}
	}, [sectionNewData]);

	const handleSectionChange = (e, id) => {
		setSectionData((prevState) => {
			return {
				data: prevState.data.map((section) => {
					if (section.id === id) {
						return {
							...section,
							name: e.target.value,
						};
					}
					return section;
				}),
			};
		});
	};

	const id = filterCategoriy && filterCategoriy.map((i) => i.id);
	const { isLoading: loading7, mutate: postNewSection } = useMutation(
		async () => {
			return axios.post(`/api/user/categoriy/postsection`, {
				sectionName,
				id,
			});
		},
		{
			onSuccess: (res) => {
				if (res) {
					toast.success(res.data.message);
				}
			},
			onError: (err) => {
				setStn(err.response.data);
			},
		}
	);
	const handleNewSection = () => {
		postNewSection();
		setTimeout(() => {
			getSection();
		}, 3000);
	};

	const deleteHandlerSec = async (row) => {
		const id = row;
		// console.log(id);
		if (window.confirm(`Ushbu o'chirilsinmi?`)) {
			try {
				const { data } = await axios({
					method: "DELETE",
					url: "/api/user/categoriy/delsection",
					data: { id },
				});
				toast.success(`${data.message}`);
				setTimeout(() => {
					getSection();
				}, 3000);
			} catch (err) {
				console.log(err);
			}
		}
	};

	// ====================== Option =======================

	const idOpt = filterSection && filterSection.map((i) => i.id);
	const { isLoading: loading8, mutate: postNewOption } = useMutation(
		async () => {
			return axios.post(`/api/user/categoriy/postoption`, {
				optionName,
				idOpt,
			});
		},
		{
			onSuccess: (res) => {
				if (res) {
					toast.success(res.data.message);
				}
			},
			onError: (err) => {
				setOpt(err.response.data);
			},
		}
	);
	const handleNewOption = () => {
		postNewOption();
		setTimeout(() => {
			getOption();
		}, 3000);
	};

	const deleteHandlerOpt = async (row) => {
		const id = row;
		// console.log(id);
		if (window.confirm(`Ushbu o'chirilsinmi?`)) {
			try {
				const { data } = await axios({
					method: "DELETE",
					url: "/api/user/categoriy/deloption",
					data: { id },
				});
				toast.success(`${data.message}`);
				setTimeout(() => {
					getOption();
				}, 3000);
			} catch (err) {
				console.log(err);
			}
		}
	};

	const handleOptionChange = (e, id) => {
		setOptionData((prevState) => {
			return {
				data: prevState.data.map((option) => {
					if (option.id === id) {
						return {
							...option,
							name: e.target.value,
						};
					}
					return option;
				}),
			};
		});
	};
	const { isLoading: loading9, mutate: putOption } = useMutation(
		async () => {
			return axios.put(`/api/user/categoriy/putoption`, {
				optionNewData,
			});
		},
		{
			onSuccess: (res) => {
				if (res) {
					toast.success(res.data.message);
				}
			},
			onError: (err) => {
				toast.error(err.response.data);
			},
		}
	);

	const handleSave = (e, id) => {
		if (e.key === "Enter") {
			setChecked(!checked);
			const ids = { id: id, name: e.target.value };
			setOptionNewData(ids);
		}
	};
	useEffect(() => {
		if (optionNewData.length !== 0) {
			putOption();
		}
	}, [optionNewData]);
	return (
		<div>
			<ToastContainer />
			{loading1 ? (
				<h1>Yuklanishda...</h1>
			) : (
				<div className="grid grid-cols-3">
					<div className="border mx-4 ">
						<div className="text-center">
							<h1 className=" text-lg font-semibold mb-2">Turkimlar</h1>
							<Button sx={{ fontSize: 30 }} onClick={handleOpen}>
								<GrAddCircle className=" text-purple-700" />
							</Button>
						</div>
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description">
							<Box sx={style}>
								<Typography id="modal-modal-title" variant="h6" component="h2">
									Turkim
								</Typography>
								<div className="flex">
									<div className=" text-sm text-red-400">{ctg}</div>
									<TextField
										label="Nomi"
										type="text"
										sx={{ mr: 1 }}
										onChange={(e) => setCategoriyName(e.target.value)}
									/>
									{!loading3 ? (
										<>
											<button
												className="border px-1 hover:text-green-500 hover:border-green-400"
												onClick={handleNewCategoriy}>
												Yuklash
											</button>
										</>
									) : (
										<>
											<CircularProgress />
										</>
									)}
								</div>
							</Box>
						</Modal>
						{categoriyData &&
							categoriyData.categoriyData &&
							categoriyData.categoriyData.map((i, index) => (
								<div key={i.id}>
									<div
										className=" border hover:bg-slate-300 flex justify-around items-center cursor-pointer"
										onClick={() => handleCategoriyId(i.id)}>
										<span className="mx-2">{index + 1}.</span>
										<Tooltip
											arrow
											placement="right"
											title="Kerakli bo'lim ustiga 2 marta tez bosib tahrirlash va enter tugmasi bosib saqlsh mumkin!  ">
											<div onDoubleClick={handleDoubleClick}>
												<input
													type="text"
													className=" px-1 text-blue-600"
													value={i.name}
													onKeyDown={(e) => handleSaveCate(e, i.id)}
													onChange={(e) => handleInputChange(e, i.id)}
													disabled={checked}
												/>
											</div>
										</Tooltip>
										<Tooltip arrow placement="right" title="Delete">
											<IconButton
												color="error"
												onClick={() => deleteHandler(i.id)}>
												<MdDelete />
											</IconButton>
										</Tooltip>
									</div>
								</div>
							))}
					</div>
					{sectionData?.data?.length === undefined ? (
						<></>
					) : (
						<>
							{loading2 ? (
								<div>Yulanishda...</div>
							) : (
								<>
									<div className="border mx-4 ">
										<div className="text-center">
											<h1 className=" text-md font-semibold">Turkim</h1>
											<div>{filterCategoriy.map((i) => i.name)}</div>
											<div className="flex justify-center items-center">
												<h1 className="mr-1 text-lg font-semibold">
													Bo'limlar
												</h1>
												<Button sx={{ fontSize: 30 }} onClick={handleOpenSec}>
													<GrAddCircle className=" text-purple-700" />
												</Button>
											</div>
										</div>
										<Modal
											open={openSec}
											onClose={handleCloseSec}
											aria-labelledby="modal-modal-title"
											aria-describedby="modal-modal-description">
											<Box sx={style}>
												<Typography
													id="modal-modal-title"
													variant="h6"
													component="h2">
													Bo'lim
												</Typography>
												<div className="flex">
													<div className=" text-sm text-red-400">{stn}</div>
													<TextField
														label="Nomi"
														type="text"
														sx={{ mr: 1 }}
														onChange={(e) => setSectionName(e.target.value)}
													/>
													{!loading7 ? (
														<>
															<button
																className="border px-1 hover:text-green-500 hover:border-green-400"
																onClick={handleNewSection}>
																Yuklash
															</button>
														</>
													) : (
														<>
															<CircularProgress />
														</>
													)}
												</div>
											</Box>
										</Modal>
										{sectionData.data && sectionData.data.length === 0 ? (
											<div className=" text-center text-red-500">
												Bo'limlar mavjud emas!
											</div>
										) : (
											<>
												{sectionData.data &&
													sectionData.data.map((i, index) => (
														<div key={i.id}>
															<div
																className=" border hover:bg-slate-300 flex justify-around items-center cursor-pointer"
																onClick={() => handleOptionId(i.id)}>
																<span className="mx-2">{index + 1}.</span>
																<Tooltip
																	arrow
																	placement="right"
																	title="Kerakli bo'lim ustiga 2 marta tez bosib tahrirlash va enter tugmasi bosib saqlsh mumkin!  ">
																	<div onDoubleClick={handleDoubleClick}>
																		<input
																			type="text"
																			className=" px-1 text-blue-600"
																			value={i.name}
																			onKeyDown={(e) => handleSaveSect(e, i.id)}
																			onChange={(e) =>
																				handleSectionChange(e, i.id)
																			}
																			disabled={checked}
																		/>
																	</div>
																</Tooltip>
																<Tooltip arrow placement="right" title="Delete">
																	<IconButton
																		color="error"
																		onClick={() => deleteHandlerSec(i.id)}>
																		<MdDelete />
																	</IconButton>
																</Tooltip>
															</div>
														</div>
													))}
											</>
										)}
									</div>
								</>
							)}
						</>
					)}
					{sectionData.data && sectionData.data.length === 0 ? (
						<></>
					) : (
						<>
							{optionData?.data?.length === undefined ? (
								<></>
							) : (
								<>
									{loading5 ? (
										<div>Yulanishda...</div>
									) : (
										<>
											<div className="border mx-4 ">
												<div className="text-center">
													<h1 className=" text-md font-semibold">Bo'lim</h1>
													<div>{filterSection.map((i) => i.name)}</div>
													<div className="flex justify-center items-center">
														<h1 className="mr-1 text-lg font-semibold">
															Kategoriyalar
														</h1>
														<Button
															sx={{ fontSize: 30 }}
															onClick={handleOpenOpt}>
															<GrAddCircle className=" text-purple-700" />
														</Button>
													</div>
												</div>
												<Modal
													open={openOpt}
													onClose={handleCloseOpt}
													aria-labelledby="modal-modal-title"
													aria-describedby="modal-modal-description">
													<Box sx={style}>
														<Typography
															id="modal-modal-title"
															variant="h6"
															component="h2">
															Kategoriya
														</Typography>
														<div className="flex">
															<div className=" text-sm text-red-400">{opt}</div>
															<TextField
																label="Nomi"
																type="text"
																sx={{ mr: 1 }}
																onChange={(e) => setOptionName(e.target.value)}
															/>
															{!loading8 ? (
																<>
																	<button
																		className="border px-1 hover:text-green-500 hover:border-green-400"
																		onClick={handleNewOption}>
																		Yuklash
																	</button>
																</>
															) : (
																<>
																	<CircularProgress />
																</>
															)}
														</div>
													</Box>
												</Modal>
												{optionData.data && optionData.data.length === 0 ? (
													<div className=" text-center text-red-500">
														Kategoriyalar mavjud emas!
													</div>
												) : (
													<>
														{optionData.data &&
															optionData.data.map((i, index) => (
																<div key={i.id}>
																	<div className=" border hover:bg-slate-300 flex justify-around items-center cursor-pointer">
																		<span className="mx-2">{index + 1}.</span>
																		<div onDoubleClick={handleDoubleClick}>
																			<input
																				type="text"
																				className=" px-1 text-blue-600"
																				value={i.name}
																				onKeyDown={(e) => handleSave(e, i.id)}
																				onChange={(e) =>
																					handleOptionChange(e, i.id)
																				}
																				disabled={checked}
																			/>
																		</div>
																		<Tooltip
																			arrow
																			placement="right"
																			title="Delete">
																			<IconButton
																				color="error"
																				onClick={() => deleteHandlerOpt(i.id)}>
																				<MdDelete />
																			</IconButton>
																		</Tooltip>
																	</div>
																</div>
															))}
													</>
												)}
											</div>
										</>
									)}
								</>
							)}
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default Categoriy;
