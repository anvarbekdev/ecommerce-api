import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import "./index.scss";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
//core
import "primereact/resources/primereact.min.css";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { CookiesProvider } from "react-cookie";
import AppProvider from "./hooks";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<CookiesProvider>
				<QueryClientProvider client={queryClient}>
					<AppProvider>
						<App />
					</AppProvider>
				</QueryClientProvider>
			</CookiesProvider>
		</BrowserRouter>
	</React.StrictMode>
);
