import { createContext, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const navigate = useNavigate();
	const [cookies, setCookies, removeCookie] = useCookies();

	const login = (decoded) => {
		if (decoded.user.role === "admin") {
			return navigate("/admin/categoriy");
		} else {
			navigate("/");
		}
	};
	const logout = () => {
		removeCookie("token"); // remove data save in cookies
		navigate("/login");
	};

	const value = useMemo(
		() => ({
			cookies,
			logout,
			login,
		}),
		[cookies]
	);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
	return useContext(UserContext);
};
