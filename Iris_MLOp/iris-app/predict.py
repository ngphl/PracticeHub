import joblib
import numpy as np

#Load model
model = joblib.load("iris_model.pkl")

def predict_iris(sepal_length, sepal_width, petal_length, petal_width):
    # Format input
    input_data = np.array([[sepal_length, sepal_width, petal_length, petal_width]])

    # Predict
    pred_index = model.predict(input_data)[0]

    #Map
    species = ["setosa", "versicolor", "verginica"]

    return species[pred_index]


