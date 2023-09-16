export interface ITag {
  id: number;
  name: string;
}

export interface IReview {
  compositionName: string;
  text: string;
  previewImg?: string;
  avgRating: number;
  userRating: number;
  title: string;
  id: number;
  date: string;
  tags: ITag[];
  comments?: IComment[];
  isLiked?: boolean;
}

export interface IUser {
  id: number;
  login: string;
  password?: string;
  name: string;
  isAdmin: boolean;
  isBlocked: boolean;
  reviews?: IReview[];
}

export interface IComposition {
  id: number;
  name: string;
  description: string;
  author: string;
  avgRating: number;
  userRating: number | null;
  tag: ITag;
  reviews: IReview[];
}

export interface IComment {
  id: number;
  author: {
    id: number;
    name: string;
  };
  date: string;
  text: string;
}
