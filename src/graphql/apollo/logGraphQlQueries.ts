interface Props {
  req: {
    body: { query?: string; variables?: string };
    language?: string;
    user?: { id: string };
  };
}

export const logGraphQlQueries = ({ req }: Props) => {
  try {
    if (process.env.LOG_GRAPHQL === 'verbose') {
      if (req.body.query) console.log(req.body.query);
      if (Object.keys(req.body.variables).length)
        console.log(req.body.variables);
    } else if (process.env.LOG_GRAPHQL === 'compact') {
      const queryName = req.body.query
        .split('\n')[1]
        .trim()
        .split(' ')[0]
        .split('(')[0];
      const operationName = req.body.query.split(' ')[0];
      const userString = req.user?.id
        ? `for user ${req.user.id}`
        : '(unauthenticated)';
      console.log(`${operationName} ${queryName} ${userString}`);
    }
  } catch (error) {
    console.error(error.name);
  }
};
