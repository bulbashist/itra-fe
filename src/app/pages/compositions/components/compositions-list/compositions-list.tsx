import { Box, Card, Grid, Pagination, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { IComposition } from "../../../../types";
import { compositionsURL } from "../../../../constants/urls";
import axios from "axios";
import {
  CSSGap,
  CSSMargin,
  CSSPadding,
  FontWeight,
} from "../../../../styles/constants";
import TagButtonComponent from "../../../../components/tag-button";
import { Link } from "react-router-dom";
import { Rating5 } from "../../../../components/rating";
import { useTranslation } from "react-i18next";

export const CompositionsListComponent = () => {
  const [compositions, setCompositions] = useState<IComposition[]>([]);
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get(compositionsURL + `?page=${page}`)
      .then((resp) => setCompositions(resp.data))
      .catch(console.error);
  }, [page]);

  return (
    <Stack direction="column" gap={CSSGap.Average} margin={CSSMargin.Average}>
      <Grid container gap={CSSGap.Decent} columns={13}>
        {compositions.map((composition) => (
          <Grid item key={composition.id} xs={12} sm={6} lg={4}>
            <Link to={`/compositions/${composition.id}`}>
              <Card
                sx={{
                  height: "200px",
                  padding: CSSPadding.Tiny,
                  position: "relative",
                }}
                raised
              >
                <Typography
                  variant="h6"
                  fontWeight={FontWeight.Bold}
                  marginBottom={CSSMargin.Small}
                >
                  {composition.name}
                </Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography textAlign="left">
                    {t("word_author")}: {composition.author}
                  </Typography>
                  <Box sx={{ float: "right" }}>
                    <Typography textAlign="right">
                      {t("word_rating")}:
                    </Typography>
                    <Rating5 value={composition.avgRating} />
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  gap={CSSGap.Tiny}
                  sx={{
                    position: "absolute",
                    bottom: CSSPadding.Tiny * 8,
                    right: CSSPadding.Tiny * 8,
                  }}
                >
                  <TagButtonComponent tag={composition.tag} />
                </Stack>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      <Pagination
        sx={{ alignSelf: "end" }}
        page={page}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 0);
        }}
        count={10}
      />
    </Stack>
  );
};
