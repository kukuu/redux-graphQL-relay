//Alexander Adu-Sarkodie

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
    character: "Beverly Goldberg",
    actor: "Wendi McLendon-Covey",
    role: "matriarch",
    traits: "embarrasing, overprotective",
    id: 1
  },
  2: {
    character: "Murray Goldberg",
    actor: "Jeff Garlin",
    role: "patriarch",
    traits: "gruff, lazy",
    id: 2
  },
  3: {
    character: "Erica Goldberg",
    actor: "Hayley Orrantia",
    role: "oldest child",
    traits: "rebellious, nonchalant",
    id: 3
  },
  4: {
    character: "Barry Goldberg",
    actor: "Troy Gentile",
    role: "middle child",
    traits: "dim-witted, untalented",
    id: 4
  },
  5: {
    character: "Adam Goldberg",
    actor: "Sean Giambrone",
    role: "youngest child",
    traits: "geeky, pop-culture obsessed",
    id: 5
  },
  6: {
    character: "Albert 'Pops' Solomon",
    actor: "George Segal",
    role: "grandfather",
    traits: "goofy, laid back",
    id: 6
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
    character: {
      type: GraphQLString,
      description: "Name of the character",
    },
    actor: {
      type: GraphQLString,
      description: "Actor playing the character",
    },
    role: {
      type: GraphQLString,
      description: "Family role"
    },
    traits: {
      type: GraphQLString,
      description: "Traits this Goldberg is known for"
    },
    id: {
      type: GraphQLInt,
      description: "ID of this Goldberg",
    }
  }
});


//Define Query. This is also an instance GraphQLObjectType
var queryType = new GraphQLObjectType({
  name: 'query',
  description: "Goldberg query",
  fields: {
    goldberg: {
      type: goldbergType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: function(_, args){
        return getGoldberg(args.id)
      }
    }
  }
});

//Finally, the “schema type” brings it all together.
var schema = new GraphQLSchema({
  query: queryType
});

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
  proxy: {'/graphql': `http://localhost:${8080}`},
  publicPath: '/static/',
  stats: {colors: true}
});

// Serve static resources
app.use('/', express.static('static'));
app.listen(3099);
console.log("The App Server is running.")
