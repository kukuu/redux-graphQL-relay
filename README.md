# Redux, GraphQL and REACT

## Installation and running application
1. Clone repository

2. ```npm install```

3. ```npm start```

4. Go to http://localhost:3099/

5. Use this query to test the API . Change the ids and submit the query

{goldberg(id: 2) {_id, categories, tags}}

5. Go to http://localhost:8080/graphql for GraphiQl Interactive IDE


## Dependencies

1. NodeJS

2. REDUX

3. GraphQL

4. REACT

5. Webpack

6.webpack-dev-server.

7. Express

8. express-graphql

9. Babel

10. es6


## Application Notes:

GraphQL is a query language which provides a common interface between the client and the server for data fetching and manipulations.

The client asks for various data from the GraphQL server via queries. The response format is described in the query and defined by the client instead of the server: they are called client‐specified queries. 
The structure of the data is not hardcoded as in traditional REST APIs - this makes retrieving data from the server more efficient for the client.


For example, the client can ask for linked resources without defining new API endpoints. With the following GraphQL query, we can ask for the user specific fields and the linked friends resource as well.

```
{
  user(id: 1) {
    name
    age
    friends {
      name
    }
  }
}

```


In a resource based REST API it would look something like:

```
GET /users/1 and GET /users/1/friends  

```

or

```
GET /users/1?include=friends.name 

``` 

A. We use GraphQL data modelling Architecture to construct 3 types to enable get an end point:

i. A type for the model.
ii. A type for the query.
iii. A type for the schema.

When we resolve our query we return the output of a function from the data model. This is in server.js


B. We use express and the graphqlHTTP middleware to serve the schema.

C. Serving our application
To serve the front end of our app we need to install babel, babel-loader, and a couple of babel presets.

D. Immmutability: 
To ensure data consitence and best practice we use immutable.  This presents a mutative API which does not update the data in-place, but instead always yields new updated data.

E. Thunk middleware:
Help  to make  requests.

Component Did Mount life Cycle: 
This is set to retrieve the result of A query on application first load from server: 

{goldberg(id: 1) {_id, categories, tags}}
