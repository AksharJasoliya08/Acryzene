/**
 * ExternalProductService
 * 
 * Architecture: React Frontend → Our Backend API → katargam.szbilling.com
 * 
 * This service defines the interface for fetching products from the external source.
 * In production, this would be implemented server-side to avoid CORS issues.
 * The frontend calls our own backend, which then scrapes the external website.
 * 
 * IMPORTANT: Never call katargam.szbilling.com directly from the browser.
 */

import { ExternalProduct, SyncLog } from '../types';
import { ProductSyncHistory, PricingConfig, CategoryMapping } from '../types/extended';

// Configuration
const SOURCE_STORE_URL = 'https://katargam.szbilling.com/';

export interface ExternalProductServiceConfig {
  sourceUrl: string;
  syncInterval: number; // minutes
  requestThrottle: number; // ms between requests
  maxRetries: number;
  pricingConfig: PricingConfig;
}

export interface SyncPreview {
  productId: string;
  productName: string;
  oldSourcePrice: number;
  newSourcePrice: number;
  oldSellingPrice: number;
  newCalculatedPrice: number;
  adminOverride: number | null;
  finalPrice: number;
  action: 'update' | 'skip' | 'error' | 'new';
  hasChanges: boolean;
}

export interface SyncResult {
  totalFound: number;
  newProducts: number;
  updatedProducts: number;
  priceChanges: number;
  imageChanges: number;
  outOfStock: number;
  failed: number;
  skipped: number;
  duration: number;
}

/**
 * Calculate selling price based on pricing configuration
 */
export function calculateSellingPrice(
  sourcePrice: number,
  config: PricingConfig,
  adminOverride?: number | null
): number {
  // Admin override always wins
  if (adminOverride !== null && adminOverride !== undefined) {
    return adminOverride;
  }

  let calculatedPrice: number;

  switch (config.defaultMarkupType) {
    case 'fixed':
      calculatedPrice = sourcePrice + config.defaultMarkupValue;
      break;
    case 'percentage':
      calculatedPrice = sourcePrice + (sourcePrice * config.defaultMarkupValue / 100);
      break;
    case 'manual':
      calculatedPrice = config.defaultMarkupValue;
      break;
    default:
      calculatedPrice = sourcePrice + 5; // Default: +₹5
  }

  // Apply price rounding
  return applyPriceRounding(calculatedPrice, config.priceRounding);
}

/**
 * Apply price rounding rules
 */
export function applyPriceRounding(price: number, rounding: string): number {
  switch (rounding) {
    case 'nearest_1':
      return Math.round(price);
    case 'nearest_5':
      return Math.round(price / 5) * 5;
    case 'nearest_10':
      return Math.round(price / 10) * 10;
    case 'ending_99':
      return Math.floor(price) - 0.01 + (Math.floor(price) % 10 === 0 ? 100 : 0) + 99;
    default:
      return price;
  }
}

/**
 * Detect duplicate products using priority matching
 */
export function detectDuplicate(
  newProduct: Partial<ExternalProduct>,
  existingProducts: ExternalProduct[]
): ExternalProduct | null {
  // Priority 1: External Product ID
  if (newProduct.externalId) {
    const match = existingProducts.find(p => p.externalId === newProduct.externalId);
    if (match) return match;
  }

  // Priority 2: Source URL
  if (newProduct.sourceUrl) {
    const match = existingProducts.find(p => p.sourceUrl === newProduct.sourceUrl);
    if (match) return match;
  }

  // Priority 3: Source Name (normalized)
  if (newProduct.sourceName) {
    const normalized = newProduct.sourceName.toLowerCase().trim();
    const match = existingProducts.find(p => p.sourceName.toLowerCase().trim() === normalized);
    if (match) return match;
  }

  return null;
}

/**
 * Generate sync preview before applying changes
 */
export function generateSyncPreview(
  externalProducts: ExternalProduct[],
  localProducts: { id: string; name: string; sellingPrice: number; sourcePrice: number | null }[],
  pricingConfig: PricingConfig
): SyncPreview[] {
  return externalProducts.map(ep => {
    const local = localProducts.find(p => p.id === ep.localProductId);
    
    if (!local) {
      // New product
      const newPrice = calculateSellingPrice(ep.sourcePrice, pricingConfig);
      return {
        productId: ep.id,
        productName: ep.sourceName,
        oldSourcePrice: 0,
        newSourcePrice: ep.sourcePrice,
        oldSellingPrice: 0,
        newCalculatedPrice: newPrice,
        adminOverride: null,
        finalPrice: newPrice,
        action: 'new' as const,
        hasChanges: true,
      };
    }

    // Existing product - check for changes
    const hasPriceChange = local.sourcePrice !== ep.sourcePrice;
    const newCalculatedPrice = calculateSellingPrice(ep.sourcePrice, pricingConfig, local.sellingPrice);

    return {
      productId: ep.id,
      productName: ep.sourceName,
      oldSourcePrice: local.sourcePrice || 0,
      newSourcePrice: ep.sourcePrice,
      oldSellingPrice: local.sellingPrice,
      newCalculatedPrice: calculateSellingPrice(ep.sourcePrice, pricingConfig),
      adminOverride: local.sellingPrice !== newCalculatedPrice ? local.sellingPrice : null,
      finalPrice: local.sellingPrice, // Admin override preserved
      action: hasPriceChange ? 'update' as const : 'skip' as const,
      hasChanges: hasPriceChange,
    };
  });
}

/**
 * Service class for external product operations
 * In production, these methods would call our backend API
 */
export class ExternalProductService {
  private config: ExternalProductServiceConfig;

  constructor(config?: Partial<ExternalProductServiceConfig>) {
    this.config = {
      sourceUrl: SOURCE_STORE_URL,
      syncInterval: 60,
      requestThrottle: 1000,
      maxRetries: 3,
      pricingConfig: {
        defaultMarkupType: 'fixed',
        defaultMarkupValue: 5,
        priceRounding: 'nearest_5',
      },
      ...config,
    };
  }

  /**
   * Fetch products from source (via our backend)
   * In production: POST /api/admin/sync/fetch
   */
  async fetchSourceProducts(): Promise<ExternalProduct[]> {
    // This would call our backend which scrapes katargam.szbilling.com
    // For demo, we return mock data
    console.log(`[ExternalProductService] Fetching from ${this.config.sourceUrl}`);
    console.log('[ExternalProductService] In production, this calls our backend API');
    console.log('[ExternalProductService] Backend scrapes the source website server-side');
    return [];
  }

  /**
   * Start sync process
   * In production: POST /api/admin/sync
   */
  async startSync(): Promise<SyncResult> {
    console.log('[ExternalProductService] Starting sync...');
    return {
      totalFound: 0,
      newProducts: 0,
      updatedProducts: 0,
      priceChanges: 0,
      imageChanges: 0,
      outOfStock: 0,
      failed: 0,
      skipped: 0,
      duration: 0,
    };
  }

  /**
   * Get sync history
   * In production: GET /api/admin/sync/history
   */
  async getSyncHistory(productId?: string): Promise<ProductSyncHistory[]> {
    return [];
  }

  /**
   * Get category mappings
   * In production: GET /api/admin/category-mappings
   */
  async getCategoryMappings(): Promise<CategoryMapping[]> {
    return [];
  }

  /**
   * Save category mapping
   * In production: POST /api/admin/category-mappings
   */
  async saveCategoryMapping(mapping: CategoryMapping): Promise<void> {
    console.log('[ExternalProductService] Saving category mapping:', mapping);
  }
}

// Singleton instance
export const externalProductService = new ExternalProductService();
