import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  data: [],
  details: {}
}
const usersSlices = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => { state.data = action.payload },
    setUsersDetails: (state, action) => {
      state.details = action.payload
    }
  }
})

export const { setUsers, setUsersDetails } = usersSlices.actions
export default usersSlices.reducer