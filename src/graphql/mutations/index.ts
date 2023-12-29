import * as seats from './seats';
import * as tickets from './tickets';

export const mutations = { Mutation: { ...seats, ...tickets } };
