import pytest
import os

@pytest.mark.asyncio
async def test_auth_success(client):
    admin_password = os.getenv("ADMIN_PASSWORD", "admin123")
    async with client as ac:
        response = await ac.post("/api/v1/auth/", json={"password": admin_password})
    assert response.status_code == 200
    data = response.json()
    assert "token" in data

@pytest.mark.asyncio
async def test_auth_failure(client):
    async with client as ac:
        response = await ac.post("/api/v1/auth/", json={"password": "incorrecta"})
    assert response.status_code == 401
