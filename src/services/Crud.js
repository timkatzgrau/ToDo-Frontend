import Api from './Api';

export default {
  getAllToDos(credentials) {
    return Api().post('todos', credentials);
  },

  createToDo(credentials) {
    return Api().post('create', credentials);
  },

  deleteToDo(credentials) {
    return Api().post('delete', credentials);
  },

  editToDo(credentials) {
    return Api().post('edit', credentials);
  },
};
