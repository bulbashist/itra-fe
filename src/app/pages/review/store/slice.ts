import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getReview,
  changeReview,
  deleteReview,
  changeRating,
  changeLike,
} from "./reviews/thunks";
import { IComment } from "../../../types";
import { IReview } from "../types";

type State = {
  review: null | IReview;
  isBeingEdited: boolean;
  loading: boolean;
};

const initialState: State = {
  review: null,
  isBeingEdited: false,
  loading: false,
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
      .addCase(getReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReview.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.review = action.payload;
        state.loading = false;
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
        (state, action: PayloadAction<boolean>) => {
          state.review!.isLiked = action.payload;
        }
      ),
});

export { getReview, changeReview, deleteReview };
export const { addComment, deleteComment, setEditingState } = slice.actions;
export default slice.reducer;
