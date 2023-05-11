import { Schema, model } from 'mongoose';

const todoSchema = new Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
); // entity/model schema

const Todo = model('Todo', todoSchema); // model or entity

async function init() {
  await Todo.createCollection();
}

init(); // initialize collection

export default Todo;
