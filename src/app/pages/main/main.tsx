import Stack from "@mui/material/Stack";
import PageWrapperComponent from "app/components/page-wrapper";
import { CSSGap, CSSPadding } from "app/styles/constants";
import FilterPanelComponent from "./components/filter-panel";
import ReviewsListComponent from "./components/reviews-list";

export const MainPage = () => {
  return (
    <PageWrapperComponent>
      <Stack
        direction="column"
        alignItems="flex-start"
        padding={CSSPadding.Average}
        gap={CSSGap.Small}
      >
        <FilterPanelComponent />
        <ReviewsListComponent />
      </Stack>
    </PageWrapperComponent>
  );
};
