import { api } from "../../api/apiSlice";
import { setSubCategories } from "./categoriesSlices";

const subCategories = api.injectEndpoints({
  endpoints: (build) => ({
    getSubCategories: build.mutation({
      query: (data) => ({
        url: "/sub-category/list",
        method: "POST",
        body: {
          perpage: 10,
          page: data?.page,
          search: data?.search,
        }
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled
          dispatch(setSubCategories(result.data.data))
        } catch (error) { console.log("error form subCategories", error); }
      }
    }),
    createSubCategories: build.mutation({
      query: (data) => ({
        url: "/sub-category/create",
        method: "POST",
        body: data
      })
    }),
    updateSubCategories: build.mutation({
      query: (data) => ({
        url: "/sub-category/update",
        method: "POST",
        body: data
      })
    }),
    delateSubCategories: build.mutation({
      query: (id) => ({
        url: '/sub-category/delete',
        method: "POST",
        body: {
          sub_category_id: id, deleted: 1
        }
      })
    })
  })
})

export const {
  useGetSubCategoriesMutation,
  useDelateSubCategoriesMutation,
  useCreateSubCategoriesMutation,
  useUpdateSubCategoriesMutation, } = subCategories