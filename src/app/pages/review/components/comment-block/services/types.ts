export enum WSEvents {
  AddComment = "createComment",
  RemoveComment = "removeComment",
}

export type CreateCommentDto = {
  user: number;
  review: number;
  text: string;
};

export type RemoveCommentDto = {
  id: number;
};
