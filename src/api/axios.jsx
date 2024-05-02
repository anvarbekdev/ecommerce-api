import axios from "axios";
const BASE_URL = "https://shop-2fgr.onrender.com";
// const BASE_URL = "http://localhost:5000";
export default axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});
export const axiosImage = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});
