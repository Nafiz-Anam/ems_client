import { api } from "../../api/apiSlice";
import { setExpert, setExpertDetails, setExpertsRequest, setExpertsRequestDetails, setExpertsServices } from "./expertSlice";

const expertApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getExperts: builder.mutation({
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
          const result = await queryFulfilled
          dispatch(setExpert(result.data.data))
        } catch (error) {
          console.log("error for expertApi", error);
        }
      }
    }),
    getExpertsDetails: builder.mutation({
      query: (data) => ({
        url: "/user/profile/details",
        method: "POST",
        body: { user_id: data }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          dispatch(setExpertDetails(result.data.data))
        } catch (error) {
          console.log('error form expertApi slice getExpertDetails', error);
        }
      }
    }),
    getExpertsRequest: builder.mutation({
      query: (data) => ({
        url: "/user/become-expert/list",
        method: "POST",
        body: {
          perpage: 10,
          page: data.page,
          search: data?.search,
        }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          dispatch(setExpertsRequest(result.data.data))
        } catch (error) { console.log('error for expert api', error) }
      }
    }),
    getExpertsRequestDetails: builder.mutation({
      query: (data) => ({
        url: "/user/become-expert/details",
        method: "POST",
        body: { req_id: data }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setExpertsRequestDetails(result.data.data))
        } catch (error) { console.log('error in expertApi slice', error) }
      }
    }),
    updateExpertsRequest: builder.mutation({
      query: (data) => ({
        url: "/user/become-expert/update",
        method: "POST",
        body: { user_id: data.id, status: data.status }
      })
    }),
    delateExpertRequest: builder.mutation({
      query: (data) => ({
        url: "",
        method: "POST",
        body: data
      })
    }),
    getExpertsServices: builder.mutation({
      query: (data) => ({
        url: "/service/list",
        method: "POST",
        body: {
          ...data,
          perpage: 10,
          page: data.page
        }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setExpertsServices(result.data.data))
        } catch (error) { console.log(error); }
      }
    }),
    updateExpertsServices: builder.mutation({
      query: (data) => ({
        url: "/service/request/update",
        method: "POST",
        body: data
      })
    }),
  })
})
export const {
  useGetExpertsMutation,
  useGetExpertsDetailsMutation,
  useGetExpertsRequestMutation,
  useDelateExpertRequestMutation,
  useUpdateExpertsRequestMutation,
  useGetExpertsRequestDetailsMutation,
  useGetExpertsServicesMutation,
  useUpdateExpertsServicesMutation,
} = expertApi