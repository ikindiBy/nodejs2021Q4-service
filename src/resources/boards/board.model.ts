import { v4 as uuid } from 'uuid';

import { IBoard, IColumn } from '../../interfaces';

class Board implements IBoard {
  title: string;
  columns: IColumn[];
  id: string;

  constructor({
    title,
    columns = [],
  }) {
    this.id = uuid();
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
