import {
  Avatar,
  Box,
  Card,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { CommentBlockComponent } from "../comment-block/comment-block";
import { DeleteForever, EditNote, ThumbUp } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import { IReview } from "../../../../types";
import { CSSGap, CSSMargin, CSSPadding } from "../../../../styles/constants";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { deleteReview, setEditingState } from "../../store/slice";
import { useNavigate } from "react-router-dom";
import { changeLike, changeRating } from "../../store/reviews/thunks";
import { Rating10 } from "../../../../components/rating";
import { useTranslation } from "react-i18next";

type Props = {
  review: IReview | any;
};

export const ReviewCardComponent = ({ review }: Props) => {
  const { id: userId, isAdmin } = useAppSelector((state) => state.core);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      <Box style={{ overflowX: "scroll" }}>
        <ReactMarkdown>{review.text}</ReactMarkdown>
      </Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Stack direction="row" gap={CSSGap.Tiny / 2}>
            <Typography color="GrayText">{t("review_card_text")}:</Typography>
            <Typography>{review.author.name}</Typography>
          </Stack>
          <Stack direction="row" gap={CSSGap.Tiny / 2}>
            <Typography color="GrayText" textAlign="left">
              {t("review_card_composition")}:
            </Typography>
            <Typography textAlign="left">{review.composition.name}</Typography>
          </Stack>
        </Box>
        <Stack direction="column" gap={CSSGap.Tiny / 2} alignItems="end">
          <Typography>{t("word_rating")}:</Typography>
          <Rating10 value={review.avgRating} readOnly={true} />
        </Stack>
      </Stack>
      {userId ? (
        <List sx={{ marginTop: CSSMargin.Small }}>
          <Typography variant="h5">{t("mark_review")}:</Typography>
          <Rating10
            value={review.userRating}
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
