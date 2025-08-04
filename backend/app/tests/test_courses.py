import pytest

@pytest.mark.asyncio
async def test_get_courses(client):
    async with client as ac:
        response = await ac.get("/api/v1/courses/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_create_course(client):
    async with client as ac:
        payload = {"name": "Curso Prueba", "price": 150}
        response = await ac.post("/api/v1/courses/", json=payload)
    assert response.status_code == 200 or response.status_code == 201
    data = response.json()
    assert data["name"] == "Curso Prueba"
    assert data["price"] == 150
