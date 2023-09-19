import { Avatar, Box, List, ListItem, Stack, Typography } from "@mui/material";
import { IComment } from "app/types";
import { CSSBorder, CSSMargin, CSSPadding } from "app/styles/constants";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { useEffect } from "react";
import { connection } from "./services/ws-connection";
import { useParams } from "react-router";
import { useAppSelector } from "app/hooks";
import CommentInputComponent from "./components/input";
import { useTranslation } from "react-i18next";

type Props = {
  comments: IComment[];
};

export const CommentBlockComponent = ({ comments }: Props) => {
  const { id: reviewId } = useParams();
  const { id: userId, isAdmin } = useAppSelector((state) => state.core);
  const { t } = useTranslation();

  useEffect(() => {
    connection.connect(process.env.REACT_APP_WS_SERVER!);

    return () => connection.close();
  }, []);

  return (
    <Box padding={CSSPadding.Average}>
      <Typography align="left" borderBottom={CSSBorder.Tiny}>
        {t("word_comments")}
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
              <Box position="absolute" top={8} right={8}>
                <DeleteForever
                  onClick={() => connection.deleteComment(comment.id)}
                />
              </Box>
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
