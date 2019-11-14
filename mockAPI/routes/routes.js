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


/* ORGANIZATION */

const organisations = [
  {
      "date_created": "Mon, 16 Sep 2019 04:17:44 GMT",
      "id": 2,
      "name": "mak cloud",
      "ownerToken": 'hghr74567hdh74'
  },
  {
    "date_created": "Tue, 17 Sep 2019 04:17:44 GMT",
    "id": 3,
    "name": "Kikoni Online",
    "ownerToken": 'hghr74567hdh74'
  }
]


router.get('/user/get/organisations', (ctx) => {
  console.log('running .....');
  const token = ctx.headers.authorization.split(' ')[1];
  console.log(token);
  ctx.body = organisations;
});


module.exports = router;
