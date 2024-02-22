import { gql } from '@apollo/client';

// Define the GraphQL mutation
export const UPLOAD_MUTATION = gql`
  mutation CreateLottie($file: Upload!, $input: CreateLottieInput!) {
    create(file: $file, input: $input) {
      id
      createdAt
      updatedAt
      tags
      path
      author {
        id
        username
      }
    }
  }
`;
