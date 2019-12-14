/* eslint-disable import/no-extraneous-dependencies */

const Koa = require('koa');
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const onerror = require('koa-onerror');
const cors = require('@koa/cors');


const app = new Koa();

// error handler
onerror(app);

// replace with db
const things = ['my family', 'programming', 'music'];

app.use(cors());

/* json prettier middleware */
app.use(json());
// bodyparser middleware
app.use(bodyParser());
// logger
// app.use(logger());

const router = require('./routes/routes');

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(4000, () => console.log('Server started.... '));
