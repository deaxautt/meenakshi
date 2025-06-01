import { create } from 'zustand';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  images?: string[];
}

interface ReviewsState {
  reviews: { [productId: string]: Review[] };
  addReview: (review: Review) => void;
  updateReview: (review: Review) => void;
  deleteReview: (reviewId: string, productId: string) => void;
  markHelpful: (reviewId: string, productId: string) => void;
  getProductReviews: (productId: string) => Review[];
}

const useReviewsStore = create<ReviewsState>((set, get) => ({
  reviews: {},
  addReview: (review) => set((state) => ({
    reviews: {
      ...state.reviews,
      [review.productId]: [...(state.reviews[review.productId] || []), review]
    }
  })),
  updateReview: (review) => set((state) => ({
    reviews: {
      ...state.reviews,
      [review.productId]: state.reviews[review.productId].map(r => 
        r.id === review.id ? review : r
      )
    }
  })),
  deleteReview: (reviewId, productId) => set((state) => ({
    reviews: {
      ...state.reviews,
      [productId]: state.reviews[productId].filter(r => r.id !== reviewId)
    }
  })),
  markHelpful: (reviewId, productId) => set((state) => ({
    reviews: {
      ...state.reviews,
      [productId]: state.reviews[productId].map(r => 
        r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
      )
    }
  })),
  getProductReviews: (productId) => get().reviews[productId] || []
}));

export default useReviewsStore;