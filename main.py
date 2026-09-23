from datetime import date

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

ships = [
    {
        "id": 1,
        "name": "Pacific Star",
        "capacity": 100000,
        "cargo_types": ["iron ore", "coal"],
        "available_date": "2026-09-25",
        "current_port": "Singapore",
    },
    {
        "id": 2,
        "name": "Ocean Queen",
        "capacity": 70000,
        "cargo_types": ["iron ore"],
        "available_date": "2026-09-24",
        "current_port": "Singapore",
    },
    {
        "id": 3,
        "name": "Sea Titan",
        "capacity": 120000,
        "cargo_types": ["coal"],
        "available_date": "2026-09-20",
        "current_port": "Singapore",
    },
    {
        "id": 4,
        "name": "Eastern Giant",
        "capacity": 90000,
        "cargo_types": ["iron ore"],
        "available_date": "2026-10-05",
        "current_port": "Singapore",
    },
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ShipRequest(BaseModel):
    cargo_type: str
    cargo_weight: int
    origin: str
    destination: str
    require_date: date


@app.post("/api/ship/search")
def search_ship(request: ShipRequest):
    matching_ships = []

    for ship in ships:
        matched_capacity = ship["capacity"] >= request.cargo_weight
        matched_type = request.cargo_type in ship["cargo_types"]
        matched_date = request.require_date >= date.fromisoformat(ship["available_date"])

        if matched_capacity and matched_type and matched_date:
            matching_ships.append(ship)
        

    if not matching_ships:
        return {"matches": [],
        "message": "No ships found"
        }

    return {"matches": matching_ships}
