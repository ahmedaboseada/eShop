import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { api } from '../api/client';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setCart({ items: [] });
      return;
    }
    setLoading(true);
    try {
      const res = await api.getCart();
      setCart(res.data || { items: [] });
    } catch {
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function addItem(productId, quantity = 1) {
    const res = await api.addToCart(productId, quantity);
    setCart(res.data);
    return res.data;
  }

  async function updateItem(productId, quantity) {
    const res = await api.updateCartItem(productId, quantity);
    setCart(res.data);
    return res.data;
  }

  async function clear() {
    const res = await api.clearCart();
    setCart(res.data);
  }

  const count = (cart.items || []).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, loading, count, refresh, addItem, updateItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
