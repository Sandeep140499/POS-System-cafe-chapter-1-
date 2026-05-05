/**
 * Services Index
 *
 * Centralized exports for all API services.
 * Import from here: import { customerService } from '@/services';
 */

// Configuration
export {
  USE_MOCK_API,
  BASE_URL,
  ENDPOINTS,
  REQUEST_TIMEOUT,
  MOCK_DELAY_MS,
  DEFAULT_PAGE_SIZE,
} from './api.config';

// API Client
export { api, apiRequest } from './apiClient';

// API Client Types
export type { ApiResponse, ApiError } from './apiClient';

// Customer Service
export {
  default as customerService,
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  calculateCustomerStats,
  exportCustomersToCSV,
  downloadCustomersCSV,
} from './customerService';

// Types (must be exported separately for isolatedModules)
export type { Customer, CustomersResponse, CustomerStats } from './customerService';
