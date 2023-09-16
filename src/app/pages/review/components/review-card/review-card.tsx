import {
  Avatar,
  Box,
  Card,
  List,
  ListItem,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { CommentBlockComponent } from "../comment-block/comment-block";
import {
  DeleteForever,
  EditNote,
  ThumbDown,
  ThumbUp,
} from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import { IReview } from "../../../../types";
import { CSSGap, CSSMargin, CSSPadding } from "../../../../styles/constants";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { deleteReview, setEditingState } from "../../store/slice";
import ReviewRatingComponent from "../../../../components/review-rating";
import { Link, useNavigate } from "react-router-dom";
import { changeLike, changeRating } from "../../store/reviews/thunks";
import { useEffect, useRef } from "react";

type Props = {
  review: IReview | any;
};

export const ReviewCardComponent = ({ review }: Props) => {
  const { id: userId, isAdmin } = useAppSelector((state) => state.core);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!review) return null;

  return (
    <Card sx={{ padding: CSSPadding.Decent, position: "relative" }}>
      {userId === review.author.id || isAdmin ? (
        <Stack
          direction="row"
          position="absolute"
          right={CSSPadding.Tiny * 8}
          top={CSSPadding.Tiny * 8}
        >
          <EditNote onClick={() => dispatch(setEditingState(true))} />
          <DeleteForever
            onClick={() => {
              dispatch(deleteReview(review.id));
              navigate("/");
            }}
          />
        </Stack>
      ) : null}
      <Typography variant="h4">{review.title}</Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <ListItem>
          <Avatar sx={{ marginRight: CSSMargin.Small }} />
          <List>
            <Typography variant="subtitle2">{review.author.name}</Typography>
            <Typography variant="subtitle2">
              {new Date(review.date).toDateString()}
            </Typography>
          </List>
        </ListItem>
        {userId ? (
          <Box>
            <ThumbUp
              fontSize="large"
              color={review.isLiked ? "success" : "disabled"}
              onClick={() =>
                dispatch(
                  changeLike({ id: review.id, isLiked: !review.isLiked })
                )
              }
            />
          </Box>
        ) : null}
      </Stack>
      <ReactMarkdown>{review.text}</ReactMarkdown>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Stack direction="row" gap={CSSGap.Tiny / 2}>
            <Typography color="GrayText">Текст:</Typography>
            <Typography>{review.author.name}</Typography>
          </Stack>
          <Stack direction="row" gap={CSSGap.Tiny / 2}>
            <Typography color="GrayText">Произведение:</Typography>
            <Typography>{review.compositionName}</Typography>
          </Stack>
        </Box>
        <Stack direction="column" gap={CSSGap.Tiny / 2} alignItems="end">
          <Typography>Рейтинг:</Typography>
          <Rating value={review.avgRating / 2} precision={0.5} readOnly />
        </Stack>
      </Stack>
      {userId ? (
        <List sx={{ marginTop: CSSMargin.Small }}>
          <Typography variant="h5">Оцените отзыв:</Typography>
          <Rating
            value={review.userRating / 2}
            onChange={(_, value) => {
              if (value) {
                dispatch(
                  changeRating({ id: review.id, userRating: value * 2 })
                );
              }
            }}
          />
        </List>
      ) : null}
      <CommentBlockComponent comments={review.comments} />
    </Card>
  );
};
