import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Theme } from "../themes/types";
import { Language } from "../translations/types";
import i18next from "i18next";
import { ITag } from "../types";
import { signOutURL } from "../constants/urls";

type InitialState = {
  id: number | null;
  name: string | null;
  isAdmin: boolean;
  theme: Theme;
  lang: Language;
  tag: ITag | null;
};

const initialState: InitialState = {
  id: null,
  name: null,
  isAdmin: false,
  theme: Theme.Dark,
  lang: Language.English,
  tag: null,
};

const getUserData = createAsyncThunk("get-user-data", async () => {
  const url = process.env.REACT_APP_SERVER + "/auth/user";
  const response = await axios.get(url, { withCredentials: true });

  return response.data;
});

const signOut = createAsyncThunk("sign-out", async () => {
  axios.get(signOutURL, { withCredentials: true });
});

const slice = createSlice({
  name: "core",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
    changeLang: (state, action) => {
      state.lang = action.payload;
      i18next.changeLanguage(action.payload);
    },
    addTag: (state, action: PayloadAction<ITag>) => {
      // FOR MULTIPLE
      // const tag = state.tags.find((tag) => tag.id === action.payload.id);
      // if (!tag) {
      //   state.tags = [...state.tags, action.payload];
      // }

      state.tag = action.payload;
    },
    deleteTag: (state, action: PayloadAction<number>) => {
      // state.tags = state.tags.filter((tag) => tag.id !== action.payload);
      state.tag = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(
        getUserData.fulfilled,
        (state, action: PayloadAction<InitialState>) => {
          state.id = action.payload.id;
          state.isAdmin = action.payload.isAdmin;
          state.name = action.payload.name;
        }
      )
      .addCase(signOut.fulfilled, (state, _) => {
        state.id = null;
        state.isAdmin = false;
        state.name = null;
      }),
});

export const { changeLang, changeTheme, addTag, deleteTag } = slice.actions;
export default slice.reducer;
export { getUserData, signOut };
