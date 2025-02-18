import CredentialsProvider from 'next-auth/providers/credentials';
import { endpoints } from '@repo/ui/lib';
import { IJwtPayload, IUser } from '@repo/ui/types';
import { default as jwtLib } from 'jsonwebtoken';
import { AuthOptions } from 'next-auth';

async function refreshAccessToken(token: any) {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}${endpoints.refresh}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token.refreshToken}`,
          },
        },
      );
      const tokens = await response.json();
      if (!response.ok) {
        throw tokens;
      }
      return {
        ...token,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
      };
    } catch (error) {
      console.log('Refresh Token Error', error);
      return {
        ...token,
        error: 'RefreshAccessTokenError',
      };
    }
  }

export const authOptions : AuthOptions = {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: {
            label: 'Username',
            type: 'text',
            placeholder: 'Enter Username',
          },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          try {
            const res = await fetch(
              `${process.env.BACKEND_URL}${endpoints.login}`,
              {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { 'Content-Type': 'application/json' },
              },
            );
  
            if (!res.ok) {
              return null;
            }
  
            const parsedResponse = await res.json();
            // accessing the accessToken returned by server
            const accessToken = parsedResponse.accessToken;
            const refreshToken = parsedResponse.refreshToken;
            
            const { user, permissions, exp } = jwtLib.decode(accessToken) as IJwtPayload;
            
            // Ensure to return an object that conforms to `CustomUser` type
            return {
              user,
              accessToken,
              refreshToken,
              permissions,
              exp: exp
            } as any;
  
          } catch (e) {
            return null;
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }: any) {
        if (token.accessToken) {
          const decodedToken = jwtLib.decode(token.accessToken) as IJwtPayload;
          if (decodedToken) {
            token.accessTokenExpires = decodedToken.exp ? decodedToken.exp * 1000 : Date.now();
            token.user = decodedToken?.user;
            token.permissions = decodedToken?.permissions;
          }
        }
  
        if (user) {
          return {
            ...token,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
          };
        }
  
        if (Date.now() < token.accessTokenExpires) {
          return token;
        }
  
        return refreshAccessToken(token);
      },
      async session({ session, token }: any) {
        if (token) {
          session.accessToken = token.accessToken;
          session.refreshToken = token.refreshToken;
          session.user = token.user;
          session.permissions = token.permissions;
          session.accessTokenExpires = token.accessTokenExpires;
          session.error = token.error;
        }
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt' as const,
    },
  };