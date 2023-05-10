import { connect, connection } from 'mongoose';
import vars from './vars.config';

export async function connectMongoDB() {
  try {
    // make sure your `DATABASE_URL` is for mongodb
    await connect(vars.dbUrl).then(() => {
      console.log('\nDatabase [MongoDB] connection is established!');
    });
  } catch (err) {
    console.error(err);
  }
}

/* -------------------------------------------*
 * @TDD Database connection only for tests
 * @Jest Testing with a Test Database
 * @returns an object with two functions
 *-------------------------------------------*/
export async function connectMongoForTest() {
  return {
    connect: async () => await connect(vars.tddDBUrl),
    close: async () => {
      await connection.dropDatabase();
      await connection.close();
    },
  };
}

export async function connectDB() {
  // will come-up with a popular SQL database (i.e. postgres/mysql)
  // primary ORM choice will be `Prisma`
}
