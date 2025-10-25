import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Star, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { productService } from '../../services/productService';

const ReviewSection = ({ product, reviews }) => {
  const { user } = useAuth();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const setRating = (rating) => {
    setValue('rating', rating, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    try {
      await productService.submitReview({
        ...data,
        product: product.id
      });
      setShowReviewForm(false);
      // Refresh reviews
      window.location.reload();
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  const renderStars = (rating, size = 'w-4 h-4') => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className={`${size} fill-yellow-400 text-yellow-400`} />);
      } else {
        stars.push(<Star key={i} className={`${size} text-gray-300`} />);
      }
    }
    return stars;
  };

  return (
    <div className="mt-16">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-bold">Customer Reviews</h3>
        {user && (
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Write Review
          </button>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h4 className="text-lg font-semibold mb-4">Write Your Review</h4>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="text-2xl text-gray-300 hover:text-yellow-400 focus:outline-none"
                  >
                    <Star className="w-8 h-8" />
                  </button>
                ))}
              </div>
              <input
                type="hidden"
                {...register('rating', { required: 'Rating is required' })}
              />
              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
              )}
            </div>

            {/* Review Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Review Title</label>
              <input
                {...register('subject', { required: 'Title is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Summarize your experience"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
              )}
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-sm font-medium mb-2">Review</label>
              <textarea
                {...register('review', { required: 'Review text is required' })}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Share your thoughts about this product..."
              />
              {errors.review && (
                <p className="text-red-500 text-sm mt-1">{errors.review.message}</p>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews?.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h5 className="font-semibold">{review.user_name}</h5>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-500 ml-2">
                        {new Date(review.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <h6 className="font-semibold text-lg mb-2">{review.subject}</h6>
              <p className="text-gray-700 leading-relaxed">{review.review}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No reviews yet. Be the first to review this product!
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;