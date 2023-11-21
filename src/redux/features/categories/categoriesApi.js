import { api } from "../../api/apiSlice";
import { handleAdd } from "./categoriesSlices";

const categoriesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.mutation({
      query: (data) => ({
        url: "/category/list",
        method: "POST",
        body: {
          perpage: 10,
          page: data?.page ? data.page : null,
          search: data?.search ? data?.search : null,
        }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        dispatch(handleAdd(null))
        try {
          const result = await queryFulfilled
          dispatch(handleAdd(result?.data?.data))
        } catch (error) { console.log("error from categoriesApi ", error); }
      },
      providesTags: ["Categories"]
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"]
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: "/category/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"]
    }),
    delateCategories: builder.mutation({
      query: (id) => ({
        url: '/category/delete',
        method: "POST",
        body: {
          category_id: id,
          deleted: 1
        }
      })
    })
  })
})
export const {
  useGetCategoriesMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDelateCategoriesMutation, } = categoriesApi;