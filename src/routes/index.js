import { Router } from 'express';
import os from 'os';
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

router.get('/healthcheck', (req, res) => {
  res.status(200).render('healthcheck', {
    title: 'Health-check report',
    layout: 'layouts/page',
    status: 'active',
    uptime: process.uptime().toFixed(2),
    os: `${os.platform()} - ${os.arch()} (${os.machine()})`,
    homeDir: os.homedir(),
    memory: `${Math.abs(os.freemem() / 1024 ** 3).toFixed(2)}GB`,
    total_mem: `${Math.abs(os.totalmem() / 1024 ** 3).toFixed(2)}GB`,
    date: new Date().toUTCString(),
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
