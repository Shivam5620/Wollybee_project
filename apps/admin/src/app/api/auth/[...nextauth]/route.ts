import NextAuth from 'next-auth/next';
import { IJwtPayload, IUser } from '@repo/ui/types';
import { authOptions } from './authUtils';


// Define a custom type that extends the `User` type from NextAuth

declare module 'next-auth' {
  interface Session {
    user: IUser;
    accessToken: string;
    permissions: string[];
    refreshToken: string;
    exp: string;
    error?: string;
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
