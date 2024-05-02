import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import DynamicFields from "./compo/DynamicFields";
import JoditTextEditor from "./compo/JoditEditor";
import ReactImageCrop from "./compo/ReactImageCrop";
import { ToastContainer, toast } from "react-toastify";
import DynamicFieldsCustom from "./compo/DynamicFieldsCustom";
import JoditEditorT from "./compo/JoditEditorT";
import MyEditor from "./compo/Wangeditor";

const AddProduct = () => {
	// Post
	const [categoriy, setCategoriy] = useState("");
	const [section, setSection] = useState("");
	const [option, setOption] = useState("");
	const [name, setName] = useState("");
	const [brand, setBrand] = useState("");
	const [color, setColor] = useState("");
	const [price, setPrice] = useState("");
	const [chegirma, setChegirma] = useState("");
	const [sotuvda, setSotuda] = useState("");
	const [delivery, setDelivery] = useState("");
	const [shortdesc, setShortdesc] = useState("");
	const [sectionData, setSectionData] = useState([]);
	const [optionData, setOptionData] = useState([]);
	const [desc, setDesc] = useState("");
	const [images, setImages] = useState([]);
	const [fields, setFields] = useState([]);
	const [optionR, setOptionR] = useState("default");
	const getValueDesc = (desc) => {
		setDesc(desc);
	};
	const getValueShortDesc = (desc) => {
		setShortdesc(desc);
	};
	async function getCategoriy() {
		try {
			const url = `api/user/categoriy/get`;
			const { data } = await axios.post(url);
			return data;
		} catch (err) {
			// console.log(err);
		}
	}
	const { isLoading: isLoading1, mutate: postProduct } = useMutation(
		async () => {
			return axios.post("/api/user/product", {
				name,
				brand,
				color,
				price,
				chegirma,
				delivery,
				sotuvda,
				descrip: desc,
				shortdesc,
				images: images,
				optionId: option,
				sizes: fields,
			});
		},
		{
			onSuccess: (res) => {
				if (res) {
					setImages([]);
					toast.success(res.data.message);
				}
			},
			onError: (err) => {
				console.log(err);
				toast.error(err.response.data.message);
				toast.error(err.response.data.optionId);
				toast.error(err.response.data.name);
			},
		}
	);

	const {
		data: query1Data,
		isLoading: query1Loading,
		error: query1Error,
	} = useQuery("categoriy", getCategoriy);
	const getSection = async () => {
		try {
			const url = `/api/user/categoriy/postsectionadmin`;
			const { data } = await axios.post(url, { categoriy });
			setSectionData(data);
		} catch (err) {}
	};

	useEffect(() => {
		getSection();
		setSection("");
		setOption("");
	}, [categoriy]);

	const getOption = async () => {
		try {
			const url = `/api/user/categoriy/postoptionadmin`;
			const { data } = await axios.post(url, { section });
			setOptionData(data);
		} catch (err) {}
	};
	useEffect(() => {
		getOption();
		setOption("");
	}, [section]);

	function postData() {
		try {
			postProduct();
		} catch (err) {
			// console.log(err);
		}
	}

	return (
		<div>
			<ToastContainer />
			<div>
				{query1Loading ? (
					<>Loading...</>
				) : (
					<>
						<form className=" mt-4" onSubmit={(e) => e.preventDefault()}>
							<div className="flex">
								<FormControl size="small" sx={{ mr: 2 }} fullWidth>
									<InputLabel id="label3">Turkim</InputLabel>
									<Select
										labelId="label3"
										id="select"
										value={categoriy}
										label="Categoriy"
										onChange={(e) => setCategoriy(e.target.value)}>
										{query1Data.categoriyData &&
											query1Data.categoriyData.map((i, index) => (
												<MenuItem key={index} value={i.id}>
													{i.name}
												</MenuItem>
											))}
									</Select>
								</FormControl>
								{sectionData?.data?.length === undefined ? (
									<></>
								) : (
									<FormControl size="small" sx={{ mr: 2 }} fullWidth>
										<InputLabel id="label2">Bo'lim</InputLabel>
										<Select
											labelId="label2"
											id="select"
											value={section}
											label="Categoriy"
											onChange={(e) => setSection(e.target.value)}>
											{sectionData.data.map((i, index) => (
												<MenuItem key={index} value={i.id}>
													{i.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								)}
								{optionData?.data?.length === undefined ? (
									<></>
								) : (
									<FormControl size="small" sx={{ mr: 2 }} fullWidth>
										<InputLabel id="label1">Kategoriya</InputLabel>
										<Select
											labelId="label1"
											id="select"
											value={option}
											label="Categoriy"
											onChange={(e) => setOption(e.target.value)}>
											{optionData.data.map((i, index) => (
												<MenuItem key={index} value={i.id}>
													{i.name}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								)}
							</div>
							<div className="mt-3 my-4">
								<TextField
									size="small"
									label="Mahsulot nomi"
									type="text"
									sx={{ mr: 1 }}
									onBlur={(e) => setName(e.target.value)}
								/>
								<TextField
									size="small"
									label="Sotuvchi"
									type="text"
									sx={{ mr: 1 }}
									onBlur={(e) => setBrand(e.target.value)}
								/>
								<FormControl size="small" sx={{ mr: 1, width: 100 }}>
									<InputLabel id="label5">Rang</InputLabel>
									<Select
										labelId="label5"
										id="select"
										value={color}
										label="Rang"
										onChange={(e) => setColor(e.target.value)}>
										<MenuItem value="oq">oq</MenuItem>
										<MenuItem value="sariq">sariq</MenuItem>
										<MenuItem value="qora">qora</MenuItem>
										<MenuItem value="yashil">yashil</MenuItem>
									</Select>
								</FormControl>
								<TextField
									size="small"
									label="Narx"
									type="number"
									sx={{ mr: 1 }}
									onBlur={(e) => setPrice(e.target.value)}
								/>
								<TextField
									size="small"
									label="Chegirma"
									type="number"
									sx={{ mr: 1 }}
									onBlur={(e) => setChegirma(e.target.value)}
								/>
								<TextField
									size="small"
									label="Yetqazib berish vaqti"
									type="number"
									sx={{ mr: 1, my: 2 }}
									placeholder="raqamda: 1, 2, 3 kun"
									onBlur={(e) => setDelivery(e.target.value)}
								/>
								<TextField
									size="small"
									label="Tovar soni"
									type="number"
									sx={{ mr: 1, my: 2 }}
									onBlur={(e) => setSotuda(e.target.value)}
								/>
								{/* <JoditTextEditor initialValue="" value={getValueShortDesc} /> */}
								<JoditTextEditor initialValue="" value={getValueDesc} />
								<div
									dangerouslySetInnerHTML={{ __html: desc }}
									onClick={(e) => console.log(e.target.value)}></div>

								{/* <JoditEditorT /> */}
								<MyEditor />
								<div className="mt-8 w-full">
									<h1 className="  text-center font-semibold text-2xl my-3">
										O'lchamlari
									</h1>

									<div className="flex">
										<label className="flex items-center " htmlFor="tonic1">
											<div>Standart</div>
											<input
												name="tonicId"
												type="radio"
												value="default"
												id="tonic1"
												className="ml-1  h-4 w-4"
												checked={optionR === "default"}
												onChange={(e) => setOptionR(e.target.value)}
											/>
										</label>
										<label className="flex items-center ml-2 " htmlFor="tonic2">
											<div>Qo'lda</div>
											<input
												name="tonicId"
												type="radio"
												value="custom"
												id="tonic2"
												className="ml-1  h-4 w-4"
												checked={optionR === "custom"}
												onChange={(e) => setOptionR(e.target.value)}
											/>
										</label>
									</div>
									{optionR === "default" ? (
										<DynamicFields fields={fields} setFields={setFields} />
									) : (
										<DynamicFieldsCustom
											fields={fields}
											setFields={setFields}
										/>
									)}
									<div className=" text-center my-4 font-semibold text-2xl">
										Rasim yuklash
									</div>
									<p>
										Rasim o'rtacha 3 xil ko'rinishdan iborat bo'lishi kerak!
									</p>
									<ReactImageCrop images={images} setImages={setImages} />
								</div>
								<Button
									sx={{ px: 10, mt: 4 }}
									color="primary"
									onClick={postData}
									variant="contained">
									Qo'shish
								</Button>
								{isLoading1 && <div>Loading....</div>}
							</div>
						</form>
					</>
				)}
			</div>
		</div>
	);
};

export default AddProduct;
