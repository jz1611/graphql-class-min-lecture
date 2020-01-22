// Using GraphQL API server over Express

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
    num: Int
    bool: Boolean
    info: Info
  }

  type Info {
    test: String
    test2: String
  }
`);

class Info {
  test = () => "test";
  test2 = () => "test2";
}

var root = {
  hello: () => 'Hello world!',
  num: () => 3,
  bool: () => false,
  info: () => new Info
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));

// Command: node server.js
// {
//   hello
// }
// ^ in window