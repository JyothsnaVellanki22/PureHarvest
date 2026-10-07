export interface Farm {
  id: string;
  name: string;
  location: string;
  district: string;
  rating: number;
  image: string;
  tags: string[];
  plansCount: number;
  category: string;
  description?: string;
  acres?: number;
  establishedYear?: number;
}

export type CropCategory =
  | "All"
  | "Food Crops"
  | "Cash Crops"
  | "Oilseeds"
  | "Fruits"
  | "Vegetables";

export interface FarmFilterCriteria {
  searchQuery?: string;
  category?: string;
  district?: string;
  minRating?: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
  hasMore: boolean;
}
