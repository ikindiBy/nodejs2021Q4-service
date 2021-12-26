export interface IColumn {
  title: string;
  order?: number;
  id: string;
}

export interface IUserAPI {
  name: string;
  login: string;
  password: string;
}

export interface IUser extends IUserAPI {
  id: string;
}

export interface IUserApiResponse {
  name: string;
  login: string;
  id: string;
}

export interface IBoard {
  title: string;
  columns: IColumn[];
  id: string;
}

export interface IBoardAPI {
  title: string;
  columns?: IColumn[];
}

export interface ITask {
  id: string;
  title: string;
  order?: number;
  description?: string;
  userId?: string | null;
  boardId: string;
  columnId?: string;
}

export type ITaskAPI = Omit<ITask, "id">;

export interface IFastifyParams<T> {
  Params: T,
}

export interface IFastifyBody<T> {
  Body: T,
}
