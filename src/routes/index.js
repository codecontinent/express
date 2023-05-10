import { Router } from 'express';
import apiRouter from './api.v1.routes';

const router = Router();

/** ---------------------------------*
 * @Express application @Router
 * @Global routes handler
 * @Default API @version v1
 *----------------------------------*/

// ----- API setup -----//------------/
router.use('/api', apiRouter);
// if you wanna make api versions ...
// router.use('/api/v1', apiRouter);
// ----- API setup -----//------------/

router.get('/', (_, res) => {
  res.render('welcome', {
    title: 'Welcome! to Express.js',
    layout: 'layouts/page',
  });
});

// @Lock: should be at last :: Router/route-404
router.use('*', (req, res) => {
  res.status(404).render('error', {
    title: 'HTTP error [404]',
    req_url: req.baseUrl,
    layout: 'layouts/page',
    status: "route couldn't be found.",
  });
});

export default router;
