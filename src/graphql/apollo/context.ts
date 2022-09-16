import { logGraphQlQueries } from './logGraphQlQueries';

interface Props {
  req: {
    acceptsLanguages: (...args: string[]) => string;
    body: { query?: string; variables?: string };
    headers: object;
    language?: string;
    user?: { id: string };
  };
  res: object;
}

// DO NOT THROW ERRORS IN THE CONTEXT FUNCTION - if you do the GraphQL server will 400
export const context = async ({ req, res }: Props) => {
  // our data is in English and Russian. Figure out which language the client is requesting, defaulting to 'en'
  req.language = req.acceptsLanguages('en', 'ru') || 'en';

  // optionally log graphql queries
  if (process.env.LOG_GRAPHQL !== 'none') logGraphQlQueries({ req });
  return { req, res };
};
