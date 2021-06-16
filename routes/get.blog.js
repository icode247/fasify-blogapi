
const faunadb = require('faunadb');
const FaunaError = require('../errors/FaunaError.js');

const {Get, Ref, Collection} = faunadb.query;

module.exports = {
  config: {
    isPrivate: true
  },
  schema: {
    params: {
      type: 'object',
      required: ['blogId'],
      properties: {
        blogId: {
          type: 'string',
          pattern: "[0-9]+"
        }
      }
    }
  },
  async handler (request, reply) {

    const blogId = request.params.blogId;
    console.log(blogId)
    const client = new faunadb.Client({
      secret: request.faunaSecret
    });

    try {

        // Get the user document
        const result = await client.query(
            Get(
                Ref(
                    Collection('Blogs'),
                    blogId
                )
            )
        );

        // Return the document
        reply.send(result);

    } catch (error) {
        throw new FaunaError(error);
    }
  }
};