import { Card, Grid, Stack, Typography } from "@mui/material";
import { CSSGap, CSSPadding } from "../../styles/constants";
import { useNavigate } from "react-router";
import { IReview } from "../../types";
import { Rating10 } from "../rating";
import TagButtonComponent from "../tag-button";

import defaultImg from "../../assets/default.png";

type Props = {
  review: IReview;
};

export const ReviewImgCard = ({ review }: Props) => {
  const navigate = useNavigate();

  return (
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
          <Rating10 value={review.avgRating} readOnly={true} />
        </Stack>
        <img
          src={review.previewImg ? review.previewImg : defaultImg}
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
            flexWrap="wrap"
          >
            {review.tags.map((tag) => (
              <TagButtonComponent tag={tag} key={tag.id} />
            ))}
          </Stack>
        </Grid>
      </Stack>
    </Card>
  );
};
