import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getUserData } from "./store/slice";
import ReviewsListComponent from "./components/reviews-list";
import { CSSGap, CSSMargin } from "../../styles/constants";
import { ThumbUp } from "@mui/icons-material";
import NoPage from "../404";
import PageWrapperComponent from "../../components/page-wrapper";

export const UserPage = () => {
  const user = useAppSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserData(+id!));
  }, [id, dispatch]);

  if (!user) return <NoPage />;

  return (
    <PageWrapperComponent>
      <Stack direction="column" gap={CSSGap.Average} margin={CSSMargin.Average}>
        <Stack
          direction="row"
          alignSelf="end"
          alignItems="center"
          marginRight={CSSMargin.Average}
        >
          <Typography variant="h5">{user.likes}</Typography>
          <ThumbUp color="success" />
          <Typography variant="h5" marginLeft={CSSMargin.Decent}>
            {user.name}
          </Typography>
        </Stack>
        <ReviewsListComponent />
      </Stack>
    </PageWrapperComponent>
  );
};
