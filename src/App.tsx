import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminCoupons from './pages/admin/AdminCoupons';
import AdminImport from './pages/admin/AdminImport';
import AdminSettings from './pages/admin/AdminSettings';
import Layout from './components/Layout';

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          {/* Customer Routes */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success/:orderId" element={<OrderSuccessPage />} />
            <Route path="/account" element={<CustomerDashboard />} />
            <Route path="/account/:tab" element={<CustomerDashboard />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="coupons" element={<AdminCoupons />} />
            <Route path="import" element={<AdminImport />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
