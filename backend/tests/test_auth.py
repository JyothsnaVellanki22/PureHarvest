def test_register_and_login_flow(client):
    reg_data = {
        "name": "Anand Kumar",
        "email": "anand@pureharvest.org",
        "password": "Password123!",
        "role": "consumer",
    }

    # 1. Register
    reg_res = client.post("/api/v1/auth/register", json=reg_data)
    assert reg_res.status_code == 201
    reg_payload = reg_res.json()
    assert reg_payload["success"] is True
    assert "accessToken" in reg_payload["data"]
    token = reg_payload["data"]["accessToken"]

    # 2. Login
    login_res = client.post("/api/v1/auth/login", json={"email": "anand@pureharvest.org", "password": "Password123!"})
    assert login_res.status_code == 200
    assert "accessToken" in login_res.json()["data"]

    # 3. Access protected /me endpoint with Bearer token
    me_res = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert me_res.status_code == 200
    assert me_res.json()["data"]["email"] == "anand@pureharvest.org"


def test_login_invalid_password(client):
    res = client.post("/api/v1/auth/login", json={"email": "nonexistent@test.com", "password": "wrong"})
    assert res.status_code == 401
