import PageWrapperComponent from "../../components/page-wrapper";
import ReviewsListComponent from "./components/reviews-list";

export const SearchPage = () => {
  return (
    <PageWrapperComponent>
      <ReviewsListComponent />
    </PageWrapperComponent>
  );
};
