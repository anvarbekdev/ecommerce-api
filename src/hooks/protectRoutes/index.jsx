import { useRef } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";
import jwt_decode from "jwt-decode";

export const ProtectRoutes = () => {
	const { cookies } = useAuth();
	const refAuth = useRef(null);
	const navigate = useNavigate();

	if (cookies?.token?.length === undefined) {
		navigate("/login");
	} else {
		const decoded = jwt_decode(cookies.token);
		refAuth.current = decoded;
	}
	return refAuth?.current?.user?.role === "admin" ? (
		<Outlet />
	) : (
		<Navigate to="/login" exact />
	);
};
