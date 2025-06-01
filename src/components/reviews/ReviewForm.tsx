import React, { useState } from 'react';
import { Star, Image as ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import useReviewsStore from '../../store/reviews';
import { useAuth } from '../../contexts/AuthContext';

interface ReviewFormProps {
  productId: string;
  onClose: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onClose }) => {
  const { user } = useAuth();
  const addReview = useReviewsStore(state => state.addReview);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!rating) {
      setError('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      setError('Please write a review');
      return;
    }

    if (!user) {
      setError('Please sign in to submit a review');
      return;
    }

    const review = {
      id: uuidv4(),
      productId,
      userId: user.id,
      userName: user.full_name,
      rating,
      comment,
      date: new Date().toISOString(),
      helpful: 0,
      images
    };

    addReview(review);
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Convert files to URLs
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setRating(star)}
                className="text-2xl focus:outline-none"
              >
                <Star
                  size={24}
                  className={`${
                    star <= (hoveredStar || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Review Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20"
            placeholder="Write your review here..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Photos
          </label>
          <div className="flex flex-wrap gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative w-20 h-20">
                <img
                  src={image}
                  alt={`Review image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            <label className="w-20 h-20 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <ImageIcon size={24} className="text-gray-400" />
            </label>
          </div>
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            Submit Review
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ReviewForm;