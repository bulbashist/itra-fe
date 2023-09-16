import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  List,
  ListItem,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../../../hooks";
import { IComposition } from "../../../../types";
import ReactMarkdown from "react-markdown";
import { CSSMargin } from "../../../../styles/constants";
import { Link } from "react-router-dom";

type Props = {
  openModal: () => void;
};

export const CompositionBlockComponent = ({ openModal }: Props) => {
  const [isOpen, setisOpen] = useState(false);
  const userId = useAppSelector((state) => state.core.id);
  const composition = useAppSelector((state) => state.composition);

  if (!composition) return <div>Not Found</div>;

  return (
    <Box margin={CSSMargin.Decent}>
      <Typography variant="h4">{composition.name}</Typography>
      <List>
        <Box>
          <Stack direction="row" gap={0.5}>
            <Typography color="GrayText">Автор:</Typography>
            <Typography>{composition.author}</Typography>
          </Stack>
        </Box>
        <Stack direction="row" gap={1}>
          <Rating value={composition.avgRating} readOnly />
        </Stack>
      </List>
      <ReactMarkdown>{composition.description}</ReactMarkdown>

      <List sx={{ marginTop: CSSMargin.Small }}>
        <Typography variant="h5">Оцените произведение:</Typography>
        <Rating value={composition.userRating} />
      </List>

      <Box marginTop={CSSMargin.Large}>
        <Typography textAlign="left">Похожие отзывы:</Typography>
        <List>
          {composition.reviews.map((review) => (
            <ListItem key={review.id}>
              <Link to={`/reviews/${review.id}`}>
                <Typography>{review.title}</Typography>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
      {userId ? (
        <Button onClick={() => openModal()} fullWidth>
          Написать отзыв
        </Button>
      ) : null}
    </Box>
  );
};
