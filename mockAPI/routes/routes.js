/* eslint-disable import/no-extraneous-dependencies */
const router = require('koa-router')();

/* this is a route to run tests */
router.get('/test', (ctx) => {
  ctx.status = 201;
  ctx.body = 'The test is working';
});

/* these are the auth routes */

const users = [
  {
    email: 'test@test.com',
    password: 'test',
    token: 'hghr74567hdh74'
  }
];

router.post('/login', (ctx) => {
  const foreignUser = ctx.request.body;
  const { email, password } = foreignUser;

  users.forEach((user) => {
    if (user.email === email && user.password === password) {
      ctx.body = {
        access_token: user.token
      };
    }
  });
});

module.exports = router;
