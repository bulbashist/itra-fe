import { Container } from "@mui/material";
import HeaderComponent from "../../components/header";
import ReviewsListComponent from "./components/compositions-list";
import PageWrapperComponent from "../../components/page-wrapper";

export const CompositionsPage = () => {
  return (
    <PageWrapperComponent>
      <ReviewsListComponent />
    </PageWrapperComponent>
  );
};
