def test_get_plans_by_farm(client, sample_farm, sample_plan):
    response = client.get(f"/api/v1/plans/farm/{sample_farm.id}")
    assert response.status_code == 200
    payload = response.json()
    assert payload["success"] is True
    assert len(payload["data"]) >= 1
    assert payload["data"][0]["farmId"] == sample_farm.id


def test_subscribe_plan_with_idempotency(client, sample_farm, sample_plan):
    sub_data = {
        "planId": sample_plan.id,
        "farmId": sample_farm.id,
        "subscriberEmail": "customer@pureharvest.org",
        "subscriberName": "Priya Sharma",
        "idempotencyKey": "idem_unique_test_key_12345",
    }

    # First attempt: creates new subscription
    res1 = client.post("/api/v1/plans/subscribe", json=sub_data)
    assert res1.status_code == 201
    payload1 = res1.json()
    assert payload1["success"] is True
    sub_id_1 = payload1["data"]["subscriptionId"]
    assert sub_id_1.startswith("sub_")

    # Second attempt with IDENTICAL idempotency key: returns same subscription
    res2 = client.post("/api/v1/plans/subscribe", json=sub_data)
    assert res2.status_code == 201
    payload2 = res2.json()
    sub_id_2 = payload2["data"]["subscriptionId"]

    # Verify idempotency deduplication
    assert sub_id_1 == sub_id_2
