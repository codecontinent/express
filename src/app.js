import path from 'path';
import express from 'express';
import hbs from 'express-hbs';
import morgan from 'morgan';
import router from './routes';
import { corsConfig, vars } from './configs';
import { errorHandlers } from './middlewares';

const app = express();

/** -------------------------------*
 * @Express Application instance
 * @Global express settings
 * @version 1.0.0
 *--------------------------------*/

app.use(express.json()); // body-parser
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
if (!['test', 'production'].includes(vars.mode)) app.use(morgan('short'));
app.use(router); // application route-handler
app.use(corsConfig); // CORS
app.set('view engine', 'hbs'); // template engine
hbs.layoutsDir = path.resolve(__dirname, './views/layouts');
app.set('views', path.resolve(__dirname, './views'));
app.use(errorHandlers.globalErrorHandler); // global-error-handler

export default app;
