import pytest
import httpx
from app.main import app

@pytest.fixture
def client():
    """Cliente HTTP asincrónico para pruebas"""
    transport = httpx.ASGITransport(app=app)
    return httpx.AsyncClient(transport=transport, base_url="http://test")
