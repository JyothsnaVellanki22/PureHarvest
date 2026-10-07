def test_health_check_returns_ok(client):
    response = client.get("/health")
    assert response.status_code == 200

    payload = response.json()
    assert payload["success"] is True
    assert "data" in payload
    assert payload["data"]["status"] == "healthy"
    assert payload["data"]["database"] == "healthy"
    assert "uptime_seconds" in payload["data"]
    assert "correlationId" in payload or "correlation_id" in payload


def test_root_endpoint(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["service"] == "PureHarvest API"
