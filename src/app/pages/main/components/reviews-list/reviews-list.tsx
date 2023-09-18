import { List, Pagination, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../hooks";
import { IReview } from "../../../../types";
import { CSSGap, CSSMargin } from "../../../../styles/constants";
import { reviewsURL } from "../../../../constants/urls";
import ReviewImgCard from "../../../../components/review-img-card";
import { useTranslation } from "react-i18next";

export const ReviewsListComponent = () => {
  const filter = useAppSelector((state) => state.main.filter);
  const tag = useAppSelector((state) => state.core.tag);

  const [reviews, setReviews] = useState<IReview[]>([]);
  const [page, setPage] = useState(1);

  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(
        reviewsURL + filter + `?page=${page}` + (tag ? `&tag=${tag?.id}` : "")
      )
      .then((resp) => setReviews(resp.data))
      .catch(console.error);
  }, [filter, page, tag]);

  if (reviews.length === 0)
    return (
      <Stack
        marginY={CSSMargin.Average}
        sx={{ width: "100%" }}
        gap={CSSGap.Small}
      >
        <Typography align="center">{t("no_reviews")}</Typography>
        <Pagination
          sx={{ alignSelf: "end" }}
          page={page}
          count={10}
          onChange={(_, page) => {
            window.scrollTo(0, 0);
            setPage(page);
          }}
        />
      </Stack>
    );

  return (
    <Stack direction="column" sx={{ width: "100%" }}>
      <List
        sx={{ gap: CSSGap.Small, display: "flex", flexDirection: "column" }}
      >
        {reviews.map((review) => (
          <ReviewImgCard key={review.id} review={review} />
        ))}
      </List>
      <Pagination
        sx={{ alignSelf: "end" }}
        page={page}
        count={10}
        onChange={(_, page) => {
          window.scrollTo(0, 0);
          setPage(page);
        }}
      />
    </Stack>
  );
};
