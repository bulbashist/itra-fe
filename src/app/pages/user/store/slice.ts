import axios from "axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { usersURL } from "app/constants/urls";
import { IUser } from "../types";

type State = IUser | null;

const initialState: State = null;

const getUserData = createAsyncThunk("load-user-data", async (id: number) => {
  const response = await axios.get(usersURL + id);
  return response.data;
});

const slice = createSlice<State, any>({
  name: "user-data",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(
      getUserData.fulfilled,
      (_, action: PayloadAction<IUser>) => action.payload
    ),
});

export { getUserData };
export default slice.reducer;
