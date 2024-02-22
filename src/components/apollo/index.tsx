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

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}

export const ApolloProviderWrapper = ({ children }: PropsWithChildren<any>) => {
  const { data, status } = useSession();

  if (status === 'loading') return null;

  return (
    <ApolloProviderClient sessionToken={data?.user.token || ''}>
      {children}
    </ApolloProviderClient>
  );
};
