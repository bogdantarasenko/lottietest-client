import React, { ReactElement } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { MockedProvider } from '@apollo/client/testing';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import theme from '../src/styles/theme';

interface AllProvidersProps {
  children: React.ReactNode;
}

export const AllProviders: React.FC<AllProvidersProps> = ({ children }) => {
  const session = {
    expires: '',
    user: {
      email: '',
      name: '',
      token: ''
    },
  };

  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session}>
        <MockedProvider mocks={[]} addTypename={false}>
          {children}
        </MockedProvider>
      </SessionProvider>
    </ChakraProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>) =>
  render(ui, { wrapper: AllProviders, ...options }) as RenderResult;

export * from '@testing-library/react';
export { customRender as render };
