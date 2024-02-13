const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
  }
  
  input NewUserInput {
    password: String!
    email: String!
  }

  input UpdateUserInput {
    id: ID!
    password: String
    email: String
  }

  type Query {
    users: [User]
  }
  type AuthPayload {
    token: String
    user: User
  }

  type Mutation {
    createUser(input: NewUserInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: ID!): String
    signIn(email: String!, password: String!): String
  }
`;

export default typeDefs;
