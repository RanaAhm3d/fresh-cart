export interface ReviewsResponse {
  status?: string;
  results?: number;
  data: Review[];
}

export interface Review {
  _id: string;
  rating: number;
  review: string;
  user: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}
