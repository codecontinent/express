import app from './app';
import { vars, db } from './configs';

/** ---------------------------*
 * @HttpServer will by node.js
 * @Coded by @CC/@mahabubx7
 * @license MIT
 * @version 1.0.0
 *----------------------------*/

const port = vars.port || 4000;

app.listen(port, (err) => {
  db.connectMongoDB(); // connecting database

  if (err) console.log(`😞 Server Error! ${err}`);
  else {
    console.log(
      `🚀 Express.js server is up & running.\nhttp://localhost:${port}/`,
    );
  }
});
