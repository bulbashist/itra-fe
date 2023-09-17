import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../../types";
import { ChangeIUserDTO } from "../types";
import { usersURL } from "../../../constants/urls";

type ThunkArgs = {
  id: number;
  dto: ChangeIUserDTO;
};

const getUsers = createAsyncThunk("get-users", async () => {
  const response = await axios.get(usersURL, { withCredentials: true });
  return response.data;
});

const changeUser = createAsyncThunk(
  "change-user",
  async ({ id, dto }: ThunkArgs) => {
    const response = await axios.patch(usersURL + id, dto, {
      withCredentials: true,
    });
    return response.data;
  }
);

const deleteUser = createAsyncThunk("delete-user", async (id: number) => {
  await axios.delete(usersURL + id, { withCredentials: true });
  return id;
});

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
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        return state.filter((user) => user.id !== action.payload);
      }),
});

export { getUsers, changeUser, deleteUser };
export default slice.reducer;
