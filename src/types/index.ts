export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  sellingPrice: number;
  comparePrice: number;
  sourcePrice: number | null;
  sku: string;
  category: string;
  subcategory?: string;
  brand: string;
  images: string[];
  thumbnail: string;
  stock: number;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isBestseller: boolean;
  isNewArrival: boolean;
  isOnSale: boolean;
  status: 'active' | 'draft' | 'inactive' | 'out_of_stock' | 'archived';
  weight?: number;
  gstPercent: number;
  minQty: number;
  maxQty: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  codFee: number;
  grandTotal: number;
  status: OrderStatus;
  paymentMethod: 'razorpay' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: Address;
  billingAddress: Address;
  trackingNumber?: string;
  courier?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
  tax: number;
  total: number;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'returned' | 'refunded';

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minCartValue: number;
  maxDiscount: number;
  startDate: string;
  endDate: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonUrl: string;
  isActive: boolean;
  sortOrder: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin' | 'super_admin';
  avatar?: string;
}

export interface DashboardStats {
  totalSales: number;
  todaySales: number;
  monthlySales: number;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalCustomers: number;
  totalProducts: number;
  lowStockProducts: number;
}

export interface ExternalProduct {
  id: string;
  externalId: string;
  sourceUrl: string;
  sourceName: string;
  sourcePrice: number;
  sourceImage: string;
  lastSyncedAt: string;
  importStatus: 'pending' | 'imported' | 'skipped' | 'error';
  localProductId?: string;
}

export interface SyncLog {
  id: string;
  startedAt: string;
  completedAt?: string;
  totalFound: number;
  newProducts: number;
  updatedProducts: number;
  failedProducts: number;
  skippedProducts: number;
  status: 'running' | 'completed' | 'failed';
}
