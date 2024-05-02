import React from "react";
import { Outlet } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { HiShoppingBag, HiUser } from "react-icons/hi";
import { BsListUl } from "react-icons/bs";
import { BiHome } from "react-icons/bi";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const openedMixin = (theme) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme) => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary htmlFor content to be below app bar
	...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));
const AdminBar = () => {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: "none" }),
						}}>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Mini variant drawer
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<DrawerHeader sx={{ justifyContent: "space-evenly" }}>
					<Link to="/">
						Tonic <span className=" font-semibold">Dev</span>
					</Link>

					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					<ListItem disablePadding sx={{ display: "block" }}>
						<Link to="dashboard">
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: 2.5,
								}}>
								<ListItemIcon
									sx={{
										minWidth: 0,
										fontSize: "25px",
										mr: open ? 3 : "auto",
										justifyContent: "center",
									}}>
									<HiShoppingBag />
								</ListItemIcon>
								<ListItemText
									primary="Dashboard"
									sx={{ opacity: open ? 1 : 0 }}
								/>
							</ListItemButton>
						</Link>
					</ListItem>
					<ListItem disablePadding sx={{ display: "block" }}>
						<Link to="products">
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: 2.5,
								}}>
								<ListItemIcon
									sx={{
										fontSize: "25px",

										minWidth: 0,
										mr: open ? 3 : "auto",
										justifyContent: "center",
									}}>
									<BiHome />
								</ListItemIcon>
								<ListItemText
									primary="Products"
									sx={{ opacity: open ? 1 : 0 }}
								/>
							</ListItemButton>
						</Link>
					</ListItem>
					<ListItem disablePadding sx={{ display: "block" }}>
						<Link to="addproduct">
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: 2.5,
								}}>
								<ListItemIcon
									sx={{
										fontSize: "25px",

										minWidth: 0,
										mr: open ? 3 : "auto",
										justifyContent: "center",
									}}>
									<MdOutlineAddShoppingCart />
								</ListItemIcon>
								<ListItemText
									primary="Add product"
									sx={{ opacity: open ? 1 : 0 }}
								/>
							</ListItemButton>
						</Link>
					</ListItem>
					<ListItem disablePadding sx={{ display: "block" }}>
						<Link to="categoriy">
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: 2.5,
								}}>
								<ListItemIcon
									sx={{
										fontSize: "25px",
										minWidth: 0,
										mr: open ? 3 : "auto",
										justifyContent: "center",
									}}>
									<BsListUl />
								</ListItemIcon>
								<ListItemText
									primary="Categories"
									sx={{ opacity: open ? 1 : 0 }}
								/>
							</ListItemButton>{" "}
						</Link>
					</ListItem>
					<ListItem disablePadding sx={{ display: "block" }}>
						<Link to="order">
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: 2.5,
								}}>
								<ListItemIcon
									sx={{
										fontSize: "25px",
										minWidth: 0,
										mr: open ? 3 : "auto",
										justifyContent: "center",
									}}>
									<RiShoppingBag3Fill />
								</ListItemIcon>
								<ListItemText primary="Orders" sx={{ opacity: open ? 1 : 0 }} />
							</ListItemButton>
						</Link>
					</ListItem>
					<ListItem disablePadding sx={{ display: "block" }}>
						<Link to="user">
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: 2.5,
								}}>
								<ListItemIcon
									sx={{
										fontSize: "25px",
										minWidth: 0,
										mr: open ? 3 : "auto",
										justifyContent: "center",
									}}>
									<HiUser />
								</ListItemIcon>
								<ListItemText primary="Users" sx={{ opacity: open ? 1 : 0 }} />
							</ListItemButton>
						</Link>
					</ListItem>
				</List>
			</Drawer>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<Outlet />
			</Box>
		</Box>
	);
};
export default AdminBar;
