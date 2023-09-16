import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getReview,
  changeReview,
  deleteReview,
  changeRating,
  changeLike,
} from "./reviews/thunks";
import axios from "axios";
import test from "./test.json";
import { IComment, IReview } from "../../../types";

type State = {
  review: null | any;
  isBeingEdited: boolean;
};

const initialState: State = {
  review: test, //null,
  isBeingEdited: false,
};

const slice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setEditingState: (state, action) => {
      state.isBeingEdited = action.payload;
    },
    addComment: (state, action) => {
      state.review!.comments = [action.payload, ...state.review!.comments];
    },
    deleteComment: (state, action) => {
      console.log(action.payload);
      state.review!.comments = state.review!.comments.filter(
        (comment: IComment) => comment.id !== action.payload
      );
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getReview.fulfilled, (state, action) => {
        state.review = action.payload;
      })
      .addCase(changeReview.fulfilled, (state, action) => {
        state.review = { ...state.review, ...action.payload };
        state.isBeingEdited = false;
      })
      .addCase(deleteReview.fulfilled, (state, _) => {
        state.review = null;
      })
      .addCase(
        changeRating.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.review!.userRating = action.payload;
        }
      )
      .addCase(
        changeLike.fulfilled,
        (state, action: PayloadAction<boolean | undefined>) => {
          state.review!.isLiked = action.payload;
        }
      ),
});

export { getReview, changeReview, deleteReview };
export const { addComment, deleteComment, setEditingState } = slice.actions;
export default slice.reducer;
