import React from 'react';
import NextLink from 'next/link';
import { Box, Heading, Stack, Text } from '@chakra-ui/react';

const AccessDenied: React.FC = () => {
  return (
    <Box w="full" h="calc(100vh - 58px)" display="flex" alignItems="center" justifyContent="center">
      <Stack align="center">
        <Heading>Access Denied</Heading>
        <Text>
          <NextLink href="/login">
            LOGIN
          </NextLink>
        </Text>
      </Stack>
    </Box>
  );
};

export default AccessDenied;
