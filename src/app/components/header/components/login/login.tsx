import {
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  Input,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { logInURL } from "../../../../constants/urls";
import { AuthModalComponent } from "./modal";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { Link } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import { signOut } from "../../../../store/core-reducer";

export const LoginComponent = () => {
  const { id, name: username } = useAppSelector((state) => state.core);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const [isDropBox, setIsDropbox] = useState(false);

  if (username)
    return (
      <Box position="relative">
        <Button onClick={() => setIsDropbox((ps) => !ps)}>
          <Typography color="black">{username}</Typography>
        </Button>
        {isDropBox ? (
          <Box
            width={100}
            position="absolute"
            right={0}
            top={40}
            borderRadius={5}
            color="white"
            sx={{ backgroundColor: "white" }}
            onClick={() => setIsDropbox(false)}
          >
            <Link to={`/users/${id}`}>
              <Button>{t("login_profile")}</Button>
            </Link>
            <Button onClick={() => dispatch(signOut())}>
              {t("login_signout")}
            </Button>
          </Box>
        ) : null}
      </Box>
    );

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setIsOpen(true)}
        sx={{ maxHeight: "36.5px" }}
      >
        {t("login_button")}
      </Button>
      <AuthModalComponent isOpen={isOpen} closeModal={() => setIsOpen(false)} />
    </>
  );
};
