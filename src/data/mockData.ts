import { Product, Category, Banner, Coupon, Order, User, DashboardStats, ExternalProduct, SyncLog } from '../types';

const productImages = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1523275335684-37898b62af30?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=600&fit=crop',
];

export const products: Product[] = [
  {
    id: '1', name: 'Premium Wireless Headphones', slug: 'premium-wireless-headphones',
    description: 'Experience crystal-clear audio with our premium wireless headphones. Features active noise cancellation, 30-hour battery life, and ultra-comfortable ear cushions.',
    shortDescription: 'ANC Wireless Headphones with 30hr battery',
    sellingPrice: 2499, comparePrice: 4999, sourcePrice: 1200, sku: 'WH-001',
    category: 'Electronics', subcategory: 'Audio', brand: 'SoundMax',
    images: [productImages[0], productImages[1], productImages[2]],
    thumbnail: productImages[0], stock: 45, rating: 4.5, reviewCount: 128,
    isFeatured: true, isBestseller: true, isNewArrival: false, isOnSale: true,
    status: 'active', weight: 0.3, gstPercent: 18, minQty: 1, maxQty: 5,
    createdAt: '2026-01-15'
  },
  {
    id: '2', name: 'Smart Fitness Watch Pro', slug: 'smart-fitness-watch-pro',
    description: 'Track your fitness goals with advanced sensors. Heart rate monitor, GPS, sleep tracking, and 7-day battery life.',
    shortDescription: 'Advanced fitness tracker with GPS',
    sellingPrice: 3999, comparePrice: 6999, sourcePrice: 2100, sku: 'FW-002',
    category: 'Electronics', subcategory: 'Wearables', brand: 'FitTech',
    images: [productImages[1], productImages[3], productImages[4]],
    thumbnail: productImages[1], stock: 32, rating: 4.7, reviewCount: 256,
    isFeatured: true, isBestseller: true, isNewArrival: true, isOnSale: true,
    status: 'active', weight: 0.05, gstPercent: 18, minQty: 1, maxQty: 3,
    createdAt: '2026-02-20'
  },
  {
    id: '3', name: 'Organic Green Tea Collection', slug: 'organic-green-tea-collection',
    description: 'Premium organic green tea sourced from the finest gardens. Includes 5 varieties: Matcha, Jasmine, Lemongrass, Mint, and Classic.',
    shortDescription: '5 varieties of premium organic green tea',
    sellingPrice: 599, comparePrice: 899, sourcePrice: 320, sku: 'GT-003',
    category: 'Food & Beverages', subcategory: 'Tea', brand: 'TeaLeaf',
    images: [productImages[2], productImages[5], productImages[6]],
    thumbnail: productImages[2], stock: 120, rating: 4.3, reviewCount: 89,
    isFeatured: false, isBestseller: true, isNewArrival: false, isOnSale: true,
    status: 'active', weight: 0.5, gstPercent: 5, minQty: 1, maxQty: 10,
    createdAt: '2026-01-10'
  },
  {
    id: '4', name: 'Leather Laptop Bag', slug: 'leather-laptop-bag',
    description: 'Handcrafted genuine leather laptop bag. Fits up to 15.6" laptops. Multiple compartments for organization.',
    shortDescription: 'Genuine leather bag for 15.6" laptops',
    sellingPrice: 1899, comparePrice: 3499, sourcePrice: 950, sku: 'LB-004',
    category: 'Fashion', subcategory: 'Bags', brand: 'LeatherCraft',
    images: [productImages[3], productImages[7], productImages[0]],
    thumbnail: productImages[3], stock: 18, rating: 4.6, reviewCount: 67,
    isFeatured: true, isBestseller: false, isNewArrival: true, isOnSale: true,
    status: 'active', weight: 1.2, gstPercent: 18, minQty: 1, maxQty: 2,
    createdAt: '2026-03-01'
  },
  {
    id: '5', name: 'Yoga Mat Premium', slug: 'yoga-mat-premium',
    description: 'Non-slip eco-friendly yoga mat. 6mm thickness for joint protection. Includes carrying strap.',
    shortDescription: 'Eco-friendly non-slip yoga mat 6mm',
    sellingPrice: 1299, comparePrice: 1999, sourcePrice: 650, sku: 'YM-005',
    category: 'Sports & Fitness', subcategory: 'Yoga', brand: 'ZenFit',
    images: [productImages[4], productImages[2], productImages[6]],
    thumbnail: productImages[4], stock: 55, rating: 4.4, reviewCount: 143,
    isFeatured: false, isBestseller: true, isNewArrival: false, isOnSale: false,
    status: 'active', weight: 1.5, gstPercent: 18, minQty: 1, maxQty: 3,
    createdAt: '2026-01-25'
  },
  {
    id: '6', name: 'Stainless Steel Water Bottle', slug: 'stainless-steel-water-bottle',
    description: 'Double-wall vacuum insulated. Keeps drinks cold 24hrs or hot 12hrs. BPA-free, 750ml capacity.',
    shortDescription: 'Double-wall insulated 750ml bottle',
    sellingPrice: 799, comparePrice: 1299, sourcePrice: 380, sku: 'WB-006',
    category: 'Home & Kitchen', subcategory: 'Drinkware', brand: 'HydroSteel',
    images: [productImages[5], productImages[1], productImages[3]],
    thumbnail: productImages[5], stock: 200, rating: 4.2, reviewCount: 312,
    isFeatured: false, isBestseller: false, isNewArrival: false, isOnSale: true,
    status: 'active', weight: 0.4, gstPercent: 12, minQty: 1, maxQty: 5,
    createdAt: '2026-02-05'
  },
  {
    id: '7', name: 'Bluetooth Speaker Portable', slug: 'bluetooth-speaker-portable',
    description: '360° surround sound. Waterproof IPX7. 20-hour playtime. Built-in microphone for calls.',
    shortDescription: 'Waterproof portable speaker with 20hr battery',
    sellingPrice: 1799, comparePrice: 2999, sourcePrice: 890, sku: 'BS-007',
    category: 'Electronics', subcategory: 'Audio', brand: 'SoundMax',
    images: [productImages[6], productImages[0], productImages[4]],
    thumbnail: productImages[6], stock: 38, rating: 4.5, reviewCount: 198,
    isFeatured: true, isBestseller: false, isNewArrival: true, isOnSale: true,
    status: 'active', weight: 0.6, gstPercent: 18, minQty: 1, maxQty: 3,
    createdAt: '2026-03-10'
  },
  {
    id: '8', name: 'Running Shoes Ultra', slug: 'running-shoes-ultra',
    description: 'Lightweight mesh upper with responsive cushioning. Perfect for daily runs and gym workouts.',
    shortDescription: 'Lightweight running shoes with cushioning',
    sellingPrice: 2999, comparePrice: 4499, sourcePrice: 1500, sku: 'RS-008',
    category: 'Sports & Fitness', subcategory: 'Footwear', brand: 'SpeedRun',
    images: [productImages[7], productImages[2], productImages[5]],
    thumbnail: productImages[7], stock: 25, rating: 4.8, reviewCount: 421,
    isFeatured: true, isBestseller: true, isNewArrival: true, isOnSale: true,
    status: 'active', weight: 0.7, gstPercent: 18, minQty: 1, maxQty: 2,
    createdAt: '2026-03-15'
  },
];

export const categories: Category[] = [
  {
    id: '1', name: 'Electronics', slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    productCount: 45,
    subcategories: [
      { id: '1a', name: 'Audio', slug: 'audio', productCount: 18 },
      { id: '1b', name: 'Wearables', slug: 'wearables', productCount: 12 },
      { id: '1c', name: 'Accessories', slug: 'accessories', productCount: 15 },
    ]
  },
  {
    id: '2', name: 'Fashion', slug: 'fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
    productCount: 62,
    subcategories: [
      { id: '2a', name: 'Men', slug: 'men', productCount: 28 },
      { id: '2b', name: 'Women', slug: 'women', productCount: 22 },
      { id: '2c', name: 'Bags', slug: 'bags', productCount: 12 },
    ]
  },
  {
    id: '3', name: 'Sports & Fitness', slug: 'sports-fitness',
    image: 'https://images.unsplash.com/photo-1517836357463-d25d5d3de373?w=400&h=300&fit=crop',
    productCount: 38,
    subcategories: [
      { id: '3a', name: 'Yoga', slug: 'yoga', productCount: 10 },
      { id: '3b', name: 'Footwear', slug: 'footwear', productCount: 15 },
      { id: '3c', name: 'Equipment', slug: 'equipment', productCount: 13 },
    ]
  },
  {
    id: '4', name: 'Home & Kitchen', slug: 'home-kitchen',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    productCount: 54,
    subcategories: [
      { id: '4a', name: 'Drinkware', slug: 'drinkware', productCount: 20 },
      { id: '4b', name: 'Cookware', slug: 'cookware', productCount: 18 },
      { id: '4c', name: 'Decor', slug: 'decor', productCount: 16 },
    ]
  },
  {
    id: '5', name: 'Food & Beverages', slug: 'food-beverages',
    image: 'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=400&h=300&fit=crop',
    productCount: 29,
    subcategories: [
      { id: '5a', name: 'Tea', slug: 'tea', productCount: 12 },
      { id: '5b', name: 'Coffee', slug: 'coffee', productCount: 8 },
      { id: '5c', name: 'Snacks', slug: 'snacks', productCount: 9 },
    ]
  },
  {
    id: '6', name: 'Beauty & Personal Care', slug: 'beauty-personal-care',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
    productCount: 41,
    subcategories: [
      { id: '6a', name: 'Skincare', slug: 'skincare', productCount: 18 },
      { id: '6b', name: 'Haircare', slug: 'haircare', productCount: 12 },
      { id: '6c', name: 'Fragrance', slug: 'fragrance', productCount: 11 },
    ]
  },
];

export const banners: Banner[] = [
  {
    id: '1', title: 'Mega Sale - Up to 60% Off', subtitle: 'On Electronics & Gadgets',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=500&fit=crop',
    buttonText: 'Shop Now', buttonUrl: '/category/electronics', isActive: true, sortOrder: 1
  },
  {
    id: '2', title: 'New Arrivals Collection', subtitle: 'Fresh styles for the season',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=500&fit=crop',
    buttonText: 'Explore', buttonUrl: '/new-arrivals', isActive: true, sortOrder: 2
  },
  {
    id: '3', title: 'Fitness Essentials', subtitle: 'Gear up for your workout',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=500&fit=crop',
    buttonText: 'Shop Fitness', buttonUrl: '/category/sports-fitness', isActive: true, sortOrder: 3
  },
];

export const coupons: Coupon[] = [
  { id: '1', code: 'WELCOME10', type: 'percentage', value: 10, minCartValue: 500, maxDiscount: 200, startDate: '2026-01-01', endDate: '2026-12-31', usageLimit: 1000, usedCount: 234, isActive: true },
  { id: '2', code: 'FLAT200', type: 'fixed', value: 200, minCartValue: 1000, maxDiscount: 200, startDate: '2026-03-01', endDate: '2026-06-30', usageLimit: 500, usedCount: 89, isActive: true },
  { id: '3', code: 'SAVE50', type: 'percentage', value: 50, minCartValue: 2000, maxDiscount: 500, startDate: '2026-03-15', endDate: '2026-04-15', usageLimit: 200, usedCount: 45, isActive: true },
];

export const orders: Order[] = [
  {
    id: '1', orderNumber: 'ORD-20260315-000001',
    items: [
      { product: products[0], quantity: 1, price: 2499, tax: 449.82, total: 2948.82 },
      { product: products[2], quantity: 2, price: 599, tax: 59.90, total: 1257.90 },
    ],
    subtotal: 3697, discount: 369.70, shipping: 0, tax: 509.72, codFee: 0, grandTotal: 3837.02,
    status: 'delivered', paymentMethod: 'razorpay', paymentStatus: 'paid',
    shippingAddress: { id: '1', name: 'Rahul Sharma', phone: '9876543210', line1: '123 MG Road', city: 'Ahmedabad', state: 'Gujarat', pincode: '380001', isDefault: true },
    billingAddress: { id: '1', name: 'Rahul Sharma', phone: '9876543210', line1: '123 MG Road', city: 'Ahmedabad', state: 'Gujarat', pincode: '380001', isDefault: true },
    trackingNumber: 'TRK123456789', courier: 'BlueDart',
    createdAt: '2026-03-15T10:30:00', updatedAt: '2026-03-18T14:00:00'
  },
  {
    id: '2', orderNumber: 'ORD-20260320-000002',
    items: [
      { product: products[1], quantity: 1, price: 3999, tax: 719.82, total: 4718.82 },
    ],
    subtotal: 3999, discount: 0, shipping: 60, tax: 719.82, codFee: 20, grandTotal: 4798.82,
    status: 'shipped', paymentMethod: 'cod', paymentStatus: 'pending',
    shippingAddress: { id: '2', name: 'Priya Patel', phone: '9876543211', line1: '456 SG Highway', city: 'Ahmedabad', state: 'Gujarat', pincode: '380015', isDefault: true },
    billingAddress: { id: '2', name: 'Priya Patel', phone: '9876543211', line1: '456 SG Highway', city: 'Ahmedabad', state: 'Gujarat', pincode: '380015', isDefault: true },
    trackingNumber: 'TRK987654321', courier: 'Delhivery',
    createdAt: '2026-03-20T15:45:00', updatedAt: '2026-03-22T09:00:00'
  },
  {
    id: '3', orderNumber: 'ORD-20260325-000003',
    items: [
      { product: products[4], quantity: 1, price: 1299, tax: 233.82, total: 1532.82 },
      { product: products[5], quantity: 2, price: 799, tax: 191.76, total: 1789.76 },
    ],
    subtotal: 2897, discount: 289.70, shipping: 0, tax: 425.58, codFee: 0, grandTotal: 3032.88,
    status: 'processing', paymentMethod: 'razorpay', paymentStatus: 'paid',
    shippingAddress: { id: '1', name: 'Rahul Sharma', phone: '9876543210', line1: '123 MG Road', city: 'Ahmedabad', state: 'Gujarat', pincode: '380001', isDefault: true },
    billingAddress: { id: '1', name: 'Rahul Sharma', phone: '9876543210', line1: '123 MG Road', city: 'Ahmedabad', state: 'Gujarat', pincode: '380001', isDefault: true },
    createdAt: '2026-03-25T08:20:00', updatedAt: '2026-03-25T10:00:00'
  },
];

export const currentUser: User = {
  id: '1', name: 'Admin User', email: 'admin@katargam.com', phone: '9876543210',
  role: 'super_admin'
};

export const dashboardStats: DashboardStats = {
  totalSales: 458920,
  todaySales: 12450,
  monthlySales: 89340,
  totalOrders: 342,
  pendingOrders: 18,
  completedOrders: 289,
  totalCustomers: 1256,
  totalProducts: 156,
  lowStockProducts: 8,
};

export const externalProducts: ExternalProduct[] = [
  { id: '1', externalId: 'EXT-001', sourceUrl: 'https://katargam.szbilling.com/product/thigh-exerciser', sourceName: 'Thigh Exerciser Equipment', sourcePrice: 90, sourceImage: productImages[0], lastSyncedAt: '2026-03-25T10:00:00', importStatus: 'imported', localProductId: '1' },
  { id: '2', externalId: 'EXT-002', sourceUrl: 'https://katargam.szbilling.com/product/resistance-bands', sourceName: 'Resistance Bands Set', sourcePrice: 150, sourceImage: productImages[1], lastSyncedAt: '2026-03-25T10:00:00', importStatus: 'imported', localProductId: '2' },
  { id: '3', externalId: 'EXT-003', sourceUrl: 'https://katargam.szbilling.com/product/yoga-block', sourceName: 'Yoga Block EVA Foam', sourcePrice: 80, sourceImage: productImages[2], lastSyncedAt: '2026-03-25T10:00:00', importStatus: 'pending' },
  { id: '4', externalId: 'EXT-004', sourceUrl: 'https://katargam.szbilling.com/product/jump-rope', sourceName: 'Speed Jump Rope', sourcePrice: 60, sourceImage: productImages[3], lastSyncedAt: '2026-03-25T10:00:00', importStatus: 'pending' },
  { id: '5', externalId: 'EXT-005', sourceUrl: 'https://katargam.szbilling.com/product/foam-roller', sourceName: 'Foam Roller Muscle Recovery', sourcePrice: 200, sourceImage: productImages[4], lastSyncedAt: '2026-03-25T10:00:00', importStatus: 'skipped' },
  { id: '6', externalId: 'EXT-006', sourceUrl: 'https://katargam.szbilling.com/product/dumbbells-set', sourceName: 'Adjustable Dumbbells Set 10kg', sourcePrice: 850, sourceImage: productImages[5], lastSyncedAt: '2026-03-25T10:00:00', importStatus: 'pending' },
];

export const syncLogs: SyncLog[] = [
  { id: '1', startedAt: '2026-03-25T10:00:00', completedAt: '2026-03-25T10:02:30', totalFound: 24, newProducts: 3, updatedProducts: 12, failedProducts: 0, skippedProducts: 9, status: 'completed' },
  { id: '2', startedAt: '2026-03-24T10:00:00', completedAt: '2026-03-24T10:03:15', totalFound: 22, newProducts: 1, updatedProducts: 10, failedProducts: 1, skippedProducts: 10, status: 'completed' },
  { id: '3', startedAt: '2026-03-23T10:00:00', completedAt: '2026-03-23T10:01:45', totalFound: 22, newProducts: 0, updatedProducts: 8, failedProducts: 0, skippedProducts: 14, status: 'completed' },
];

export const salesData = [
  { day: 'Mon', sales: 12400, orders: 18 },
  { day: 'Tue', sales: 15600, orders: 22 },
  { day: 'Wed', sales: 9800, orders: 14 },
  { day: 'Thu', sales: 18200, orders: 26 },
  { day: 'Fri', sales: 22100, orders: 31 },
  { day: 'Sat', sales: 28500, orders: 38 },
  { day: 'Sun', sales: 19300, orders: 25 },
];

export const monthlySalesData = [
  { month: 'Oct', sales: 125000, orders: 180 },
  { month: 'Nov', sales: 198000, orders: 265 },
  { month: 'Dec', sales: 345000, orders: 420 },
  { month: 'Jan', sales: 210000, orders: 285 },
  { month: 'Feb', sales: 178000, orders: 240 },
  { month: 'Mar', sales: 89340, orders: 120 },
];
