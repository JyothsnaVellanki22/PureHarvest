import { farmRepository, IFarmRepository } from "@/lib/data/farmRepository";
import { Farm, FarmFilterCriteria, PaginationParams, PaginatedResult } from "@/types";
import { logger } from "@/lib/logger/logger";
import { sanitizeString } from "@/lib/security/validator";

export class FarmService {
  private repository: IFarmRepository;

  constructor(repository: IFarmRepository = farmRepository) {
    this.repository = repository;
  }

  public async getFarmById(id: string, correlationId?: string): Promise<Farm | null> {
    const cleanId = sanitizeString(id);
    if (!cleanId) {
      logger.warn("Invalid farm ID requested", { requestedId: id }, correlationId);
      return null;
    }

    logger.debug(`Fetching farm by ID: ${cleanId}`, { farmId: cleanId }, correlationId);
    return this.repository.findById(cleanId);
  }

  public async getFarms(
    criteria: FarmFilterCriteria = {},
    pagination: PaginationParams = {},
    correlationId?: string
  ): Promise<PaginatedResult<Farm>> {
    const sanitizedCriteria: FarmFilterCriteria = {
      searchQuery: criteria.searchQuery ? sanitizeString(criteria.searchQuery) : undefined,
      category: criteria.category ? sanitizeString(criteria.category) : undefined,
      district: criteria.district ? sanitizeString(criteria.district) : undefined,
      minRating: criteria.minRating,
    };

    logger.info("Querying farms with filters", { criteria: sanitizedCriteria, pagination }, correlationId);
    return this.repository.findMany(sanitizedCriteria, pagination);
  }

  public async getDistricts(): Promise<string[]> {
    return this.repository.getAllDistricts();
  }

  public async getCategories(): Promise<string[]> {
    return this.repository.getAllCategories();
  }
}

export const farmService = new FarmService();
