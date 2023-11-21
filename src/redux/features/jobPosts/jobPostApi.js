import { api } from "../../api/apiSlice";
import { setJobPostDetails, setPostData } from "./jobPostSlice";

const jobPostApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPostData: builder.mutation({
      query: (data) => ({
        url: "/job/list",
        method: "POST",
        body: {
          perpage: 10,
          page: data?.page ? data.page : null,
          search: data?.search ? data?.search : null,
          req_status: data?.req_status ? data?.req_status : null,
          deleted: 0
        }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setPostData(result.data.data))
        } catch (error) {
          console.log(error)
        }
      }
    }),
    getJopPostDetails: builder.mutation({
      query: (id) => ({
        url: "/job/details",
        method: "POST",
        body: { job_id: id }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          dispatch(setJobPostDetails(result.data.data))
        } catch (error) { console.log("error for JobPostApi slice", error?.message) }
      }
    }),
    delateJobPost: builder.mutation({
      query: (id) => ({
        url: "/job/delete",
        method: "POST",
        body: {
          job_id: id,
          deleted: 1
        }
      })
    })
  })
})
export const {
  useGetPostDataMutation,
  useDelateJobPostMutation,
  useGetJopPostDetailsMutation } = jobPostApi