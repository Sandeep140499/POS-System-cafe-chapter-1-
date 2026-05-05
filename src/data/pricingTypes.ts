const STORAGE_KEY = "cc1_pricing_types";

export interface PricingTypeOption {
  id: string;
  label: string; // Display label (e.g., "6 inch", "9 inch")
  value: string; // Internal value (e.g., "6_inch", "9_inch")
}

export interface CustomPricingType {
  id: string;
  name: string; // Display name (e.g., "Size", "Quantity", "Portion")
  description?: string;
  options: PricingTypeOption[]; // Two or more options
  isBuiltIn: boolean; // Built-in types cannot be deleted
  isActive: boolean;
  createdAt: string;
}

// Default built-in pricing types
const DEFAULT_PRICING_TYPES: CustomPricingType[] = [
  {
    id: "single",
    name: "Single Price",
    description: "Only one price per item",
    options: [],
    isBuiltIn: true,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "half_full",
    name: "Half / Full",
    description: "Two portion sizes - Half and Full",
    options: [
      { id: "half", label: "Half", value: "half" },
      { id: "full", label: "Full", value: "full" },
    ],
    isBuiltIn: true,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "size",
    name: "Size (6\" / 9\")",
    description: "Pizza sizes - 6 inch and 9 inch",
    options: [
      { id: "6_inch", label: "6 inch", value: "option1" },
      { id: "9_inch", label: "9 inch", value: "option2" },
    ],
    isBuiltIn: true,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "quantity",
    name: "Quantity (5 pcs / 8 pcs)",
    description: "Momos quantity - 5 pieces and 8 pieces",
    options: [
      { id: "5_pcs", label: "5 pcs", value: "option1" },
      { id: "8_pcs", label: "8 pcs", value: "option2" },
    ],
    isBuiltIn: true,
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

export function getPricingTypes(): CustomPricingType[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as CustomPricingType[];
      // Merge with defaults to ensure built-ins exist
      const customTypes = parsed.filter((p) => !p.isBuiltIn);
      return [...DEFAULT_PRICING_TYPES, ...customTypes];
    }
  } catch {
    console.error("Error loading pricing types");
  }
  return [...DEFAULT_PRICING_TYPES];
}

export function savePricingTypes(types: CustomPricingType[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(types));
}

export function addPricingType(type: Omit<CustomPricingType, "id" | "createdAt" | "isBuiltIn">): CustomPricingType {
  const newType: CustomPricingType = {
    ...type,
    id: `custom_${Date.now()}`,
    isBuiltIn: false,
    createdAt: new Date().toISOString(),
  };
  const current = getPricingTypes();
  const updated = [...current, newType];
  savePricingTypes(updated);
  return newType;
}

export function updatePricingType(id: string, updates: Partial<CustomPricingType>): CustomPricingType | null {
  const current = getPricingTypes();
  const idx = current.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  
  // Don't allow modification of built-in types' built-in status
  if (current[idx].isBuiltIn && updates.isBuiltIn !== undefined) {
    delete updates.isBuiltIn;
  }
  
  current[idx] = { ...current[idx], ...updates };
  savePricingTypes(current);
  return current[idx];
}

export function deletePricingType(id: string): boolean {
  const current = getPricingTypes();
  const type = current.find((t) => t.id === id);
  
  // Cannot delete built-in types
  if (!type || type.isBuiltIn) return false;
  
  const updated = current.filter((t) => t.id !== id);
  savePricingTypes(updated);
  return true;
}

export function canDeletePricingType(id: string, usedInCategories: number[]): boolean {
  const type = getPricingTypes().find((t) => t.id === id);
  if (!type) return false;
  if (type.isBuiltIn) return false;
  if (usedInCategories.length > 0) return false;
  return true;
}

export function getPricingTypeById(id: string): CustomPricingType | undefined {
  return getPricingTypes().find((t) => t.id === id);
}

export function getActivePricingTypes(): CustomPricingType[] {
  return getPricingTypes().filter((t) => t.isActive);
}

// Helper to format price display
export function formatPriceDisplay(type: CustomPricingType, optionValue: string): string {
  const option = type.options.find((o) => o.value === optionValue);
  return option?.label || optionValue;
}

// Get price field key based on pricing type and option index
export function getPriceFieldKey(pricingTypeId: string, optionIndex: number): string {
  if (pricingTypeId === "single") return "single";
  if (pricingTypeId === "half_full") {
    return optionIndex === 0 ? "half" : "full";
  }
  return optionIndex === 0 ? "option1" : "option2";
}
