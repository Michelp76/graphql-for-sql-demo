// see https://www.graphql-scalars.dev/docs/usage/apollo-server for more on graphql-scalars

import { makeExecutableSchema } from '@graphql-tools/schema';
import { mutations } from '../mutations';
import { queryResolvers } from '../resolvers/queries';
import { resolvers as scalarResolvers } from 'graphql-scalars';
import { typeDefs } from '../typeDefs';
import { typeResolvers } from '../resolvers/typeResolvers';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    ...scalarResolvers,
    ...typeResolvers,
    ...queryResolvers,
    ...mutations,
  },
});
