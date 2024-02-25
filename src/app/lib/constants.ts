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
