import api from './api';

export const cartService = {
  getCartItems: async (cartId) => {
    const response = await api.get(`/carts/?id=${cartId}`);
    return response.data;
  },

  addToCart: async (productId, quantity = 1, variations = {}) => {
    const response = await api.post('/carts/', {
      product_id: productId,
      quantity,
      ...variations
    });
    return response.data;
  },

  updateCartItem: async (itemId, quantity) => {
    const response = await api.put(`/carts/${itemId}/`, { quantity });
    return response.data;
  },

  removeCartItem: async (itemId) => {
    const response = await api.delete(`/carts/${itemId}/`);
    return response.data;
  }
};