import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { logInURL, signUpURL } from "../../../../constants/urls";
import { useState } from "react";
import { useAppDispatch } from "../../../../hooks";
import { getUserData } from "../../../../store/core-reducer";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

export const AuthModalComponent = ({ isOpen, closeModal }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const authorize = (url: string) => {
    axios
      .post(
        url,
        {
          login,
          password,
        },
        { withCredentials: true }
      )
      .then(() => dispatch(getUserData()))
      .catch(console.error);
  };

  const signUp = () => authorize(signUpURL);
  const logIn = () => authorize(logInURL);

  return (
    <Dialog open={isOpen} onClick={closeModal}>
      <Container onClick={(e) => e.stopPropagation()}>
        <DialogTitle align="center"></DialogTitle>
        <Stack direction="column" alignItems="center" spacing={2}>
          <Input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder={t("login_popup_email")}
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("login_popup_password")}
          />
          <Button onClick={logIn}>Log in</Button>
          <Container sx={{ margin: 0, padding: 2 }}>
            <Stack alignItems="center" sx={{}} spacing={1}>
              <Typography variant="subtitle2">
                {t("login_popup_socials")}
              </Typography>
              <Button
                variant="outlined"
                fullWidth={true}
                onClick={() => {
                  window.location.href =
                    "http://localhost:4000/auth/login-google";
                }}
              >
                {t("login_popup_google")}
              </Button>
              <Button
                variant="outlined"
                fullWidth={true}
                onClick={() => {
                  window.location.href =
                    "http://localhost:4000/auth/login-github";
                }}
              >
                {t("login_popup_github")}
              </Button>
              <Button variant="outlined" fullWidth={true} onClick={signUp}>
                {t("login_popup_signin")}
              </Button>
            </Stack>
          </Container>
        </Stack>
      </Container>
    </Dialog>
  );
};
