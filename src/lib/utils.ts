import { Lottie } from '@/types/gql/graphql';
import { ApolloClient, DocumentNode } from '@apollo/client';
import { useState, useEffect } from 'react';

export const isServer = () => typeof window === 'undefined';
export const isClient = () => typeof window !== 'undefined';

export function useNetworkStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const setOnlineStatus = () => setOnline(true);
    const setOfflineStatus = () => setOnline(false);

    window.addEventListener('online', setOnlineStatus);
    window.addEventListener('offline', setOfflineStatus);

    return () => {
      window.removeEventListener('online', setOnlineStatus);
      window.removeEventListener('offline', setOfflineStatus);
    };
  }, []);

  return { online };
}

export const filterLottiesOfflineWithTags = (apolloClient: ApolloClient<object>, query: DocumentNode, tags: string[], page: number, pageSize: number, totalPages: number, path: string) => {
  let filtered: Lottie[] = [];

  for (let currentPage = 1; ; currentPage++) {
    const cachedData = apolloClient.readQuery({
      query,
      variables: { page: currentPage, pageSize, tags: [] },
    });

    if (!cachedData || !cachedData[path] || cachedData[path].results.length === 0) {
      break; // Exit the loop if no more cached data is found
    }

    // Update total pages based on the cached data
    totalPages = cachedData[path].totalPages;

    // Filter lotties by tags if tags are specified
    if (tags.length > 0) {
      const filteredByTags = cachedData[path].results.filter((lottie: Lottie) =>
        lottie.tags.some(tag => tags.includes(tag))
      );
      filtered = filtered.concat(filteredByTags);
    } else {
      filtered = filtered.concat(cachedData[path].results);
    }
  }

  if (tags.length > 0) {
    filtered = filtered.filter(lottie => lottie.tags.some(tag => tags.includes(tag)));
  }

  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  const startIndex = (page - 1) * pageSize;
  const results = filtered.slice(startIndex, startIndex + pageSize);

  return {
    results,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
}
