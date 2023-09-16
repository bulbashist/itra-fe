import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types";
import axios from "axios";
import { usersURL } from "../../../constants/urls";

type UserData = IUser | null;

const initialState: UserData = null;

const getUserData = createAsyncThunk("load-user-data", async (id: number) => {
  const response = await axios.get(usersURL + id);
  return response.data;
});

const slice = createSlice<UserData, any>({
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
