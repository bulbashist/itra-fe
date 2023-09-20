import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ThumbUp from "@mui/icons-material/ThumbUp";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoPage from "app/pages/404";
import PageWrapperComponent from "app/components/page-wrapper";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { CSSGap, CSSMargin, FontSize } from "app/styles/constants";
import ReviewsListComponent from "./components/reviews-list";
import ReviewFormWrapper from "./components/review-form-wrapper";
import AdminPanel from "./components/admin-panel";
import { getUserData } from "./store/slice";

export const UserPage = () => {
  const isAdmin = useAppSelector((state) => state.core.isAdmin);
  const user = useAppSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);
  const [compId, setCompId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getUserData(+id!));
  }, [id, dispatch]);

  if (!user) return <NoPage />;

  return (
    <PageWrapperComponent>
      <Stack direction="column" gap={CSSGap.Average} margin={CSSMargin.Average}>
        <Stack
          direction="row-reverse"
          justifyContent="space-between"
          alignItems="center"
          marginX={CSSMargin.Small}
          flexWrap="wrap"
          gap={CSSGap.Average}
        >
          {isAdmin ? (
            <AdminPanel
              compId={compId}
              setCompId={setCompId}
              setModal={setModal}
            />
          ) : null}
          <Stack direction="row">
            <Typography variant="h5" marginRight={CSSMargin.Average}>
              {user.name}
            </Typography>
            {user.likes ? (
              <>
                <Typography fontSize={FontSize.Large}>
                  {user.likes}
                  <ThumbUp
                    color="success"
                    sx={{ position: "relative", top: 3 }}
                  />
                </Typography>
              </>
            ) : null}
          </Stack>
        </Stack>
        <ReviewsListComponent />

        {modal && compId ? (
          <ReviewFormWrapper
            closeModal={() => setModal(false)}
            compId={compId}
            userId={user.id}
          />
        ) : null}
      </Stack>
    </PageWrapperComponent>
  );
};
