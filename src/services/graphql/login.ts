import { gql } from '@apollo/client';

export const MUTATION_LOGIN = gql`
  mutation Login($input: LoginInputType!) {
    login(input: $input) {
      token
      success
      user {
        id
        createdAt
        updatedAt
        username
        email
        isActive
      }
    }
  }
`;
