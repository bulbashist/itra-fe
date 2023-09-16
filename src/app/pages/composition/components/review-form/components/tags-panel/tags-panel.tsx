import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Cancel from "@mui/icons-material/Cancel";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { CSSGap, CSSMargin } from "../../../../../../styles/constants";
import { useAppSelector } from "../../../../../../hooks";
import { ITag } from "../../../../../../types";
import axios from "axios";
import { tagsURL } from "../../../../../../constants/urls";

type Props = {
  tags: ITag[];
  setTags: Dispatch<SetStateAction<ITag[]>>;
};

export const TagsPanelComponent = ({ tags, setTags }: Props) => {
  const compTag = useAppSelector((state) => state.composition.tag);

  const [hints, setHints] = useState<ITag[]>([]);

  useEffect(() => {
    axios
      .get(tagsURL)
      .then((resp) => setHints(resp.data))
      .catch(console.error);
  }, []);

  const tagSelectionHandler = (_: unknown, value: string | null) => {
    if (value) {
      const hint = hints.find((hint) => hint.name === value)!;
      if (hint.id !== compTag.id && !tags.find((tag) => tag.id === hint.id)) {
        setTags((ps) => [...ps, hint]);
      }
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="right"
      gap={CSSGap.Small}
      alignItems="center"
    >
      <Stack direction="row" gap={CSSGap.Small} flexWrap="wrap">
        <Button variant="outlined" color="warning" key={compTag.id}>
          <Typography marginRight={CSSMargin.Tiny}>{compTag.name}</Typography>
        </Button>
        {tags.map((tag) => (
          <Button variant="outlined" color="warning" key={tag.id}>
            <Typography marginRight={CSSMargin.Tiny}>{tag.name}</Typography>
            <Cancel
              onClick={() =>
                setTags((ps) => ps.filter((dTag) => dTag.id !== tag.id))
              }
            />
          </Button>
        ))}
      </Stack>
      <Autocomplete
        options={hints.map((hint) => hint.name)}
        sx={{ width: "400px" }}
        //@ts-ignore
        renderInput={(params) => <TextField {...params}></TextField>}
        autoComplete={true}
        onChange={tagSelectionHandler}
      />
    </Stack>
  );
};
