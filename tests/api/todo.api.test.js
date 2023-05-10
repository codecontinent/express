import http from 'supertest';
import app from '../../src/app';
import { db } from '../../src/configs';

const mongo = db.connectMongoForTest();

beforeAll(async () => (await mongo).connect());

afterAll(async () => (await mongo).close());

describe('Tests for /todo APIs', () => {
  it('should return HTTP:200 & todo array []', async () => {
    const response = await http(app).get('/api/todo');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toStrictEqual(null);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toStrictEqual([]);
  });

  it('should return HTTP:201 & add new todo', async () => {
    const response = await http(app)
      .post('/api/todo')
      .send({ title: 'first-todo-item' });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('data');
    expect(response.body.error).toStrictEqual(null);
    expect(response.body.data).toHaveProperty('_id');
    expect(response.body.data).toHaveProperty('title');
    expect(response.body.data.title).toStrictEqual('first-todo-item');
    expect(response.body.data).toHaveProperty('completed');
    expect(response.body.data.completed).toStrictEqual(false);
  });

  it('should return HTTP:202 & should update', async () => {
    const todo = await http(app).post('/api/todo').send({ title: 'todo-1' });
    const response = await http(app)
      .patch(`/api/todo/${todo.body.data._id}`)
      .send({
        title: 'todo-updated',
        completed: true,
      });
    expect(response.statusCode).toBe(202);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data.title).toStrictEqual('todo-updated');
    expect(response.body.data.completed).toStrictEqual(true);
  });

  it('should return HTTP:200 & should delete', async () => {
    const todo = await http(app).post('/api/todo').send({ title: 'todo-item' });
    expect(todo.statusCode).toBe(201);
    const response = await http(app).delete(`/api/todo/${todo.body.data._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.data._id).toStrictEqual(todo.body.data._id);
  });

  it('should return HTTP:400/404 for invalid requests', async () => {
    const wrongId = '645bdb3054a9ba0695562db8';
    const case1 = await http(app).get(`/api/todo/${wrongId}`);
    expect(case1.statusCode).toBe(404);
    const case2 = await http(app)
      .patch(`/api/todo/${wrongId}`)
      .send({ completed: true });
    expect(case2.statusCode).toBe(400);
    const case3 = await http(app).delete(`/api/todo/${wrongId}`);
    expect(case3.statusCode).toBe(400);
  });
});
