import api from './api';

export const orderService = {
  createOrder: async (orderData) => {
    const response = await api.post('/orders/place-order/', orderData);
    return response.data;
  },

  getOrders: async () => {
    const response = await api.get('/orders/place-order/');
    return response.data;
  },

  getOrder: async (orderId) => {
    const response = await api.get(`/orders/orders/${orderId}/`);
    return response.data;
  },

  createStripeSession: async (orderId) => {
    const response = await api.post(`/orders/stripe/create-session/?order_id=${orderId}`);
    return response.data;
  },

  createSSLSession: async (orderId, amount) => {
    const response = await api.post('/orders/ssl-payment/', {
      order_id: orderId,
      amount
    });
    return response.data;
  },

  getPaymentMethods: async () => {
    const response = await api.get('/orders/payments/');
    return response.data;
  }
};