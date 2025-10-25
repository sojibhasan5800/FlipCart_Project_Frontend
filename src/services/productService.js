import api from './api';

export const productService = {
  getProducts: async (params = {}) => {
    const response = await api.get('/store/products/', { params });
    return response.data;
  },

  getProduct: async (id) => {
    const response = await api.get(`/store/products/${id}/`);
    return response.data;
  },

  searchProducts: async (query) => {
    const response = await api.get('/store/search/', { params: { search: query } });
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/category/');
    return response.data;
  },

  getProductReviews: async (productId) => {
    const response = await api.get('/store/reviews/', { params: { product: productId } });
    return response.data;
  },

  submitReview: async (reviewData) => {
    const response = await api.post('/store/reviews/create/', reviewData);
    return response.data;
  }
};