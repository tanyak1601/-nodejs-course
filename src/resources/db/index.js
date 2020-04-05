const User = require('../users/user.model');
const { Board, Column } = require('../boards/board.model');
const Task = require('../tasks/task.model');

const user1 = new User({ name: 'Tanya', login: 'Tanya-a', password: '123456' });
const user2 = new User({ name: 'Ivan', login: 'Ivan123', password: '654321' });
const user3 = new User({ name: 'Anna', login: 'anya111', password: 'asd121' });
const user4 = new User({ name: 'Tom', login: 'TomTom', password: 'wer123' });

const board1 = new Board({
  title: 'project1',
  columns: [
    new Column({ title: 'backlog', order: 0 }),
    new Column({ title: 'todo', order: 1 }),
    new Column({ title: 'in progress', order: 2 }),
    new Column({ title: 'review', order: 3 }),
    new Column({ title: 'done', order: 4 })
  ]
});
const board2 = new Board({
  title: 'project2',
  columns: [
    new Column({ title: 'backlog', order: 0 }),
    new Column({ title: 'todo', order: 1 }),
    new Column({ title: 'in progress', order: 2 }),
    new Column({ title: 'review', order: 3 }),
    new Column({ title: 'done', order: 4 })
  ]
});

const task1 = new Task({
  title: 'create button',
  order: 0,
  description: 'create login button',
  userId: user1.id,
  boardId: board1.id,
  columnId: board1.columns[0].id
});
const task2 = new Task({
  title: 'implement filter',
  order: 0,
  description: 'implement filter by name',
  userId: user2.id,
  boardId: board1.id,
  columnId: board1.columns[2].id
});
const task3 = new Task({
  title: 'implement search',
  order: 0,
  description: 'implement search panel',
  userId: user3.id,
  boardId: board1.id,
  columnId: board2.columns[4].id
});

const db = {
  users: [user1, user2, user3, user4],
  boards: [board1, board2],
  tasks: [task1, task2, task3]
};

module.exports = { db };
