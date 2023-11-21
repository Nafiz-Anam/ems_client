import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  modal: { show: false, page: null, title: null, width: null, selectedItem: null, },
  dropdown: { selectedOption: '', dropdownValue: {}, }
}

const modalSlices = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      if (!state.modal.show) { state.dropdown.selectedOption = "" }
      state.modal.show = action.payload.show;
      state.modal.title = action.payload.title;
      state.modal.width = action.payload.width;
      state.modal.page = action.payload.page;
      state.modal.selectedItem = action.payload.selectedItem;
    },
    showDropdown: (state, action) => {
      state.dropdown.selectedOption = action.payload.selectedOption
    }
  }
})

export const { showModal, showDropdown } = modalSlices.actions;
export default modalSlices.reducer;
