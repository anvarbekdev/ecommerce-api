import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		const scrollToTop = () => {
			window.scrollTo({
				top: 0,
				behavior: "smooth", // Add smooth scroll behavior
			});
		};

		scrollToTop(); // Call the scroll function

		return () => {
			window.removeEventListener("scroll", scrollToTop); // Cleanup function
		};
	}, [pathname]);

	return null;
}

export default ScrollToTop;
