import { gql } from "@apollo/client";

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
    signIn(email: $email, password: $password)
  }
`;

