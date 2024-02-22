import { gql } from '@apollo/client';

export const QUERY_MY_LOTTIES = gql`
  query GetMyLotties($page: Int, $pageSize: Int, $tags: [String!]) {
    getMy(input: {page: $page, pageSize: $pageSize, tags: $tags}) {
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
