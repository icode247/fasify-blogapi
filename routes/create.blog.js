const faunadb = require('faunadb');
const FaunaError = require('../errors/FaunaError.js');

// We do this so that our FQL code is cleaner
const { Create, Collection, Ref } = faunadb.query;

module.exports = {
    // Validation schema for the Fastify route
    schema: {
        body: {
            type: 'object',
            required: ['author', 'title', 'body'],
            properties: {
                author: {
                    type: 'string'
                },
                title: {
                    type: 'string',
                },
                body :{
                    type :'string'
                }
            }
        }
    },

    async handler(request, reply) {

        const { author, title, body } = request.body;

        const client = new faunadb.Client({
            secret: process.env.FAUNA_SERVER_SECRET
        });

        try {

            // Create a new user document with credentials
            const result = await client.query(
                Create(
                    Collection('Blogs'),
                    {
                        data: {
                            author : Ref(Collection('Users'), author),
                            title,
                            body,
                            dateCreated: Date.now()
                        },
                    }
                )
            );

            // Return the created document
            reply.send(result);

        } catch (error) {
            throw new FaunaError(error);
        }
    }
};