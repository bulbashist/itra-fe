import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IComposition } from "../../../types";
import axios from "axios";
import { compositionsURL, reviewsURL } from "../../../constants/urls";
import { CreateReviewDto } from "../types";

type InitialState = IComposition | null;

const initialState: InitialState = {
  author: "vbtrnryn",
  description:
    "# Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  id: 1,
  name: "brtntynmyumyu",
  avgRating: 4,
  userRating: 2,
  tag: {
    id: 1,
    name: "adfda",
  },
  reviews: [],
};

const getComposition = createAsyncThunk(
  "getComposition",
  async (id: number) => {
    const response = await axios.get(compositionsURL + id);
    return response.data;
  }
);

const uploadReview = createAsyncThunk(
  "upload-review",
  async (data: CreateReviewDto) => {
    const response = await axios.post(
      reviewsURL,
      {
        ...data,
      },
      { withCredentials: true }
    );
    return response.data;
  }
);

const slice = createSlice({
  name: "composition-page-store",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(getComposition.fulfilled, (_, action) => action.payload),
});

export { getComposition, uploadReview };
export default slice.reducer;
