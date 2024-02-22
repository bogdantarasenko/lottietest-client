import React from 'react';
import { isServer } from '@/lib/utils';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

let prevToken: string | null = null;
let _apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const httpLink = createUploadLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  credentials: 'include'
});

export const createApolloClient = (token: string) => {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        'content-type': 'application/json',
        'apollo-require-preflight': 'true',
      }
    }
  });
  return new ApolloClient({
    ssrMode: isServer(),
    link: authLink.concat(httpLink),
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
    cache: new InMemoryCache(),
  });
};

export const initializeApollo = (initialState = {}, token: string) => {
  const client = _apolloClient ?? createApolloClient(token);

  if (!_apolloClient || prevToken !== token) {
    prevToken = token;
    _apolloClient = createApolloClient(token);
  }

  if (initialState) {
    const existCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existCache, ...initialState });
  }

  if (isServer()) {
    return client;
  }

  if (!_apolloClient) {
    _apolloClient = client;
  }

  return _apolloClient;
};

export const useApollo = (initialState: NormalizedCacheObject, token: string) => {
  return React.useMemo(() => initializeApollo(initialState, token), [initialState, token]);
};
