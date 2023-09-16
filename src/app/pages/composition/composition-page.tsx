import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch } from "../../hooks";
import { getComposition } from "./store/slice";
import CompositionBlockComponent from "./components/composition-block";
import HeaderComponent from "../../components/header";
import ReviewFormComponent from "./components/review-form";
import { Container } from "@mui/system";
import { useState } from "react";
import PageWrapperComponent from "../../components/page-wrapper";

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
