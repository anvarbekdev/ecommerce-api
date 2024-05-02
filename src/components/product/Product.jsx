import { GiShoppingCart } from "react-icons/gi";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "~/api/axios.jsx";
import { useState } from "react";
const Product = () => {
	const [limit, setLimit] = useState(40);

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

	const { data, error, isError, isLoading, refetch } = useQuery(
		"products",
		fetchProduct
	);
	function HandleIncer() {
		setLimit(limit + 40);
		setTimeout(() => {
			refetch();
		}, [1000]);
	}
	return (
		<section className="lg:px-8 sm:px-4 lg:pt-0 sm:pt-10">
			<div>
				<h1 className=" text-black my-5 md:text-2xl sm:text-1xl font-semibold">
					Uydan chiqmasdan ro’zg’or
				</h1>
				<div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
					{data?.data?.map((i) => (
						<div
							key={i.id}
							className="hover:shadow-md rounded-xl overflow-hidden">
							<Link to={`/product/${i.id}`} title={i.name}>
								<img
									className="rounded-xl hover:scale-105 transition-all "
									src={i.imageUrl}
									alt={i.name}
								/>
								<div className="p-2">
									<div className=" text-black">{i.name}</div>
									<p className="flex items-center py-1">
										<AiFillStar className=" text-yellow-400" />
										&nbsp;
										{i.rating}
									</p>
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
						</div>
					))}
				</div>
				<div className="text-center my-6">
					<button
						className="border rounded-md text-black hover:bg-slate-100 hover:font-medium hover:border-black py-3 px-5 text-center"
						onClick={HandleIncer}>
						Ko'proq...
					</button>
				</div>
			</div>
		</section>
	);
};

export default Product;
