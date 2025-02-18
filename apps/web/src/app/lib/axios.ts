import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authUtils';
import { endpoints, profileRoutes } from '@repo/ui/lib';
import { signIn, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

const ax = axios.create({
  baseURL: process.env.BACKEND_URL,
});

// Add a request interceptor
ax.interceptors.request.use(
  async function (config) {
    // Fetch the session token
    const session = await getServerSession(authOptions);
    if (session?.accessToken) {
      config.headers['Content-Type'] = 'application/json';
      config.headers['Authorization'] = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  function (error) {
    console.log(
      'ERROR : AXIOS REQUEST INTERCEPTOR ERROR',
      JSON.stringify(error),
    );
    // Do something with request error
    return Promise.reject(error);
  },
);

ax.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log(
      'ERROR : AXIOS RESPONSE INTERCEPTOR ERROR',
      JSON.stringify(error),
    );
    const originalRequest = error.config;

    if (
      process.env.NEXT_NODE_ENV === 'production' &&
      error.response?.status >= 500
    ) {
      error.message = 'Oops Try again Later';
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const session = await getServerSession(authOptions);
        if (session?.refreshToken) {
          // Call the refresh token endpoint
          const refreshResponse = await axios.post(
            `${process.env.BACKEND_URL}${endpoints.refresh}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${session.refreshToken}`,
              },
            },
          );

          // Update the session with the new tokens
          const tokens = refreshResponse.data;
          await signIn('credentials', {
            redirect: false,
            refreshToken: tokens.refreshToken,
            accessToken: tokens.accessToken,
          });

          // Retry the original request with the new token
          originalRequest.headers['Authorization'] =
            `Bearer ${tokens.accessToken}`;
          return ax(originalRequest);
        }
      } catch (refreshError) {
        console.error('Failed to refresh token', refreshError);

        // Sign out the user
        await signOut({ redirect: false });

        // Redirect to the login page
        redirect(profileRoutes.login);
      }
    }

    return Promise.reject(error);
  },
);

export default ax;
