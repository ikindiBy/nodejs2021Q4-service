export interface IColumn {
  title: string;
  order?: string;
  id: string;
}

export interface IUser {
  name: string;
  login: string;
  password: string;
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
  order: string;
  description?: string;
  userId: string;
  boardId: string;
  columnId: string;
}