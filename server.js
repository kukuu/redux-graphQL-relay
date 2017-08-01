//Author: Alexander Adu-Sarkodie
//Server launc file for Model, Querry and Schema
//Graphiql IDE loaded via webpack to offset CORS issues
//IDE is hackaged into webpack and can be  launched from http://localhost:8080}

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');

var GraphQLSchema = graphql.GraphQLSchema;
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLString = graphql.GraphQLString;
var GraphQLInt = graphql.GraphQLInt;

//Define data
var goldbergs = {
  1: {
    _id: 1,
    categories: ['first',' second'], 
    tags: ['foo','bar'] 
  },
  2: {
    _id: 2,
    categories: ['Massimiliano',' max@worldlabs.org'],
    tags: ['foos','bars']
  },
  3: {
    _id: 3,
    categories: ['Tom',' tom@fullstack.london'],
    tags: ['foo!','bar!']
  } 
}

//When we resolve our query we return the output of a function called getGoldberg():
function getGoldberg(id) {
  return goldbergs[id]
}

//Define Schema
var goldbergType = new GraphQLObjectType({
  name: 'Goldberg',
  description: "Member of The Goldbergs",
  fields: {
    categories: {
      type: GraphQLString,
      description: "Name of the categories",
    },
    tags: {
      type: GraphQLString,
      description: "Name of the tag",
    },
    _id: {
      type: GraphQLInt,
      description: "ID of this Goldberg instance",
    }
  }
});


//Define Query. This is also an instance GraphQLObjectType
//Here in the query we define a "goldberg" field witha type equal to the type in the  schema above "goldbergType"
//Properties of the "goldberg" field in the query
//1. type 2. args, resolve
//in the resolve we return a the function getGoldberg(args.id) from above
var queryType = new GraphQLObjectType({
  name: 'query',
  description: "Goldberg query",
  fields: {
    goldberg: {
      type: goldbergType,
      args: {
        _id: {
          type: GraphQLInt
        }
      },
      resolve: function(_, args){
        return getGoldberg(args._id)
      }
    }
  }
});

//Finally, the “schema type” brings it all together.
var schema = new GraphQLSchema({
  query: queryType
});

// Serving the schema
//We use express and the graphqlHTTP middleware to serve our schema.
//With graphiql set to true we can easily test our work:
var graphQLServer = express();
graphQLServer.use('/', graphqlHTTP({ schema: schema, graphiql: true }));
graphQLServer.listen(8080);
console.log("The GraphQL Server is running.")

var compiler = webpack({
  entry: "./index.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
        publicPath: "/static/"
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
          }
        ]
    }
});

//To serve the front end of our app we need to install
// babel, babel-loader, and a couple of babel presets.
//We also create a new file called .babelrc, 
//this will tell babel what presets we want to use:

var app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  proxy: {'/graphql': `http://localhost:${8070}`},
  publicPath: '/static/',
  stats: {colors: true}
});

// Serve static resources
app.use('/', express.static('static'));
app.listen(3099);
console.log("The App Server is running.")
