import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  data: [],
  details: {}
}
const jobPostSlice = createSlice({
  name: "jobPost",
  initialState,
  reducers: {
    setPostData: (state, action) => {
      state.data = action.payload
    },
    setJobPostDetails: (state, action) => {
      state.details = action.payload
    }
  }
})
export const { setPostData, setJobPostDetails } = jobPostSlice.actions
export default jobPostSlice.reducer