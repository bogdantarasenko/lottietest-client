import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { Text, Box, Button, Heading, Flex, Divider } from '@chakra-ui/react'; // Import Flex for responsive design
import { PopUp } from '@/components/ui';
import LottieUpload from '@/components/lottieUpload';
import { useNetworkStatus } from '@/lib/utils';

export const Header: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const networkStatus = useNetworkStatus();

  const handlerLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    signOut();
  };

  const handlerUpload = () => {
    setIsOpen(true);
  }

  const AuthInfo = useMemo(() => {
    if (session) {
      return (
        <Flex align="center" direction={['column', 'row']} wrap="wrap">
          <Box mr={[0, 5]} mb={[2, 0]} textAlign="center">{session.user ? session.user.email : 'ERROR'}</Box>

          <Flex mb={[2, 0]} justify="center" wrap="wrap">
            {router.pathname === '/my' && (
              <Button size="sm" onClick={handlerUpload} mr={2}>
                Upload
              </Button>
            )}
            <Button size="sm" onClick={handlerLogout}>
              Logout
            </Button>
          </Flex>
        </Flex>
      );
    } else {
      return (
        <NextLink href="/login">
          Login
        </NextLink>
      );
    }
  }, [session, router.pathname]);

  return (
    <>
      <Box h="auto" bg="headerBg" px={[4, 10]} py={[3, 5]} display="flex" flexDirection={['column', 'row']} justifyContent="space-between" alignItems="center">
        <Flex align="center" direction={['column', 'row']}>
          <Box mr={[0, 5]} textAlign="center">
            <NextLink href="/">
              <Heading size="md" mb={[2, 0]}>LottieTest</Heading>
            </NextLink>
          </Box>
          <Flex mb={[2, 0]} justify="center" wrap="wrap">
            <Box textAlign="center" mr="2">
              <NextLink href="/">
                All Lotties
              </NextLink>
            </Box>
            {session && (
              <Box textAlign="center">
                <NextLink href="/my">
                  My Lotties
                </NextLink>
              </Box>
            )}
          </Flex>
        </Flex>
        {AuthInfo}
      </Box>
      {!networkStatus.online && (
        <Box py={3} h="auto" display="flex" justifyContent="center" alignItems="center" flexDirection="column" borderBottom="1px solid #f0f5fa">
          Youre are offline
        </Box >
      )}
      {isOpen && (
        <PopUp
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <LottieUpload onUploaded={() => setIsOpen(false)} />
        </PopUp>
      )}
    </>
  );
};
