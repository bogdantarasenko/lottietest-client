import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MUTATION_LOGIN } from "@/services/graphql/login";
import { createApolloClient } from "@/services/graphql/apolloClient";

export const authOptions: NextAuthOptions = {
  secret: 'SECRET',
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          type: "text",
          label: "email",
          placeholder: "Email",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        try {
          const client = await createApolloClient('');
          const { data } = await client.mutate({
            mutation: MUTATION_LOGIN,
            variables: {
              input: {
                email: credentials?.email || '',
                password: credentials?.password || '',
              }
            },
          });
          if (data && data.login) {
            return data.login;
          } else {
            return null;
          }
        } catch (error) {
          throw new Error('Login failed');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

export default NextAuth(authOptions);
