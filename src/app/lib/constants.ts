import { gql } from '@apollo/client';

export const FETCH_USERS = gql`
  query getUsers {
    users {
      id
      email
      isValidated
      bookmarks
    }
  }
`;
export const FETCH_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      email
      isValidated
      bookmarks
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($input: NewUserInput!) {
    createUser(input: $input) {
      email
      id
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      email
      id
      isValidated
    }
  }
`;

export const CONFIRM_PASSWORD = gql`
  mutation ConfirmPassword($id: ID!, $password: String!) {
    confirmPassword(id: $id, password: $password) 
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }
`;
export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      id
    }
  }
`;
export const LIKE_POST = gql`
  mutation LikePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes
    }
  }
`;

export const ADD_BOOKMARK = gql`
  mutation AddBookmark($userId: ID!, $postId: ID!) {
    addBookmark(userId: $userId, postId: $postId) {
      id
      bookmarks
    }
  }
`;
export const FETCH_POSTS = gql`
  query getPosts {
    posts {
      id
      title
      content
      slug
      likes
      timeToRead
      isPublished
      tags {
        tag
        color
      }
      createdAt
      updatedAt
    }
  }
`;
export const FETCH_POST_BY_ID = gql`
  query getPost($id: ID!) {
    post(id: $id) {
      id
      title
      content
      slug
      likes
      timeToRead
      isPublished
      tags {
        tag
        color
      }
      createdAt
      updatedAt
    }
  }
`;

export const FETCH_POST = gql`
  query getPost($slug: String!) {
    postBySlug(slug: $slug) {
      id
      title
      content
      slug
      likes
      timeToRead
      isPublished
      tags {
        tag
        color
      }

      createdAt
      updatedAt
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($input: NewPostInput!) {
    createPost(input: $input) {
      id
      title
      content
      tags {
        tag
        color
      }
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_POST_PUBLISHED_STATUS = gql`
  mutation UpdatePostPublishedStatus($id: ID!, $isPublished: Boolean!) {
    updatePost(id: $id, input: {isPublished: $isPublished}) {
      id
      isPublished
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
      id
      title
      content
      tags {
        tag
        color
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($deletePostId: ID!) {
    deletePost(id: $deletePostId)
  }
`; 
export const FETCH_COMMENTS = gql`
  query getComments($postId: ID!) {
    post(id: $postId) {
      comments {
        id
        content
        createdAt
        authorId
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $content: String!, $authorId: String!) {
    createComment(input: {postId: $postId, content: $content, authorId: $authorId}) {
      id
      content
      authorId
    }
  }
`;
    

export const UPDATE_COMMENT = gql`
  mutation updateComment($postId: ID!, $commentId: ID!, $content: String!) {
    updateComment(
      input: {postId: $postId, commentId: $commentId, content: $content}
    ) {
      id
      content
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId)
  }
`;
