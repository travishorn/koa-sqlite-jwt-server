const jwt = require('jsonwebtoken');

const db = require('../db');
const bcrypt = require('../utilities/bcrypt');

const secret = process.env.JWT_SECRET || 'secret';
const wrongUserPassMsg = 'Incorrect username and/or password.';

module.exports = async (ctx) => {
  const { username, password } = ctx.request.body;

  if (!username) ctx.throw(422, 'Username required.');
  if (!password) ctx.throw(422, 'Password required.');

  const dbUser = await db.first(['id', 'passwordHash']).from('users').where({ username });

  if (!dbUser) ctx.throw(401, wrongUserPassMsg);

  if (await bcrypt.compare(password, dbUser.passwordHash)) {
    const payload = { sub: dbUser.id };
    const token = jwt.sign(payload, secret);

    ctx.body = token;
  } else {
    ctx.throw(401, wrongUserPassMsg);
  }
};
