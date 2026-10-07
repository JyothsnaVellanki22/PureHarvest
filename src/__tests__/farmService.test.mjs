import { test, describe } from "node:test";
import assert from "node:assert/strict";

const MOCK_FARMS = [
  {
    id: "1",
    name: "Chilli",
    location: "Guntur, Andhra Pradesh",
    district: "Guntur",
    rating: 4.9,
    category: "Cash Crops",
    tags: ["Chili", "Cash Crops"],
    plansCount: 15,
  },
  {
    id: "4",
    name: "Rice",
    location: "Vijayawada, Andhra Pradesh",
    district: "Krishna",
    rating: 4.7,
    category: "Food Crops",
    tags: ["Rice", "Food Crops"],
    plansCount: 20,
  },
  {
    id: "5",
    name: "Turmeric",
    location: "Nizamabad, Telangana",
    district: "Nizamabad",
    rating: 4.9,
    category: "Cash Crops",
    tags: ["Turmeric", "Cash Crops"],
    plansCount: 14,
  },
];

class MockFarmRepository {
  async findById(id) {
    return MOCK_FARMS.find((f) => f.id === id) || null;
  }

  async findMany(criteria = {}, pagination = {}) {
    const { searchQuery, category, district } = criteria;
    const page = pagination.page || 1;
    const limit = pagination.limit || 10;

    const filtered = MOCK_FARMS.filter((f) => {
      if (searchQuery && !f.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (category && category !== "All" && f.category !== category) {
        return false;
      }
      if (district && district !== "All" && f.district !== district) {
        return false;
      }
      return true;
    });

    const start = (page - 1) * limit;
    return {
      items: filtered.slice(start, start + limit),
      total: filtered.length,
      page,
      totalPages: Math.ceil(filtered.length / limit) || 1,
    };
  }
}

describe("Farm Domain & Repository Suite", () => {
  const repo = new MockFarmRepository();

  test("finds farm by identifier", async () => {
    const farm = await repo.findById("1");
    assert.ok(farm !== null);
    assert.equal(farm.name, "Chilli");
    assert.equal(farm.district, "Guntur");
  });

  test("returns null for non-existent identifier", async () => {
    const farm = await repo.findById("9999");
    assert.equal(farm, null);
  });

  test("filters farms by district", async () => {
    const result = await repo.findMany({ district: "Nizamabad" });
    assert.equal(result.total, 1);
    assert.equal(result.items[0].name, "Turmeric");
  });

  test("filters farms by category", async () => {
    const result = await repo.findMany({ category: "Cash Crops" });
    assert.equal(result.total, 2);
  });

  test("searches farms by query string", async () => {
    const result = await repo.findMany({ searchQuery: "Rice" });
    assert.equal(result.total, 1);
    assert.equal(result.items[0].district, "Krishna");
  });
});
