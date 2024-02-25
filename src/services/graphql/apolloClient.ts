import React from 'react';
import { isServer } from '@/lib/utils';
import { setContext } from '@apollo/client/link/context';
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

let prevToken: string | null = null;
let _apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

const httpLink = createUploadLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  credentials: 'include'
});

export const createApolloClient = async (token: string) => {
  const cache = new InMemoryCache();

  if (!isServer()) {
    await persistCache({
      cache,
      storage: new LocalStorageWrapper(window.localStorage),
      // Consider adding debounce for performance optimization
      debounce: 1000,
    });
  }

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
    cache,
  });
};

export const initializeApollo = async (initialState = {}, token: string) => {
  let client = _apolloClient ?? await createApolloClient(token);

  if (!_apolloClient || prevToken !== token) {
    prevToken = token;
    _apolloClient = await createApolloClient(token);
    client = _apolloClient;
  }

  if (initialState) {
    const existCache = client.extract();
    client.cache.restore({ ...existCache, ...initialState });
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
  const [client, setClient] = React.useState<ApolloClient<NormalizedCacheObject> | null>(null);

  React.useEffect(() => {
    initializeApollo(initialState, token).then(setClient);
  }, [initialState, token]);

  return client;
};
