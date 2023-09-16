import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import mainReducer from "../pages/main/store/slice";
import compositionReducer from "../pages/composition/store/slice";
import coreReducer from "./core-reducer";
import adminReducer from "../pages/admin/store/slice";
import reviewReducer from "../pages/review/store/slice";
import searchReducer from "../pages/search/store/slice";
import userReducer from "../pages/user/store/slice";

export const store = configureStore({
  reducer: {
    core: coreReducer,
    main: mainReducer,
    composition: compositionReducer,
    admin: adminReducer,
    review: reviewReducer,
    search: searchReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
