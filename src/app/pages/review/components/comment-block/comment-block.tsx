import {
  Avatar,
  Box,
  Container,
  Input,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { IComment } from "../../../../types";
import { CSSMargin, CSSPadding } from "../../../../styles/constants";
import { DeleteForever, EditNote, Send } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { connection } from "./services/ws-connection";
import { WSEvents } from "./services/types";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../../../hooks";
import CommentInputComponent from "./components/input";
import { Link } from "react-router-dom";

type Props = {
  comments: IComment[];
};

export const CommentBlockComponent = ({ comments }: Props) => {
  const { id: reviewId } = useParams();
  const { id: userId, isAdmin } = useAppSelector((state) => state.core);

  const [text, setText] = useState("");

  useEffect(() => {
    connection.connect("ws://localhost:4000");

    return () => connection.close();
  }, []);

  return (
    <Box padding="20px 20px">
      <Typography align="left" borderBottom={1}>
        Комментарии
      </Typography>
      <List>
        {comments.map((comment) => (
          <Stack key={comment.id} direction="column" position="relative">
            <ListItem>
              <Avatar sx={{ marginRight: CSSMargin.Small }} />
              <List>
                <Typography variant="subtitle2">
                  {comment.author.name}
                </Typography>
                <Typography variant="subtitle2">
                  {new Date(comment.date).toDateString()}
                </Typography>
              </List>
            </ListItem>
            <Typography align="left" sx={{ marginLeft: CSSMargin.Large }}>
              {comment.text}
            </Typography>
            {userId === comment.author.id || isAdmin ? (
              <DeleteForever
                sx={{
                  position: "absolute",
                  right: CSSPadding.Tiny * 8,
                  top: CSSPadding.Tiny * 8,
                }}
                onClick={() => connection.deleteComment(comment.id)}
              />
            ) : null}
          </Stack>
        ))}
        {userId ? (
          <CommentInputComponent reviewId={+reviewId!} userId={userId} />
        ) : null}
      </List>
    </Box>
  );
};
