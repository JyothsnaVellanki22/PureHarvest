"""Database seeder populating real Andhra Pradesh & Telangana farms and plans."""
from app.database import SessionLocal, Base, engine
from app.models.farm import FarmModel
from app.models.plan import HarvestPlanModel
from app.models.user import UserModel
from app.models.journal import JournalEntryModel
from app.utils.security import get_password_hash

FARMS_DATA = [
    {
        "id": "1",
        "name": "Guntur Chilli Estate",
        "location": "Guntur, Andhra Pradesh",
        "district": "Guntur",
        "rating": 4.9,
        "image": "/images/guntur-chili.jpg",
        "tags": ["Chili", "Cash Crops", "GI Tagged"],
        "category": "Cash Crops",
        "description": "Famous pungent Guntur Sannam chillies grown naturally along the Krishna river basin with regenerative drip irrigation.",
        "acres": 25.0,
        "established_year": 1998,
        "plans_count": 2,
    },
    {
        "id": "3",
        "name": "Godavari Coconut Groves",
        "location": "East Godavari, Andhra Pradesh",
        "district": "East Godavari",
        "rating": 4.9,
        "image": "/images/coconut.png",
        "tags": ["Coconut", "Fruits", "Organic"],
        "category": "Fruits",
        "description": "Lush delta coconut plantations nurtured with rich alluvial silt and companion intercropping.",
        "acres": 40.0,
        "established_year": 1985,
        "plans_count": 2,
    },
    {
        "id": "4",
        "name": "Krishna Valley Paddy Fields",
        "location": "Vijayawada, Andhra Pradesh",
        "district": "Krishna",
        "rating": 4.7,
        "image": "/images/indian-paddy.jpg",
        "tags": ["Rice", "Food Crops", "Heirloom"],
        "category": "Food Crops",
        "description": "Traditional Sona Masoori and BPT rice cultivated using System of Rice Intensification (SRI) minimizing water consumption.",
        "acres": 55.0,
        "established_year": 2004,
        "plans_count": 2,
    },
    {
        "id": "5",
        "name": "Nizamabad Turmeric Hub",
        "location": "Nizamabad, Telangana",
        "district": "Nizamabad",
        "rating": 4.9,
        "image": "/images/turmeric.png",
        "tags": ["Turmeric", "Cash Crops", "High Curcumin"],
        "category": "Cash Crops",
        "description": "High-curcumin organic turmeric tubers steam-boiled and sun-dried according to ancestral practices.",
        "acres": 18.0,
        "established_year": 2010,
        "plans_count": 2,
    },
    {
        "id": "6",
        "name": "Rayalaseema Groundnut Farm",
        "location": "Ananthapuram, Andhra Pradesh",
        "district": "Ananthapuram",
        "rating": 4.8,
        "image": "/images/groundnut.png",
        "tags": ["Groundnut", "Oilseeds", "Dryland Farming"],
        "category": "Oilseeds",
        "description": "Drought-resilient groundnuts grown in red sandy loam soils using zero-budget natural farming techniques.",
        "acres": 32.0,
        "established_year": 2012,
        "plans_count": 1,
    },
    {
        "id": "7",
        "name": "Banganapalli Mango Orchard",
        "location": "Krishna, Andhra Pradesh",
        "district": "Krishna",
        "rating": 4.9,
        "image": "/images/mango-orchard.png",
        "tags": ["Mango", "Fruits", "Carbide Free"],
        "category": "Fruits",
        "description": "GI-tagged Banganapalli and Chinna Rasalu varieties naturally tree-ripened without harmful calcium carbide.",
        "acres": 50.0,
        "established_year": 1992,
        "plans_count": 2,
    },
    {
        "id": "22",
        "name": "Guntur Gongura Greens",
        "location": "Guntur, Andhra Pradesh",
        "district": "Guntur",
        "rating": 4.8,
        "image": "/images/gongura.png",
        "tags": ["Gongura", "Vegetables", "Heritage"],
        "category": "Vegetables",
        "description": "Authentic red-stem sorrel leaves harvested same-day, packed with natural iron and distinctive tangy flavor.",
        "acres": 8.0,
        "established_year": 2018,
        "plans_count": 1,
    },
]

PLANS_DATA = [
    {
        "id": "plan_chilli_bulk",
        "farm_id": "1",
        "name": "Seasonal Guntur Sannam Spice Pack",
        "price": 35.0,
        "period": "per harvest",
        "description": "5kg of sun-dried Guntur Sannam chillies directly from the field curing yard.",
        "includes": ["Whole Dried Chillies (3kg)", "Cold-Ground Pure Powder (2kg)", "Harvest Certificate"],
        "spots": 25,
        "popular": True,
    },
    {
        "id": "plan_rice_csa",
        "farm_id": "4",
        "name": "Yearly Rice Reserve (Sona Masoori)",
        "price": 120.0,
        "period": "per quarter",
        "description": "Quarterly 25kg dispatch of single-origin unpolished Sona Masoori rice aged 12 months.",
        "includes": ["25kg Sona Masoori Rice", "Traceability QR Report", "Free Farm Tour Pass"],
        "spots": 15,
        "popular": True,
    },
    {
        "id": "plan_mango_box",
        "farm_id": "7",
        "name": "Royal Banganapalli Summer Crate",
        "price": 45.0,
        "period": "per box",
        "description": "Hand-picked, carbide-free tree-ripened Banganapalli mangoes delivered within 48 hours of harvest.",
        "includes": ["12 Jumbo Banganapalli Mangoes", "Ripening Hay Basket", "Origin Certificate"],
        "spots": 50,
        "popular": True,
    },
]


def seed_database():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Seed Admin & Demo Users
        admin_email = "admin@pureharvest.org"
        if not db.query(UserModel).filter(UserModel.email == admin_email).first():
            admin_user = UserModel(
                id="usr_admin",
                name="System Administrator",
                email=admin_email,
                hashed_password=get_password_hash("PureHarvest@2026"),
                role="admin",
            )
            db.add(admin_user)

        demo_farmer_email = "farmer@pureharvest.org"
        if not db.query(UserModel).filter(UserModel.email == demo_farmer_email).first():
            farmer_user = UserModel(
                id="usr_farmer",
                name="Venkateswara Rao",
                email=demo_farmer_email,
                hashed_password=get_password_hash("Farmer@2026"),
                role="farmer",
                farm_id="1",
            )
            db.add(farmer_user)

        # Seed Farms
        for farm_dict in FARMS_DATA:
            existing = db.query(FarmModel).filter(FarmModel.id == farm_dict["id"]).first()
            if not existing:
                farm = FarmModel(**farm_dict)
                db.add(farm)

        db.commit()

        # Seed Plans
        for plan_dict in PLANS_DATA:
            existing = db.query(HarvestPlanModel).filter(HarvestPlanModel.id == plan_dict["id"]).first()
            if not existing:
                plan = HarvestPlanModel(**plan_dict)
                db.add(plan)

        db.commit()
        print("Database seeded successfully with initial farms, plans, and users!")

    except Exception as e:
        db.rollback()
        print(f"Error during seeding: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
