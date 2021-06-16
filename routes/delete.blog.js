const faunadb = require('faunadb');
const FaunaError = require('../errors/FaunaError.js');

const { Delete, Ref, Collection } = faunadb.query;

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

    const blogId = request.params.blogId;
    console.log(blogId)

    const client = new faunadb.Client({
      secret: request.faunaSecret
    });

    try {

      // Delete the user document
      const resultDelete = await client.query(
        Delete(
          Ref(
            Collection('Blogs'),
            blogId
          )
        )
      );

      // Return the deleted document
      reply.send("blog deleted!");

    } catch (error) {
      throw new FaunaError(error);
    }
  }
};