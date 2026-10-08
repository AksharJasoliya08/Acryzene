# 📚 Quick Reference Guide - Katargam Store

A concise reference for all functions, components, and their locations in the codebase.

---

## 🗂️ File Structure Overview

```
src/
├── App.tsx                          # Main app with routing
├── main.tsx                         # Entry point
├── index.css                        # Global styles
│
├── components/
│   ├── Layout.tsx                   # Main layout (header/footer)
│   └── ProductCard.tsx              # Product card component
│
├── context/
│   └── StoreContext.tsx             # Global state management
│
├── data/
│   └── mockData.ts                  # Mock data & constants
│
├── pages/
│   ├── HomePage.tsx                 # Homepage
│   ├── ProductPage.tsx              # Product details
│   ├── CategoryPage.tsx             # Product listing
│   ├── CartPage.tsx                 # Shopping cart
│   ├── WishlistPage.tsx             # Wishlist
│   ├── CheckoutPage.tsx             # Checkout
│   ├── OrderSuccessPage.tsx         # Order confirmation
│   ├── CustomerDashboard.tsx        # User account
│   │
│   └── admin/
│       ├── AdminLayout.tsx          # Admin layout
│       ├── AdminDashboard.tsx       # Admin dashboard
│       ├── AdminProducts.tsx        # Product management
│       ├── AdminOrders.tsx          # Order management
│       ├── AdminCustomers.tsx       # Customer management
│       ├── AdminCoupons.tsx         # Coupon management
│       ├── AdminImport.tsx          # Product import
│       └── AdminSettings.tsx        # Settings
│
└── types/
    └── index.ts                     # TypeScript types
```

---

## 🎯 Main Components

### App.tsx
**Location:** `src/App.tsx`  
**Purpose:** Main application component with routing

**Key Functions:**
- Sets up React Router
- Wraps app in StoreProvider
- Defines all routes (customer + admin)

**Routes:**
```typescript
/                    → HomePage
/category/:slug      → CategoryPage
/product/:slug       → ProductPage
/cart                → CartPage
/wishlist            → WishlistPage
/checkout            → CheckoutPage
/order-success/:id   → OrderSuccessPage
/account             → CustomerDashboard
/account/:tab        → CustomerDashboard (tabs)
/admin               → AdminDashboard
/admin/products      → AdminProducts
/admin/orders        → AdminOrders
/admin/customers     → AdminCustomers
/admin/coupons       → AdminCoupons
/admin/import        → AdminImport
/admin/settings      → AdminSettings
```

---

### main.tsx
**Location:** `src/main.tsx`  
**Purpose:** Application entry point

**Key Functions:**
- Renders App component
- Wraps in StrictMode
- Imports global CSS

---

## 🧩 Reusable Components

### Layout.tsx
**Location:** `src/components/Layout.tsx`  
**Purpose:** Main layout wrapper for customer pages

**Key Functions:**
- `Layout()` - Main component
- Renders header with navigation
- Renders footer
- Includes mobile menu
- Search bar toggle
- Category dropdown
- Cart/wishlist badges

**Props:** None (uses Outlet for nested routes)

**State:**
- `mobileMenuOpen` - Mobile menu visibility
- `searchOpen` - Search bar visibility
- `searchQuery` - Search input value
- `catDropdown` - Category dropdown visibility

---

### ProductCard.tsx
**Location:** `src/components/ProductCard.tsx`  
**Purpose:** Product display card

**Key Functions:**
- `ProductCard({ product, index })` - Main component
- Displays product image, name, price
- Add to cart functionality
- Wishlist toggle
- Discount calculation
- Stock indicator

**Props:**
```typescript
{
  product: Product,
  index?: number
}
```

**Uses:**
- `useStore()` - Cart & wishlist context
- `Link` - Navigation
- `motion` - Animations

---

## 🔄 State Management

### StoreContext.tsx
**Location:** `src/context/StoreContext.tsx`  
**Purpose:** Global state management

**Key Functions:**

#### Reducers:
- `cartReducer(state, action)` - Cart state management
- `wishlistReducer(state, action)` - Wishlist state management
- `authReducer(state, action)` - Auth state management

#### Context Provider:
- `StoreProvider({ children })` - Wraps app with context

#### Hook:
- `useStore()` - Access global state

**State Structure:**
```typescript
{
  cart: {
    items: CartItem[],
    couponCode: string | null,
    couponDiscount: number
  },
  wishlist: {
    items: WishlistItem[]
  },
  auth: {
    user: User | null,
    isAuthenticated: boolean,
    addresses: Address[]
  }
}
```

**Actions:**

**Cart Actions:**
```typescript
{ type: 'ADD_TO_CART', product: Product }
{ type: 'REMOVE_FROM_CART', productId: string }
{ type: 'UPDATE_QUANTITY', productId: string, quantity: number }
{ type: 'CLEAR_CART' }
{ type: 'APPLY_COUPON', code: string, discount: number }
{ type: 'REMOVE_COUPON' }
```

**Wishlist Actions:**
```typescript
{ type: 'ADD_TO_WISHLIST', product: Product }
{ type: 'REMOVE_FROM_WISHLIST', productId: string }
{ type: 'MOVE_TO_CART', productId: string }
```

**Auth Actions:**
```typescript
{ type: 'LOGIN', user: User }
{ type: 'LOGOUT' }
{ type: 'ADD_ADDRESS', address: Address }
{ type: 'REMOVE_ADDRESS', addressId: string }
{ type: 'SET_DEFAULT_ADDRESS', addressId: string }
```

**Computed Values:**
- `cartTotal` - Total cart value
- `cartCount` - Number of items in cart
- `isInWishlist(productId)` - Check if product is in wishlist

---

## 📄 Customer Pages

### HomePage.tsx
**Location:** `src/pages/HomePage.tsx`  
**Purpose:** Landing page

**Key Functions:**
- `HomePage()` - Main component
- Hero banner carousel
- Category showcase
- Flash sale section
- Featured products
- Best sellers
- New arrivals
- Promotional banners
- Testimonials
- Brand showcase

**State:**
- `currentBanner` - Active banner index

**Uses:**
- `banners` - Mock banner data
- `categories` - Category data
- `products` - Product data
- `ProductCard` - Product display
- `Link` - Navigation

---

### ProductPage.tsx
**Location:** `src/pages/ProductPage.tsx`  
**Purpose:** Single product view

**Key Functions:**
- `ProductPage()` - Main component
- Image gallery
- Product information
- Add to cart
- Buy now
- Wishlist toggle
- Pincode checker
- Reviews display
- Related products

**State:**
- `selectedImage` - Active image index
- `quantity` - Purchase quantity
- `pincode` - Delivery pincode
- `pincodeResult` - Delivery check result
- `addedToCart` - Add to cart feedback

**Uses:**
- `useParams()` - Get product slug
- `useStore()` - Cart & wishlist
- `products` - Product data

---

### CategoryPage.tsx
**Location:** `src/pages/CategoryPage.tsx`  
**Purpose:** Product listing with filters

**Key Functions:**
- `CategoryPage()` - Main component
- Product grid
- Category filter
- Price range filter
- Brand filter
- Rating filter
- Sort options
- Search integration

**State:**
- `sortBy` - Sort order
- `priceRange` - Price filter [min, max]
- `showFilters` - Mobile filter visibility

**Uses:**
- `useParams()` - Get category slug
- `useSearchParams()` - Get query params
- `products` - Product data
- `categories` - Category data
- `ProductCard` - Product display

---

### CartPage.tsx
**Location:** `src/pages/CartPage.tsx`  
**Purpose:** Shopping cart

**Key Functions:**
- `CartPage()` - Main component
- Cart items display
- Quantity controls
- Remove items
- Coupon application
- Order summary
- Checkout button

**State:**
- `couponInput` - Coupon code input
- `couponMsg` - Coupon feedback message

**Uses:**
- `useStore()` - Cart context
- `coupons` - Coupon data

---

### WishlistPage.tsx
**Location:** `src/pages/WishlistPage.tsx`  
**Purpose:** Saved products

**Key Functions:**
- `WishlistPage()` - Main component
- Wishlist display
- Move to cart
- Remove from wishlist

**Uses:**
- `useStore()` - Wishlist context

---

### CheckoutPage.tsx
**Location:** `src/pages/CheckoutPage.tsx`  
**Purpose:** Checkout process

**Key Functions:**
- `CheckoutPage()` - Main component
- Multi-step checkout
- Address selection
- Shipping method
- Payment method
- Order placement

**State:**
- `step` - Current step (1-3)
- `paymentMethod` - Selected payment
- `selectedAddress` - Selected address ID
- `processing` - Order processing state

**Uses:**
- `useStore()` - Cart & auth context
- `useNavigate()` - Redirect after order

---

### OrderSuccessPage.tsx
**Location:** `src/pages/OrderSuccessPage.tsx`  
**Purpose:** Order confirmation

**Key Functions:**
- `OrderSuccessPage()` - Main component
- Success message
- Order number display
- Delivery estimate
- Action buttons

**Uses:**
- `useParams()` - Get order ID

---

### CustomerDashboard.tsx
**Location:** `src/pages/CustomerDashboard.tsx`  
**Purpose:** User account page

**Key Functions:**
- `CustomerDashboard()` - Main component
- Orders tab
- Addresses tab
- Wishlist tab
- Profile tab

**State:**
- `activeTab` - Current tab (from URL)

**Uses:**
- `useParams()` - Get active tab
- `useStore()` - Auth context
- `orders` - Order data

---

## 🎛️ Admin Pages

### AdminLayout.tsx
**Location:** `src/pages/admin/AdminLayout.tsx`  
**Purpose:** Admin panel layout

**Key Functions:**
- `AdminLayout()` - Main component
- Sidebar navigation
- Top bar
- Mobile menu
- Profile dropdown

**State:**
- `sidebarOpen` - Sidebar visibility
- `profileOpen` - Profile dropdown visibility

**Uses:**
- `useLocation()` - Active route
- `Outlet` - Nested routes

---

### AdminDashboard.tsx
**Location:** `src/pages/admin/AdminDashboard.tsx`  
**Purpose:** Admin analytics

**Key Functions:**
- `AdminDashboard()` - Main component
- Statistics cards
- Weekly sales chart
- Monthly revenue chart
- Order status chart
- Recent orders table
- Low stock alerts

**Uses:**
- `dashboardStats` - Statistics data
- `salesData` - Chart data
- `monthlySalesData` - Chart data
- `orders` - Recent orders
- `products` - Low stock products
- Recharts components

---

### AdminProducts.tsx
**Location:** `src/pages/admin/AdminProducts.tsx`  
**Purpose:** Product management

**Key Functions:**
- `AdminProducts()` - Main component
- Product list table
- Search & filter
- Bulk actions
- Add product modal
- Edit/Delete products

**State:**
- `searchQuery` - Search input
- `categoryFilter` - Category filter
- `statusFilter` - Status filter
- `selectedProducts` - Selected product IDs
- `showAddModal` - Add modal visibility

**Uses:**
- `products` - Product data
- `categories` - Category data

---

### AdminOrders.tsx
**Location:** `src/pages/admin/AdminOrders.tsx`  
**Purpose:** Order management

**Key Functions:**
- `AdminOrders()` - Main component
- Order list table
- Status tabs
- Search orders
- Update status
- View details
- Print invoice

**State:**
- `statusFilter` - Status filter
- `searchQuery` - Search input

**Uses:**
- `orders` - Order data

---

### AdminCustomers.tsx
**Location:** `src/pages/admin/AdminCustomers.tsx`  
**Purpose:** Customer management

**Key Functions:**
- `AdminCustomers()` - Main component
- Customer list table
- Search customers
- View details
- Export customers

**Uses:**
- Mock customer data (inline)

---

### AdminCoupons.tsx
**Location:** `src/pages/admin/AdminCoupons.tsx`  
**Purpose:** Coupon management

**Key Functions:**
- `AdminCoupons()` - Main component
- Coupon cards
- Create coupon modal
- Edit/Delete coupons
- Copy coupon code

**State:**
- `copiedId` - Copied coupon ID
- `showModal` - Create modal visibility

**Uses:**
- `coupons` - Coupon data

---

### AdminImport.tsx
**Location:** `src/pages/admin/AdminImport.tsx`  
**Purpose:** Product import system

**Key Functions:**
- `AdminImport()` - Main component
- Sync statistics
- Sync now button
- External products table
- Import/Update/Skip actions
- Price override
- Sync history

**State:**
- `syncing` - Sync in progress
- `selectedProducts` - Selected product IDs

**Uses:**
- `externalProducts` - External product data
- `syncLogs` - Sync history

---

### AdminSettings.tsx
**Location:** `src/pages/admin/AdminSettings.tsx`  
**Purpose:** Store settings

**Key Functions:**
- `AdminSettings()` - Main component
- Settings tabs
- General settings
- Payment settings
- Shipping settings
- Tax settings
- Email settings
- SEO settings
- Social media settings

**State:**
- `activeTab` - Active settings tab
- `saved` - Save confirmation

---

## 📊 Data Files

### mockData.ts
**Location:** `src/data/mockData.ts`  
**Purpose:** Mock data for development

**Exports:**
```typescript
products: Product[]              // 8 sample products
categories: Category[]           // 6 categories
banners: Banner[]                // 3 hero banners
coupons: Coupon[]                // 3 sample coupons
orders: Order[]                  // 3 sample orders
currentUser: User                // Admin user
dashboardStats: DashboardStats   // Dashboard metrics
externalProducts: ExternalProduct[]  // 6 external products
syncLogs: SyncLog[]              // 3 sync logs
salesData: SalesData[]           // Weekly sales chart
monthlySalesData: MonthlySalesData[]  // Monthly chart
```

---

## 📝 Type Definitions

### index.ts
**Location:** `src/types/index.ts`  
**Purpose:** TypeScript type definitions

**Types:**
```typescript
Product
Category
Subcategory
CartItem
WishlistItem
Address
Order
OrderItem
OrderStatus
Coupon
Banner
User
DashboardStats
ExternalProduct
SyncLog
```

---

## 🎨 Styling

### index.css
**Location:** `src/index.css`  
**Purpose:** Global styles

**Contents:**
- Tailwind CSS imports
- Custom scrollbar styles
- Line clamp utilities
- Base styles

---

## 🔧 Utility Functions

### Price Calculation
**Location:** Various components  
**Purpose:** Calculate prices and discounts

**Examples:**
```typescript
// Discount percentage
const discount = Math.round(((comparePrice - sellingPrice) / comparePrice) * 100);

// Cart total
const cartTotal = items.reduce((sum, item) => sum + item.product.sellingPrice * item.quantity, 0);

// Tax calculation
const tax = Math.round((subtotal - discount) * 0.18);

// Grand total
const grandTotal = subtotal - discount + shipping + tax;
```

---

### Date Formatting
**Location:** Various components  
**Purpose:** Format dates for display

**Examples:**
```typescript
// Short date
new Date(dateString).toLocaleDateString('en-IN', { 
  day: 'numeric', 
  month: 'short', 
  year: 'numeric' 
});

// Time
new Date(dateString).toLocaleString('en-IN', { 
  day: 'numeric', 
  month: 'short', 
  hour: '2-digit', 
  minute: '2-digit' 
});
```

---

## 🚀 Common Patterns

### Using Store Context
```typescript
import { useStore } from '../context/StoreContext';

function MyComponent() {
  const { cart, dispatchCart, cartTotal, cartCount } = useStore();
  
  const addToCart = () => {
    dispatchCart({ type: 'ADD_TO_CART', product });
  };
}
```

### Using Router
```typescript
import { Link, useParams, useNavigate } from 'react-router-dom';

function MyComponent() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  return <Link to={`/product/${slug}`}>View Product</Link>;
}
```

### Using Animations
```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
>
  Content
</motion.div>
```

---

## 📦 Dependencies

### Core
- `react` - UI library
- `react-dom` - DOM rendering
- `react-router-dom` - Routing

### UI
- `lucide-react` - Icons
- `framer-motion` - Animations
- `recharts` - Charts

### Styling
- `tailwindcss` - CSS framework

### Build
- `vite` - Build tool
- `typescript` - Type checking

---

## 🎯 Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview production build
npm run typecheck        # Check TypeScript errors

# File Operations
# Create new component
# 1. Create file in src/components/ or src/pages/
# 2. Export default function ComponentName()
# 3. Import and use in App.tsx or other components

# Add new route
# 1. Create page component
# 2. Add route in App.tsx
# 3. Add navigation link
```

---

## 🔍 Search Patterns

### Find all components
```bash
grep -r "export default function" src/
```

### Find all uses of a component
```bash
grep -r "ComponentName" src/
```

### Find all state usage
```bash
grep -r "useState" src/
```

### Find all context usage
```bash
grep -r "useStore" src/
```

---

## 📚 Learning Resources

### React
- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [TypeScript with React](https://www.typescriptlang.org/docs/handbook/react.html)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)
- [Tailwind Cheat Sheet](https://tailwindcomponents.com/cheatsheet/)

### Vite
- [Vite Guide](https://vitejs.dev/guide/)

---

**Last Updated:** March 2026  
**Version:** 1.0.0
