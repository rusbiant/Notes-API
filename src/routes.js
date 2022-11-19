const {
  addNoteHandler,
  getAllHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByidHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler,
  },
  {
    method:'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByidHandler,
  },
];

module.exports = routes;