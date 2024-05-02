import { TextField } from "@mui/material";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
	const [email, setEmail] = useState("");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [cookies, setCookies] = useCookies();

	const navigate = useNavigate();

	const { isLoading, mutate: postLogin } = useMutation(
		async () => {
			return axios
				.post("/api/user/register", {
					userName,
					email,
					password,
				})
				.then((res) => {
					toast.success(res.data.message);
				}); // <-- move the `then` method outside of the object and chain it here
		},
		{
			onSuccess: (res) => {
				setTimeout(() => {
					navigate("/login");
				}, [3000]);
			},
			onError: (err) => {
				toast.error(err.response.data.message);
			},
		}
	);
	useEffect(() => {
		if (cookies?.token?.length !== undefined) {
			navigate("/");
		}
	}, [cookies, navigate]);

	const HandleClik = async () => {
		try {
			await postLogin(); // wait for the login request to complete
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<ToastContainer />
			<div className=" h-screen flex justify-center flex-col items-center">
				<div className="">
					<form className="flex flex-col" onClick={(e) => e.preventDefault()}>
						<TextField
							label="Ism Familya"
							type="text"
							onChange={(e) => setUserName(e.target.value)}
						/>
						<TextField
							label="Elektron pochta"
							type="email"
							sx={{ mt: 2 }}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							label="Parol"
							type="password"
							sx={{ my: 2 }}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{isLoading ? (
							<div className=" text-center">Loading....</div>
						) : (
							<button
								className="border py-2 border-black hover:text-black hover:bg-slate-100 rounded-lg"
								onClick={HandleClik}>
								Kirish
							</button>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
