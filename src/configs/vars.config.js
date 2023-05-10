import dotenv from 'dotenv';

dotenv.config(); // parse .env file first

function configVars() {
  const vars = {
    port: process.env.PORT,
    dbUrl: process.env.DATABASE_URL,
  };
  return vars;
}

const env = configVars();

export default env;
