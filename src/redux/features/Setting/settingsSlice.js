import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  faq: [],
  privacy: "",
  terms: "",
}
const settingSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setFaq: (state, action) => {
      state.faq = action.payload;
    },
    setPrivacy: (state, action) => {
      state.privacy = action.payload;
    },
    setTerms: (state, action) => {
      state.terms = action.payload;
    },
  }
})
export default settingSlice.reducer;
export const { setFaq, setPrivacy, setTerms } = settingSlice.actions;