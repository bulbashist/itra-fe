import { Stack, Typography } from "@mui/material";
import { CSSGap } from "../../../../../../styles/constants";

type Props = {
  images: string[];
};

export const GalleryComponent = ({ images }: Props) => {
  return (
    <Stack direction="column" gap={CSSGap.Small}>
      <Typography variant="h5" textAlign="center">
        Галерея
      </Typography>
      {images.length === 0 ? (
        <Typography textAlign="center">Пока изображений нету</Typography>
      ) : null}
      {images.map((url, i) => (
        <Stack
          key={i}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <img style={{ width: "50%" }} src={url} alt="img" />
          <Typography
            flexGrow={1}
            textAlign="center"
          >{`![image](${url})`}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};
