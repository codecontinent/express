import { connect } from 'mongoose';
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

export async function connectDB() {
  // will come-up with a popular SQL database (i.e. postgres/mysql)
  // primary ORM choice will be `Prisma`
}
