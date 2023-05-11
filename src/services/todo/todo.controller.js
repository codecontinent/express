import { Router } from 'express';
import {
  addTodo,
  getAllTodo,
  getTodo,
  removeTodo,
  updateTodo,
} from './todo.service';
import { createResponse } from '../../helpers';

const controller = Router();

// create a new todo
controller.post('/', async (req, res) => {
  const { title } = req.body;
  const response = await addTodo({ title });
  res.status(201).json(
    createResponse({
      data: {
        _id: response._id,
        title: response.title,
        completed: response.completed,
        createdAt: response.createdAt,
        updateAt: response.updatedAt,
      },
      message: 'Todo Created!',
      code: 201,
    }),
  );
});

// get all todos
controller.get('/', async (_, res) => {
  const response = await getAllTodo();
  res.status(200).json(
    createResponse({
      data: response,
      code: 200,
    }),
  );
});

// get one/single todo
controller.get('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await getTodo(id);
  if (response) {
    return res.status(200).json(
      createResponse({
        data: response,
        code: 200,
      }),
    );
  }

  return res.status(404).json(
    createResponse({
      reqUrl: req.baseUrl,
      code: 404,
      err: { message: 'Not found!' },
    }),
  );
});

// update a todo
controller.patch('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await updateTodo(id, req.body);
    if (response || !response.errors) {
      return res.status(202).json(
        createResponse({
          data: response,
          code: 202,
          message: 'Todo Updated!',
        }),
      );
    }

    return res.status(404).json(
      createResponse({
        reqUrl: req.baseUrl,
        code: 404,
        err: { message: 'Not found!' },
      }),
    );
  } catch (error) {
    return res.status(400).json(
      createResponse({
        reqUrl: req.baseUrl,
        code: 400,
        err: { ...error, extra: req.body },
      }),
    );
  }
});

// delete a todo
controller.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const response = await removeTodo(id);
  if (response) {
    return res.status(200).json(
      createResponse({
        data: response,
        code: 200,
      }),
    );
  }

  return res.status(400).json(
    createResponse({
      data: {},
      reqUrl: req.baseUrl,
      code: 400,
      err: { message: "Operation couldn't be done!" },
    }),
  );
});

export default controller;
