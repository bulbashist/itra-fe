import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PageWrapperComponent from "app/components/page-wrapper";
import AddReviewForm from "app/components/utility/add-review-form";
import NoPage from "app/pages/404";
import { useAppDispatch, useAppSelector } from "app/hooks";
import CompositionBlockComponent from "./components/composition-block";
import { getComposition } from "./store/slice";
import styles from "app/styles/animations.module.css";

export const CompositionPage = () => {
  const { data, loading } = useAppSelector((state) => state.composition);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(getComposition(+id));
    }
  }, [id, dispatch]);

  if (loading) return <div className={styles.loading} />;
  if (!data) return <NoPage />;

  return (
    <PageWrapperComponent>
      <CompositionBlockComponent
        composition={data}
        openModal={() => setIsOpen(true)}
      />
      {isOpen && data ? (
        <AddReviewForm composition={data} closeModal={() => setIsOpen(false)} />
      ) : null}
    </PageWrapperComponent>
  );
};
