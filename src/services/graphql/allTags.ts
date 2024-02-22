
import { gql } from '@apollo/client';

export const QUERY_ALL_TAGS = gql`
  query GetAllUniqueTags {
    getTags
  }
`;
