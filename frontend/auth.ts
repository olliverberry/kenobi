import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { Provider } from 'next-auth/providers';

declare module 'next-auth' {
  interface User {
    userId: number;
    email: string;
    firstName: string;
    lastName: string;
    businessUnit: string;
    title: string;
  }

  interface Session {
    user: User & DefaultSession['user'];
  }
}

const providers: Provider[] = [
  Credentials({
    credentials: {
      email: {
        type: 'email',
        label: 'Email',
        placeholder: 'john@example.com',
      },
      password: {
        type: 'password',
        label: 'Password',
        placeholder: '********',
      },
    },
    authorize: async (credentials) => {
      try {
        // Use the API route instead of direct backend call
        const response = await fetch(`${process.env.AUTH_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (!response.ok) {
          throw new Error('Invalid credentials.');
        }

        const user = await response.json();
        if (!user?.success) {
          throw new Error('Invalid credentials.');
        }
        return user.data;
      } catch (error) {
        throw error;
      }
    },
  }),
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  pages: {
    signIn: '/signin',
    error: '/error',
  },
  callbacks: {
    async redirect({ baseUrl }) {
      // Always redirect to dashboard after successful signin
      return `${baseUrl}/dashboard`;
    },
    async jwt({ token, user }) {
      // Persist the user data to the token
      if (user) {
        token.userId = user.userId;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.businessUnit = user.businessUnit;
        token.title = user.title;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      return {
        ...session,
        user: {
          ...session.user,
          userId: token.userId as number,
          firstName: token.firstName as string,
          lastName: token.lastName as string,
          businessUnit: token.businessUnit as string,
          title: token.title as string,
        },
      };
    },
  },
});
