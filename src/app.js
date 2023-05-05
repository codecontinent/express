import path from 'path';
import express from 'express';
import hbs from 'express-hbs';
import router from './routes';
import { corsConfig } from './configs';

const app = express();

/** -------------------------------*
 * @Express Application instance
 * @Global express settings
 * @version 1.0.0
 *--------------------------------*/

app.use(express.json()); // body-parser
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(router); // application route-handler
app.use(corsConfig); // CORS
app.set('view engine', 'hbs'); // template engine
hbs.layoutsDir = path.resolve(__dirname, './views/layouts');
app.set('views', path.resolve(__dirname, './views'));

export default app;
