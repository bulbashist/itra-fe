import { Box, List } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { IReview } from "../../../../types";

import { useSearchParams } from "react-router-dom";
import { searchURL } from "../../../../constants/urls";
import { CSSGap, CSSPadding } from "../../../../styles/constants";
import ReviewImgCard from "../../../../components/review-img-card";

export const ReviewsListComponent = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const searchText = useSearchParams()[0].get("search");

  useEffect(() => {
    if (searchText) {
      const url = searchURL + `?text=${searchText}`;
      axios
        .get(url)
        .then((resp) => setReviews(resp.data))
        .catch(console.error);
    }
  }, [searchText]);

  return (
    <Box padding={CSSPadding.Average}>
      <List sx={{ gap: CSSGap.Small }}>
        {reviews.map((review) => (
          <ReviewImgCard key={review.id} review={review} />
        ))}
      </List>
    </Box>
  );
};
