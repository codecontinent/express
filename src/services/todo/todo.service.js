import Todo from './todo.model';

export async function getTodo(id) {
  return await Todo.findById(id).select('-__v');
}

export async function getAllTodo() {
  return await Todo.find({}, { __v: 0 });
}

export async function addTodo(todo) {
  return await new Todo(todo).save();
}

export async function updateTodo(id, partial) {
  return await Todo.findByIdAndUpdate(id, partial, { new: true }).select(
    '-__v',
  );
}

export async function removeTodo(id) {
  return await Todo.findByIdAndDelete(id).select('-__v');
}
