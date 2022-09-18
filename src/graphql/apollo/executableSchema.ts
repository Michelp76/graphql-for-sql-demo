// see https://www.graphql-scalars.dev/docs/usage/apollo-server for more on graphql-scalars

import { makeExecutableSchema } from '@graphql-tools/schema';
import { mutations } from '../mutations';
import { resolvers } from '../resolvers';
import { resolvers as scalarResolvers } from 'graphql-scalars';
import { typeDefs } from '../typeDefs';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: { ...scalarResolvers, ...resolvers, ...mutations },
});
