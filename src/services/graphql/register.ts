import { gql } from '@apollo/client';

export const MUTATION_REGISTER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      username
      email
      isActive
      createdAt
      updatedAt
    }
  }
`;
