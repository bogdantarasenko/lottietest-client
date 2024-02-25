import { PropsWithChildren } from 'react';
import { useSession } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/services/graphql/apolloClient';

interface ApolloProviderChildProps {
  sessionToken: string;
  children: PropsWithChildren<any>;
}

const ApolloProviderClient = ({ sessionToken, children }: ApolloProviderChildProps) => {
  const apolloClient = useApollo({}, sessionToken);

  if (apolloClient) {
    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
  } else {
    return null;
  }
}

export const ApolloProviderWrapper = ({ children }: PropsWithChildren) => {
  const { data, status } = useSession();

  if (status === 'loading') return null;

  const sessionToken = data?.user?.token || '';

  return (
    <ApolloProviderClient sessionToken={sessionToken}>
      {children}
    </ApolloProviderClient>
  );
};
