/**
 * API Configuration
 *
 * This file controls whether the app uses MOCK data or REAL API endpoints.
 *
 * When you're ready to switch to real APIs:
 * 1. Set USE_MOCK_API = false
 * 2. Update BASE_URL to your real API base URL
 * 3. Remove the mock delay in apiClient.ts
 *
 * The service layer will automatically use the real endpoints.
 */

// Toggle between mock and real API
export const USE_MOCK_API = true;

// Base URL for real API (update this when switching to production)
export const BASE_URL = USE_MOCK_API
  ? '/src/data/json' // Mock data path (relative to public or import path)
  : 'https://api.yourdomain.com/v1'; // Replace with your real API base URL

// API endpoints configuration
export const ENDPOINTS = {
  customers: {
    list: '/customers',
    getById: (id: number) => `/customers/${id}`,
    create: '/customers',
    update: (id: number) => `/customers/${id}`,
    delete: (id: number) => `/customers/${id}`,
    export: '/customers/export',
  },
  orders: {
    list: '/orders',
    getById: (id: string) => `/orders/${id}`,
    create: '/orders',
    update: (id: string) => `/orders/${id}`,
    delete: (id: string) => `/orders/${id}`,
  },
  raisedRequests: {
    list: '/raised-requests',
    getById: (id: number) => `/raised-requests/${id}`,
    create: '/raised-requests',
    update: (id: number) => `/raised-requests/${id}`,
    delete: (id: number) => `/raised-requests/${id}`,
    updateStatus: (id: number) => `/raised-requests/${id}/status`,
  },
  dashboard: {
    stats: '/dashboard/stats',
    sales: '/dashboard/sales',
    targets: '/dashboard/targets',
  },
} as const;

// Request timeout in milliseconds
export const REQUEST_TIMEOUT = 10000;

// Mock API delay (simulates network latency)
export const MOCK_DELAY_MS = 400;

// Default pagination
export const DEFAULT_PAGE_SIZE = 10;
