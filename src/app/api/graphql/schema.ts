const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    isValidated: Boolean!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    tags: [Tag!]!
    createdAt: String!
    updatedAt: String!
    isPublished: Boolean!
    slug: String!
    timeToRead: Int!
  }

  type Tag {
    tag: String!
    color: String!
  }

  input NewUserInput {
    password: String!
    email: String!
  }

  input UpdateUserInput {
    id: ID!
    password: String
    email: String
    isValidated: Boolean
  }

  input NewPostInput {
    title: String!
    content: String!
    tags: [TagInput!]!
    isPublished: Boolean!
  }

  input UpdatePostInput {
    id: ID!
    title: String
    content: String
    tags: [TagInput]
    isPublished: Boolean
  }

  input TagInput {
    tag: String
    color: String
  }

  type Query {
    users: [User]
    posts: [Post]
    post(id: ID!): Post
    postBySlug(slug: String!): Post
  }

  type AuthPayload {
    token: String
    id: ID!
  }

  type Mutation {
    createUser(input: NewUserInput!): User
    updateUser(input: UpdateUserInput!): User
    deleteUser(id: ID!): String
    signIn(email: String!, password: String!): AuthPayload
    createPost(input: NewPostInput): Post
    updatePost(input: UpdatePostInput): Post
    deletePost(id: ID!): String
  }
`;

export default typeDefs;
