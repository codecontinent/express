import { Router } from 'express';
import { createResponse } from '../helpers';

const apiRouter = Router();

/** ---------------------------------*
 * @Express application @Router
 * @API routes handler
 * @Registerer of APIs
 *----------------------------------*/

apiRouter.get('/', (req, res) => {
  const resObj = createResponse({
    reqUrl: req.baseUrl,
    message: 'Hello! from APIs.',
  });
  res.json(resObj);
});

// @Lock: should be at last :: Router/route-404
apiRouter.use('*', (req, res) => {
  const resObj = createResponse({
    reqUrl: req.baseUrl,
    message: 'HTTP error 404',
    err: { message: 'API endpoint couldn\'t be found.' },
    code: 404,
  });
  res.status(404).json(resObj);
});

export default apiRouter;
