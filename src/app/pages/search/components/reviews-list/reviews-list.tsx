import {
  Box,
  Button,
  Card,
  Grid,
  List,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { IReview } from "../../../../types";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { searchURL } from "../../../../constants/urls";

export const ReviewsListComponent = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const navigate = useNavigate();
  const searchText = useSearchParams()[0].get("search");
  // add filter aka compositions / review / etc

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
    <Box>
      <List sx={{ gap: 2, display: "flex", flexDirection: "column" }}>
        {reviews.map((review) => (
          <li key={review.id}>
            <Card
              variant="outlined"
              sx={{
                backgroundColor: "#dddddd",
                padding: "20px 100px",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/reviews/${review.id}`)}
            >
              <Stack spacing={2}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h4" align="left">
                    {review.title}
                  </Typography>
                  <Rating
                    value={review.avgRating / 2}
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
                  <p>{review.date}</p>
                  <Stack direction="row" sx={{ float: "right" }} gap={1}>
                    {review.tags.map((tag) => (
                      <Button variant="outlined" color="warning" key={tag.id}>
                        {tag.name}
                      </Button>
                    ))}
                  </Stack>
                </Grid>
              </Stack>
            </Card>
          </li>
        ))}
      </List>
    </Box>
  );
};
