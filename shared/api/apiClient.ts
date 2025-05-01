import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { supabase } from '../supabase/client';

// Create a base API client with common configuration
const createApiClient = (): AxiosInstance => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.EXPO_PUBLIC_API_URL || '/api/v1';
  
  const client = axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add request interceptor to include auth token
  client.interceptors.request.use(async (config) => {
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  });

  // Add response interceptor for error handling
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle common errors
      if (error.response) {
        // Server responded with a status code outside of 2xx range
        console.error('API Error:', error.response.data);
        
        // Handle authentication errors
        if (error.response.status === 401) {
          // Redirect to login or refresh token
          console.error('Authentication error');
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network Error:', error.request);
      } else {
        // Something else happened while setting up the request
        console.error('Error:', error.message);
      }
      
      return Promise.reject(error);
    }
  );

  return client;
};

// API client instance
const apiClient = createApiClient();

// Generic API request function
export const apiRequest = async <T>(
  method: string,
  endpoint: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    let response: AxiosResponse<T>;
    
    switch (method.toLowerCase()) {
      case 'get':
        response = await apiClient.get<T>(endpoint, config);
        break;
      case 'post':
        response = await apiClient.post<T>(endpoint, data, config);
        break;
      case 'put':
        response = await apiClient.put<T>(endpoint, data, config);
        break;
      case 'patch':
        response = await apiClient.patch<T>(endpoint, data, config);
        break;
      case 'delete':
        response = await apiClient.delete<T>(endpoint, config);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
