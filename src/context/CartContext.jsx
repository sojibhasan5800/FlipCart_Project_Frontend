import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartService } from '../services/cartService';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const getCartId = () => {
    let cartId = localStorage.getItem('cart_id');
    if (!cartId) {
      cartId = 'cart_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('cart_id', cartId);
    }
    return cartId;
  };

  const loadCart = async () => {
    try {
      const cartId = getCartId();
      const items = await cartService.getCartItems(cartId);
      setCartItems(items);
      updateCartSummary(items);
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  const updateCartSummary = (items) => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + item.sub_total, 0);
    setCartCount(count);
    setCartTotal(total);
  };

  const addToCart = async (product, quantity = 1, variations = {}) => {
    try {
      await cartService.addToCart(product.id, quantity, variations);
      await loadCart();
      toast.success('Product added to cart!');
    } catch (error) {
      toast.error('Failed to add product to cart');
      throw error;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(itemId);
      } else {
        await cartService.updateCartItem(itemId, quantity);
        await loadCart();
      }
    } catch (error) {
      toast.error('Failed to update cart');
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await cartService.removeCartItem(itemId);
      await loadCart();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item from cart');
      throw error;
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setCartCount(0);
    setCartTotal(0);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};