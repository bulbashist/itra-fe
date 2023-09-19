import { useEffect, useState } from "react";
import { useParams } from "react-router";

import PageWrapperComponent from "app/components/page-wrapper";
import { useAppDispatch } from "app/hooks";

import CompositionBlockComponent from "./components/composition-block";
import ReviewFormComponent from "./components/review-form";
import { getComposition } from "./store/slice";

export const CompositionPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getComposition(+id));
    }
  }, [id, dispatch]);

  return (
    <PageWrapperComponent>
      <CompositionBlockComponent openModal={() => setIsOpen(true)} />
      {isOpen ? (
        <ReviewFormComponent closeModal={() => setIsOpen(false)} />
      ) : null}
    </PageWrapperComponent>
  );
};
