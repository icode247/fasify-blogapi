const faunadb = require('faunadb');
const FaunaError = require('../errors/FaunaError.js');

const { Update, Ref, Collection } = faunadb.query;

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
  async handler(request, reply) {
    const { body } = request.body
    const blogId = request.params.blogId;

    const client = new faunadb.Client({
      secret: request.faunaSecret
    });

    try {

      //Update the blog document
      const result = await client.query(
        Update(
          Ref(
            Collection('Blogs'),
            blogId
          ), {
          data: {
            body
          }
        }
        )
      );

      // Return the document
      reply.send(result.data);

    } catch (error) {
      throw new FaunaError(error);
    }
  }
};