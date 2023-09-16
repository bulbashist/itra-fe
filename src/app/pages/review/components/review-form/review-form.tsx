import { Button, Dialog, DialogTitle, Input, Stack } from "@mui/material";
import { useState, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useForm } from "react-hook-form";

import { CSSGap, CSSPadding } from "../../../../styles/constants";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import Close from "@mui/icons-material/Close";
import { ITag } from "../../../../types";
import { ImageServer } from "./image-server";
import { uploadReview } from "../../../composition/store/slice";
import { GalleryComponent } from "./components/gallery/gallery";

import styles from "./styles.module.css";
import TagsPanelComponent from "./components/tags-panel";

type FormData = {
  title: string;
  text: string;
};

type Props = {
  closeModal: () => void;
};

export const ReviewFormComponent = ({ closeModal }: Props) => {
  const { id } = useAppSelector((state) => state.composition);

  const [previewImg, setPreviewImg] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const { handleSubmit, register } = useForm<FormData>();
  const dispatch = useAppDispatch();

  const imgServer = useRef(new ImageServer());

  const handleChange = async (f: File) => {
    const url = await imgServer.current.uploadImage(f);
    setPreviewImg(url);
    setImages((ps) => [...ps, url]);
  };

  const loadToGallery = async (f: File) => {
    const url = await imgServer.current.uploadImage(f);
    setImages((ps) => [...ps, url]);
  };

  const formHandler = (data: FormData) => {
    dispatch(uploadReview({ composition: { id }, ...data, previewImg, tags }));
    closeModal();
  };

  return (
    <Dialog open fullWidth={true} maxWidth={false}>
      <Close className={styles.closeBtn} onClick={closeModal} />
      <DialogTitle textAlign="center">Создание отзыва...</DialogTitle>
      <Stack direction="column" gap={CSSGap.Average} padding={CSSPadding.Small}>
        <form onSubmit={handleSubmit(formHandler)}>
          <Stack direction="column" gap={CSSGap.Small}>
            <Input
              placeholder="Enter your title"
              {...register("title")}
              sx={{ width: "300px", alignSelf: "center" }}
            />
            <Stack direction="row" gap={CSSGap.Small}>
              <FileUploader
                handleChange={handleChange}
                label="Upload a preview image here"
              />
              <FileUploader
                handleChange={loadToGallery}
                label="Upload an image here and get a markup annotation"
              />
            </Stack>
            <textarea
              rows={15}
              placeholder="Write your review text"
              {...register("text")}
            />
            <TagsPanelComponent tags={tags} setTags={setTags} />
            <Button type="submit" sx={{ alignSelf: "end" }}>
              Submit
            </Button>
          </Stack>
        </form>
        <GalleryComponent images={images} />
      </Stack>
    </Dialog>
  );
};
