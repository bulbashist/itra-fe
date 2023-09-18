import Stack from "@mui/material/Stack";

import FilterPanelComponent from "./components/filter-panel";
import ReviewsListComponent from "./components/reviews-list";
import { CSSGap, CSSPadding } from "../../styles/constants";
import PageWrapperComponent from "../../components/page-wrapper";

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
