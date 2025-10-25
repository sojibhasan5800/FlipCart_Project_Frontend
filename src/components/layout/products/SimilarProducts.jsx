import React from 'react';
import { useQuery } from 'react-query';
import { productService } from '../../services/productService';
import ProductCard from './ProductCard';

const SimilarProducts = ({ productId, categoryId }) => {
  const { data: similarProducts, isLoading } = useQuery(
    ['similar-products', productId],
    () => productService.getProducts({ category: categoryId, exclude: productId, limit: 4 }),
    { enabled: !!categoryId }
  );

  if (!similarProducts?.length) return null;

  return (
    <section className="mt-16">
      <h3 className="text-2xl font-bold mb-8">Similar Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {similarProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;