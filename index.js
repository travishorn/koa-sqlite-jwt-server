const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const errorHandler = require('./middleware/errorHandler');
const authenticated = require('./middleware/authenticated');
const authRoute = require('./routes/auth');
const petsRoute = require('./routes/pets');

const app = new Koa();
const router = new Router();

app.use(errorHandler);
app.use(cors());

router.post('/auth', bodyParser(), authRoute);
router.get('/my-pets', authenticated, petsRoute);

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(process.env.PORT || 3000);
