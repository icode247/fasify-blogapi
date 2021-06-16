function initAuthHooks(fastify) {
    fastify.addHook('onRequest', async (request, reply) => {

        // If the route is not private we ignore this hook
        if (!reply.context.config.isPrivate) return;

        const faunaSecret = request.headers['secret-token'];

        // If there is no header
        if (!faunaSecret) {
            reply.status(401).send();
            return;
        }

        // Add the secret to the request object
        request.faunaSecret = faunaSecret;
    });
    fastify.decorateRequest('faunaSecret', '');
}
module.exports = initAuthHooks;