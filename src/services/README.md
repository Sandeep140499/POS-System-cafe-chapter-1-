# API Service Layer

This directory contains a professional mock API setup that makes it easy to switch to real APIs in the future.

## Architecture

```
services/
├── api.config.ts      # API configuration & endpoint definitions
├── apiClient.ts       # HTTP client with error handling
├── customerService.ts # Customer API operations
├── index.ts           # Barrel exports
└── README.md          # This file

data/json/
├── customers.json     # Mock customer data
├── orders.json        # Mock orders data
└── raised-requests.json # Mock requests data
```

## How It Works

### 1. Mock API Mode (Current)

Data flows: **JSON File** → `apiClient.ts` (import) → `customerService.ts` → **Component**

The `USE_MOCK_API = true` flag in `api.config.ts` enables mock mode:
- Data is loaded from JSON files in `data/json/`
- Simulated network delay (400ms)
- No actual HTTP requests

### 2. Real API Mode (Future)

To switch to real APIs:

1. **Update configuration** in `api.config.ts`:
   ```typescript
   export const USE_MOCK_API = false;
   export const BASE_URL = 'https://api.yourdomain.com/v1';
   ```

2. **Done!** The service layer automatically makes real HTTP requests.

## Usage in Components

```typescript
import { getCustomers, deleteCustomer, downloadCustomersCSV } from 'services/customerService';

// Fetch data
const customers = await getCustomers();

// Delete
await deleteCustomer(id);

// Download CSV
downloadCustomersCSV(customers, 'customers.csv');
```

## Adding New Services

1. Create a new service file (e.g., `orderService.ts`):
   ```typescript
   import { api, ENDPOINTS } from './api.config';
   
   export interface Order { /* ... */ }
   
   export async function getOrders(): Promise<Order[]> {
     const response = await api.get<{ orders: Order[] }>(ENDPOINTS.orders.list);
     return response.data.orders;
   }
   ```

2. Export from `index.ts`:
   ```typescript
   export { getOrders, type Order } from './orderService';
   ```

3. Add mock data JSON file in `data/json/orders.json`

## API Client Features

- **Error Handling**: `ApiError` class with status codes
- **Timeout**: Configurable request timeout (default 10s)
- **Methods**: `api.get()`, `api.post()`, `api.put()`, `api.patch()`, `api.delete()`

## Configuration Options

| Variable | Default | Description |
|----------|---------|-------------|
| `USE_MOCK_API` | `true` | Toggle mock/real API |
| `BASE_URL` | `/src/data/json` | API base URL |
| `REQUEST_TIMEOUT` | `10000` | Request timeout (ms) |
| `MOCK_DELAY_MS` | `400` | Simulated network delay |
| `DEFAULT_PAGE_SIZE` | `10` | Default pagination size |

## Migration Guide: Mock → Real API

1. Set `USE_MOCK_API = false` in `api.config.ts`
2. Update `BASE_URL` to your API endpoint
3. Ensure your backend implements these endpoints:
   - `GET /customers` - List all customers
   - `GET /customers/:id` - Get single customer
   - `POST /customers` - Create customer
   - `PUT /customers/:id` - Update customer
   - `DELETE /customers/:id` - Delete customer
4. Remove JSON files from `data/json/` (optional)

The beauty of this architecture: **zero changes needed in your components!**
