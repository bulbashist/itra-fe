import { Send } from "@mui/icons-material";
import { Avatar, Input, ListItem, Stack } from "@mui/material";
import { CSSMargin } from "../../../../../../styles/constants";
import { useState } from "react";
import { connection } from "../../services/ws-connection";

type Props = {
  userId: number;
  reviewId: number;
};

export const CommentInputComponent = ({ userId, reviewId }: Props) => {
  const [text, setText] = useState("");

  return (
    <Stack direction="row">
      <ListItem sx={{ marginTop: CSSMargin.Small }}>
        <Avatar sx={{ marginRight: CSSMargin.Small }} />
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
        />
        <Send
          onClick={() => {
            connection.addComment({
              review: reviewId,
              text,
              user: userId,
            });
          }}
        />
      </ListItem>
    </Stack>
  );
};
