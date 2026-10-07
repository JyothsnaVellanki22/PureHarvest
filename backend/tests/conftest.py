import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from app.main import app
from app.database import Base, get_db
from app.models.farm import FarmModel
from app.models.plan import HarvestPlanModel

SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="session", autouse=True)
def setup_test_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def db_session():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture(autouse=True)
def clean_tables(db_session):
    yield
    for table in reversed(Base.metadata.sorted_tables):
        db_session.execute(table.delete())
    db_session.commit()


@pytest.fixture
def client(db_session):
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


@pytest.fixture
def sample_farm(db_session):
    farm = FarmModel(
        id="test_farm_1",
        name="Test Chili Farm",
        location="Guntur, Andhra Pradesh",
        district="Guntur",
        rating=4.8,
        image="/images/guntur-chili.jpg",
        category="Cash Crops",
        description="Organic chillies",
        acres=15.0,
        established_year=2015,
        tags=["Chili", "Organic"],
    )
    db_session.add(farm)
    db_session.commit()
    db_session.refresh(farm)
    return farm


@pytest.fixture
def sample_plan(db_session, sample_farm):
    plan = HarvestPlanModel(
        id="test_plan_1",
        farm_id=sample_farm.id,
        name="Weekly Chili Basket",
        price=30.0,
        period="per week",
        description="Fresh chillies",
        includes=["Dried Chillies", "Chili Powder"],
        spots=10,
        popular=True,
    )
    db_session.add(plan)
    db_session.commit()
    db_session.refresh(plan)
    return plan
