import { createSlice } from "@reduxjs/toolkit";

type State = {
  filter: "new" | "popular";
};

const initialState: State = {
  filter: "new",
};

const slice = createSlice({
  name: "main",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { changeFilter } = slice.actions;
export default slice.reducer;
