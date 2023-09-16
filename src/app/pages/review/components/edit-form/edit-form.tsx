import {
  Autocomplete,
  Button,
  Card,
  FormControl,
  Input,
  Stack,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { changeReview, setEditingState } from "../../store/slice";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type FormData = {
  title: string;
  text: string;
};

export const EditFormComponent = () => {
  const review = useAppSelector((state) => state.review.review);
  const [tags, setTags] = useState(review.tags);
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    dispatch(
      changeReview({
        id: review.id,
        title: data.title,
        text: data.text,
        tags,
      })
    );
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <form> */}
        <Input defaultValue={review.title} {...register("title")} />
        <textarea
          defaultValue={review.text}
          style={{ width: "100%" }}
          {...register("text")}
          rows={15}
        ></textarea>
        <Autocomplete
          options={[]}
          //@ts-ignore
          renderInput={(params) => <TextField {...params}></TextField>}
        ></Autocomplete>
        <Stack direction="row">
          <Button onClick={() => dispatch(setEditingState(false))}>
            Cancel
          </Button>
          <Button type="submit">Sumbit</Button>
        </Stack>
      </form>
    </Card>
  );
};
