/**
 * API Client
 * 
 * A centralized HTTP client that handles all API requests.
 * Supports both mock data (JSON files) and real API endpoints.
 */

import { 
  USE_MOCK_API, 
  BASE_URL, 
  REQUEST_TIMEOUT, 
  MOCK_DELAY_MS 
} from './api.config';

// API Response wrapper
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// API Error
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Request options
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
}

/**
 * Mock delay to simulate network latency
 */
const mockDelay = (ms: number = MOCK_DELAY_MS): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Import JSON mock data dynamically
 */
const importMockData = async <T>(endpoint: string): Promise<T> => {
  // Map endpoints to JSON files
  const fileMap: Record<string, string> = {
    '/customers': '/src/data/json/customers.json',
    '/orders': '/src/data/json/orders.json',
    '/raised-requests': '/src/data/json/raised-requests.json',
  };

  // Find matching file (handle dynamic routes like /customers/123)
  let filePath = fileMap[endpoint];
  if (!filePath) {
    // Try to match base path for dynamic routes
    const basePath = endpoint.split('/').slice(0, 2).join('/');
    filePath = fileMap[basePath];
  }

  if (!filePath) {
    throw new ApiError(404, `Mock data not found for endpoint: ${endpoint}`);
  }

  try {
    // Dynamic import of JSON file
    const module = await import(/* @vite-ignore */ filePath);
    return module.default || module;
  } catch (error) {
    console.error('Failed to load mock data:', error);
    throw new ApiError(500, 'Failed to load mock data');
  }
};

/**
 * Make API request
 * Handles both mock data and real API calls
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { method = 'GET', headers = {}, body, timeout = REQUEST_TIMEOUT } = options;

  try {
    // MOCK API: Load from JSON files
    if (USE_MOCK_API) {
      await mockDelay();
      
      // Handle DELETE operation in mock mode
      if (method === 'DELETE') {
        // In real implementation, this would modify localStorage or state
        return {
          data: {} as T,
          status: 200,
          message: 'Deleted successfully',
        };
      }

      // Handle POST/PUT/PATCH in mock mode
      if (['POST', 'PUT', 'PATCH'].includes(method) && body) {
        // In mock mode, return the body as if it was saved
        // In production, this would send to real API
        return {
          data: { ...body, id: Date.now() } as T,
          status: 200,
          message: 'Saved successfully',
        };
      }

      // GET request - load from JSON
      const data = await importMockData<T>(endpoint);
      return {
        data,
        status: 200,
      };
    }

    // REAL API: Make actual HTTP request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const url = `${BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        errorData.message || `HTTP Error: ${response.status}`,
        errorData.errors
      );
    }

    const data = await response.json();
    return {
      data,
      status: response.status,
    };

  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new ApiError(408, 'Request timeout');
      }
      throw new ApiError(500, error.message);
    }
    
    throw new ApiError(500, 'Unknown error occurred');
  }
}

/**
 * Helper functions for common HTTP methods
 */
export const api = {
  get: <T>(endpoint: string, options?: Omit<RequestOptions, 'method'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'POST', body }),

  put: <T>(endpoint: string, body: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'PUT', body }),

  patch: <T>(endpoint: string, body: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'PATCH', body }),

  delete: <T>(endpoint: string, options?: Omit<RequestOptions, 'method'>) =>
    apiRequest<T>(endpoint, { ...options, method: 'DELETE' }),
};

export default api;
