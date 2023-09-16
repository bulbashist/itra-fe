export interface IUser {
  id: number;
  login: string;
  password?: string;
  name: string;
  isAdmin: boolean;
  isBlocked: boolean;
  reviews: IReview[];
  likes?: number;
}

export interface IReview {
  text: string;
  avgRating: number;
  title: string;
  id: number;
  date: string;
  composition: IComposition;
}

export interface IComposition {
  id: number;
  name: string;
}
