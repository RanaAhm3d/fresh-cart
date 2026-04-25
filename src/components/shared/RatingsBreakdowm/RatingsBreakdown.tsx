"use client";

type Review = {
  rating: number;
};

type Props = {
  reviews: Review[];
};

export default function RatingsBreakdown({ reviews }: Props) {
  const total = reviews.length;

  const getCount = (star: number) =>
    reviews.filter((r) => r.rating === star).length;

  const getPercent = (star: number) => {
    if (total === 0) return 0;
    return Math.round((getCount(star) / total) * 100);
  };

  const stars = [5, 4, 3, 2, 1];

  return (
    <div className="w-full">
      {stars.map((star) => {
        const percent = getPercent(star);

        return (
          <div key={star} className="flex items-center gap-3 mb-2">
            <span className="text-sm text-gray-600 w-8">{star} star</span>

            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>

            <span className="text-sm text-gray-500">{percent}%</span>
          </div>
        );
      })}
    </div>
  );
}
