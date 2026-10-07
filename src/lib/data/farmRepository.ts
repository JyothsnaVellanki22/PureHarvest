import { ALL_FARMS, LOCATIONS, CROP_CATEGORIES } from "@/lib/data";
import { Farm, FarmFilterCriteria, PaginationParams, PaginatedResult } from "@/types";

export interface IFarmRepository {
  findById(id: string): Promise<Farm | null>;
  findMany(criteria?: FarmFilterCriteria, pagination?: PaginationParams): Promise<PaginatedResult<Farm>>;
  getAllDistricts(): Promise<string[]>;
  getAllCategories(): Promise<string[]>;
}

export class FarmRepository implements IFarmRepository {
  private farms: Farm[];

  constructor(initialData: Farm[] = ALL_FARMS) {
    this.farms = initialData;
  }

  public async findById(id: string): Promise<Farm | null> {
    const farm = this.farms.find((f) => f.id === id);
    return farm ? { ...farm } : null;
  }

  public async findMany(
    criteria: FarmFilterCriteria = {},
    pagination: PaginationParams = {}
  ): Promise<PaginatedResult<Farm>> {
    const { searchQuery, category, district, minRating } = criteria;
    const page = Math.max(1, pagination.page || 1);
    const limit = Math.max(1, Math.min(50, pagination.limit || 12));

    const filtered = this.farms.filter((farm) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = farm.name.toLowerCase().includes(query);
        const matchesLocation = farm.location.toLowerCase().includes(query);
        const matchesTags = farm.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesName && !matchesLocation && !matchesTags) {
          return false;
        }
      }

      if (category && category !== "All") {
        const matchesCat = farm.category === category || farm.tags.includes(category);
        if (!matchesCat) return false;
      }

      if (district && district !== "All") {
        if (farm.district.toLowerCase() !== district.toLowerCase()) {
          return false;
        }
      }

      if (minRating !== undefined && farm.rating < minRating) {
        return false;
      }

      return true;
    });

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const items = filtered.slice(startIndex, startIndex + limit);

    return {
      items,
      total,
      page,
      totalPages,
      hasMore: page < totalPages,
    };
  }

  public async getAllDistricts(): Promise<string[]> {
    return [...LOCATIONS];
  }

  public async getAllCategories(): Promise<string[]> {
    return [...CROP_CATEGORIES];
  }
}

export const farmRepository = new FarmRepository();
