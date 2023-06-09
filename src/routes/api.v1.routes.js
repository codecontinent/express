import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerFile from '../swagger-output.json';
import { createResponse } from '../helpers';
import { errorHandlers } from '../middlewares';
import { todoAPI } from '../services';

const apiRouter = Router();

/** ---------------------------------*
 * @Express application @Router
 * @API routes handler
 * @Registerer of APIs
 *----------------------------------*/

/// --------------------------------///
apiRouter.use('/todo', todoAPI);
/// --------------------------------///

apiRouter.get('/', (req, res) => {
  const resObj = createResponse({
    reqUrl: req.baseUrl,
    message: 'Hello! from APIs.',
  });
  res.json(resObj);
});

// @swagger setup for API docs
apiRouter.use('/docs', serve, setup(swaggerFile)); // swagger setup

// @Lock: should be at last :: Router/route-404
apiRouter.use('*', (req, res) => {
  const resObj = createResponse({
    reqUrl: req.baseUrl,
    message: 'HTTP error 404',
    err: { message: "API endpoint couldn't be found." },
    code: 404,
  });
  res.status(404).json(resObj);
});

apiRouter.use(errorHandlers.APIErrorHandler); // API-error-handler

export default apiRouter;
