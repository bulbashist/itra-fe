import {
  Avatar,
  Box,
  Card,
  Container,
  List,
  ListItem,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { CommentBlockComponent } from "./components/comment-block/comment-block";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { EditNote, ThumbDown, ThumbUp } from "@mui/icons-material";
import { useEffect } from "react";
import { getReview } from "./store/slice";
import { useParams } from "react-router";
import { CSSPadding } from "../../styles/constants";
import HeaderComponent from "../../components/header";
import ReviewCardComponent from "./components/review-card";
import { EditFormComponent } from "./components/edit-form/edit-form";
import NoPage from "../404";
import ReviewFormComponent from "./components/review-form";
import PageWrapperComponent from "../../components/page-wrapper";

export const ReviewPage = () => {
  const { isBeingEdited, review } = useAppSelector((state) => state.review);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getReview(+id));
    }
  }, [dispatch, id]);

  if (!review) return <NoPage />;

  return (
    <PageWrapperComponent>
      {isBeingEdited ? (
        // <EditFormComponent />
        <ReviewFormComponent closeModal={() => {}} />
      ) : (
        <ReviewCardComponent review={review} />
      )}
    </PageWrapperComponent>
  );
};
