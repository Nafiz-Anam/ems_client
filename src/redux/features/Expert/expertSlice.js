import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  experts: [],
  expertDetails: {},
  expertRequests: [],
  expertRequestsDetails: {},
  expertsServices: []
}
const expertSlice = createSlice({
  name: "experts",
  initialState,
  reducers: {
    setExpert: (state, action) => {
      state.experts = action.payload
    },
    setExpertDetails: (state, action) => {
      state.expertDetails = action.payload
    },
    setExpertsRequest: (state, action) => {
      state.expertRequests = action.payload
    },
    setExpertsRequestDetails: (state, action) => {
      state.expertRequestsDetails = action.payload
    },
    setExpertsServices: (state, action) => {
      state.expertsServices = action.payload
    }
  }
})

export const {
  setExpert,
  setExpertDetails,
  setExpertsRequest,
  setExpertsServices,
  setExpertsRequestDetails,
} = expertSlice.actions
export default expertSlice.reducer