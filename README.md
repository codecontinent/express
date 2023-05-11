# <a href='https://github.com/codecontinent/express'><img src='https://github.com/codecontinent/express/assets/122348996/b5137b16-a09a-4e7a-b7bb-a3a05de6179a' height='150' alt='Logo' aria-label='our express.js boilerplate' /></a>

## Installation

[**Express.js boilerplate**](https://github.com/codecontinent/express) is our official recommended approach for writing our express.js application. It wraps around the our express.js boilerplate core and helping you to start building your backend application faster like you are using a minimal oragnized framework. It's not an alternative to any popular nodejs framework like `NestJs`, `NextJs`, `Koa`, etc. But you can save so much time to use it for your express-js app. While there are many people loves the `express.js` still and want to use it for porfolio, hobby, side-projects, etc. Mostly, the newbie `MERN-stack`, `React`, `MEAN-stack` or `MEVN-stack` developers can be adopt it easily. It can be a readymate and easy to understand solution to them.

First, you need to clone this repository or follow `degit` command.
```
git clone git@github.com:codecontinent/express.git
```
or
```
npx degit github:codecontinent/express
```
> Note: We have used node-version `16 (LTS)`. Recommened to use: Node v16/v18 LTS.

Install dependencies
```
yarn install
```

## Documentation
Initially we have made some example structures & APIs to give you the idea about developing a pretty much good `REST-APIs`. We have used `mongoose` for using MongoDB database for now. Later, we are planning to implement more scopes (i.e. Prisma ORM). Let's read some primary documentation to understand this boilerplate.

#### \# Setup Database
You will have a `.env.sample` file as well as `.env` file copied from the sample file during the post-installation. You can edit `.env` file as you need.
```env
# Environment variables
PORT=4000 # default port
DATABASE_URL=mongodb://127.0.0.1:27017/express # database for development or production
TEST_DATABASE_URL=mongodb://127.0.0.1:27017/express-tdd # database for only test-runner
```
> Remember: When you want to test, you must use a separate database in case of not lossing your data from main database.

#### \# Write APIs
You can find a directory called **services** in `src/services`. This is the folder to make or group your api-service in a single directory. As an example, you can see our `src/services/todo` and explore them. After creating them, you have to register them in the `src/routes/api.routes.js` file. 
```js
/// --------------------------------------------------------///
apiRouter.use('/todo', todoAPI); // already there
apiRouter.use('/your-api', yourApiController); // your new api-service
/// --------------------------------------------------------///
```
Also, we recommended (optional) to use `src/services/index.js` file for nice export-import convention.

**Grouping API service**
If you create a directory called `task`. Let's see some our recommened way manage your `controller`, `model`, and `service`.
> Note: This may look something like the MVC (Model - View - Controller) pattern. 

__Model__ `src/services/task/task.model.js`
```js
import { Schema, model } from 'mongoose';

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true },
); // entity/model schema

const Task = model('Task', taskSchema); // model or entity

async function init() {
  await Task.createCollection();
}

init(); // initialize collection

export default Task;
```

__Service__ `src/services/task/task.service.js`
```js
import Task from './task.model';

export async function getTask(id) {
  return await Task.findById(id).select('-__v');
}

export async function getAllTask() {
  return await Task.find({}, { __v: 0 });
}

export async function addTask(todo) {
  return await new Task(todo).save();
}

export async function updateTask(id, partial) {
  return await Task.findByIdAndUpdate(id, partial, { new: true }).select(
    '-__v',
  );
}

export async function removeTask(id) {
  return await Task.findByIdAndDelete(id).select('-__v');
}
```

__Controller__ `src/services/task/task.controller.js`
```js
import { Router } from 'express';
import { getAllTask } from './todo.service';
import { createResponse } from '../../helpers';

const controller = Router(); // incoming request handler

// get all tasks
controller.get('/', async (_, res) => {
  const response = await getAllTask();
  res.status(200).json(
    createResponse({
      data: response,
      code: 200,
    }),
  );
});

// you can add CURD operations, we just gave one example inside
export default controller; // must be
```

#### \# Configurations
You may or will often need to change or add some configurations. We suggest to do that in `src/configs`. As example, if you want to add new environment variable.
```env
# Environment variables
PORT=4000 # default port
DATABASE_URL=mongodb://127.0.0.1:27017/express # database for development or production
TEST_DATABASE_URL=mongodb://127.0.0.1:27017/express-tdd # database for only test-runner
TOKEN=new_variable_to_use # you can add like this as you need more
```
Now, it's time to consume this new variable through the configs. Just put the new item in `src/configs/vars.config.js`
```
const vars = {
  port: process.env.PORT,
  dbUrl: process.env.DATABASE_URL,
  tddDBUrl: process.env.TEST_DATABASE_URL,
  mode: process.env.NODE_ENV,
  token: process.env.TOKEN, // newly added
};
```


#### \# Testing
TDD (Test Driven Development) is very important nowdays to become a good developer or engineer. It helps us to manage our development lifecycle easier and provides good quality.
We have integrated the popular testing-framework for JavaScript/Nodejs `Jest`. Have used `Supertest` for making http requests. Let's an example of testing APIs.
> Note: We are recommending following our distributed directory structure. As follows, we have a directory for writing all the tests in `tests` (`tests/api` for APIs).
```js
import http from 'supertest';
import app from '../../src/app';
import { db } from '../../src/configs';

const mongo = db.connectMongoForTest();

beforeAll(async () => (await mongo).connect()); // connects your testing database

afterAll(async () => (await mongo).close()); // disconnects your testing database & drops that database

describe('Tests for /task APIs', () => {
  it('should return HTTP:200 & task array []', async () => {
    const response = await http(app).get('/api/task');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toStrictEqual([]);
  });
});
```

## Developer Experience
This project started and developed the very first version `v1.0` by [**Mahabub**](https://github.com/mahabubx7). He used to think about express.js for building suppport APIs or hobby project's APIs using this. But, sometimes it's feels very much boaring to construct the express.js project first. So, he just started making one starter to solve this. And later it is now converted into a healthy boilerplate.
Also, published it as an open-source and free to use for all.

## Some Recommended Tutorials
There are some good & free tutorials available in youtube to learn `express.js`. To understand our boilerplate/mini-custom-framework, you should understand the core of nodejs/express.js first.
- [**(Recommended)** Node.js and Express.js - Full Course](https://youtu.be/Oe421EPjeBE?t=17283)
- [Express in Node js | Web Framework](https://youtu.be/2ojkb44XObc)
- [Build Restful CRUD API with Node.js, Express and MongoDB](https://youtu.be/9OfL9H6AmhQ)
- [**(Recommended)** Set Up a Starter Node.js/Express Project with ES6 (ft. Babel)](https://youtu.be/orp2Fnvzrgw)

## License

[MIT](LICENSE.md)
