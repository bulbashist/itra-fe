import React, { useEffect } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import "./app/translation";
import { getUserData } from "./app/store/core-reducer";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { themes } from "./app/themes/theme";

import AdminPage from "./app/pages/admin";
import CompositionPage from "./app/pages/composition";
import CompositionsPage from "./app/pages/compositions";
import MainPage from "./app/pages/main";
import NoPage from "./app/pages/404";
import ReviewPage from "./app/pages/review";
import ReviewsPage from "./app/pages/reviews";
import SearchPage from "./app/pages/search";
import UserPage from "./app/pages/user";

const router = createBrowserRouter([
  { path: "/", element: <MainPage /> },
  { path: "/users/:id", element: <UserPage /> },
  { path: "/reviews", element: <ReviewsPage /> },
  { path: "/reviews/:id", element: <ReviewPage /> },
  { path: "/compositions/:id", element: <CompositionPage /> },
  { path: "/admin", element: <AdminPage /> },
  { path: "/search", element: <SearchPage /> },
  { path: "/compositions", element: <CompositionsPage /> },
  { path: "*", element: <NoPage /> },
]);

function App() {
  const mode = useAppSelector((state) => state.core.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <ThemeProvider theme={themes[mode]}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
