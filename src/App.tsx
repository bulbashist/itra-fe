import { useEffect } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainPage from "./app/pages/main";
import UserPage from "./app/pages/user";
import HeaderComponent from "./app/components/header";
import ReviewPage from "./app/pages/review";
import { Container, ThemeProvider } from "@mui/material";
import CompositionPage from "./app/pages/composition";
import { theme } from "./app/themes/theme";

import "./app/translation";
import { getUserData } from "./app/store/core-reducer";
import { useAppDispatch } from "./app/hooks";
import AdminPage from "./app/pages/admin";
import { ReviewsPage } from "./app/pages/reviews/reviews";
import SearchPage from "./app/pages/search";
import CompositionsPage from "./app/pages/compositions";
import NoPage from "./app/pages/404";

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
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
