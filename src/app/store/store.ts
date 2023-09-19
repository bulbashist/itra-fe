import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import mainReducer from "../pages/main/store/slice";
import compositionReducer from "../pages/composition/store/slice";
import coreReducer from "./core-reducer";
import adminReducer from "../pages/admin/store/slice";
import reviewReducer from "../pages/review/store/slice";
import searchReducer from "../pages/search/store/slice";
import userReducer from "../pages/user/store/slice";
import storage from "redux-persist/lib/storage";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage,
  whitelist: ["core"],
};

const reducer = combineReducers({
  core: coreReducer,
  main: mainReducer,
  composition: compositionReducer,
  admin: adminReducer,
  review: reviewReducer,
  search: searchReducer,
  user: userReducer,
});

type RootReducer = ReturnType<typeof reducer>;
const persistedReducer = persistReducer<RootReducer>(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
