export interface ApiResponse<type> {
  results: number;
  metadata: MetaData;
  data: type[];
}

export interface MetaData {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  prevPage: number;
}
