import axios from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersURL } from "app/constants/urls";
import { IUser } from "../types";

type State = {
  data: IUser | null;
  loading: boolean;
};

const initialState: State = {
  data: null,
  loading: false,
};

const getUserData = createAsyncThunk("load-user-data", async (id: number) => {
  const response = await axios.get(usersURL + id);
  return response.data;
});

const slice = createSlice<State, any>({
  name: "user-data",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      }),
});

export { getUserData };
export default slice.reducer;
