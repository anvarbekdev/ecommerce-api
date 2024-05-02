import { Route, Routes, useNavigate } from "react-router-dom";
import AddProduct from "./components/admin/AddProduct";
import AdminBar from "./components/admin/AdminBar";
import Categoriy from "./components/admin/Categoriy";
import Dashboard from "./components/admin/Dashboard";
import Order from "./components/admin/Order";
import OrderUser from "./components/Order";
import Products from "./components/admin/Products";
import User from "./components/admin/User";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Product from "./components/product/Product";
import { ProductDetail } from "./components/product/ProductDetail";
import ProductId from "./components/admin/ProductId";
import Login from "./components/Login";
import { ProtectRoutes } from "./hooks/protectRoutes";
import { Provider } from "react-redux";
import store from "./store/store";
import Cart from "./components/Cart";
import Register from "./components/Register";
import Checkout from "./components/Checkout";
import MainProduct from "./components/product/MainProduct";
import AllOrders from "./components/AllOrders";
import UnfinishOrders from "./components/UnfinishOrders";
import ActiveOrders from "./components/ActiveOrders";
import OrderNav from "./components/OrderNav";
import Settings from "./components/Settings";

const Home = () => {
	return (
		<>
			<Hero />
			<Product />
		</>
	);
};

function App() {
	return (
		<div className="xl:mx-24 ">
			<Provider store={store}>
				<Cart />
				<Routes>
					{/* ========= Clients ======== */}
					<Route path="/" element={<Header />}>
						<Route path="" element={<Home />} />
						<Route path="register" element={<Register />} />
						<Route path="products/:id" element={<MainProduct />} />
						<Route path="product/:id" element={<ProductDetail />} />
						<Route path="checkout" element={<Checkout />} />
						<Route path="" element={<OrderNav />}>
							<Route path="order" element={<OrderUser />}>
								<Route path="all" element={<AllOrders />} />
								<Route path="unpayed" element={<UnfinishOrders />} />
								<Route path="active" element={<ActiveOrders />} />
							</Route>
							<Route path="settings" element={<Settings />} />
						</Route>
					</Route>
					<Route path="/login" element={<Login />} />
					{/* ========= ADMIN ======== */}
					<Route element={<ProtectRoutes />}>
						<Route path="/admin" element={<AdminBar />}>
							<Route path="addproduct" element={<AddProduct />} />
							<Route path="dashboard" element={<Dashboard />} />
							<Route path="products" element={<Products />} />
							<Route path="products/:id" element={<ProductId />} />
							<Route path="categoriy" element={<Categoriy />} />
							<Route path="order" element={<Order />} />
							<Route path="user" element={<User />} />
						</Route>
					</Route>
				</Routes>
			</Provider>
		</div>
	);
}

export default App;
