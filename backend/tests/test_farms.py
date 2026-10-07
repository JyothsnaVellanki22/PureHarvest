def test_list_farms_returns_paginated_envelope(client, sample_farm):
    response = client.get("/api/v1/farms")
    assert response.status_code == 200

    payload = response.json()
    assert payload["success"] is True
    assert isinstance(payload["data"], list)
    assert len(payload["data"]) >= 1
    assert payload["meta"]["page"] == 1
    assert payload["meta"]["total"] >= 1


def test_filter_farms_by_district(client, sample_farm):
    response = client.get("/api/v1/farms?district=Guntur")
    assert response.status_code == 200
    payload = response.json()
    assert all(item["district"] == "Guntur" for item in payload["data"])


def test_get_farm_by_id_success(client, sample_farm):
    response = client.get(f"/api/v1/farms/{sample_farm.id}")
    assert response.status_code == 200
    payload = response.json()
    assert payload["success"] is True
    assert payload["data"]["id"] == sample_farm.id
    assert payload["data"]["name"] == sample_farm.name


def test_get_farm_by_id_not_found(client):
    response = client.get("/api/v1/farms/non_existent_9999")
    assert response.status_code == 200
    payload = response.json()
    assert payload["success"] is False
    assert payload["error"]["code"] == "FARM_NOT_FOUND"


def test_create_farm_success(client):
    new_farm = {
        "id": "farm_created_test",
        "name": "New Godavari Farm",
        "location": "Rajahmundry, Andhra Pradesh",
        "district": "East Godavari",
        "rating": 4.9,
        "image": "/images/coconut.png",
        "category": "Fruits",
        "description": "High yield coconuts",
        "tags": ["Coconut", "Fresh"],
    }
    response = client.post("/api/v1/farms", json=new_farm)
    assert response.status_code == 201
    payload = response.json()
    assert payload["success"] is True
    assert payload["data"]["id"] == "farm_created_test"
