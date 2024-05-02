import { useEffect, useState } from "react";
import {
	Box,
	Button,
	CircularProgress,
	IconButton,
	Modal,
	TextField,
	Tooltip,
} from "@mui/material";
import { MdDelete } from "react-icons/md";
import axios from "../../api/axios";
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

const User = () => {
	// ===================== Categoriy ==========================
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [checked, setChecked] = useState(true);
	const [categoriy, setCategoriy] = useState("");
	const [categoriyData, setCategoriyData] = useState("");
	const [updates, setUpdates] = useState([]);
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [ctg, setCtg] = useState("");

	// ===================== Categoriy ==========================

	async function getCategoriy() {
		try {
			const { data } = await axios.get("/api/user/users/getuser");
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
	} = useQuery("users", getCategoriy);
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
					url: "/api/user/users/del",
					data: { id },
				});
				toast.success(`${data}`);
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
			return axios.post(`/api/user/users/post`, {
				userName,
				email,
				password,
			});
		},
		{
			onSuccess: (res) => {
				if (res) {
					toast.success(res.data.message);
				}
			},
			onError: (err) => {
				console.log(err);
				setCtg(err.response.data);
			},
		}
	);

	const handleNewCategoriy = () => {
		postNewCategoriy();
		setTimeout(() => {
			refetch();
		}, 4000);
	};

	const { isLoading: loading4, mutate: putCategoriy } = useMutation(
		async () => {
			return axios.put(`/api/user/users/put`, {
				updates,
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

	const handleSaveUpdate = (e, id) => {
		if (e.key === "Enter") {
			setChecked(!checked);
			const filter = categoriyData.users.filter((i) => i.id === id);
			setUpdates(filter);
		}
	};

	useEffect(() => {
		if (updates.length !== 0) {
			putCategoriy();
		}
	}, [updates]);

	const handleInputChange = (e, id) => {
		setCategoriyData((prevState) => {
			return {
				users: prevState.users.map((user) => {
					if (user.id === id) {
						return {
							...user,
							[e.target.name]: e.target.value,
						};
					}
					return user;
				}),
			};
		});
	};

	const handleDoubleClick = () => {
		setChecked(!checked);
	};

	return (
		<div>
			<ToastContainer />
			{loading1 ? (
				<h1>Yuklanishda...</h1>
			) : (
				<div className="grid grid-cols-1">
					<div className="border mx-4 ">
						<div className="text-center">
							<h1 className=" text-lg font-semibold mb-2">Foydalanuvchilar</h1>
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
								<div className="">
									<div className=" text-sm text-red-400">{ctg}</div>
									<TextField
										fullWidth
										label="Ism Familya"
										type="text"
										sx={{ my: 1 }}
										onChange={(e) => setUserName(e.target.value)}
									/>
									<TextField
										fullWidth
										label="Elektron pochta"
										type="email"
										sx={{ my: 1 }}
										onChange={(e) => setEmail(e.target.value)}
									/>
									<TextField
										fullWidth
										label="Parol"
										type="password"
										sx={{ my: 1 }}
										onChange={(e) => setPassword(e.target.value)}
									/>
									{!loading3 ? (
										<div className=" text-center">
											<button
												className="border px-4 py-1 rounded-xl hover:text-green-500 hover:border-green-400"
												onClick={handleNewCategoriy}>
												Yuklash
											</button>
										</div>
									) : (
										<div className=" text-center">
											<CircularProgress />
										</div>
									)}
								</div>
							</Box>
						</Modal>
						{categoriyData &&
							categoriyData.users &&
							categoriyData.users.map((i, index) => (
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
													className=" py-1 text-blue-600"
													value={i.user_name}
													name="user_name"
													onKeyDown={(e) => handleSaveUpdate(e, i.id)}
													onChange={(e) => handleInputChange(e, i.id)}
													disabled={checked}
												/>
												<input
													type="text"
													className=" py-1 text-blue-600"
													value={i.role}
													name="role"
													onKeyDown={(e) => handleSaveUpdate(e, i.id)}
													onChange={(e) => handleInputChange(e, i.id)}
													disabled={checked}
												/>
												<input
													type="email"
													className=" py-1 text-blue-600"
													value={i.email}
													name="email"
													onKeyDown={(e) => handleSaveUpdate(e, i.id)}
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
				</div>
			)}
		</div>
	);
};

export default User;
