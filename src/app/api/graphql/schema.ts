const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    isValidated: Boolean!
    bookmarks: [String!]
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
    comments: [Comment]
    likes: Int!
  }

  type Comment {
    id : ID!
    content: String!
    createdAt: String!
    authorId: String!
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
    bookmarks: [String]
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
    likes: Int
  }
  input NewCommentInput {
    content: String!
    postId: ID!
    authorId: String!
  }
  input UpdateCommentInput {
    id: ID!
    content: String
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
    createComment(input: NewCommentInput): Comment
    updateComment(input: UpdateCommentInput): Comment
    deleteComment(id: ID!): String
    likePost(postId: ID!): Post
    addBookmark(userId: ID!, postSlug: String!): User
  }
`;

export default typeDefs;
