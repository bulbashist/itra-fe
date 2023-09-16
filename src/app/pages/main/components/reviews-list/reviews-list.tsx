import {
  Card,
  Grid,
  List,
  Pagination,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../hooks";
import { IReview } from "../../../../types";
import { useNavigate } from "react-router";
import TagButtonComponent from "../../../../components/tag-button";
import { CSSGap, CSSMargin, CSSPadding } from "../../../../styles/constants";
import { reviewsURL } from "../../../../constants/urls";

export const ReviewsListComponent = () => {
  const filter = useAppSelector((state) => state.main.filter);
  const navigate = useNavigate();

  const tag = useAppSelector((state) => state.core.tag);

  const [reviews, setReviews] = useState<IReview[]>([]);
  const [page, setPage] = useState(1);

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
        <Typography align="center">
          No reviews are matched this criteria, try another one
        </Typography>
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
          <li key={review.id}>
            <Card
              variant="outlined"
              sx={{
                backgroundColor: "#dddddd",
                paddingX: CSSPadding.Large,
                paddingY: CSSPadding.Average,
                cursor: "pointer",
              }}
              onClick={() => navigate(`/reviews/${review.id}`)}
            >
              <Stack gap={CSSGap.Small}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  flexWrap="wrap"
                >
                  <Typography variant="h4" align="left">
                    {review.title}
                  </Typography>
                  <Rating
                    value={review.avgRating}
                    readOnly={true}
                    precision={0.5}
                  ></Rating>
                </Stack>
                <img
                  src={review.previewImg}
                  alt=""
                  height="200px"
                  style={{ width: "100%" }}
                />
                <Grid container justifyContent="space-between">
                  <p>{new Date(review.date).toLocaleString()}</p>
                  <Stack
                    direction="row"
                    sx={{ float: "right" }}
                    gap={CSSGap.Tiny}
                  >
                    {review.tags.map((tag) => (
                      <TagButtonComponent tag={tag} key={tag.id} />
                    ))}
                  </Stack>
                </Grid>
              </Stack>
            </Card>
          </li>
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
