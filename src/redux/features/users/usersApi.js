import { api } from "../../api/apiSlice";
import { setUsers, setUsersDetails } from "./usersSlice";

const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.mutation({
            query: (data) => ({
                url: "/employee/list",
                method: "POST",
                body: {
                    perpage: 10,
                    page: data.page,
                    search: data?.search,
                },
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(setUsers(result.data.data));
                } catch (error) {
                    console.log("error for user api slice", error);
                }
            },
        }),
        getPayouts: builder.mutation({
            query: (data) => ({
                url: "/payout/list",
                method: "POST",
                body: {
                    perpage: 10,
                    page: data.page,
                    search: data?.search,
                },
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(setUsers(result.data.data));
                } catch (error) {
                    console.log("error for user api slice", error);
                }
            },
        }),
        getBanks: builder.mutation({
            query: (data) => ({
                url: "/employee/account_list",
                method: "POST",
                body: {
                    perpage: 10,
                    page: data.page,
                    search: data?.search,
                },
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(setUsers(result.data.data));
                } catch (error) {
                    console.log("error for user api slice", error);
                }
            },
        }),
        getUsersDetails: builder.mutation({
            query: (data) => ({
                url: "/employee/details",
                method: "POST",
                body: { employee_id: data },
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(setUsersDetails(result.data.data));
                } catch (error) {
                    console.log("error for userApi.js", error);
                }
            },
        }),
        getAccountDetails: builder.mutation({
            query: (data) => ({
                url: "/employee/banks-details",
                method: "POST",
                body: { account_id: data },
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(setUsersDetails(result.data.data));
                } catch (error) {
                    console.log("error for userApi.js", error);
                }
            },
        }),
        updateStatus: builder.mutation({
            query: (data) => ({
                url: "/employee/block-unblock",
                method: "POST",
                body: { employee_id: data.id, status: data.status },
            }),
        }),
        updateUserDetails: builder.mutation({
            query: (data) => ({
                url: "/employee/update",
                method: "POST",
                body: data,
            }),
        }),
        updateContactDetails: builder.mutation({
            query: (data) => ({
                url: "/employee/update/contact_info",
                method: "POST",
                body: data,
            }),
        }),
        updateAccountDetails: builder.mutation({
            query: (data) => ({
                url: "/employee/update/banks-details",
                method: "POST",
                body: data,
            }),
        }),
        updateAcademicDetails: builder.mutation({
            query: (data) => ({
                url: "/employee/update/academic-info",
                method: "POST",
                body: data,
            }),
        }),
        updateKycDetails: builder.mutation({
            query: (data) => ({
                url: "/employee/update/kyc",
                method: "POST",
                body: data,
            }),
        }),
    }),
});
export const {
    useGetUsersMutation,
    useUpdateStatusMutation,
    useGetUsersDetailsMutation,
    useGetBanksMutation,
    useGetAccountDetailsMutation,
    useGetPayoutsMutation,
    useUpdateContactDetailsMutation,
    useUpdateAccountDetailsMutation,
    useUpdateUserDetailsMutation,
    useUpdateAcademicDetailsMutation,
    useUpdateKycDetailsMutation,
} = usersApi;
