import { gql } from '@apollo/client';

export const QUERY_ALL_LOTTIES = gql`
  query GetAllLotties($page: Int, $pageSize: Int, $tags: [String!]) {
    getAll(input: {page: $page, pageSize: $pageSize, tags: $tags}) {
      page
      totalCount
      totalPages
      hasNextPage
      hasPreviousPage
      results {
        id
        createdAt
        updatedAt
        tags
        author {
          id
          username
          email
        }
        path
      }
    }
  }
`;
