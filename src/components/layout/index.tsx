import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Header } from '@/components/header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex direction="column">
      <Header />
      <Box w="full">{children}</Box>
    </Flex>
  );
};

export default Layout;
