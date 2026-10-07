import { createContext, useContext, useReducer, type ReactNode, type Dispatch } from 'react';
import { Product, CartItem, WishlistItem, User, Address } from '../types';
import { currentUser } from '../data/mockData';

// Cart State
interface CartState {
  items: CartItem[];
  couponCode: string | null;
  couponDiscount: number;
}

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_COUPON'; code: string; discount: number }
  | { type: 'REMOVE_COUPON' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.items.find(i => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.product.id === action.product.id
              ? { ...i, quantity: Math.min(i.quantity + 1, i.product.maxQty) }
              : i
          )
        };
      }
      return { ...state, items: [...state.items, { product: action.product, quantity: 1 }] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(i => i.product.id !== action.productId) };
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter(i => i.product.id !== action.productId) };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        )
      };
    case 'CLEAR_CART':
      return { ...state, items: [], couponCode: null, couponDiscount: 0 };
    case 'APPLY_COUPON':
      return { ...state, couponCode: action.code, couponDiscount: action.discount };
    case 'REMOVE_COUPON':
      return { ...state, couponCode: null, couponDiscount: 0 };
    default:
      return state;
  }
}

// Wishlist State
interface WishlistState {
  items: WishlistItem[];
}

type WishlistAction =
  | { type: 'ADD_TO_WISHLIST'; product: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; productId: string }
  | { type: 'MOVE_TO_CART'; productId: string };

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      if (state.items.find(i => i.product.id === action.product.id)) return state;
      return { items: [...state.items, { product: action.product, addedAt: new Date().toISOString() }] };
    case 'REMOVE_FROM_WISHLIST':
      return { items: state.items.filter(i => i.product.id !== action.productId) };
    case 'MOVE_TO_CART':
      return { items: state.items.filter(i => i.product.id !== action.productId) };
    default:
      return state;
  }
}

// Auth State
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  addresses: Address[];
}

type AuthAction =
  | { type: 'LOGIN'; user: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_ADDRESS'; address: Address }
  | { type: 'REMOVE_ADDRESS'; addressId: string }
  | { type: 'SET_DEFAULT_ADDRESS'; addressId: string };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.user, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    case 'ADD_ADDRESS':
      return { ...state, addresses: [...state.addresses, action.address] };
    case 'REMOVE_ADDRESS':
      return { ...state, addresses: state.addresses.filter(a => a.id !== action.addressId) };
    case 'SET_DEFAULT_ADDRESS':
      return {
        ...state,
        addresses: state.addresses.map(a => ({ ...a, isDefault: a.id === action.addressId }))
      };
    default:
      return state;
  }
}

// Context
interface StoreContextType {
  cart: CartState;
  wishlist: WishlistState;
  auth: AuthState;
  dispatchCart: Dispatch<CartAction>;
  dispatchWishlist: Dispatch<WishlistAction>;
  dispatchAuth: Dispatch<AuthAction>;
  cartTotal: number;
  cartCount: number;
  isInWishlist: (productId: string) => boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, dispatchCart] = useReducer(cartReducer, { items: [], couponCode: null, couponDiscount: 0 });
  const [wishlist, dispatchWishlist] = useReducer(wishlistReducer, { items: [] });
  const [auth, dispatchAuth] = useReducer(authReducer, {
    user: currentUser,
    isAuthenticated: true,
    addresses: [
      { id: '1', name: 'Rahul Sharma', phone: '9876543210', line1: '123 MG Road', city: 'Ahmedabad', state: 'Gujarat', pincode: '380001', isDefault: true },
      { id: '2', name: 'Rahul Sharma', phone: '9876543210', line1: '456 Office Park, SG Highway', line2: 'Near Mall', city: 'Ahmedabad', state: 'Gujarat', pincode: '380015', isDefault: false },
    ]
  });

  const cartTotal = cart.items.reduce((sum, item) => sum + item.product.sellingPrice * item.quantity, 0);
  const cartCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  const isInWishlist = (productId: string) => wishlist.items.some(i => i.product.id === productId);

  return (
    <StoreContext.Provider value={{ cart, wishlist, auth, dispatchCart, dispatchWishlist, dispatchAuth, cartTotal, cartCount, isInWishlist }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}
