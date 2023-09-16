import { IUser } from "../../types";

export type ChangeIUserDTO = Partial<Omit<IUser, "id">>;
