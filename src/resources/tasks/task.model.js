const { v4: uuid } = require('uuid');

class Task {
  constructor({
    boardId,
    columnId,
    title,
    order,
    description,
    userId,
  } = {}) {
    this.id = uuid();
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;