import pandas as pd
import os

def get_data_path():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base_dir, 'data', 'train.csv')

def load_data():
    train_path = get_data_path()
    if not os.path.exists(train_path):
        raise FileNotFoundError(f"Training data not found at {train_path}. Please download train.csv and place it in the data/ folder.")
    return pd.read_csv(train_path)

def preprocess_data(df):
    """
    Cleans and encodes data for both training and prediction to ensure consistency.
    """
    # Create a copy to avoid modifying original dataframe
    df = df.copy()
    
    # 1. Handle missing values
    if 'Age' in df.columns:
        # Use a reasonable default median if missing
        df['Age'] = df['Age'].fillna(28.0)
        
    if 'Embarked' in df.columns:
        df['Embarked'] = df['Embarked'].fillna('S')
        
    # 2. Hardcoded encoding for categorical variables
    if 'Sex' in df.columns:
        df['Sex'] = df['Sex'].map({'male': 1, 'female': 0}).fillna(1)
        
    if 'Embarked' in df.columns:
        df['Embarked'] = df['Embarked'].map({'C': 0, 'Q': 1, 'S': 2}).fillna(2)
        
    # 3. Drop irrelevant columns if they exist
    columns_to_drop = ['PassengerId', 'Name', 'Ticket', 'Cabin', 'Survived']
    features = df.drop(columns=[col for col in columns_to_drop if col in df.columns])
    
    # 4. Ensure consistent column order
    expected_cols = ['Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare', 'Embarked']
    features = features[[col for col in expected_cols if col in features.columns]]
    
    return features
