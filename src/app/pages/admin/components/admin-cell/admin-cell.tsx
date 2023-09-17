import { Slider, Typography } from "@mui/material";
import { useAppDispatch } from "../../../../hooks";
import { changeUser } from "../../store/slice";
import { IUser } from "../../../../types";
import { useTranslation } from "react-i18next";

type Props = {
  user: IUser;
};

export const AdminCellComponent = ({ user }: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return !user.isAdmin ? (
    <Slider
      min={0}
      max={1}
      value={Number(user.isAdmin)}
      onChange={(_, value) => {
        dispatch(
          changeUser({
            id: user.id,
            dto: { isAdmin: Boolean(value) },
          })
        );
      }}
    />
  ) : (
    <Typography>{t("admin_admin")}</Typography>
  );
};
