import { ITag } from "../../types";

export type CreateReviewDto = {
  composition: {
    id: number;
  };
  previewImg: string;
  title: string;
  text: string;
  tags: ITag[];

  user?: {
    id: number;
  };
};
