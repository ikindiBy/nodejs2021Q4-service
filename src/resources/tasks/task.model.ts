import { v4 as uuid } from 'uuid';
import { ITask, ITaskAPI } from '../../interfaces';

class Task implements ITask {
  title: string;

  userId?: string | null;

  boardId: string;

  columnId?: string;

  id: string;

  order?: number;

  description?: string;
 
  constructor({
    title,
    userId,
    boardId,
    columnId,
    order,
    description,
  }: ITaskAPI) {
    this.id = uuid();
    this.title = title;
    this.userId = userId || null;
    this.boardId = boardId;
    this.columnId = columnId;
    this.order = order || 0;
    this.description = description;
  }
}

export default Task;
