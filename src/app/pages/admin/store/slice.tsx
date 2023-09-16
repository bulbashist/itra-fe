import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../../types";
import { ChangeIUserDTO } from "../types";

type ThunkArgs = {
  id: number;
  dto: ChangeIUserDTO;
};

const getUsers = createAsyncThunk("get-users", async () => {
  const url = process.env.REACT_APP_SERVER + "/api/users/";
  const response = await axios.get(url);
  return response.data;
});

const changeUser = createAsyncThunk(
  "change-user",
  async ({ id, dto }: ThunkArgs) => {
    const url = process.env.REACT_APP_SERVER + "/api/users/" + id;
    const response = await axios.patch(url, dto);
    return response.data;
  }
);

const slice = createSlice({
  name: "admin",
  initialState: [] as IUser[],
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getUsers.fulfilled, (state, action) => action.payload)
      .addCase(changeUser.fulfilled, (state, action) => {
        return state.map((user) => {
          if (user.id === action.payload.id) {
            return { ...user, ...action.payload };
          } else return user;
        });
      }),
});

export { getUsers, changeUser };
export default slice.reducer;
