import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IComposition } from "app/types";
import { CreateReviewDto } from "../types";
import {
  compositionRatingsURL,
  compositionsURL,
  reviewsURL,
} from "app/constants/urls";

type State = IComposition | null;

const initialState: State = null;

const getComposition = createAsyncThunk(
  "getComposition",
  async (id: number) => {
    const response = await axios.get(compositionsURL + id, {
      withCredentials: true,
    });
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

const changeRating = createAsyncThunk(
  "change-comp-rating",
  async ({ id, score }: { id: number; score: number }) => {
    await axios.patch(
      compositionRatingsURL + id,
      { score },
      { withCredentials: true }
    );
    return score;
  }
);

const slice = createSlice<State, any, any>({
  name: "composition-page-store",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getComposition.fulfilled, (_, action) => action.payload)
      .addCase(changeRating.fulfilled, (state, action) => {
        state!.userRating = action.payload;
      }),
});

export { getComposition, uploadReview, changeRating };
export default slice.reducer;
