import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { getReview } from "./store/slice";
import { useParams } from "react-router";
import ReviewCardComponent from "./components/review-card";
import { EditFormComponent } from "./components/edit-form/edit-form";
import NoPage from "../404";
import PageWrapperComponent from "../../components/page-wrapper";

export const ReviewPage = () => {
  const { isBeingEdited, review } = useAppSelector((state) => state.review);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getReview(+id));
    }
  }, [dispatch, id]);

  if (!review) return <NoPage />;

  return (
    <PageWrapperComponent>
      {isBeingEdited ? (
        <EditFormComponent />
      ) : (
        // <ReviewFormComponent closeModal={() => {}} />
        <ReviewCardComponent review={review} />
      )}
    </PageWrapperComponent>
  );
};
