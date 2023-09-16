import {
  Box,
  Button,
  Card,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IComposition, IReview } from "../../../../types";
import {
  compositionsURL,
  getReviewsURL,
  reviewsURL,
} from "../../../../constants/urls";
import axios from "axios";
import {
  CSSGap,
  CSSMargin,
  CSSPadding,
  FontWeight,
} from "../../../../styles/constants";
import ReviewRatingComponent from "../../../../components/review-rating";
import { Preview } from "../../types";
import TagButtonComponent from "../../../../components/tag-button";
import { Link } from "react-router-dom";

export const CompositionsListComponent = () => {
  const [compositions, setCompositions] = useState<IComposition[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get(compositionsURL + `?page=${page}`)
      .then((resp) => setCompositions(resp.data))
      .catch(console.error);
  }, [page]);

  return (
    <Stack direction="column" gap={CSSGap.Average} margin={CSSMargin.Average}>
      <Grid container gap={CSSGap.Decent} columns={13}>
        {compositions.map((composition) => (
          <Grid item key={composition.id} xs={12} sm={6} lg={4}>
            <Link to={`/compositions/${composition.id}`}>
              <Card
                sx={{
                  height: "200px",
                  padding: CSSPadding.Tiny,
                  position: "relative",
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={FontWeight.Bold}
                  marginBottom={CSSMargin.Small}
                >
                  {composition.name}
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography textAlign="left">
                    Автор: {composition.author}
                  </Typography>
                  <Box sx={{ float: "right" }}>
                    <ReviewRatingComponent rating={composition.avgRating} />
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  gap={CSSGap.Tiny}
                  sx={{
                    position: "absolute",
                    bottom: CSSPadding.Tiny * 8,
                    right: CSSPadding.Tiny * 8,
                  }}
                >
                  <TagButtonComponent tag={composition.tag} />
                </Stack>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Pagination
        sx={{ alignSelf: "end" }}
        page={page}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 0);
        }}
        count={10}
      />
    </Stack>
  );
};
