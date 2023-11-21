import { api } from "../../api/apiSlice";
import { setUsers, setUsersDetails } from "./usersSlice";

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.mutation({
      query: (data) => ({
        url: "/user/list",
        method: 'POST',
        body: {
          perpage: 10,
          page: data.page,
          type: data.type,
          search: data?.search,
        }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUsers(result.data.data))
        } catch (error) { console.log('error for user api slice', error) }
      }
    }),
    getUsersDetails: builder.mutation({
      query: (data) => ({
        url: "/user/profile/details",
        method: "POST",
        body: { user_id: data }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          dispatch(setUsersDetails(result.data.data))
        } catch (error) { console.log('error for userApi.js', error) }
      }
    }),
    updateStatus: builder.mutation({
      query: (data) => ({
        url: '/user/block-unblock',
        method: "POST",
        body: { user_id: data.id, status: data.status }
      })
    }),
    userLoginHistory: builder.mutation({
      query: (data) => ({
        url: '/user/login/history',
        method: "POST",
        body: { id: data }
      })
    }),
  })
})
export const {
  useGetUsersMutation,
  useUpdateStatusMutation,
  useGetUsersDetailsMutation,
  useUserLoginHistoryMutation, } = usersApi