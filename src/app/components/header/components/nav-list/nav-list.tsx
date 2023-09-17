import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { paths, protectedPaths } from "./paths";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../../hooks";

export const NavListComponent = () => {
  const isAdmin = useAppSelector((state) => state.core.isAdmin);
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
      {isAdmin
        ? protectedPaths.map((path, i) => (
            <Button key={i}>
              <Link to={path.url}>
                <Typography>{t(path.title)}</Typography>
              </Link>
            </Button>
          ))
        : null}
    </Stack>
  );
};
