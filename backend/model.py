import pandas as pd
import os
import joblib
from sklearn.ensemble import RandomForestClassifier
from utils import load_data, preprocess_data

MODEL_PATH = "model.pkl"

def train_and_save_model():
    """Trains the Random Forest model and saves it if it doesn't exist."""
    if os.path.exists(MODEL_PATH):
        return # Model already trained
        
    print("Training Random Forest model for the first time...")
    df = load_data()
    
    X = preprocess_data(df)
    y = df['Survived']
    
    # Train Random Forest (No scaling needed for RF)
    rf = RandomForestClassifier(n_estimators=100, random_state=42)
    rf.fit(X, y)
    
    # Save the model
    joblib.dump(rf, MODEL_PATH)
    print(f"Model trained and saved to {MODEL_PATH}")

def get_model():
    """Loads and returns the trained model."""
    if not os.path.exists(MODEL_PATH):
        train_and_save_model()
    return joblib.load(MODEL_PATH)

def predict_survival(features_dict: dict):
    model = get_model()
    
    # Convert input to DataFrame
    input_df = pd.DataFrame([features_dict])
    
    # Rename keys to match exactly with the training features
    input_df.rename(columns={
        'pclass': 'Pclass',
        'sex': 'Sex',
        'age': 'Age',
        'sibsp': 'SibSp',
        'parch': 'Parch',
        'fare': 'Fare',
        'embarked': 'Embarked'
    }, inplace=True)
    
    # Preprocess exactly like training
    X_input = preprocess_data(input_df)
    
    prediction = model.predict(X_input)[0]
    return "Survived" if prediction == 1 else "Did not survive"
