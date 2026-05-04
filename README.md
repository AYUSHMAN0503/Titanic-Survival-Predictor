# Titanic Survival Prediction using Machine Learning

## Project Overview
This is a full-stack machine learning project that predicts whether a passenger survived the Titanic disaster. It uses a FastAPI backend to run a pre-trained Random Forest model, and a Next.js frontend to provide a simple, clean user interface.

## Folder Structure
```
project/
│── backend/
│   ├── main.py          # API and startup logic
│   ├── model.py         # Model training and prediction logic
│   ├── utils.py         # Data loading and preprocessing logic
│   ├── requirements.txt # Python dependencies
│
│── frontend/
│   ├── pages/           # Next.js pages
│   ├── components/      # React components
│   ├── package.json
│   ├── tailwind.config.js
│
│── data/
│   ├── train.csv        # Dataset (Download from Kaggle)
│   ├── test.csv         # Dataset (Download from Kaggle)
│
│── README.md
```

## Tech Stack
- **Backend**: Python, FastAPI, scikit-learn, pandas
- **Frontend**: Next.js, React, Tailwind CSS

## Steps to Run the Project


### 2. Run the Backend
Open a terminal and navigate to the `backend/` directory:
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```
*Note: The backend will automatically train the model and save it as `model.pkl` the very first time you run it.*

### 3. Run the Frontend
Open a new terminal and navigate to the `frontend/` directory:
```bash
cd frontend
npm install
npm run dev
```
# Titanic-Survival-Predictor
