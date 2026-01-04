import axios from 'axios';

// Use environment variables for API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

// Create a configured Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Set a reasonable timeout for requests
  timeout: 15000, 
});

/**
 * Request Interceptor: Inject Authorization Header
 * Retrieves the token from localStorage and adds it to the request configuration.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Optional: Add API Key for external services if necessary (e.g., TMDB public key)
    const externalApiKey = import.meta.env.VITE_EXTERNAL_API_KEY;
    if (externalApiKey && config.url && config.url.includes('tmdb_path')) {
      config.params = {
        ...config.params,
        api_key: externalApiKey,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor: Handle Global Errors (Authentication, Server Issues)
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      // Handle request cancellation gracefully
      console.log('Request cancelled:', error.message);
      return Promise.reject(error);
    }
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      // 401 Unauthorized: Token expired or invalid
      if (status === 401) {
        console.warn('API Error 401: Unauthorized. Clearing session.');
        // In a real application, you would dispatch a logout action or redirect
        // localStorage.removeItem('authToken');
        // window.location.href = '/login'; 
      }

      // 403 Forbidden: User lacks permissions
      if (status === 403) {
        console.warn('API Error 403: Forbidden access.');
      }

      // 5xx Server Errors
      if (status >= 500) {
        console.error('API Error 5xx:', data.message || 'Internal Server Error');
      }

      // Log the specific error details
      console.error(`API Error [${status}]:`, data.message || 'Unknown Error');

    } else if (error.request) {
      // The request was made but no response was received (e.g., network issues)
      console.error('Network Error: The server did not respond.');
    } else {
      // Something happened in setting up the request
      console.error('Axios Setup Error:', error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * Utility function to manage authentication token externally
 */
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
};

export default api;