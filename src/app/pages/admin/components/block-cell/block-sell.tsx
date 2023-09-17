import Slider from "@mui/material/Slider";
import { useAppDispatch } from "../../../../hooks";
import { changeUser } from "../../store/slice";
import { IUser } from "../../../../types";

type Props = {
  user: IUser;
};

export const BlockCellComponent = ({ user }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <Slider
      min={0}
      max={1}
      value={Number(user.isBlocked)}
      onChange={(_, value) => {
        dispatch(
          changeUser({
            id: user.id,
            dto: {
              isBlocked: Boolean(value),
            },
          })
        );
      }}
    />
  );
};
