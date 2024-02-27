import {gql} from '@apollo/client';

export const FETCH_USERS = gql`
  query getUsers {
    users {
      id
      email
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
export const FETCH_POSTS = gql`
  query getPosts {
    posts {
      id
      title
      content
      slug
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
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($postId: ID!, $content: String!) {
    createComment(input: {postId: $postId, content: $content}) {
      id
      content
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
