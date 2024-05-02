import { Button, FormControl, TextField } from "@mui/material";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import DynamicFields from "./compo/DynamicFields";
import JoditTextEditor from "./compo/JoditEditor";
import ReactImageCrop from "./compo/ReactImageCrop";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DynamicFieldsCustom from "./compo/DynamicFieldsCustom";

const ProductId = () => {
	const [product, setProduct] = useState([]);
	const [images, setImages] = useState([]);
	const [fields, setFields] = useState([{ size: "" }]);
	const [optionR, setOptionR] = useState("default");

	useEffect(() => {
		if (product.images && product.images.length !== 0) {
			setImages(product.images);
		}
	}, [product]);
	useEffect(() => {
		setProduct({
			...product,
			images,
		});
	}, [images]);

	const getValueSize = () => {
		setProduct({
			...product,
			sizes: fields,
		});
	};
	const getValueDesc = (desc) => {
		setProduct({
			...product,
			descrip: desc,
		});
	};
	const getValueShortDesc = (desc) => {
		setProduct({
			...product,
			shortdesc: desc,
		});
	};
	const { id } = useParams();

	const { isLoading: isLoading1, mutate: postProduct } = useMutation(
		async () => {
			return axios.put(`/api/user/product/${id}`, {
				product,
			});
		},
		{
			onSuccess: (res) => {
				if (res) {
					toast.success(res.data.message);
				}
			},
			onError: (err) => {
				toast.error(err.response.data.message);
			},
		}
	);
	const { isLoading: query1Loading, mutate: getProductId } = useMutation(
		async () => {
			return axios.get(`/api/user/${id}`);
		},
		{
			onSuccess: (res) => {
				if (res) {
					const result = {
						status: res.status + "-" + res.statusText,
						headers: res.headers,
						data: res.data,
					};
					setProduct(result.data.data[0]);
				}
			},
			onError: (err) => {
				console.log(err.response.data);
			},
		}
	);

	const onChangeHandler = (e) => {
		setProduct({
			...product,
			[e.target.name]: e.target.value,
		});
	};

	// console.log(product);
	useEffect(() => {
		getProductId();
	}, [id]);

	function postData() {
		try {
			postProduct();
		} catch (err) {
			console.log(err);
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
							<div className="mt-3 my-4">
								<TextField
									size="small"
									label="Mahsulot nomi"
									type="text"
									value={product.name}
									name="name"
									sx={{ mr: 1 }}
									onChange={onChangeHandler}
								/>
								<TextField
									size="small"
									label="Sotuvchi"
									type="text"
									sx={{ mr: 1 }}
									value={product.brand}
									name="brand"
									onChange={onChangeHandler}
								/>
								<FormControl
									size="small"
									sx={{
										mr: 1,
										width: 100,
										border: "1px solid black",
										// px: 1,
										textAlign: "center",
										borderRadius: 1,
									}}>
									<p>Rang</p>
									<select
										// labelId="label5"
										id="select"
										value={product.color}
										name="color"
										// label="Rang"
										onChange={onChangeHandler}>
										<option value={product.color}>{product.color}</option>
										<option value="oq">oq</option>
										<option value="sariq">sariq</option>
										<option value="qora">qora</option>
										<option value="yashil">yashil</option>
									</select>
								</FormControl>
								<TextField
									size="small"
									label="Narx"
									type="number"
									value={product.price}
									name="price"
									sx={{ mr: 1 }}
									onChange={onChangeHandler}
								/>
								<TextField
									size="small"
									label="Chegirma"
									type="number"
									sx={{ mr: 1 }}
									value={product.chegirma}
									name="chegirma"
									onChange={onChangeHandler}
								/>
								<TextField
									size="small"
									label="Yetqazib berish vaqti"
									type="number"
									value={product.delivery}
									name="delivery"
									sx={{ mr: 1, my: 2 }}
									placeholder="raqamda: 1, 2, 3 kun"
									onChange={onChangeHandler}
								/>
								<TextField
									size="small"
									label="Tovar soni"
									type="number"
									value={product.sotuvda}
									name="sotuvda"
									sx={{ mr: 1, my: 2 }}
									onChange={onChangeHandler}
								/>
								<JoditTextEditor
									getValue={getValueShortDesc}
									initialValue={product.shortdesc}
								/>
								<JoditTextEditor
									initialValue={product.descrip}
									getValue={getValueDesc}
								/>
								<div className="mt-8 w-full">
									<div className="flex">
										<div>
											<p className=" font-bold">Yangi o'cham</p>
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
												<label
													className="flex items-center ml-2 "
													htmlFor="tonic2">
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
											<button
												onClick={getValueSize}
												className="border mt-2 p-1 px-2 rounded-md bg-slate-200 hover:border-green-500">
												o'lcham yangilash
											</button>
										</div>
										<div className="mx-4 text-center border p-1 px-4 rounded-lg">
											<div>O'lchamlari</div>
											{product.sizes &&
												product.sizes.map((i) => (
													<ul key={i.size}>
														<li>{i.size}</li>
													</ul>
												))}
										</div>
									</div>
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
									Yangilash
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

export default ProductId;
