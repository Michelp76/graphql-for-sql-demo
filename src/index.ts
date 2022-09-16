import { ApolloServer } from 'apollo-server';
import { context } from './graphql/apollo/context';
import dotenv from 'dotenv';
import { schema } from './graphql/apollo/executableSchema'; // this includes both typeDefs and resolvers

dotenv.config();

export const server = new ApolloServer({
  schema,
  context,
  cors: { origin: true, credentials: true },
  introspection: process.env.NODE_ENV !== 'production', // disable schema introspection in prod
});

// The `listen` method launches a web server (no need for express)
void server.listen(process.env.PORT).then(() => {
  console.log(
    `🚀 Server ready at http://${process.env.HOST}:${process.env.PORT}`
  );
});

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(void server.stop());
}
