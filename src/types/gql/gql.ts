/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query GetAllLotties($page: Int, $pageSize: Int, $tags: [String!]) {\n    getAll(input: {page: $page, pageSize: $pageSize, tags: $tags}) {\n      page\n      totalCount\n      totalPages\n      hasNextPage\n      hasPreviousPage\n      results {\n        id\n        createdAt\n        updatedAt\n        tags\n        author {\n          id\n          username\n          email\n        }\n        path\n      }\n    }\n  }\n": types.GetAllLottiesDocument,
    "\n  query GetAllUniqueTags {\n    getTags\n  }\n": types.GetAllUniqueTagsDocument,
    "\n  mutation DeleteLottie($input: LottieIdInput!) {\n    delete(input: $input) {\n      success\n    }\n  }\n": types.DeleteLottieDocument,
    "\n  mutation Login($input: LoginInputType!) {\n    login(input: $input) {\n      token\n      success\n      user {\n        id\n        createdAt\n        updatedAt\n        username\n        email\n        isActive\n      }\n    }\n  }\n": types.LoginDocument,
    "\n  query GetMyLotties($page: Int, $pageSize: Int, $tags: [String!]) {\n    getMy(input: {page: $page, pageSize: $pageSize, tags: $tags}) {\n      page\n      totalCount\n      totalPages\n      hasNextPage\n      hasPreviousPage\n      results {\n        id\n        createdAt\n        updatedAt\n        tags\n        author {\n          id\n          username\n          email\n        }\n        path\n      }\n    }\n  }\n": types.GetMyLottiesDocument,
    "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      username\n      email\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation CreateLottie($file: Upload!, $input: CreateLottieInput!) {\n    create(file: $file, input: $input) {\n      id\n      createdAt\n      updatedAt\n      tags\n      path\n      author {\n        id\n        username\n      }\n    }\n  }\n": types.CreateLottieDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllLotties($page: Int, $pageSize: Int, $tags: [String!]) {\n    getAll(input: {page: $page, pageSize: $pageSize, tags: $tags}) {\n      page\n      totalCount\n      totalPages\n      hasNextPage\n      hasPreviousPage\n      results {\n        id\n        createdAt\n        updatedAt\n        tags\n        author {\n          id\n          username\n          email\n        }\n        path\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllLotties($page: Int, $pageSize: Int, $tags: [String!]) {\n    getAll(input: {page: $page, pageSize: $pageSize, tags: $tags}) {\n      page\n      totalCount\n      totalPages\n      hasNextPage\n      hasPreviousPage\n      results {\n        id\n        createdAt\n        updatedAt\n        tags\n        author {\n          id\n          username\n          email\n        }\n        path\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllUniqueTags {\n    getTags\n  }\n"): (typeof documents)["\n  query GetAllUniqueTags {\n    getTags\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteLottie($input: LottieIdInput!) {\n    delete(input: $input) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteLottie($input: LottieIdInput!) {\n    delete(input: $input) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($input: LoginInputType!) {\n    login(input: $input) {\n      token\n      success\n      user {\n        id\n        createdAt\n        updatedAt\n        username\n        email\n        isActive\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Login($input: LoginInputType!) {\n    login(input: $input) {\n      token\n      success\n      user {\n        id\n        createdAt\n        updatedAt\n        username\n        email\n        isActive\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMyLotties($page: Int, $pageSize: Int, $tags: [String!]) {\n    getMy(input: {page: $page, pageSize: $pageSize, tags: $tags}) {\n      page\n      totalCount\n      totalPages\n      hasNextPage\n      hasPreviousPage\n      results {\n        id\n        createdAt\n        updatedAt\n        tags\n        author {\n          id\n          username\n          email\n        }\n        path\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMyLotties($page: Int, $pageSize: Int, $tags: [String!]) {\n    getMy(input: {page: $page, pageSize: $pageSize, tags: $tags}) {\n      page\n      totalCount\n      totalPages\n      hasNextPage\n      hasPreviousPage\n      results {\n        id\n        createdAt\n        updatedAt\n        tags\n        author {\n          id\n          username\n          email\n        }\n        path\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      username\n      email\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($input: CreateUserInput!) {\n    createUser(input: $input) {\n      id\n      username\n      email\n      isActive\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateLottie($file: Upload!, $input: CreateLottieInput!) {\n    create(file: $file, input: $input) {\n      id\n      createdAt\n      updatedAt\n      tags\n      path\n      author {\n        id\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateLottie($file: Upload!, $input: CreateLottieInput!) {\n    create(file: $file, input: $input) {\n      id\n      createdAt\n      updatedAt\n      tags\n      path\n      author {\n        id\n        username\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;