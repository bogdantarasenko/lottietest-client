// components/RegisterForm.js
import React from 'react';
import Link from 'next/link';
import router from 'next/router';
import { useForm } from 'react-hook-form';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import {
  Flex,
  Input,
  Button,
  VStack,
  useToast,
  Container,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { MUTATION_REGISTER } from '@/services/graphql/register';
import { authOptions } from './api/auth/[...nextauth]';

interface RegisterFormInputs {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const toast = useToast();
  const [createUser] = useMutation(MUTATION_REGISTER);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormInputs>();

  const validatePasswordsMatch = (confirmPassword: string) => {
    return confirmPassword === watch('password');
  };

  const onSubmit = (data: RegisterFormInputs) => {
    createUser({ variables: { input: data } });
    toast({
      title: 'Registration Successful.',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
    router.replace("/login");
  };

  return (
    <Flex height="calc(100vh - 58px)" alignItems="center" justifyContent="center" bg="gray.50">
      <Container centerContent>
        <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4} padding="8">
          <FormControl isInvalid={!!errors.username}>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input id="username" type="text" {...register('username', { required: 'Username is required' })} />
            <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input id="email" type="email" {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })} />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input id="password" type="password" {...register('password', { required: 'Password is required' })} />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.confirmPassword}>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input id="confirmPassword" type="password" {...register('confirmPassword', { required: 'Please confirm your password', validate: validatePasswordsMatch })} />
            {errors.confirmPassword && <FormErrorMessage>{errors.confirmPassword.type === 'validate' ? 'Passwords must match' : errors.confirmPassword.message}</FormErrorMessage>}
          </FormControl>

          <Button mt={4} colorScheme="teal" type="submit" w="full">
            Register
          </Button>

          <Link href="/login" passHref>
            Already have account?
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

export default RegisterForm;
