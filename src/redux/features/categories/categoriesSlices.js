import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catagoriesData: [],
  subCatagoriesData: []
}

const categoriesSlice = createSlice({
  name: "catagories",
  initialState,
  reducers: {
    handleAdd: (state, action) => {
      state.catagoriesData = action.payload
    },
    handleUpdate: (state, action) => {
      // update a single category from categories array
      const { id, data } = action.payload
      const category = state.catagoriesData.find((category) => category.id === id);
      if (category) { category.data = data; }
    },
    handleDelete: (state, action) => {
      // delete a single category from categories array
      const { id } = action.payload;
      const newCategories = state.catagories.filter((category) => category.id !== id);
      state.catagories = newCategories;
    },
    //  sub catagories reducers 
    setSubCategories: (state, action) => {
      state.subCatagoriesData = action.payload
    }

  }
})
export const { handleDelete, handleUpdate, handleAdd, setSubCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;