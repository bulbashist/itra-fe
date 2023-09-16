import { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks";
import { Stack } from "@mui/system";
import { addTag, deleteTag } from "../../../../../../store/core-reducer";
import { Cancel } from "@mui/icons-material";
import { ITag } from "../../../../../../types";
import {
  CSSGap,
  CSSMargin,
  CSSPadding,
} from "../../../../../../styles/constants";
import { TagCloud } from "react-tagcloud";

export const TagsPanelComponent = () => {
  const dispatch = useAppDispatch();
  const [tags, setTags] = useState<ITag[]>([{ id: 1, name: "fbdbbr" }]);
  const currTag = useAppSelector((state) => state.core.tag);

  useEffect(() => {
    const getTags = async () => {
      const url = process.env.REACT_APP_SERVER + "/api/tags";
      try {
        const response = await axios.get<ITag[]>(url);
        setTags(response.data);
      } catch {}
    };

    getTags();
  }, []);

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between">
      <Box sx={{ cursor: "pointer" }}>
        <TagCloud
          tags={tags.map((tag) => ({ value: tag.name }))}
          maxSize={20}
          minSize={14}
          onClick={(selected: { value: string }) => {
            dispatch(addTag(tags.find((tag) => tag.name === selected.value)!));
          }}
        />
      </Box>
      {currTag ? (
        <Button
          variant="outlined"
          color="warning"
          sx={{ margin: CSSMargin.Tiny }}
        >
          <Typography marginRight={1}>{currTag.name}</Typography>
          <Cancel onClick={() => dispatch(deleteTag(currTag.id))} />
        </Button>
      ) : null}
    </Box>
  );
};
