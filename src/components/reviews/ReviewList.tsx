import React, { useState } from 'react';
import { Star, ThumbsUp, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import useReviewsStore, { Review } from '../../store/reviews';

interface ReviewListProps {
  productId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ productId }) => {
  const reviews = useReviewsStore(state => state.getProductReviews(productId));
  const markHelpful = useReviewsStore(state => state.markHelpful);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('recent');

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'helpful':
        return b.helpful - a.helpful;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const averageRating = reviews.length
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  const ratingCounts = reviews.reduce((acc, review) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex gap-1 justify-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={`${
                    star <= Math.round(averageRating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {reviews.length} reviews
            </div>
          </div>

          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="text-sm text-gray-600 w-8">{rating}</div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{
                      width: `${
                        ((ratingCounts[rating] || 0) / reviews.length) * 100
                      }%`
                    }}
                  />
                </div>
                <div className="text-sm text-gray-600 w-8">
                  {ratingCounts[rating] || 0}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="flex justify-end">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
        >
          <option value="recent">Most Recent</option>
          <option value="helpful">Most Helpful</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{review.userName}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={`${
                        star <= review.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={() => markHelpful(review.id, productId)}
                className="flex items-center gap-2 text-gray-500 hover:text-primary"
              >
                <ThumbsUp size={16} />
                <span>{review.helpful}</span>
              </button>
            </div>

            <p className="mt-4 text-gray-600">{review.comment}</p>

            {review.images && review.images.length > 0 && (
              <div className="mt-4 flex gap-2">
                {review.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className="w-20 h-20 rounded-lg overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`Review image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Review image"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ReviewList;