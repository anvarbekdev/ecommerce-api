import { useEffect, useMemo, useState } from "react";
import axios from "../../api/axios";
import { useQuery } from "react-query";
import {
	Box,
	Button,
	CircularProgress,
	IconButton,
	TableContainer,
	Tooltip,
	Typography,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MaterialReactTable from "material-react-table";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
// import { MRT_Localization_EN } from 'material-react-table/locales/';

function Products() {
	const [limit, setLimit] = useState(200);

	async function fetchProduct() {
		try {
			const url = `/api/user/get`;
			const { data } = await axios.get(url, {
				params: { limit: limit },
			});
			return data;
		} catch (err) {
			console.log(err);
		}
	}
	const [fetched, setFetched] = useState([]);

	const { data, error, isError, isLoading, refetch } = useQuery(
		"products",
		fetchProduct
	);

	function HandleIncer() {
		setLimit(limit + 100);
		setTimeout(() => {
			refetch();
		}, [1000]);
	}
	useEffect(() => {
		if (data && data.length === undefined) {
			setFetched(data.data);
		}
	}, [data]);

	const deleteHandler = async (row) => {
		const id = row.original.id;
		// console.log(id);
		if (window.confirm(`Ushbu o'chirilsinmi?`)) {
			try {
				const { data } = await axios({
					method: "DELETE",
					url: "/api/user/product/del",
					data: { id },
				});
				toast.success(`${data.message}`);
				setTimeout(() => {
					refetch();
				}, 3000);
			} catch (err) {
				console.log(err);
			}
		}
	};

	const columns = useMemo(() => [
		{
			accessorKey: "id",
			header: "ID",
			enableColumnOrdering: false,
			enableEditing: false, //disable editing on this column
			// enableSorting: false,
			size: 80,
		},
		{
			accessorKey: "name",
			header: "Nomi",
			size: 140,
		},
		{
			accessorKey: "created_at",
			header: "Joylangan",
			size: 140,
		},
		{
			accessorKey: "brand",
			header: "Sotuvchi",
			size: 140,
		},
		{
			accessorKey: "color",
			header: "Rang",
			size: 80,
		},
		{
			accessorKey: "price",
			header: "Narx",
			size: 80,
		},
		{
			accessorKey: "chegirma",
			header: "Chegirma",
			size: 80,
		},
		{
			accessorKey: "rating",
			header: "Reyting",
		},
		{
			accessorKey: "sotuvda",
			header: "Tovar soni",
		},
	]);

	if (isLoading) {
		return (
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					height: "calc(100vh - 60px)",
					justifyContent: "center",
				}}>
				<CircularProgress />
			</Box>
		);
	}
	if (isError) {
		return <div>{error.message}</div>;
	}

	return (
		<div>
			<ToastContainer />
			<TableContainer
				sx={{
					ml: 1,
					width: { xs: 305, sm: 530, md: 750, lg: 1000, xl: 1500 },
				}}>
				<MaterialReactTable
					displayColumnDefOptions={{
						"mrt-row-actions": {
							muiTableHeadCellProps: {
								align: "center",
							},
							size: 120,
						},
					}}
					columns={columns}
					initialState={{
						pagination: { pageSize: 30, pageIndex: 0 },
						density: "compact",
					}}
					data={fetched}
					enableColumnOrdering
					enableEditing
					// editingMode="modal" //default
					renderRowActions={({ row }) => (
						<Box sx={{ display: "flex", gap: "1rem" }}>
							<Link to={`${row.original.id}`}>
								<Tooltip arrow placement="left" title="Edit">
									<IconButton>
										<BiEdit />
									</IconButton>
								</Tooltip>
							</Link>
							<Tooltip arrow placement="right" title="Delete">
								<IconButton color="error" onClick={() => deleteHandler(row)}>
									<MdDelete />
								</IconButton>
							</Tooltip>
						</Box>
					)}
					renderTopToolbarCustomActions={() => (
						<Link to="/admin/addproduct">
							<Button color="secondary" variant="contained">
								Add product
							</Button>
						</Link>
					)}
					renderDetailPanel={({ row }) => (
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
							}}>
							<img
								alt="avatar"
								className=" h-32"
								src={row.original.imagePrew}
								loading="lazy"
							/>
							<div className=" text-center mx-4">
								<div className=" font-semibold">O'lchamlari</div>
								<form onSubmit={(e) => e.preventDefault()}>
									{row.original.sizes.length === 0 ? (
										<div>Mavjud emas!</div>
									) : (
										<div>
											{row.original.sizes.map((i, index) => (
												<div key={index}>
													<div>{i.size}</div>
												</div>
											))}
										</div>
									)}
								</form>
							</div>
						</Box>
					)}
					renderBottomToolbarCustomActions={() => (
						<>
							<Typography>Jami: {fetched && fetched.length}</Typography>
							<div className="text-center ">
								<button
									className="border rounded-md text-black hover:bg-slate-100 hover:font-medium hover:border-black py-3 px-5 text-center"
									onClick={HandleIncer}>
									Ko'proq...
								</button>
							</div>
						</>
					)}
				/>
			</TableContainer>
		</div>
	);
}

export default Products;
