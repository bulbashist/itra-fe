import { useEffect } from "react";
import { useParams } from "react-router";
import PageWrapperComponent from "app/components/page-wrapper";
import NoPage from "app/pages/404";
import { useAppDispatch, useAppSelector } from "app/hooks";
import ReviewFormComponent from "./components/review-form";
import ReviewCardComponent from "./components/review-card";
import { getReview, setEditingState } from "./store/slice";

export const ReviewPage = () => {
  const dispatch = useAppDispatch();
  const { isBeingEdited, review, loading } = useAppSelector(
    (state) => state.review
  );
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getReview(+id));
    }
  }, [dispatch, id]);

  if (!review || loading) return <NoPage />;

  return (
    <PageWrapperComponent>
      <ReviewFormComponent
        isOpen={isBeingEdited}
        close={() => dispatch(setEditingState(false))}
      />
      <ReviewCardComponent review={review} />
    </PageWrapperComponent>
  );
};
