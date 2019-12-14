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
    date_created: 'Mon, 16 Sep 2019 04:17:44 GMT',
    id: 2,
    name: 'mak cloud',
    ownerToken: 'hghr74567hdh74'
  },
  {
    date_created: 'Tue, 15 Oct 2019 04:17:44 GMT',
    id: 3,
    name: 'Kikoni Online',
    ownerToken: 'hghr74567hdh74'
  }
];

router.get('/user/get/organisations', (ctx) => {
  // const token = ctx.headers.authorization.split(' ')[1];
  ctx.body = organisations;
});

router.post('/rename/organisation', (ctx) => {
  const renameOrg = ctx.request.body;
  organisations.forEach((org, index) => {
    if (org.name === renameOrg.organisation_name) {
      org.name = renameOrg.New_name;
      console.log(organisations[index]);

      ctx.status = 201;
      ctx.body = {};
    }
  });
});

router.post('/delete/organisation', (ctx) => {
  const orgToDelete = ctx.request.body;
  console.log(orgToDelete);
  organisations.forEach((org, index) => {
    if (org.name === orgToDelete.organisation_name) {
      organisations.splice(index, 1);
      ctx.status = 201;
      ctx.body = {};
    } else {
      ctx.status = 500;
      ctx.body = {
        message: 'Failed to delete org'
      };
    }
  });
});

router.post('/create/organisation', (ctx) => {
  const newOrg = ctx.request.body;
  const org = {
    date_created: new Date(),
    id: 2,
    name: newOrg.organisation_name,
    ownerToken: 'hghr74567hdh74'
  };
  organisations.push(org);
  ctx.status = 201;
  ctx.body = org;
});


module.exports = router;
