from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from model import train_and_save_model, predict_survival
import contextlib

@contextlib.asynccontextmanager
async def lifespan(app: FastAPI):
    # Train the model once on startup if it doesn't exist
    try:
        train_and_save_model()
    except Exception as e:
        print(f"Warning during startup: {e}")
    yield

app = FastAPI(title="Titanic API", lifespan=lifespan)

# Enable CORS so frontend works without issues
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Passenger(BaseModel):
    pclass: int
    sex: str
    age: float
    sibsp: int
    parch: int
    fare: float
    embarked: str

@app.post("/predict")
def predict(passenger: Passenger):
    try:
        # Pydantic v1 dict(), v2 model_dump(). Using dict() for broad compatibility
        result = predict_survival(passenger.dict())
        return {"prediction": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
