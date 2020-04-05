const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'Column', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

const defaultColumns = [
  new Column({ title: 'backlog', order: 0 }),
  new Column({ title: 'todo', order: 1 }),
  new Column({ title: 'in progress', order: 2 }),
  new Column({ title: 'review', order: 3 }),
  new Column({ title: 'done', order: 4 })
];

class Board {
  constructor({
    id = uuid(),
    title = 'Project',
    columns = defaultColumns
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = { Board, Column };
