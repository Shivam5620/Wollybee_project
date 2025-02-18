import axios from 'axios';

const ax = axios.create({
  baseURL: process.env.BACKEND_URL,
});


// Add a request interceptor
ax.interceptors.request.use(  function (config) {
   // Fetch the session token
   const token = sessionStorage.getItem('at');

   if (token) {
     config.headers['Authorization'] = `Bearer ${token}`;
   }

   return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


// Add a response interceptor
ax.interceptors.response.use(
  function (response) {
  
    
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.error(error.response?.data?.message ?? error.message);
    return Promise.reject(error);
  }
);

export default ax;
