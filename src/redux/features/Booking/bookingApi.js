import { api } from "../../api/apiSlice";
import { addBooking } from "./bookingSlice";

const bookingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooking: builder.mutation({
      query: (data) => ({
        url: "/service/bookings",
        method: "POST",
        body: {
          perpage: 10,
          page: data.page,
          req_status: data.status,
          search: data?.search,
          client_id: data?.client_id,
          expert_id: data?.expert_id,
        }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const response = await queryFulfilled;
          dispatch(addBooking(response?.data?.data));
        } catch (error) { console.log(error); }

      }
    }),
    getBookingById: builder.mutation({
      query: (id) => ({
        url: `/service/bookings/${id}`,
        method: "GET",
      }),
    }),
  })
})
export const { useGetBookingMutation } = bookingApi


