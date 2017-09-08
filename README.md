# Auth0 Example (with React & Apollo)

* [Auth0](https://auth0.com/): Powerful authentication provider
* [Apollo Client](https://github.com/apollographql/apollo-client): Fully-featured, production ready caching GraphQL client
* [Graphcool](https://www.graph.cool): Flexible backend platform combining GraphQL + AWS Lambda

You can read the **full tutorial** about this example [here](https://www.graph.cool/docs/tutorials/react-apollo-auth0-pheiph4ooj/) or try out the [hosted version](http://apollo-auth0.netlify.com).

## Getting Started

### 1. Clone example repository

```sh
https://github.com/masoodtalha/react-auth0.git
```

### 2. Setting up the Graphcool project

#### 2.1. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

```sh
# Install Graphcool CLI
npm install -g graphcool

# Create a new project based on the Instagram schema
graphcool init --schema https://graphqlbin.com/insta-auth0.graphql 
```

This creates a GraphQL API for the following schema:

```graphql
type Post {
  description: String!
  imageUrl: String!
}

type User {
  name: String!
  emailAddress: String!
  emailSubscription: Boolean!
}
```

