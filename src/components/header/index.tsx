import NextLink from 'next/link';
import React, { useMemo, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { PopUp } from '@/components/ui';
import LottieUpload from '@/components/lottieUpload';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const handlerLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    signOut();
  };

  const handlerUpload = () => {
    setIsOpen(true);
  }

  const AuthInfo = useMemo(() => {
    if (session) {
      return (
        <Box display="flex" alignItems="center">
          <Box mr="5">{session.user ? session.user.email : 'ERROR'}</Box>

          <Box mr="5">
            <Button size="sm" onClick={handlerUpload}>
              Upload
            </Button>
          </Box>
          <Button size="sm" onClick={handlerLogout}>
            Logout
          </Button>
        </Box>
      );
    } else {
      return (
        <NextLink href="/login">
          Login
        </NextLink>
      );
    }
  }, [session]);

  return (
    <>
      <Box h="58" bg="headerBg" display="flex" justifyContent="space-between" px="10" alignItems="center">
        <Box display="flex" alignItems="center">
          <Box mr="5">
            <NextLink href="/">
              <Heading size="md">LottieTest</Heading>
            </NextLink>
          </Box>
          {session && (
            <NextLink href="/my">
              My Lotties
            </NextLink>
          )}
        </Box>
        {AuthInfo}
      </Box>
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
