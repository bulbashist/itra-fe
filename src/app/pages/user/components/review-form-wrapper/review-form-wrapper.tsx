import axios from "axios";
import { useState, useEffect } from "react";
import AddReviewForm from "app/components/utility/add-review-form";
import { IComposition } from "app/types";
import { compositionsURL } from "app/constants/urls";

type Props = {
  compId: number;
  userId: number;
  closeModal: () => void;
};

export const ReviewFormWrapper = ({ compId, userId, closeModal }: Props) => {
  const [composition, setComposition] = useState<IComposition | null>(null);

  useEffect(() => {
    axios
      .get(compositionsURL + compId)
      .then((resp) => setComposition(resp.data))
      .catch(console.error);
  });

  if (!composition) return null;

  return (
    <AddReviewForm
      composition={composition}
      userId={userId}
      closeModal={closeModal}
    />
  );
};
