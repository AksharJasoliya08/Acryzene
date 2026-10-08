import { useState } from 'react';
import { Star, ThumbsUp, Camera } from 'lucide-react';
import { Review } from '../types/extended';

// Mock reviews for demo
const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: '1',
    userName: 'Rahul S.',
    rating: 5,
    title: 'Excellent quality!',
    comment: 'Best purchase I made this year. The sound quality is amazing and battery life exceeds expectations. Highly recommended!',
    images: [],
    isVerifiedPurchase: true,
    status: 'approved',
    helpfulCount: 24,
    createdAt: '2026-03-20T10:30:00',
  },
  {
    id: '2',
    productId: '1',
    userId: '2',
    userName: 'Priya M.',
    rating: 4,
    title: 'Good value for money',
    comment: 'Works as described. Comfortable to wear for long hours. The noise cancellation could be better but overall satisfied.',
    images: [],
    isVerifiedPurchase: true,
    status: 'approved',
    helpfulCount: 12,
    createdAt: '2026-03-18T14:20:00',
  },
  {
    id: '3',
    productId: '1',
    userId: '3',
    userName: 'Amit K.',
    rating: 5,
    title: 'Perfect for daily use',
    comment: 'Using it daily for work calls and music. The microphone quality is crystal clear. Great build quality too.',
    images: [],
    isVerifiedPurchase: true,
    status: 'approved',
    helpfulCount: 8,
    createdAt: '2026-03-15T09:15:00',
  },
];

interface ReviewSectionProps {
  productId: string;
  productRating: number;
  reviewCount: number;
  className?: string;
}

export default function ReviewSection({ productId, productRating, reviewCount, className = '' }: ReviewSectionProps) {
  const [reviews] = useState<Review[]>(mockReviews);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  // Rating distribution (mock)
  const ratingDistribution = [
    { stars: 5, count: 89, percentage: 70 },
    { stars: 4, count: 25, percentage: 20 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 3, percentage: 2 },
  ];

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Customer Reviews ({reviewCount})
        </h2>
        <button
          onClick={() => setShowWriteReview(!showWriteReview)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
        >
          Write a Review
        </button>
      </div>

      {/* Rating Summary */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Overall Rating */}
          <div className="text-center md:border-r md:pr-6">
            <p className="text-5xl font-bold text-gray-900">{productRating}</p>
            <div className="flex items-center justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < Math.floor(productRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">{reviewCount} reviews</p>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1 space-y-2">
            {ratingDistribution.map(item => (
              <div key={item.stars} className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-12">{item.stars} star</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-8">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Write Review Form */}
      {showWriteReview && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Write Your Review</h3>
          
          {/* Star Rating */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-2 block">Your Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setNewRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={32}
                    className={
                      star <= (hoverRating || newRating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Title */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-1 block">Review Title</label>
            <input
              type="text"
              placeholder="e.g., Great product!"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Review Comment */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-1 block">Your Review</label>
            <textarea
              rows={4}
              placeholder="Share your experience with this product..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Upload Images */}
          <div className="mb-4">
            <label className="text-sm text-gray-600 mb-1 block">Add Photos (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Camera size={24} className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Click to upload images</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => setShowWriteReview(false)}
              className="flex-1 border border-gray-300 py-2 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('Review submitted! (Demo mode)');
                setShowWriteReview(false);
              }}
              disabled={newRating === 0}
              className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="bg-white border border-gray-100 rounded-xl p-4">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  {review.isVerifiedPurchase && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <h4 className="font-semibold text-gray-900">{review.title}</h4>
              </div>
              <span className="text-xs text-gray-500">
                {new Date(review.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </div>

            {/* Review Content */}
            <p className="text-gray-600 text-sm mb-3">{review.comment}</p>

            {/* Review Images */}
            {review.images.length > 0 && (
              <div className="flex gap-2 mb-3">
                {review.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Review image ${i + 1}`}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                ))}
              </div>
            )}

            {/* Review Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-sm text-gray-500">By {review.userName}</span>
              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600 transition">
                <ThumbsUp size={14} />
                Helpful ({review.helpfulCount})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
