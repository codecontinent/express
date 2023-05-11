import cors from 'cors';

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173', // vite-apps
    'http://localhost:3000',
    'http://127.0.0.1:3000', // popular-frontend
    'http://localhost:8080',
    'http://127.0.0.1:8080', // generic
  ],
  credentials: true,
};

function setupCORS() {
  return cors(corsOptions);
}

const corsConfig = setupCORS();

export default corsConfig;
