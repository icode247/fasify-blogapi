const faunadb = require('faunadb');
const FaunaError = require('../errors/FaunaError.js');

const { Get, Collection, Lambda, Documents, Paginate, Map } = faunadb.query;

module.exports = {
  config: {
    isPrivate: true
  },
  async handler(request, reply) {
    const userId = request.params.userId;

    const client = new faunadb.Client({
      secret: request.faunaSecret
    });

    try {

      // Get the user document
      const result = await client.query(
        Map(
          Paginate(Documents(Collection('Blogs'))),
          Lambda(x => Get(x))
        )
      );

      // Return the document
      reply.send(result.data);

    } catch (error) {
      throw new FaunaError(error);
    }
  }
};