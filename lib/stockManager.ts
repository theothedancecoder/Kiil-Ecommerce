export interface StockInfo {
  productId: string;
  variantId?: string;
  quantity: number;
  lowStockThreshold: number;
  lastUpdated: Date;
  supplier?: string;
  leadTime?: number; // days
}

export interface StockStatus {
  inStock: boolean;
  quantity: number;
  isLowStock: boolean;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'pre-order';
  estimatedRestockDate?: Date;
}

// Mock stock data - replace with database/API calls
const stockData: StockInfo[] = [
  // KARTELL PRODUCTS
  { productId: 'kartell-componibili-2', quantity: 15, lowStockThreshold: 5, lastUpdated: new Date(), supplier: 'Kartell Nordic', leadTime: 14 },
  { productId: 'kartell-componibili-3', quantity: 12, lowStockThreshold: 5, lastUpdated: new Date(), supplier: 'Kartell Nordic', leadTime: 14 },
  { productId: 'kartell-kabuki-hanging', quantity: 8, lowStockThreshold: 3, lastUpdated: new Date(), supplier: 'Kartell Nordic', leadTime: 14 },
  { productId: 'kartell-big-battery', quantity: 25, lowStockThreshold: 10, lastUpdated: new Date(), supplier: 'Kartell Nordic', leadTime: 14 },
  { productId: 'kartell-pumo-lamp', quantity: 6, lowStockThreshold: 5, lastUpdated: new Date(), supplier: 'Kartell Nordic', leadTime: 14 },
  { productId: 'kartell-hhh-stool', quantity: 18, lowStockThreshold: 8, lastUpdated: new Date(), supplier: 'Kartell Nordic', leadTime: 14 },
  { productId: 'kartell-kabuki-floor-lamp', quantity: 4, lowStockThreshold: 3, lastUpdated: new Date(), supplier: 'Kartell Nordic', leadTime: 14 },
  { productId: 'kartell-liberty-2-seater', quantity: 3, lowStockThreshold: 2, lastUpdated: new Date(), supplier: 'Kartell Nordic', leadTime: 21 },
  { productId: 'kartell-liberty-3-seater', quantity: 2, lowStockThreshold: 2, lastUpdated: new Date(), supplier: 'Kartell Nordic', leadTime: 21 },

  // FRITZ HANSEN PRODUCTS
  { productId: 'fritz-hansen-grand-prix-4130', quantity: 8, lowStockThreshold: 3, lastUpdated: new Date(), supplier: 'Fritz Hansen', leadTime: 21 },
  { productId: 'fritz-hansen-series-7-3107', quantity: 12, lowStockThreshold: 5, lastUpdated: new Date(), supplier: 'Fritz Hansen', leadTime: 21 },
  { productId: 'fritz-hansen-swan-chair-leather', quantity: 1, lowStockThreshold: 1, lastUpdated: new Date(), supplier: 'Fritz Hansen', leadTime: 28 },
  { productId: 'fritz-hansen-swan-chair-textile', quantity: 2, lowStockThreshold: 1, lastUpdated: new Date(), supplier: 'Fritz Hansen', leadTime: 28 },
  { productId: 'fritz-hansen-orient-p2-pendant', quantity: 5, lowStockThreshold: 2, lastUpdated: new Date(), supplier: 'Fritz Hansen', leadTime: 21 },
  { productId: 'fritz-hansen-little-friend', quantity: 7, lowStockThreshold: 3, lastUpdated: new Date(), supplier: 'Fritz Hansen', leadTime: 21 },
  { productId: 'fritz-hansen-regatta-chair', quantity: 4, lowStockThreshold: 2, lastUpdated: new Date(), supplier: 'Fritz Hansen', leadTime: 21 },
  { productId: 'fritz-hansen-regatta-stool', quantity: 6, lowStockThreshold: 3, lastUpdated: new Date(), supplier: 'Fritz Hansen', leadTime: 21 },
  { productId: 'fritz-hansen-regatta-table', quantity: 3, lowStockThreshold: 2, lastUpdated: new Date(), supplier: 'Fritz Hansen', leadTime: 21 },
  { productId: 'fritz-hansen-regatta-bench', quantity: 2, lowStockThreshold: 1, lastUpdated: new Date(), supplier: 'Fritz Hansen', leadTime: 21 },
  { productId: 'fritz-hansen-drachmann-chair', quantity: 8, lowStockThreshold: 4, lastUpdated: new Date(), supplier: 'Fritz Hansen', leadTime: 21 },
  { productId: 'fritz-hansen-hven-bar-stool', quantity: 5, lowStockThreshold: 3, lastUpdated: new Date(), supplier: 'Fritz Hansen', leadTime: 21 },
  { productId: 'fritz-hansen-fionia-stool', quantity: 10, lowStockThreshold: 5, lastUpdated: new Date(), supplier: 'Fritz Hansen', leadTime: 21 },

  // LOUIS POULSEN PRODUCTS
  { productId: 'louis-poulsen-aj-floor-lamp', quantity: 2, lowStockThreshold: 5, lastUpdated: new Date(), supplier: 'Louis Poulsen', leadTime: 10 },
  { productId: 'louis-poulsen-njp-table-lamp', quantity: 6, lowStockThreshold: 3, lastUpdated: new Date(), supplier: 'Louis Poulsen', leadTime: 10 },
  { productId: 'louis-poulsen-panthella-floor', quantity: 1, lowStockThreshold: 2, lastUpdated: new Date(), supplier: 'Louis Poulsen', leadTime: 14 },
  { productId: 'louis-poulsen-aj-wall-lamp', quantity: 8, lowStockThreshold: 4, lastUpdated: new Date(), supplier: 'Louis Poulsen', leadTime: 10 },
  { productId: 'louis-poulsen-njp-floor-lamp', quantity: 4, lowStockThreshold: 3, lastUpdated: new Date(), supplier: 'Louis Poulsen', leadTime: 10 },
  { productId: 'louis-poulsen-ph-septima', quantity: 0, lowStockThreshold: 1, lastUpdated: new Date(), supplier: 'Louis Poulsen', leadTime: 21 },

  // FLOS PRODUCTS
  { productId: 'flos-2097-18-chandelier', quantity: 1, lowStockThreshold: 1, lastUpdated: new Date(), supplier: 'FLOS Italia', leadTime: 28 },
  { productId: 'flos-2097-30-chandelier', quantity: 1, lowStockThreshold: 1, lastUpdated: new Date(), supplier: 'FLOS Italia', leadTime: 28 },
  { productId: 'flos-ktribe-1-floor-lamp', quantity: 3, lowStockThreshold: 2, lastUpdated: new Date(), supplier: 'FLOS Italia', leadTime: 21 },
  { productId: 'flos-ktribe-2-floor-lamp', quantity: 4, lowStockThreshold: 2, lastUpdated: new Date(), supplier: 'FLOS Italia', leadTime: 21 },
  { productId: 'flos-ktribe-2-pendant', quantity: 6, lowStockThreshold: 3, lastUpdated: new Date(), supplier: 'FLOS Italia', leadTime: 21 },
  { productId: 'flos-ktribe-3-floor-lamp', quantity: 2, lowStockThreshold: 1, lastUpdated: new Date(), supplier: 'FLOS Italia', leadTime: 21 },
  { productId: 'flos-ktribe-3-outdoor-floor-lamp', quantity: 1, lowStockThreshold: 1, lastUpdated: new Date(), supplier: 'FLOS Italia', leadTime: 28 },
  { productId: 'flos-ic-f1-floor-lamp', quantity: 5, lowStockThreshold: 3, lastUpdated: new Date(), supplier: 'FLOS Italia', leadTime: 21 },
  { productId: 'flos-ktribe-table-2-lamp', quantity: 7, lowStockThreshold: 4, lastUpdated: new Date(), supplier: 'FLOS Italia', leadTime: 21 },
  { productId: 'flos-ktribe-wall-lamp', quantity: 9, lowStockThreshold: 5, lastUpdated: new Date(), supplier: 'FLOS Italia', leadTime: 21 },
  { productId: 'flos-snoopy-table-lamp', quantity: 3, lowStockThreshold: 2, lastUpdated: new Date(), supplier: 'FLOS Italia', leadTime: 21 },

  // UMAGE PRODUCTS (Sample - add more as needed)
  { productId: 'umage-conversation-piece-chair', quantity: 8, lowStockThreshold: 4, lastUpdated: new Date(), supplier: 'Umage Denmark', leadTime: 14 },
  { productId: 'umage-lounge-around-3-seater', quantity: 2, lowStockThreshold: 1, lastUpdated: new Date(), supplier: 'Umage Denmark', leadTime: 21 },
  { productId: 'umage-heart-n-soul-200-table', quantity: 3, lowStockThreshold: 2, lastUpdated: new Date(), supplier: 'Umage Denmark', leadTime: 21 },
  { productId: 'umage-gather-cafe-table', quantity: 5, lowStockThreshold: 3, lastUpdated: new Date(), supplier: 'Umage Denmark', leadTime: 14 },
  { productId: 'umage-chordis-pendant', quantity: 6, lowStockThreshold: 3, lastUpdated: new Date(), supplier: 'Umage Denmark', leadTime: 14 },
  { productId: 'umage-stories-shelving', quantity: 4, lowStockThreshold: 2, lastUpdated: new Date(), supplier: 'Umage Denmark', leadTime: 14 },

  // VITRA PRODUCTS
  { productId: 'vitra-panton-chair', quantity: 10, lowStockThreshold: 5, lastUpdated: new Date(), supplier: 'Vitra Switzerland', leadTime: 21 },
  { productId: 'vitra-ball-clock', quantity: 8, lowStockThreshold: 4, lastUpdated: new Date(), supplier: 'Vitra Switzerland', leadTime: 14 },
  { productId: 'vitra-noguchi-coffee-table', quantity: 2, lowStockThreshold: 1, lastUpdated: new Date(), supplier: 'Vitra Switzerland', leadTime: 28 },

  // MONTANA PRODUCTS
  { productId: 'montana-panton-wire-extended', quantity: 6, lowStockThreshold: 3, lastUpdated: new Date(), supplier: 'Montana Denmark', leadTime: 14 },
  { productId: 'montana-perfume-cabinet', quantity: 12, lowStockThreshold: 6, lastUpdated: new Date(), supplier: 'Montana Denmark', leadTime: 14 },
  { productId: 'montana-panton-wire-single', quantity: 8, lowStockThreshold: 4, lastUpdated: new Date(), supplier: 'Montana Denmark', leadTime: 14 },

  // OTHER BRANDS (Sample entries)
  { productId: 'fredericia-ej220-sofa', quantity: 1, lowStockThreshold: 1, lastUpdated: new Date(), supplier: 'Fredericia', leadTime: 28 },
  { productId: 'fredericia-delphi-sofa', quantity: 1, lowStockThreshold: 1, lastUpdated: new Date(), supplier: 'Fredericia', leadTime: 28 },
  { productId: 'dux-jetson-classic', quantity: 2, lowStockThreshold: 1, lastUpdated: new Date(), supplier: 'DUX Sweden', leadTime: 21 },
  { productId: 'juul-903-sofa', quantity: 1, lowStockThreshold: 1, lastUpdated: new Date(), supplier: 'Juul Denmark', leadTime: 35 },
  { productId: 'eilersen-playground-sofa', quantity: 1, lowStockThreshold: 1, lastUpdated: new Date(), supplier: 'Eilersen', leadTime: 28 },
];

export class StockManager {
  private static instance: StockManager;
  private stockData: Map<string, StockInfo> = new Map();

  private constructor() {
    // Initialize with mock data
    stockData.forEach(item => {
      this.stockData.set(this.getStockKey(item.productId, item.variantId), item);
    });
  }

  static getInstance(): StockManager {
    if (!StockManager.instance) {
      StockManager.instance = new StockManager();
    }
    return StockManager.instance;
  }

  private getStockKey(productId: string, variantId?: string): string {
    return variantId ? `${productId}-${variantId}` : productId;
  }

  getStockStatus(productId: string, variantId?: string): StockStatus {
    const key = this.getStockKey(productId, variantId);
    const stock = this.stockData.get(key);

    if (!stock) {
      return {
        inStock: false,
        quantity: 0,
        isLowStock: false,
        status: 'out-of-stock'
      };
    }

    const isLowStock = stock.quantity <= stock.lowStockThreshold && stock.quantity > 0;
    const inStock = stock.quantity > 0;

    return {
      inStock,
      quantity: stock.quantity,
      isLowStock,
      status: stock.quantity === 0 ? 'out-of-stock' : 
              isLowStock ? 'low-stock' : 'in-stock'
    };
  }

  updateStock(productId: string, quantity: number, variantId?: string): boolean {
    const key = this.getStockKey(productId, variantId);
    const stock = this.stockData.get(key);

    if (stock) {
      stock.quantity = Math.max(0, quantity);
      stock.lastUpdated = new Date();
      return true;
    }
    return false;
  }

  reserveStock(productId: string, quantity: number, variantId?: string): boolean {
    const key = this.getStockKey(productId, variantId);
    const stock = this.stockData.get(key);

    if (stock && stock.quantity >= quantity) {
      stock.quantity -= quantity;
      stock.lastUpdated = new Date();
      return true;
    }
    return false;
  }

  getLowStockProducts(): StockInfo[] {
    return Array.from(this.stockData.values())
      .filter(stock => stock.quantity <= stock.lowStockThreshold && stock.quantity > 0);
  }

  getOutOfStockProducts(): StockInfo[] {
    return Array.from(this.stockData.values())
      .filter(stock => stock.quantity === 0);
  }

  // Bulk operations for managing all 78 products
  bulkUpdateStock(updates: { productId: string; variantId?: string; quantity: number }[]): void {
    updates.forEach(update => {
      this.updateStock(update.productId, update.quantity, update.variantId);
    });
  }

  exportStockReport(): StockInfo[] {
    return Array.from(this.stockData.values());
  }
}

// Utility functions
export const getStockBadge = (status: StockStatus) => {
  switch (status.status) {
    case 'in-stock':
      return { text: 'In Stock', color: 'green' };
    case 'low-stock':
      return { text: `Only ${status.quantity} left`, color: 'orange' };
    case 'out-of-stock':
      return { text: 'Out of Stock', color: 'red' };
    case 'pre-order':
      return { text: 'Pre-order', color: 'blue' };
    default:
      return { text: 'Unknown', color: 'gray' };
  }
};
