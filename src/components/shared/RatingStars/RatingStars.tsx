import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

interface RatingProps {
  rating: number;
}

export default function RatingStars({ rating }: RatingProps) {
  return (
    <div className="flex items-center gap-1 text-yellow-500">
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star) {
          return <FaStar key={star} />;
        } else if (rating >= star - 0.5) {
          return <FaStarHalfAlt key={star} />;
        } else {
          return <FaRegStar key={star} />;
        }
      })}
    </div>
  );
}