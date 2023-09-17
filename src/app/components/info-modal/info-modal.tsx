import { Dialog, Typography } from "@mui/material";

type Props = {
  text: string;
};

export const InfoModalComponent = ({ text }: Props) => {
  return (
    <Dialog open>
      <Typography>{text}</Typography>
    </Dialog>
  );
};
