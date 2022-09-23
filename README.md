# graphql-for-sql-demo

This repo supports graphql demos and examples which will be discussed in a series of blog posts
which I will hopefully write.

This basic graphql server application is written in typescript and runs against a postgres database.

To run, clone this repo then:

```
$ npm install
$ npm start
```

or

```
$ npm run start:watch
```

to automatically keep up with edits.

## Branches

This repository uses git branches to support different examples that require different versions of the code. Make sure you checkout the branch appropriate to the example you want to follow.

# data

The data used is taken from [the PostgresPro airline booking example](https://postgrespro.com/docs/postgrespro/10/demodb-bookings-installation). Please follow the instructions there to download the data and load it into your local postgres.

This demo database has a bit of everything - unicode text, one-one, one-many, and many-many relationships, JSONB fields, and POINT fields. There are 9 total tables, some of which have over a million rows in even the _small_ sample.
