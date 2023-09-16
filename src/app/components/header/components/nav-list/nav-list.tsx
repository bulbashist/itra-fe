import { Button, Stack, Typography } from "@mui/material";
import { paths } from "./paths";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const NavListComponent = () => {
  const { t } = useTranslation();

  return (
    <Stack direction="row">
      {paths.map((path, i) => (
        <Button key={i}>
          <Link to={path.url}>
            <Typography>{t(path.title)}</Typography>
          </Link>
        </Button>
      ))}
    </Stack>
  );
};
