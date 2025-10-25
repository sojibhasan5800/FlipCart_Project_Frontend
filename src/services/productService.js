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

  getProductBySlug: async (slug) => {
    const response = await api.get('/store/products/', { params: { slug } });
    return response.data.results?.[0] || null;
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
  },

  getSimilarProducts: async (productId, categoryId) => {
    const response = await api.get('/store/products/', { 
      params: { category: categoryId, exclude: productId, limit: 4 } 
    });
    return response.data;
  }
};