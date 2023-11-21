/* eslint-disable no-empty */
import { api } from "../../api/apiSlice";
import { userLogin } from "./authSlice";

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/admin/login",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    // set data in localStorage
                    localStorage.setItem(
                        "auth",
                        JSON.stringify({ accessToken: result.data.token })
                    );
                    localStorage.removeItem("recoverToken");
                    // set data in redux store
                    dispatch(userLogin({ accessToken: result.data.token }));
                } catch (error) {
                    console.log("error from authApi ", error);
                }
            },
        }),
        registerAccount: builder.mutation({
            query: (data) => ({
                url: "/admin/send_otp",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    localStorage.removeItem("auth");
                    localStorage.setItem(
                        "recoverToken",
                        JSON.stringify({ recoverToken: result.data.token })
                    );
                } catch (error) {
                    console.log("error from registerApi ", error);
                }
            },
        }),
        recoverAccount: builder.mutation({
            query: (data) => ({
                url: "/admin/check-admin",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    localStorage.removeItem("auth");
                    localStorage.setItem(
                        "recoverToken",
                        JSON.stringify({ recoverToken: result.data.token })
                    );
                } catch (error) {
                    console.log("error from authApi ", error);
                }
            },
        }),
        verifyPasswordOtp: builder.mutation({
            query: (data) => ({
                url: "/admin/password_verify_otp",
                method: "POST",
                body: data,
            }),
        }),
        verifyOtp: builder.mutation({
            query: (data) => ({
                url: "/admin/verify_otp",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    localStorage.removeItem("recoverToken");
                    localStorage.setItem(
                        "auth",
                        JSON.stringify({ accessToken: result.data.token })
                    );
                } catch (error) {
                    console.log("error from registerApi ", error);
                }
            },
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: "/admin/change-password",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    localStorage.removeItem("recoverToken");
                    localStorage.removeItem("auth");
                } catch (error) {
                    console.log("error from authApi ", error);
                }
            },
        }),
        addPassword: builder.mutation({
            query: (data) => ({
                url: "/admin/add_password",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                    localStorage.removeItem("auth");
                    localStorage.setItem(
                        "auth",
                        JSON.stringify({ accessToken: result.data.token })
                    );
                } catch (error) {
                    console.log("error from authApi ", error);
                }
            },
        }),
    }),
});
export const {
    useLoginMutation,
    useVerifyOtpMutation,
    useRecoverAccountMutation,
    useResetPasswordMutation,
    useRegisterAccountMutation,
    useVerifyPasswordOtpMutation,
    useAddPasswordMutation
} = authApi;
