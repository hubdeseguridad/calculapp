import pytest

@pytest.mark.asyncio
async def test_pricing_calculation(client):
    async with client as ac:
        payload = {"items": [{"course_id": 1, "quantity": 10}]}
        response = await ac.post("/api/v1/pricing/", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "total_licenses" in data
    assert "subtotal" in data
    assert "discount_rate" in data
    assert data["total_licenses"] >= 10
