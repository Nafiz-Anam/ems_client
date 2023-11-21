import { configureStore } from "@reduxjs/toolkit";
import utilsSlice from "./features/utils/utilsSlice";
import modalSlices from "./features/modals/modalSlices";
import { api } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import categoriesSlices from "./features/categories/categoriesSlices";
import authSlice from "./features/auth/authSlice";
import jobPostSlice from "./features/jobPosts/jobPostSlice";
import usersSlice from "./features/users/usersSlice";
import expertSlice from "./features/Expert/expertSlice";
import bookingSlice from "./features/Booking/bookingSlice";
import settingsSlice from "./features/Setting/settingsSlice";

export const store = configureStore({
    reducer: {
        modal: modalSlices,
        utils: utilsSlice,
        users: usersSlice,
        jobPost: jobPostSlice,
        expert: expertSlice,
        catagories: categoriesSlices,
        booking: bookingSlice,
        auth: authSlice,
        settings: settingsSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});
setupListeners(store.dispatch);
