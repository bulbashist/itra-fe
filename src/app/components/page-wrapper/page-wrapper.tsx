import { Card, Container } from "@mui/material";
import HeaderComponent from "../header";
import { CSSPadding } from "../../styles/constants";

export const PageWrapperComponent = ({ children }: any) => {
  return (
    <>
      <HeaderComponent />
      <Container>
        <Card sx={{ backgroundColor: "whitesmoke" }}>{children}</Card>
      </Container>
    </>
  );
};
