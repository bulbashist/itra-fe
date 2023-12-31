import Send from "@mui/icons-material/Send";
import Avatar from "@mui/material/Avatar";
import Input from "@mui/material/Input";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { CSSMargin } from "app/styles/constants";
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
