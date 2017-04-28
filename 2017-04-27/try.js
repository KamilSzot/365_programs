var { graphql, buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    rollDice(numDice: Int!, numSides: Int): Int
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
  rollDice: ({numDice, numSides}) => {
      return Array.apply(null, Array(numDice)).reduce((s) => s+Math.floor(Math.random()*numSides)+1, 0); // trick to get n-elemnt array that can be reduced, Array(numDice) is not enough, reduce thinks it's empty
  }
};

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, '{ hello }', root).then((response) => {
  console.log(response);
});

graphql(schema, 'query Q($numDice: Int!, $numSides: Int) { rollDice(numDice: $numDice,numSides: $numSides) }', root, {}, { numDice: 2, numSides: 6 }).then((response) => {
  console.log(response);
});