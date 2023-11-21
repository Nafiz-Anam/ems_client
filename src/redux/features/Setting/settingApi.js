import { api } from "../../api/apiSlice";
import { setFaq } from "./settingsSlice";

const settingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addFaq: builder.mutation({
      query: (data) => ({
        url: `/settings/faq/add`,
        method: "POST",
        body: {
          question: data.question,
          answer: data.answer,
          status: data.status ? 1 : 0,
        },
      }),
    }),
    getFaq: builder.mutation({
      query: () => ({
        url: `/settings/faq/list`,
        method: "POST",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          dispatch(setFaq(res.data.data));
        } catch (error) { console.log(error); }
      }
    }),
    deleteFaq: builder.mutation({
      query: (data) => ({
        url: `/setting/faq`,
        method: "DELETE",
        body: data,
      }),
    }),
    // ! Privacy
    addPrivacy: builder.mutation({
      query: (data) => ({
        url: `/setting/privacy`,
        method: "POST",
        body: data,
      }),
    }),
    getPrivacy: builder.mutation({
      query: (data) => ({
        url: `/setting/privacy`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          // dispatch(setFaq(res.data));
        } catch (error) { console.log(error); }
      }
    }),
    updatePrivacy: builder.mutation({
      query: (data) => ({
        url: `/setting/privacy`,
        method: "PUT",
        body: data,
      }),
    }),
    // ! Terms
    addTerms: builder.mutation({
      query: (data) => ({
        url: `/setting/terms`,
        method: "POST",
        body: data,
      }),
    }),
    getTerms: builder.mutation({
      query: (data) => ({
        url: `/setting/terms`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          // dispatch(setFaq(res.data));
        } catch (error) { console.log(error); }
      }
    }),
    updateTerms: builder.mutation({
      query: (data) => ({
        url: `/setting/terms`,
        method: "PUT",
        body: data,
      }),
    }),
  }),

})
export const {
  useAddFaqMutation,
  useGetFaqMutation,
  useAddPrivacyMutation,
  useAddTermsMutation,
  useGetPrivacyMutation,
  useGetTermsMutation,
  useDeleteFaqMutation,
  useUpdatePrivacyMutation,
  useUpdateTermsMutation, } = settingApi;