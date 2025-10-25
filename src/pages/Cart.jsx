import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Add some products to your cart to get started</p>
        <Link
          to="/store"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const subtotal = cartTotal;
  const discount = subtotal * 0.05; // 5% discount
  const grandTotal = subtotal - discount;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {cartItems.map((item) => (
              <div key={item.id} className="border-b border-gray-200 last:border-b-0">
                <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Product Image */}
                  <img
                    src={item.product.images}
                    alt={item.product.product_name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.product.category}/${item.product.slug}`}
                      className="text-lg font-semibold text-gray-800 hover:text-blue-600 truncate block"
                    >
                      {item.product.product_name}
                    </Link>
                    
                    {/* Variations */}
                    {item.variations.length > 0 && (
                      <div className="text-sm text-gray-600 mt-1">
                        {item.variations.map((variation, index) => (
                          <span key={variation.id}>
                            {variation.variation_category}: {variation.variation_value}
                            {index < item.variations.length - 1 && ', '}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="text-lg font-bold text-blue-600 mt-2">
                      ${item.product.price}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 text-gray-600 hover:text-gray-700"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300 min-w-12 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 text-gray-600 hover:text-gray-700"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition duration-200"
                      title="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-800">
                      ${item.sub_total}
                    </div>
                    <div className="text-sm text-gray-500">
                      ${item.product.price} × {item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Clear Cart Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Discount (5%)</span>
                <span className="text-green-600">-${discount.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Grand Total</span>
                  <span className="text-blue-600">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 text-center block"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/store"
              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition duration-300 text-center block mt-3"
            >
              Continue Shopping
            </Link>

            {/* Security Note */}
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800 text-center">
                <strong>Please Note:</strong> This is a demo website. Do not try to make real payments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;