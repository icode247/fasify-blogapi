const fastify = require('fastify')({ logger: false });
const dovenv = require("dotenv").config()
require("./hooks/auth.hook")(fastify)

fastify.post('/users', require('./routes/create.user.js'));
fastify.post('/blogs', require('./routes/create.blog'));
fastify.get('/blogs', require('./routes/get.all.blog'));
fastify.post('/users/login', require('./routes/user.login.js'));
fastify.get('/blogs/:blogId', require('./routes/get.blog.js'));
fastify.delete('/blogs/:blogId', require('./routes/delete.blog.js'));
fastify.patch('/blogs/:blogId', require('./routes/update.blog.js'));


async function start () {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err)
    process.exit(1);
  }
};

start();