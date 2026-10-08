// Extended types for production features

// ============ RETURN / REFUND SYSTEM ============
export type ReturnStatus = 'requested' | 'approved' | 'rejected' | 'pickup_scheduled' | 'received' | 'refund_initiated' | 'refunded';
export type RefundMethod = 'original_payment' | 'manual_refund' | 'store_credit';

export interface ReturnRequest {
  id: string;
  orderId: string;
  orderNumber: string;
  items: ReturnItem[];
  reason: string;
  description: string;
  status: ReturnStatus;
  refundMethod: RefundMethod;
  refundAmount: number;
  creditNoteNumber?: string;
  adminNotes?: string;
  pickupDate?: string;
  requestedAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface ReturnItem {
  product: { id: string; name: string; sku: string; thumbnail: string };
  quantity: number;
  price: number;
}

// ============ PRODUCT REVIEWS ============
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  images: string[];
  isVerifiedPurchase: boolean;
  status: 'pending' | 'approved' | 'rejected';
  helpfulCount: number;
  createdAt: string;
}

// ============ ACTIVITY LOG ============
export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  entityName: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

// ============ NOTIFICATIONS ============
export type NotificationType = 'order' | 'payment' | 'stock' | 'sync' | 'return' | 'system';
export type NotificationPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Notification {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

// ============ ORDER TIMELINE ============
export interface OrderTimelineEvent {
  status: string;
  label: string;
  timestamp: string;
  isCompleted: boolean;
  isCurrent: boolean;
  description?: string;
}

// ============ SYNC HISTORY ============
export interface ProductSyncHistory {
  id: string;
  productId: string;
  productName: string;
  externalId: string;
  oldSourcePrice: number;
  newSourcePrice: number;
  oldSellingPrice: number;
  newSellingPrice: number;
  oldImage: string;
  newImage: string;
  oldName: string;
  newName: string;
  hasPriceChange: boolean;
  hasImageChange: boolean;
  hasNameChange: boolean;
  syncResult: 'updated' | 'skipped' | 'error' | 'new';
  errorMessage?: string;
  syncedAt: string;
}

// ============ PRICING ============
export type MarkupType = 'fixed' | 'percentage' | 'manual' | 'per_product';

export interface PricingConfig {
  defaultMarkupType: MarkupType;
  defaultMarkupValue: number;
  priceRounding: 'none' | 'nearest_1' | 'nearest_5' | 'nearest_10' | 'ending_99';
}

export interface ProductPricing {
  sourcePrice: number;
  defaultCalculatedPrice: number;
  adminOverridePrice: number | null;
  finalSellingPrice: number;
  comparePrice: number;
  profit: number;
  markupPercent: number;
  hasOverride: boolean;
}

// ============ CATEGORY MAPPING ============
export interface CategoryMapping {
  id: string;
  sourceCategory: string;
  sourceCategoryId: string;
  localCategoryId: string;
  localCategoryName: string;
  autoApply: boolean;
  createdAt: string;
}

// ============ CART ABANDONMENT ============
export interface AbandonedCart {
  id: string;
  sessionId: string;
  customerEmail?: string;
  customerName?: string;
  items: { productId: string; name: string; price: number; quantity: number; thumbnail: string }[];
  totalValue: number;
  itemCount: number;
  lastActivityAt: string;
  createdAt: string;
  reminderSent: boolean;
  recovered: boolean;
}

// ============ INVENTORY RESERVATION ============
export interface InventoryReservation {
  id: string;
  productId: string;
  orderId?: string;
  sessionId: string;
  quantity: number;
  status: 'reserved' | 'confirmed' | 'released' | 'expired';
  reservedAt: string;
  expiresAt: string;
  confirmedAt?: string;
  releasedAt?: string;
}

// ============ SHIPPING PROVIDER ============
export interface ShippingProvider {
  id: string;
  name: string;
  code: string;
  isActive: boolean;
  config: Record<string, string>;
}

export interface ShippingRate {
  providerId: string;
  providerName: string;
  serviceName: string;
  charge: number;
  estimatedDays: string;
  trackingAvailable: boolean;
}

// ============ PINCODE SERVICE ============
export interface PincodeResult {
  pincode: string;
  available: boolean;
  city: string;
  state: string;
  estimatedDelivery: string;
  codAvailable: boolean;
  shippingCharge: number;
  expressAvailable: boolean;
}

// ============ COUPON ENHANCED ============
export interface EnhancedCoupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minCartValue: number;
  maxDiscount: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  perCustomerLimit: number;
  usedCount: number;
  isActive: boolean;
  isFirstOrderOnly: boolean;
  applicableCategories: string[];
  applicableProducts: string[];
  excludedProducts: string[];
  autoApply: boolean;
  priority: number;
}

// ============ FLASH SALE ============
export interface FlashSale {
  id: string;
  title: string;
  subtitle: string;
  products: { productId: string; salePrice: number; stockLimit: number; soldCount: number }[];
  startTime: string;
  endTime: string;
  isActive: boolean;
  banner: string;
}

// ============ HOMEPAGE CMS ============
export interface HomepageSection {
  id: string;
  type: 'hero' | 'categories' | 'featured' | 'bestsellers' | 'new_arrivals' | 'flash_sale' | 'promo_banner' | 'testimonials' | 'brands' | 'newsletter';
  title: string;
  isEnabled: boolean;
  sortOrder: number;
  config: Record<string, string>;
}

// ============ JOB LOG ============
export interface JobLog {
  id: string;
  jobName: string;
  startedAt: string;
  completedAt?: string;
  duration?: number;
  status: 'running' | 'completed' | 'failed';
  recordsProcessed: number;
  failures: number;
  errorMessage?: string;
}

// ============ RBAC ============
export type Permission =
  | 'products.view' | 'products.create' | 'products.edit' | 'products.delete'
  | 'orders.view' | 'orders.edit' | 'orders.cancel' | 'orders.refund'
  | 'customers.view' | 'customers.edit'
  | 'coupons.view' | 'coupons.manage'
  | 'settings.view' | 'settings.manage'
  | 'reports.view' | 'reports.export'
  | 'import.manage' | 'sync.manage'
  | 'returns.manage' | 'reviews.moderate';

export interface AdminRole {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystem: boolean;
}

// ============ CREDIT NOTE ============
export interface CreditNote {
  id: string;
  number: string;
  returnId: string;
  orderId: string;
  customerId: string;
  amount: number;
  reason: string;
  status: 'issued' | 'applied' | 'expired';
  issuedAt: string;
  expiresAt: string;
  appliedToOrderId?: string;
}
