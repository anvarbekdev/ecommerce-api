import { Link, Outlet, useLocation } from "react-router-dom";

const Order = () => {
	const id = useLocation().pathname.slice(7);
	return (
		<div className=" mx-4">
			<div className="flex">
				<Link
					className={
						id === "all"
							? "border text-black bg-slate-50 mx-1 border-black  p-2 rounded-md"
							: "border text-black mx-1 hover:border-black  p-2 rounded-md"
					}
					to="all">
					Barcha buyurtmalar
				</Link>
				<Link
					className={
						id === "unpayed"
							? "border text-black bg-slate-50 mx-1 border-black  p-2 rounded-md"
							: "border text-black mx-1 hover:border-black  p-2 rounded-md"
					}
					to="unpayed">
					To'lov qilinmagan
				</Link>
				<Link
					className={
						id === "active"
							? "border text-black bg-slate-50 mx-1 border-black  p-2 rounded-md"
							: "border text-black mx-1 hover:border-black  p-2 rounded-md"
					}
					to="active">
					Faol
				</Link>
			</div>
			<Outlet />
		</div>
	);
};

export default Order;
