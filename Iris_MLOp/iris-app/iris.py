from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier

import joblib

def train_and_save_model():
    # Load dataset
    iris = load_iris()
    X,y = iris.data, iris.target

    # Train model
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X,y)

    #Save model
    joblib.dump(clf,"iris_model.pkl")
    print("Model saved to iris_model.pkl")


if __name__ == "__main__":
    train_and_save_model()