import { Box, Button, Dialog, Input, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next";
import {
  githubUrl,
  googleUrl,
  logInURL,
  signUpURL,
} from "../../../../constants/urls";
import { useState } from "react";
import { useAppDispatch } from "../../../../hooks";
import { getUserData } from "../../../../store/core-reducer";
import { CSSGap, CSSPadding } from "../../../../styles/constants";
import bcrypt from "bcryptjs";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

export const AuthModalComponent = ({ isOpen, closeModal }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const authorize = async (url: string) => {
    const hash = await bcrypt.hash(password, "$2a$10$jbODcXj6GS/Bc5rtxKmqne");
    axios
      .post(
        url,
        {
          login,
          password: hash,
        },
        { withCredentials: true }
      )
      .then(() => dispatch(getUserData()))
      .catch((e) => setError(e.response.data.message));
  };

  const signUp = () => authorize(signUpURL);
  const logIn = () => authorize(logInURL);

  return (
    <Dialog open={isOpen} onClick={closeModal}>
      <Box padding={CSSPadding.Average} onClick={(e) => e.stopPropagation()}>
        <Stack direction="column" alignItems="center" gap={CSSGap.Small}>
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
          <Button onClick={logIn}>{t("login_button")}</Button>
        </Stack>
        <Typography color="red" textAlign="center">
          {error}
        </Typography>
        <Box padding={CSSPadding.Small}>
          <Stack alignItems="center" spacing={1}>
            <Typography variant="subtitle2">
              {t("login_popup_socials")}
            </Typography>
            <Button
              variant="outlined"
              fullWidth={true}
              onClick={() => {
                window.location.href = googleUrl;
              }}
            >
              {t("login_popup_google")}
            </Button>
            <Button
              variant="outlined"
              fullWidth={true}
              onClick={() => {
                window.location.href = githubUrl;
              }}
            >
              {t("login_popup_github")}
            </Button>
            <Button variant="outlined" fullWidth={true} onClick={signUp}>
              {t("login_popup_signin")}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Dialog>
  );
};
