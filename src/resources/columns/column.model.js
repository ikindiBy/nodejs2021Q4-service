const { v4: uuid } = require('uuid');

class Column {
  constructor({
    title,
    order,
  } = {}) {
    this.id = uuid();
    this.order = order;
    this.title = title;
  }
}

module.exports = Column;
