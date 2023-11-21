import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
    drawer: false,
    optionValue: null,
    printStart: false,
    dropdown: localStorage.getItem("dropdown")
        ? localStorage.getItem("dropdown")
        : null,
};

const utilsSlice = createSlice({
    name: "utils",
    initialState,
    reducers: {
        increment: (state, action) => {
            state.count += action.payload ? action.payload : 3;
        },
        openDrawer: (state, action) => {
            state.drawer = action.payload;
        },
        setOptionValue: (state, action) => {
            state.optionValue = action.payload;
        },
        setDropdown: (state, action) => {
            state.dropdown = action.payload;
        },
        setPrintStart: (state, action) => {
            state.printStart = action.payload;
        },
    },
});

export const {
    increment,
    openDrawer,
    setOptionValue,
    setDropdown,
    setPrintStart,
} = utilsSlice.actions;
export default utilsSlice.reducer;
