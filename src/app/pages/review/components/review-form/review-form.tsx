import { Button, Dialog, DialogTitle, Grid, Input, Stack } from "@mui/material";
import { useState, useRef } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useForm } from "react-hook-form";

import { CSSGap, CSSPadding } from "../../../../styles/constants";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import Close from "@mui/icons-material/Close";
import { ITag } from "../../../../types";
import { ImageServer } from "./image-server";
//@ts-ignore
import { changeReview, setEditingState, uploadReview } from "../../store/slice";
import { GalleryComponent } from "./components/gallery/gallery";

import styles from "./styles.module.css";
import TagsPanelComponent from "./components/tags-panel";
import { Theme } from "../../../../themes/types";
import { useTranslation } from "react-i18next";

type FormData = {
  title: string;
  text: string;
};

type Props = {
  closeModal: () => void;
};

export const ReviewFormComponent = ({ closeModal }: Props) => {
  const theme = useAppSelector((state) => state.core.theme);
  const review = useAppSelector((state) => state.review.review);

  const [tags, setTags] = useState<ITag[]>(review?.tags ?? []);
  const [images, setImages] = useState<string[]>([]);

  const { handleSubmit, register } = useForm<FormData>();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const imgServer = useRef(new ImageServer());

  if (!review) return null;

  const loadToGallery = async (f: File) => {
    const url = await imgServer.current.uploadImage(f);
    setImages((ps) => [...ps, url]);
  };

  const formHandler = (data: FormData) => {
    dispatch(changeReview({ id: review.id, ...data, tags }));
    closeModal();
  };

  return (
    <Dialog open fullWidth={true} maxWidth={false}>
      <Close
        className={styles.closeBtn}
        onClick={() => dispatch(setEditingState(false))}
      />
      <DialogTitle textAlign="center">
        {t("review_update_form_title")}
      </DialogTitle>
      <Stack direction="column" gap={CSSGap.Average} padding={CSSPadding.Small}>
        <form onSubmit={handleSubmit(formHandler)}>
          <Stack direction="column" gap={CSSGap.Small}>
            <Input
              defaultValue={review.title}
              placeholder={t("review_form_title_ph")}
              {...register("title")}
              sx={{ width: "300px", alignSelf: "center" }}
            />

            <FileUploader
              handleChange={loadToGallery}
              label={t("review_form_img_markup_ph")}
            />
            <textarea
              rows={15}
              defaultValue={review.text}
              style={{
                backgroundColor: theme === Theme.Light ? "white" : "black",
                color: theme === Theme.Light ? "black" : "white",
              }}
              placeholder={t("review_form_text_ph")}
              {...register("text")}
            />
            <TagsPanelComponent tags={tags} setTags={setTags} />
            <Button type="submit" sx={{ alignSelf: "end" }}>
              {t("word_submit")}
            </Button>
          </Stack>
        </form>
        <GalleryComponent images={images} />
      </Stack>
    </Dialog>
  );
};
