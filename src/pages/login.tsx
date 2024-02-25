import React from 'react';
import Link from 'next/link';
import {
  Flex,
  Input,
  Button,
  VStack,
  useToast,
  Container,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import router from 'next/router';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const toast = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    const result = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (result?.status === 200) {
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      router.replace("/");
    } else {
      toast({
        title: 'Error',
        description: result?.error || 'An error occurred',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex height="calc(100vh - 58px)" alignItems="center" justifyContent="center" bg="gray.50">
      <Container centerContent>
        <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })} />
            {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" type="password" {...register('password', { required: 'Password is required' })} />
            {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
          </FormControl>

          <Button mt={4} colorScheme="teal" type="submit" w="full">
            Login
          </Button>

          <Link href="/register" passHref>
            Don't have account?
          </Link>
        </VStack>
      </Container>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);

  if (session !== null && session.user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
};


export default LoginForm;
