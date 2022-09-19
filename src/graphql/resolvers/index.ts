import { queryResolvers } from './queries';
import { typeResolvers } from './typeResolvers';
export const resolvers = { ...typeResolvers, ...queryResolvers };
