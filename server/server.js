// @express for create server
const express = require('express');

//@express-graphql
const GraphqlExpress = require('express-graphql');

// @app with express
const app = express();

//@schema
const schema = require('./schema');

// @routes
app.use('/graphql', GraphqlExpress({
    schema: schema,
    graphiql: true
}),
);

app.listen(4000, () => console.log('server running at 4000...'));