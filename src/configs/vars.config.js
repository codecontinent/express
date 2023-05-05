import dotenv from 'dotenv';

dotenv.config(); // parse .env file first

function configVars() {
  const vars = {
    port: process.env.PORT,
  };
  return vars;
}

const env = configVars();

export default env;
