# Benefits - GraphQL

It's important to mention that GraphQL is not language specific (PLATFORM INDEPENDENT), it's just a specification between the client and the server. Any client should be able to communicate with any server if they speak the common language: GraphQL.

Key concepts of the GraphQL query language are:

Hierarchical

Product‐centric

Strong‐typing

Client‐specified queries

Introspective
I would like to highlight strong-typing here which means that GraphQL introduces an application level type system. It's a contract between the client and server which means that your server in the background may use different internal types. The only thing here what matters is that the GraphQL server must be able to receive GraphQL queries, decide if that it is syntactically correct and provide the described data for that.

## Where is it useful?

GraphQL helps where your client needs a flexible response format to avoid extra queries and/or massive data transformation with the overhead of keeping them in sync.

Using a GraphQL server makes it very easy for a client side developer to change the response format without any change on the backend.

With GraphQL, you can describe the required data in a more natural way. It can speed up development, because in application structures like top-down rendering in React, the required data is more similar to your component structure.

Check out our previous query and how similar it is to the following component structure:

```

<App>  
  <User>
    <Friend/>
    <Friend/>
  </User>
</App>  

```


## Differences with REST

REST APIs are resource based. Basically what you do is that you address your resources like GET /users/1/friends, which is a unique path for them. It tells you very well that you are looking for the friends of the user with id=1.

The advantages of REST APIs are that they are cacheable, and their behaviour is obvious.

The disadvantage is that it's hard to specify and implement advanced requests with includes, excludes and especially with linked resources. I think you have already seen requests like: 

```

GET /users/1/friends/1/dogs/1?include=user.name,dog.age

``

## Solving problem with GraphQL

This is exactly the problem what GraphQL wants to solve. If you have types of user and dog and their relations are defined, you can write any kind of query to get your data.

You will have the following queries out of the box:

get name of the user with id=1


``` 

{

 user(id: 1) {

   name

 }

}

```

get names for friends of the user with id=1


```

{

 user(id: 1) {

   friends {

     name

   }

 }

}

```

get age and friends of the user with id=1

```

{

 user(id: 1) {

   age

   friends {

     name

   }

 }

}

```

get names of the dogs of the friends of the user with id=1 :)

```
{

 user(id: 1) {

   friends {

     dogs {

       name

     }

   }

   ```

   ## GraphQL queries


## GraphQL queries

You can do two type of queries with GraphQL:

i. when you fetch (get) data from your server and the

ii. when you manipulate (create, update, delete) your data

iii. GraphQL queries are like JSON objects without properties:

```
// a json object

{

  "user": "name"

}

```


```

// a graphql query

{

  user {

    name

  }

}

```


```
// a graphql query

{
  user {

    name

  }

}

```


```
//We can write named queries:

{

  findUser(id: 1)

}

```



```

you can pass parameters to your query:

query findUser($userId: String!) { 

  findUser(id: $userId) {

    name

  }
  
}

```
