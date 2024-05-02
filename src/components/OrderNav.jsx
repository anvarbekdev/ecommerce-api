import { useLocation } from "react-router-dom";
import { Link, Outlet, useParams } from "react-router-dom";

const OrderNav = () => {
	const id = useLocation().pathname.slice(0, 6);

	return (
		<div className="pt-40 mx-4 min-h-[200px] flex ">
			<div className="border hidden lg:flex flex-col h-40 rounded-md p-2 ">
				<Link
					className={
						id === "/order"
							? " text-lg hover:text-black text-black"
							: " text-lg  hover:text-black"
					}
					to="order/all">
					Buyurtmalarim
				</Link>
				<Link
					className={
						id === "/setti"
							? " text-lg hover:text-black text-black"
							: " text-lg  hover:text-black"
					}
					to="settings">
					Sozlamalar
				</Link>
			</div>
			<Outlet />
		</div>
	);
};

export default OrderNav;
