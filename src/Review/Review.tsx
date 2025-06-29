import { FC, useEffect, useState } from "react";
import axios from "axios";
import HoverRating from "./Rating";

type Review = {
  _id: string;
  comment: string;
  rating: number;
  created: string;
  author: {
    _id: string;
    username: string;
  };
};

type Props = {
  refId: string;
  type: "writer" | "painting";
};

const Reviews: FC<Props> = ({ refId, type }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");
  // const username = JSON.parse(localStorage.getItem("user") || "{}")?.username;
  const isLoggedIn = !!token; // Determine if the user is logged in based on the presence of the token

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Review[]>(`http://localhost:3000/reviews/${refId}/${type}`);
        setReviews(res.data);
        setError("");
      } catch (err: any) {
        console.error("Error fetching reviews:", err.response?.data || err.message);
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    if (refId && type) fetchReviews();
  }, [refId, type]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setError("You must be logged in to submit a review.");
      return;
    }

    if (!comment) {
      setError("Please provide a comment for the review.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "http://localhost:3000/reviews",
        {
          comment,
          rating,
          refId,
          type,
          // username, // Send the username from localStorage
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviews((prevReviews) => [res.data.data, ...prevReviews]);
      setComment("");
      setRating(5);
      setSuccess("Review submitted successfully!");
    } catch (err: any) {
      console.error("Error submitting review:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 border rounded-2xl shadow-sm">
      {/* Review Form Section */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold">Add a Review</h4>
        
        {/* Display a message if the user is not logged in */}
        {!isLoggedIn && (
          <p className="text-red-600">You need to sign in to submit a review.</p>
        )}
        
        <form onSubmit={handleReviewSubmit} className="space-y-4 mt-4">
          <div>
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              required
              disabled={!isLoggedIn} // Disable the input if the user is not logged in
            />
          </div>
          <div className="flex items-center text-xl">
            <label className="mr-30">Rating:</label>
            <HoverRating 
              rating={rating} 
              onChange={(value:any) => setRating(value)} 
              // interactive={true}
            />
          </div>

          {error && <div className="text-red-600">{error}</div>}
          {success && <div className="text-green-600">{success}</div>}

          <button
            type="submit"
            className="bg-blue-500  text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            disabled={isSubmitting || !isLoggedIn} // Disable the submit button if not logged in or if submitting
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <h3 className="text-lg font-semibold mb-4 mt-8">Reviews</h3>
      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews found for this {type}.</p>
      ) : (
        <div className="space-y-4 grid grid-cols-2 gap-4">
          {reviews.map((review) => (
            <span key={review._id} className="border p-3 rounded">
              <div className="flex justify-between items-center">
                <span className="font-medium">{review.author.username}</span>
                <span className="text-sm text-gray-500">
                  {new Date(review.created).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center mt-2">
                <span className="mr-2">Rating:</span>
                <HoverRating rating={review.rating} readOnly />
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
