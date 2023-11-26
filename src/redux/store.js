import { configureStore } from "@reduxjs/toolkit";
import utilsSlice from "./features/utils/utilsSlice";
import modalSlices from "./features/modals/modalSlices";
import { api } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authSlice from "./features/auth/authSlice";
import usersSlice from "./features/users/usersSlice";
import settingsSlice from "./features/Setting/settingsSlice";

export const store = configureStore({
    reducer: {
        modal: modalSlices,
        utils: utilsSlice,
        users: usersSlice,
        auth: authSlice,
        settings: settingsSlice,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});
setupListeners(store.dispatch);
