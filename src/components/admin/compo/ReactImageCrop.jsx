import { useState, useRef, useEffect } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";
import "react-image-crop/dist/ReactCrop.css";
import imageCompression from "browser-image-compression";
import { FcFullTrash } from "react-icons/fc";
import axios from "../../../api/axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { CircularProgress, TextField } from "@mui/material";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
	return centerCrop(
		makeAspectCrop(
			{
				unit: "%",
				width: 90,
			},
			aspect,
			mediaWidth,
			mediaHeight
		),
		mediaWidth,
		mediaHeight
	);
}

const ReactImageCrop = ({ setImages, images }) => {
	const [imgSrc, setImgSrc] = useState("");
	const previewCanvasRef = useRef(null);
	const imgRef = useRef(null);
	const hiddenAnchorRef = useRef(null);
	const blobUrlRef = useRef("");
	const [crop, setCrop] = useState();
	const [completedCrop, setCompletedCrop] = useState();
	const [scale, setScale] = useState(1);
	const [rotate, setRotate] = useState(0);
	const [imageUrl, setImageUrl] = useState("");
	const [aspect, setAspect] = useState(12 / 16);
	const [info, setInfo] = useState("");
	const [image, setImage] = useState("");
	const inputRef = useRef(null);
	const imgd = useRef(null);
	function onSelectFile(e) {
		if (e.target.files && e.target.files.length > 0) {
			setCrop(undefined); // Makes crop preview update between images.
			const reader = new FileReader();
			reader.addEventListener("load", () =>
				setImgSrc(reader.result?.toString() || "")
			);
			reader.readAsDataURL(e.target.files[0]);
		}
		setInfo(e.target.files[0]);
	}

	const { isLoading: isLoading1, mutate: postProduct } = useMutation(
		async () => {
			let formData = new FormData();
			formData.append("image", image);
			const headers = {
				"Content-Type": image.type,
			};
			return await axios
				.post(`/api/user/product/image`, formData, { headers })
				.then((res) => {
					// console.log(res);
					const fileName = res.data;
					setImages([...images, fileName]);
				});
		}
	);

	function onImageLoad(e) {
		if (aspect) {
			const { width, height } = e.currentTarget;
			setCrop(centerAspectCrop(width, height, aspect));
		}
	}
	async function compressImage(file, maxWidth = 500, maxHeight = 500) {
		const options = {
			maxSizeMB: 1, // max size in MB
			maxWidthOrHeight: maxWidth,
			maxHeight: maxHeight,
		};
		try {
			const compressedFile = await imageCompression(file, options);
			return compressedFile;
		} catch (error) {
			console.log(error);
		}
	}

	async function onDownloadCropClick() {
		if (!previewCanvasRef.current) {
			// console.log("salom");
			throw new Error("Crop canvas does not exist");
		}

		previewCanvasRef.current.toBlob((blob) => {
			if (!blob) {
				throw new Error("Failed to create blob");
			}
			const reader = new FileReader();
			reader.readAsArrayBuffer(blob);
			reader.onload = (event) => {
				const arrayBuffer = event.target.result;
				const convertedBlobFile = new File([arrayBuffer], info.name, {
					type: info.type,
					lastModified: info.lastModified,
					lastModifiedDate: info.lastModifiedDate,
				});
				compressImage(convertedBlobFile).then((compressedImage) => {
					setImage(compressedImage);
					imgd.current = URL.createObjectURL(compressedImage);
					// hiddenAnchorRef.current.href = blobUrlRef.current;
					// hiddenAnchorRef.current.click();
				});
				if (blobUrlRef.current) {
					URL.revokeObjectURL(blobUrlRef.current);
				}
			};
		});
	}

	useDebounceEffect(
		async () => {
			if (
				completedCrop?.width &&
				completedCrop?.height &&
				imgRef.current &&
				previewCanvasRef.current
			) {
				// We use canvasPreview as it's much faster than imgPreview.
				canvasPreview(
					imgRef.current,
					previewCanvasRef.current,
					completedCrop,
					scale,
					rotate
				);
			}
		},
		100,
		[completedCrop, scale, rotate]
	);

	useEffect(() => {
		if (info.length !== 0) {
			onDownloadCropClick();
		}
	}, [completedCrop]);

	function handleToggleAspectClick() {
		if (aspect) {
			setAspect(undefined);
		} else if (imgRef.current) {
			const { width, height } = imgRef.current;
			setAspect(9 / 16);
			setCrop(centerAspectCrop(width, height, 9 / 16));
		}
	}

	const { isLoading: isLoading2, mutate: postDelete } = useMutation(
		async () => {
			return await axios.post(`/api/user/product/image/id`, {
				public_id: inputRef.current,
			});
		},
		{
			onSuccess: (res) => {
				if (res) {
					toast.success(res.data);

					setImages(images.filter((i) => i.imageId !== inputRef.current));
				}
			},
			onError: (err) => {
				toast.error(err.response.data);
			},
		}
	);
	const removeFile = (index) => {
		// console.log(inputRef);
		if (inputRef.length !== 0) {
			inputRef.current = index;
			const cut = index.slice(0, 5);
			if (cut === "https") {
				setImages(images.filter((i) => i.imageUrl !== inputRef.current));
			} else {
				postDelete();
			}
		}
	};
	const HandleImage = (e) => {
		e.preventDefault();
		if (Array.isArray(images)) {
			setImages([...images, { imageUrl, imageId: "false" }]);
			setImageUrl("");
		} else {
			setImages([{ imageUrl, imageId: "false" }]);
		}
	};
	return (
		<div className="">
			<div className="Crop-Controls flex items-center">
				<div>
					<div className="flex">
						<input
							className="block text-sm text-slate-500
							file:mr-4 file:py-2 file:px-4
							file:rounded-full file:border-0
							file:text-sm file:font-semibold
							file:bg-violet-50 file:text-violet-700
							hover:file:bg-violet-100"
							type="file"
							placeholder="Rasim yuklash"
							accept="image/*"
							name="file"
							onChange={onSelectFile}
						/>
						{isLoading1 ? (
							<div className="px-4">
								<CircularProgress size={30} />
							</div>
						) : (
							<>
								<button
									className=" border py-2 px-4 mx-2 hover:bg-green-500 rounded-lg hover:border-black"
									onClick={postProduct}>
									Saqlash
								</button>
							</>
						)}
					</div>
					<div className="flex text-center my-4 w-24">
						<div className="mr-2">
							<label htmlFor="scale-input">Scale</label>
							<div className="flex ">
								<input
									id="scale-input"
									type="range"
									step="0.1"
									value={scale}
									disabled={!imgSrc}
									onChange={(e) => setScale(Number(e.target.value))}
								/>
								<input
									id="scale-input"
									type="number"
									step="0.1"
									className="w-12 border mx-2 px-1"
									value={scale}
									disabled={!imgSrc}
									onChange={(e) => setScale(Number(e.target.value))}
								/>
							</div>
						</div>
						<div className="">
							<label htmlFor="rotate-input">Rotate</label>
							<div className="flex">
								<input
									id=""
									type="range"
									className=""
									value={rotate}
									min="-180"
									max="180"
									step="1"
									disabled={!imgSrc}
									onChange={(e) => {
										const newValue = Number(e.target.value);
										const isLeftRange = e.target.id === "left-range";
										const isRightRange = e.target.id === "right-range";
										const isCenterRange = !isLeftRange && !isRightRange;

										if (isCenterRange) {
											setRotate(newValue);
										} else {
											const rangeValue = isLeftRange ? -newValue : newValue;
											setRotate(Math.min(180, Math.max(-180, rangeValue)));
										}
									}}
								/>
								<input
									id=""
									type="number"
									className="w-12 border mx-2 px-1"
									value={rotate}
									disabled={!imgSrc}
									onChange={(e) =>
										setRotate(
											Math.min(180, Math.max(-360, Number(e.target.value)))
										)
									}
								/>
							</div>
						</div>
					</div>
					<div>
						<div className=" text-md mb-2">Yoki </div>
						<div className="flex">
							<TextField
								label="Url manzil"
								fullWidth
								value={imageUrl}
								type="text"
								size="small"
								onChange={(e) => setImageUrl(e.target.value)}
							/>
							<button
								onClick={HandleImage}
								className="border px-2 rounded-md ml-2 hover:bg-slate-100">
								Joylash
							</button>
						</div>
					</div>

					<button style={{ display: "none" }} onClick={handleToggleAspectClick}>
						Toggle aspect {aspect ? "off" : "on"}
					</button>
				</div>
				<div className="ml-4">
					{!!imgSrc && (
						<ReactCrop
							crop={crop}
							onChange={(_, percentCrop) => setCrop(percentCrop)}
							onComplete={(c) => setCompletedCrop(c)}
							aspect={aspect}>
							<img
								className=" h-96 "
								ref={imgRef}
								alt="Crop me"
								src={imgSrc}
								style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
								onLoad={onImageLoad}
							/>
						</ReactCrop>
					)}
				</div>
			</div>
			<div className="">
				{!!completedCrop && (
					<>
						<canvas
							ref={previewCanvasRef}
							style={{
								border: "1px solid black",
								objectFit: "contain",
								display: "none",
								width: completedCrop.width,
								height: completedCrop.height,
							}}
						/>
						<img
							className="border-2 border-black"
							src={imgd.current}
							alt=""
							srcset=""
						/>
						{isLoading2 ? (
							<CircularProgress size={15} />
						) : (
							<div className="border  grid grid-cols-8 my-8 gap-2 p-2">
								{images &&
									images.map((img) => (
										<div key={img.imageId} className="relative ">
											<div>
												<img
													className="border rounded-lg h-40"
													src={img.imageUrl}
													alt=""
												/>
												{img.imageId !== "false" ? (
													<>
														<button
															type="button"
															className="p-1 absolute right-[-1px] top-[-4px] border bg-white hover:bg-red-600 text-red-600 rounded-[50%] transition-colors"
															onClick={() => removeFile(img.imageId)}>
															<FcFullTrash />
														</button>
													</>
												) : (
													<button
														type="button"
														className="p-1 absolute right-[-1px] top-[-4px] border bg-white hover:bg-red-600 text-red-600 rounded-[50%] transition-colors"
														onClick={() => removeFile(img.imageUrl)}>
														<FcFullTrash />
													</button>
												)}
											</div>
										</div>
									))}
								<a
									ref={hiddenAnchorRef}
									download
									style={{
										position: "absolute",
										top: "-200vh",
										visibility: "hidden",
									}}></a>
							</div>
						)}
					</>
				)}
			</div>
			{!completedCrop && (
				<div className="border  grid grid-cols-8 my-8 gap-2 p-2">
					{images &&
						images.map((img) => (
							<div key={img.imageId} className="relative ">
								<div>
									<img
										className="border rounded-lg h-40"
										src={img.imageUrl}
										alt=""
									/>
									{img.imageId !== "false" ? (
										<>
											<button
												type="button"
												className="p-1 absolute right-[-1px] top-[-4px] border bg-white hover:bg-red-600 text-red-600 rounded-[50%] transition-colors"
												onClick={() => removeFile(img.imageId)}>
												<FcFullTrash />
											</button>
										</>
									) : (
										<button
											type="button"
											className="p-1 absolute right-[-1px] top-[-4px] border bg-white hover:bg-red-600 text-red-600 rounded-[50%] transition-colors"
											onClick={() => removeFile(img.imageUrl)}>
											<FcFullTrash />
										</button>
									)}
								</div>
							</div>
						))}
					<a
						ref={hiddenAnchorRef}
						download
						style={{
							position: "absolute",
							top: "-200vh",
							visibility: "hidden",
						}}></a>
				</div>
			)}
		</div>
	);
};

export default ReactImageCrop;
