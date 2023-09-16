import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

import HeaderComponent from "../../components/header";
import FilterPanelComponent from "./components/filter-panel";
import ReviewsListComponent from "./components/reviews-list";
import { CSSPadding } from "../../styles/constants";
import PageWrapperComponent from "../../components/page-wrapper";

export const MainPage = () => {
  return (
    <PageWrapperComponent>
      <Stack
        direction="column"
        alignItems="flex-start"
        padding={CSSPadding.Average}
      >
        <FilterPanelComponent />
        <ReviewsListComponent />
      </Stack>
    </PageWrapperComponent>
  );
};
