import { Box, Button, List, ListItem, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import ReactMarkdown from "react-markdown";
import { CSSGap, CSSMargin } from "../../../../styles/constants";
import { Link } from "react-router-dom";
import { Rating5 } from "../../../../components/rating";
import { changeRating } from "../../store/slice";
import { useTranslation } from "react-i18next";

type Props = {
  openModal: () => void;
};

export const CompositionBlockComponent = ({ openModal }: Props) => {
  const userId = useAppSelector((state) => state.core.id);
  const composition = useAppSelector((state) => state.composition);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  if (!composition) return <div>Not Found</div>;

  return (
    <Box margin={CSSMargin.Decent}>
      <Typography variant="h4">{composition.name}</Typography>
      <List>
        <Box>
          <Stack direction="row" gap={CSSGap.Tiny / 2}>
            <Typography color="GrayText">{t("word_author")}:</Typography>
            <Typography>{composition.author}</Typography>
          </Stack>
        </Box>
        <Stack direction="row" gap={CSSGap.Tiny}>
          <Rating5 value={composition.avgRating} readOnly />
        </Stack>
      </List>
      <ReactMarkdown>{composition.description}</ReactMarkdown>

      {userId ? (
        <List sx={{ marginTop: CSSMargin.Small }}>
          <Typography variant="h5">{t("mark_composition")}:</Typography>
          <Rating5
            value={composition.userRating}
            onChange={(_, value) =>
              dispatch(changeRating({ id: composition.id, score: value! }))
            }
          />
        </List>
      ) : null}

      <Box marginTop={CSSMargin.Large}>
        <Typography textAlign="left">
          {t("composition_card_reviews")}:
        </Typography>
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
          {t("composition_card_create_review")}
        </Button>
      ) : null}
    </Box>
  );
};
