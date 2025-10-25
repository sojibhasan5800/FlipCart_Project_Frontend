import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Star, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import ReviewSection from '../components/products/ReviewSection';
import SimilarProducts from '../components/products/SimilarProducts';

const ProductDetail = () => {
  const { category, slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  const { data: product, isLoading } = useQuery(
    ['product', slug],
    () => productService.getProductBySlug(slug),
    { enabled: !!slug }
  );

  const { data: reviews } = useQuery(
    ['reviews', product?.id],
    () => productService.getProductReviews(product?.id),
    { enabled: !!product?.id }
  );

  const handleAddToCart = async () => {
    if (!product) return;

    const variations = {};
    if (selectedColor) variations.color = selectedColor;
    if (selectedSize) variations.size = selectedSize;

    try {
      await addToCart(product, quantity, variations);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-300 h-96 rounded"></div>
            <div className="space-y-4">
              <div className="bg-gray-300 h-8 rounded w-3/4"></div>
              <div className="bg-gray-300 h-4 rounded w-1/2"></div>
              <div className="bg-gray-300 h-20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-600">Product not found</h1>
        <Link to="/store" className="text-blue-600 hover:underline">
          Back to Store
        </Link>
      </div>
    );
  }

  const images = [product.images, ...(product.gallery || [])];
  const colors = product.variations?.filter(v => v.variation_category === 'color') || [];
  const sizes = product.variations?.filter(v => v.variation_category === 'size') || [];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li>→</li>
          <li><Link to="/store" className="hover:text-blue-600">Store</Link></li>
          <li>→</li>
          <li><Link to={`/store?category=${product.category}`} className="hover:text-blue-600">{product.category_name}</Link></li>
          <li>→</li>
          <li className="text-gray-900 font-medium">{product.product_name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <img
              src={images[selectedImage]}
              alt={product.product_name}
              className="w-full h-96 object-contain"
            />
          </div>
          {images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.product_name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.product_name}
          </h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center space-x-1">
              {renderStars(product.average_rating || 0)}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              ({product.review_count || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-blue-600 mb-6">
            ${product.price}
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Variations */}
          <div className="space-y-4 mb-6">
            {colors.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">Color</label>
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.variation_value)}
                      className={`px-4 py-2 border rounded-lg text-sm ${
                        selectedColor === color.variation_value
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {color.variation_value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sizes.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <div className="flex space-x-2">
                  {sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.variation_value)}
                      className={`px-4 py-2 border rounded-lg text-sm ${
                        selectedSize === size.variation_value
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size.variation_value}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.is_available}
              className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-semibold ${
                product.is_available
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
            >
              <ShoppingCart size={20} />
              <span>
                {product.is_available ? 'Add to Cart' : 'Out of Stock'}
              </span>
            </button>
          </div>

          {/* Additional Actions */}
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-700">
              <Heart size={20} />
              <span>Add to Wishlist</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-700">
              <Share2 size={20} />
              <span>Share</span>
            </button>
          </div>

          {/* Stock Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Stock:</strong> {product.stock} units available
            </p>
            {product.stock < 10 && product.stock > 0 && (
              <p className="text-sm text-orange-600 mt-1">
                Only {product.stock} left in stock!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewSection product={product} reviews={reviews} />

      {/* Similar Products */}
      <SimilarProducts productId={product.id} categoryId={product.category} />
    </div>
  );
};

export default ProductDetail;