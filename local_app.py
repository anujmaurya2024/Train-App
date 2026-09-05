
import joblib
import pandas as pd
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

# 1. Load the production model
# Ensure rail_eta_prod_model_v2.pkl is in the same directory
model = joblib.load('rail_eta_prod_model_v2.pkl')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    operator: str
    month: int
    day: int
    day_of_week: int
    distance_km: float
    scheduled_departure: int
    weather_delay: float

@app.post("/predict")
def predict(data: PredictionRequest):
    input_df = pd.DataFrame([[
        data.operator, data.month, data.day, 
        data.day_of_week, data.distance_km, 
        data.scheduled_departure, data.weather_delay
    ]], columns=['TRAIN_OPERATOR', 'MONTH', 'DAY', 'DAY_OF_WEEK', 'DISTANCE_KM', 'SCHEDULED_DEPARTURE', 'WEATHER_DELAY'])
    
    prediction = model.predict(input_df)[0]
    return {"predicted_delay": round(float(prediction), 2)}


class TrainDemoPredictionRequest(BaseModel):
    train_number: str
    travel_date: str
    current_delay_min: float
    distance_remaining_km: float
    speed_kmh: float
    weather: str
    congestion: str
    speed_restriction_active: bool = False


@app.get("/health")
def health():
    return {"status": "ok", "mode": "demo-train-estimator"}


@app.post("/predict-train-demo")
def predict_train_demo(data: TrainDemoPredictionRequest):
    """Use the saved RailETA model to predict delayed arrival using the closest available feature mapping."""
    try:
        travel_day = datetime.strptime(data.travel_date, "%Y-%m-%d")
        month = travel_day.month
        day = travel_day.day
        day_of_week = travel_day.weekday()

        # The saved model expects a set of operational features that are not identical to the
        # demo form. We map the available values into the closest model inputs so the app can
        # use the trained estimator instead of the rule-based fallback.
        train_operator = data.train_number[:2].upper() or "IR"
        distance_km = max(float(data.distance_remaining_km), 50.0)

        departure_map = {
            "12001": 600,
            "12002": 615,
            "12621": 500,
            "12951": 630,
        }
        scheduled_departure = departure_map.get(data.train_number, 600 + (int(data.train_number[-2:]) % 10) * 15)

        weather_delay_map = {
            "CLEAR": 0.0,
            "LIGHT_RAIN": 8.0,
            "HEAVY_RAIN": 15.0,
            "FOG": 18.0,
            "THUNDERSTORM": 22.0,
        }
        weather_delay = weather_delay_map.get(data.weather, 0.0)

        input_df = pd.DataFrame([[
            train_operator,
            month,
            day,
            day_of_week,
            distance_km,
            scheduled_departure,
            weather_delay,
        ]], columns=['TRAIN_OPERATOR', 'MONTH', 'DAY', 'DAY_OF_WEEK', 'DISTANCE_KM', 'SCHEDULED_DEPARTURE', 'WEATHER_DELAY'])

        prediction = float(model.predict(input_df)[0])
        predicted_final_delay = max(0.0, round(prediction, 1))

        return {
            "train_number": data.train_number,
            "predicted_final_delay_min": predicted_final_delay,
            "mode": "trained_model",
            "message": "Prediction generated from the saved RailETA model using mapped operational features.",
        }
    except Exception:
        # Graceful fallback if the model cannot be used for any reason.
        weather_penalty = {
            "CLEAR": 0,
            "LIGHT_RAIN": 3,
            "HEAVY_RAIN": 7,
            "FOG": 8,
            "THUNDERSTORM": 10,
        }.get(data.weather, 0)
        congestion_penalty = {"LOW": 0, "MEDIUM": 3, "HIGH": 7}.get(data.congestion, 0)
        speed_penalty = max(0, 45 - data.speed_kmh) * 0.18
        distance_risk = min(max(data.distance_remaining_km, 0), 600) * 0.004
        restriction_penalty = 5 if data.speed_restriction_active else 0

        predicted_final_delay = max(
            0,
            round(
                data.current_delay_min
                + weather_penalty
                + congestion_penalty
                + speed_penalty
                + distance_risk
                + restriction_penalty,
                1,
            ),
        )

        return {
            "train_number": data.train_number,
            "predicted_final_delay_min": predicted_final_delay,
            "mode": "demo_fallback",
            "message": "Model prediction was unavailable, so the demo fallback was used.",
        }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
