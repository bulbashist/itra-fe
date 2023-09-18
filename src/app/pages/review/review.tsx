import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { getReview } from "./store/slice";
import { useParams } from "react-router";
import ReviewCardComponent from "./components/review-card";
import NoPage from "../404";
import { useState } from "react";
import PageWrapperComponent from "../../components/page-wrapper";
import ReviewFormComponent from "./components/review-form";

export const ReviewPage = () => {
  const { isBeingEdited, review } = useAppSelector((state) => state.review);
  const [isOpen, setIsOpen] = useState(false);
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
        // <EditFormComponent />

        <ReviewFormComponent closeModal={() => setIsOpen(false)} />
      ) : (
        <ReviewCardComponent review={review} />
      )}
    </PageWrapperComponent>
  );
};
