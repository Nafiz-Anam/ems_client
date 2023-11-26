import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    details: {},
};
const usersSlices = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.data = action.payload;
        },
        setUserDrop: (state, action) => {
            state.data = action.payload;
        },
        setPayouts: (state, action) => {
            state.data = action.payload;
        },
        setBanks: (state, action) => {
            state.data = action.payload;
        },
        setUsersDetails: (state, action) => {
            state.details = action.payload;
        },
        setAccountDetails: (state, action) => {
            state.details = action.payload;
        },
    },
});

export const {
    setUsers,
    setUserDrop,
    setPayouts,
    setBanks,
    setUsersDetails,
    setAccountDetails,
} = usersSlices.actions;
export default usersSlices.reducer;
