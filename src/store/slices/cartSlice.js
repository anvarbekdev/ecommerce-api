import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isCartOpen: false,
	cartItems: JSON.parse(localStorage.getItem("Product"))
		? JSON.parse(localStorage.getItem("Product"))
		: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		toggleCart(state, action) {
			state.isCartOpen = action.payload;
			const json = JSON.stringify(state.cartItems);
			localStorage.setItem("Product", [json]);
		},

		addItem(state, action) {
			const newItemId = action.payload.id;
			const existingItem = state.cartItems.find(
				(item) => item.id === newItemId
			);
			if (existingItem) {
				existingItem.quantity++;
			} else {
				state.cartItems.push(action.payload);
			}
			const json = JSON.stringify(state.cartItems);
			localStorage.setItem("Product", [json]);
		},

		removeItem(state, action) {
			state.cartItems = state.cartItems.filter(
				(item) => item.id !== action.payload
			);
			const json = JSON.stringify(state.cartItems);
			localStorage.setItem("Product", [json]);
		},

		incrementItem(state, action) {
			state.cartItems = state.cartItems.map((item) => {
				if (item.id === action.payload) {
					item.quantity++;
				}
				return item;
			});
			const json = JSON.stringify(state.cartItems);
			localStorage.setItem("Product", [json]);
		},

		decrementItem(state, action) {
			state.cartItems = state.cartItems
				.map((item) => {
					if (item.id === action.payload) {
						item.quantity--;
					}
					return item;
				})
				.filter((item) => item.quantity !== 0);
			const json = JSON.stringify(state.cartItems);
			localStorage.setItem("Product", [json]);
		},
	},
});

export const { toggleCart, addItem, removeItem, incrementItem, decrementItem } =
	cartSlice.actions;
export default cartSlice.reducer;
