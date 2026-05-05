/**
 * Customer Service
 * 
 * Handles all customer-related API operations.
 * Works with both mock data (JSON files) and real API endpoints.
 */

import { api, ApiResponse, ApiError } from './apiClient';
import { ENDPOINTS } from './api.config';

// Types matching your current Customer data structure
export interface Customer {
  id: number;
  name: string;
  mobile: string;
  orders: number;
  spent: number;
}

export interface CustomersResponse {
  customers: Customer[];
  meta: {
    total: number;
    lastUpdated: string;
  };
}

export interface CustomerStats {
  totalCustomers: number;
  totalOrders: number;
  totalRevenue: number;
}

/**
 * Get all customers
 * GET /customers
 */
export async function getCustomers(): Promise<Customer[]> {
  try {
    const response = await api.get<CustomersResponse>(ENDPOINTS.customers.list);
    return response.data.customers;
  } catch (error) {
    console.error('Failed to fetch customers:', error);
    throw error;
  }
}

/**
 * Get customer by ID
 * GET /customers/:id
 */
export async function getCustomerById(id: number): Promise<Customer | null> {
  try {
    const response = await api.get<Customer>(ENDPOINTS.customers.getById(id));
    return response.data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    console.error(`Failed to fetch customer ${id}:`, error);
    throw error;
  }
}

/**
 * Create new customer
 * POST /customers
 */
export async function createCustomer(
  customerData: Omit<Customer, 'id'>
): Promise<Customer> {
  try {
    const response = await api.post<Customer>(
      ENDPOINTS.customers.create,
      customerData
    );
    return response.data;
  } catch (error) {
    console.error('Failed to create customer:', error);
    throw error;
  }
}

/**
 * Update customer
 * PUT /customers/:id
 */
export async function updateCustomer(
  id: number,
  customerData: Partial<Customer>
): Promise<Customer> {
  try {
    const response = await api.put<Customer>(
      ENDPOINTS.customers.update(id),
      customerData
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to update customer ${id}:`, error);
    throw error;
  }
}

/**
 * Delete customer
 * DELETE /customers/:id
 */
export async function deleteCustomer(id: number): Promise<void> {
  try {
    await api.delete(ENDPOINTS.customers.delete(id));
  } catch (error) {
    console.error(`Failed to delete customer ${id}:`, error);
    throw error;
  }
}

/**
 * Get customer statistics
 * Calculates from customer data
 */
export function calculateCustomerStats(customers: Customer[]): CustomerStats {
  return {
    totalCustomers: customers.length,
    totalOrders: customers.reduce((sum, c) => sum + c.orders, 0),
    totalRevenue: customers.reduce((sum, c) => sum + c.spent, 0),
  };
}

/**
 * Export customers to CSV format
 * Returns name and mobile only (as per your requirement)
 */
export function exportCustomersToCSV(customers: Customer[]): string {
  const rows = [
    'Name,Mobile',
    ...customers.map(c => `${c.name},${c.mobile}`),
  ];
  return rows.join('\n');
}

/**
 * Download customers as CSV file
 */
export function downloadCustomersCSV(customers: Customer[], filename = 'customers.csv'): void {
  const csvContent = exportCustomersToCSV(customers);
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Default export for convenience
const customerService = {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  calculateCustomerStats,
  exportCustomersToCSV,
  downloadCustomersCSV,
};

export default customerService;
