/** @format */

import { createSlice } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";

export type QuizSelection = {
	categoryCode: string | null;
	category: string;
	difficulty: string;
};
const initialState = {
	categoryCode: null,
	category: null,
	difficulty: null,
};

const selectSlice = createSlice({
	name: "select",
	initialState,
	reducers: {
		setSelection: (state: RootStateOrAny, action) => {
			state.categoryCode = action.payload.categoryCode;
			state.category = action.payload.category;
			state.difficulty = action.payload.difficulty;
		},
	},
});

export const selectActions = selectSlice.actions;

export default selectSlice;
